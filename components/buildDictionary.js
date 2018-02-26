const Chat = require('../Chat');
const SteamID = require('steamid');
const debug = require('debug')('app:dictionary');
const getFriends = require('../scripts/getFriends');

const community = new (require('steamcommunity'))();

const getInfo = (id) => {
  return new Promise((resolve, reject) => {
    community.getSteamUser(new SteamID(id), (err, user) => {
      if (err) {
        debug(`failed to get profile for ${id}`, err);
        return;
      }
      
      return {
        steamID: user.steamID,
        name: user.name,
        onlineState: user.onlineState,
        stateMessage: user.stateMessage,
        avatar: user.getAvatarURL(),
        customURL: '/' + user.customURL
      };
    });
  });
}

const expand = (friends) => {
  debug(`getting details of ${friends.length} profiles`);

  return new Promise((resolve, reject) => {
    Promise.all(friends.map(e => getInfo(e.steamid)))
      .then(resolve).catch(console.log);
  });
}

// Build an object of friends of user with id, and populate it with their data.
const build = module.exports = async (id) => {
  const list = await getFriends(id.toString());
  debug(`got friends`);

  const friends = await expand(list);
  debug(`got expanded information`);

  return friends;
}
