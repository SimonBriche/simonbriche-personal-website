#!/usr/bin/env node

//don't warn if a .env file is missing
require('dotenv').config({silent: true});

const ENV = process.env;
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const {exchangeNpssoForCode, exchangeCodeForAccessToken, getUserTitles} = require('psn-api');
const ConfigModel = require('../models/config');

const optionDefinitions = [
  { name: 'npsso' },
  { name: 'help', alias: 'h'}
];

const sections = [
  {
    header: 'Update PSN',
    content: "Update the trophies' list of the npsso's owner."
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'npsso',
        description: 'First, login to your PSN account at https://www.playstation.com/. Once connected, open a new browser tag and go to https://ca.account.sony.com/api/v1/ssocookie. A JSON will appear with the npsso as a property.'
      }
    ]
  }
];

const argv = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);

if (argv && argv.npsso) {
  (async () => {
    const accessCode = await exchangeNpssoForCode(argv.npsso);
    const authorization = await exchangeCodeForAccessToken(accessCode);
    const trophies = await getUserTitles(authorization, "me");

    console.log('trophies', trophies);
    if(trophies && trophies.trophyTitles && trophies.trophyTitles.length > 0){
      console.log('titles', trophies.trophyTitles.map(item => ({
        title: item.trophyTitleName,
        image: item.trophyTitleIconUrl,
        earnedTrophies: item.earnedTrophies
      })));
      await ConfigModel.set('PSN_TROPHIES', JSON.stringify(trophies.trophyTitles.map(item => ({
        title: item.trophyTitleName,
        image: item.trophyTitleIconUrl,
        earnedTrophies: item.earnedTrophies
      }))));
      console.log('Trophies updated');
    }
    else{
      console.log('No trophies found');
    }
    process.exit(0);
  })().catch(e => {
    console.log('update PSN failed', e);
    process.exit(0);
  });
}
else if (argv.hasOwnProperty('help')) {
  console.log(usage);
  process.exit(0);
}
else {
  console.log('Missing npsso parameter');
  process.exit(0);
}