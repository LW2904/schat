# schat
Simple steam chat CLI tool.

I built this because I wanted to be reachable via steam on my laptop running linux, but didn't want to install steams' bloat.

This is NodeJS so you can't expect too much, but it will always stay 
below 100mb of RAM usage and CPU usage will be neglible. 

### Config

This can be configured in the following ways: 

1. A config file in `~/.steam.json` or `/` + `--path` with the following format: 
    ```
    {
      "default" OR --account : {
        "accountName": name,
        "password": pass,
        "apikey": steam web api key,
        ["shasec"]: shared secret
      }
    }
    ```
    _Note that the `"shasec"` property is optional, and you will be promted for your mobile code if it is not provided and you use mobile auth._

    _Also note that it may be preferable to only use one API key, and to store it in the `default` object; even if you are not going to use it otherwise._

2. Using the `--user`, `--pass` and `--apikey` arguments, example: 
    ```
    node index --user username --pass password --apikey xxxxx
    ```

    _Note that here it may also be preferable to safe the apikey in the `default` object of the config file, even if you don't plan to use it to store your account data._

