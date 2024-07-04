# About

SsmHandler is a utlitity to simplify adding and modify parameters in the AWS Parameter Store.

## Setup

### Install required Node modules

```bash
npm i
```

### Make ssmhandler globaly available

```bash
tsc && npm link
# or
npm run link
```

## Usage

```text
Usage: ssmmanager -f <file> [-e <env>]

Options:
      --help     Show help                                                    [boolean]
      --version  Show version number                                          [boolean]
  -d, --dry      Dry run mode. No changes will be made.      [boolean] [default: false]
  -e, --env      The environment name to use    [string] [default: "$ENVIRONMENT_NAME"]
  -f, --file     The file to parse                                  [string] [required]
  -v, --verbose  Enable detailed output of command execution [boolean] [default: false]
```

## Example indata file

```javascript
  { "Name": "DB_HOST", "Value": "db.localhost" },
  { "Name": "DB_PASSWORD", "Value": "pass" },
  { "Name": "DB_USER", "Value": "user" },
  { "Name": "ORDERLOG_GROUP", "Value": "my-orderlog" },
  { "Name": "REDIS_HOST", "Value": "my.redis" },
  { "Name": "shop/DOMAIN", "Value": "my-local" },
  { "Name": "shop/DOMAIN_AT", "Value": "www.host.at" },
  { "Name": "shop/DOMAIN_DE", "Value": "www.hsot.de" },
  { "Name": "shop/DOMAIN_DK", "Value": "www.host.dk" },
  { "Name": "shop/DOMAIN_ES", "Value": "www.host.es" },
  { "Name": "shop/DOMAIN_FI", "Value": "www.host.fi" },
  { "Name": "shop/DOMAIN_FR", "Value": "www.host.fr" },
  { "Name": "shop/DOMAIN_GB", "Value": "www.host.co.uk" },
  { "Name": "shop/DOMAIN_NL", "Value": "www.host.nl" },
  { "Name": "shop/DOMAIN_NO", "Value": "www.host.no" },
  { "Name": "shop/DOMAIN_PL", "Value": "www.host.pl" },
  { "Name": "shop/DOMAIN_SE", "Value": "www.host.se" },
  { "Name": "shop/DOMAIN_US", "Value": "www.host.com" },
  {
    "Name": "shop/aws/ACCESS_KEY",
    "Value": "**********",
    "Type": "SecureString"
  },
  ...
```

## Invocation Example

```bash
# Dry run, just to se what happens
ssmmanager -f /path/to/indata.json -vd

# Same thing, without dryrun flag
ssmmanager -f /path/to/indata.json -v
```
