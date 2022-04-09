# Stacks Discord Bot

## Version 0.1

## Description

A simple open source discord bot for the Stacks community and ecosystem.

## Features

### **Commands**

#### **Basic Commands**

##### **Collection**

`get`

- aliases: [lookup, search, find]
- description: Get a specific NFT from the collection
- usage: get \<nftID>
- category: collection
- args: true

`lastmint`

- name: lastmint
- aliases: [lastmint]
- description: Get the last minted NFT in the collection
- usage: lastmint
- category: collection
- args: false

`twitter`

- name: twitter
- aliases: [twitter]
- description: Get the Twitter account for the collection
- usage: twitter
- category: collection
- args: false

`website`

- name: website
- aliases: [website]
- description: Get the website for the collection
- usage: website
- category: collection
- args: false

##### **Market**

`floor`

- name: floor
- aliases: [floor, floor-price]
- description: Get the current floor price of the collection
- usage: floor
- category: market
- args: false

`marketplace`

- name: marketplace
- aliases: [market, byz, byznation, stxnft]
- description: Get the current floor price of the collection
- usage: marketplace
- category: market
- args: false

`stxprice`

- aliases: [stxprice, stx-price]
- description: Get the current price of STX in USD
- usage: stxprice
- category: market
- args: false

##### **Misc**

`help`

- name: help
- aliases: [commands]
- description: List all commands of bot or info about a specific command.
- usage: [command name]
- category: general
- args: false

`ping`

- name: ping
- aliases: [ping]
- description: Ping the bot
- usage: ping
- category: misc
- args: false

`reload`

- name: reload
- alises: [reload]
- description: Reloads a command
- usage: reload \<command name>
- category: admin
- args: true

#### **Slash Commands**

`/help`

`/verify`

- [Milestone: V2](https://github.com/aazei-on-stx/stacks-discord-bot/issues?q=is%3Aopen+is%3Aissue+milestone%3AV2)

`/update`

- [Milestone: V2](https://github.com/aazei-on-stx/stacks-discord-bot/issues?q=is%3Aopen+is%3Aissue+milestone%3AV2)

## Install

1. Follow the instructions to [create a new Bot on Discord](https://discordjs.guide/preparations/)
2. Clone the repository
3. Rename `.env.sample` to `.env`
4. Fill out `.env` with your Discord token
5. Adjust botConfig.json as needed; see below
6. Run `npm install` in the command line
7. Run `npm run dev` or `npm run start` to start the bot.

## Configuration

Make changes to `botConfig.json` as needed.
Additional instructions in V1.

## Run Tests

TBD

## Support & Documentation

[Discord](https://discord.gg/5AznhfPyWN)
[GitHub](https://github.com/aazei-on-stx/stacks-discord-bot)

## Contributors

- aazei
- hz
