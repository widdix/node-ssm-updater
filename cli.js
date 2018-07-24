'use strict';

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const docopt = require('docopt');
const proxy = require('proxy-agent');

const ssm = new AWS.SSM({apiVersion: '2014-11-06'});

const getCurrentParameter = async (name) => {
  try {
    return await ssm.getParameter({
      Name: name,
      WithDecryption: true
    }).promise();
  } catch (err) {
    if (err.code === 'ParameterNotFound') {
      return null;
    } else {
      throw err;
    }
  }
};

module.exports.run = async (argv) => {
  const cli = fs.readFileSync(path.join(__dirname, 'cli.txt'), {encoding: 'utf8'});
  const input = docopt.docopt(cli, {
    version: require('./package.json').version,
    argv: argv
  });

  if ('HTTPS_PROXY' in process.env) {
    AWS.config.update({
      httpOptions: {agent: proxy(process.env.HTTPS_PROXY)}
    });
  }

  if (input.update === true) {
    const name = input['--name'];
    const value = input['--value'];
    const type = input['--type'];
    const currentData = await getCurrentParameter(name);
    if (currentData === null || currentData.Parameter.Value !== value || currentData.Parameter.Type !== type) {
      const params = {
        Name: name,
        Type: type,
        Value: value,
        Overwrite: true
      };
      if (input['--key-id'] !== null) {
        params.KeyId = input['--key-id'];
      }
      return await ssm.putParameter(params).promise();
    } else {
      return {
        Version: currentData.Parameter.Version
      };
    }
  }
};
