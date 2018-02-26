const fs = require('fs')
const { join } = require('path')

// Get account from: 
//   - args (--user name --pass secret)
//   - accounts
//      - args (--account alias)
//      - default (account with alias default)

// Get API Key from:
//   - args (--apikey key)
//   - chosen account
//   - default account

const validFile = path => {
  let failed = false;
  try { require(path) } catch(e) { failed = true }
  return !failed;
}

const parseArgs = (args) => {
  return args.reduce((acc, cur, i, arr) => {
    console.log(acc, cur, arr[i - 1]);

    if (cur[0] === '-' && cur[1] !== '-') {
      acc[cur.slice(1)] = true;

      return acc;
    }

    if (cur.slice(0, 2) === '--') {
      acc[cur.slice(2)] = undefined;

      return acc;
    }

    acc[arr[i - 1].slice(2)] = cur;

    return acc;
  }, {})
}

const getConfig = module.exports = () => {
  const args = parseArgs(process.argv.slice(2));
  const path = args.config 
    || join(require('os').homedir(), '.steam.json')

  global.DEV = process.env.NODE_ENV === 'dev'
    || process.env.NODE_ENV === 'development'

  if (fs.existsSync(path) && validFile(path)) {
    const accounts = require(path);
    const account = accounts[args.account || 'default'];
    
    global.ACCOUNT = account;
    global.API_KEY = args.apikey 
      || account.apikey 
      || accounts.default.apikey
  }

  if (args.user && args.pass) {
    global.ACCOUNT = {
      accountName: args.user,
      password: args.pass,  
    }
  }

  if (!global.ACCOUNT) { throw new Error(`Couldn't get account!`) }
  if (!global.API_KEY) { throw new Error(`Couldn't get api key!`) }

  return;
}