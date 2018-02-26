const URL = 'http://api.steampowered.com/';

const request = require('request');
const debug = require('debug')('app:friends');

const getFriends = module.exports = (id) => new Promise((resolve, reject) => {
  const url = `${URL}ISteamUser/GetFriendList/v0001/` +
    `?key=${global.API_KEY}&steamid=${id}&relationship=friend`;

  request(url, (err, res, body) => {
    debug(`steam api response (${res.statusCode})`);

    if (err) { throw err; }

    try {
      // This will throw an exception if key invalid or profile private.
      const friends = JSON.parse(body).friendslist.friends;
      debug(`got friend list of user ${id}`);

      resolve(friends);
    } catch(e) {
      debug(`couldn't get friendslist, you should probably abort`);
      reject(e);
    }
  });
});