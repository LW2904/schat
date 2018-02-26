const moment = require('moment');
const User = require('./components/User');
const debug = require('debug')('app:chat');

const Chat = module.exports = class extends User {
  constructor(account) {
    super(account);

    this.build().catch(debug);
  }

  async build() {
    await this.logOn();

    debug(`logged on`);

    this.client.setPersona(User.EPersonaState['Busy']);
    this.emit('ready');

    this.dictionary = await this.buildDictionary(this.client.steamID);
    this.emit('dictionary', this.dictionary);

    this.client.on('friendMessage', (senderID, content) => {
      let message = {
        content,
        sender: this.dictionary
          .filter(
            (e) => e.steamID.toString() === senderID.toString()
          )[0] || { id: senderID },
        formattedDate: moment().format('h:mm:ss a'),
      };

      this.emit('message', message);
    })
  }

  send(recipient, message) {
    if (!recipient) { return; }

    this.client.chatMessage(recipient, message || '');
  }
}

Chat.prototype.buildDictionary = require('./components/buildDictionary');