# ssm-updater

Update SSM parameter only if the value has changed.


## Install

Download the latest binary for your operating system: https://github.com/widdix/node-ssm-updater/releases

### MacOS

```
chmod 755 ssm-updater-macos
mv ssm-updater-macos /usr/local/bin/ssm-updater
ssm-updater -v
```

### Linux

```
chmod 755 ssm-updater-linux
mv ssm-updater-linux /usr/local/bin/ssm-updater
ssm-updater -v
```

### Windows

TODO

## Available Commands

### Update

> Only updates the parameter of the value has changed!

```
ssm-updater update --name=/path/to/param --value=123 --type=String
```

Optional KMS key id when type := SecureString:

```
ssm-updater update --name=/path/to/param --value=123 --type=SecureString --key-id=00000000-0000-0000-0000-000000000000
```

## Config

For credential, the [AWS SDK for Node.js behavior](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) applies.

### Proxy

The `HTTPS_PROXY` environment variable is used if set.
