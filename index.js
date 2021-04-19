const Discord = require('discord.js');
const axios = require('axios').default;

const config = require('./config');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', (msg) => {
    if (msg.content.includes('discord.gift/')) {
        console.log('Found Nitro gift');

        let indexNum = msg.content.search("discord.gift/") + 13;
        let giftCode = msg.content.substring(indexNum, indexNum + 16);

        if (giftCode.length === 16) {
            console.log('Gift code:', giftCode);

            url = 'https://discordapp.com/api/v6/entitlements/gift-codes/' + giftCode + '/redeem';

            axios({
                method: 'POST',
                url: url,
                headers:
                {
                    'Authorization': config.token
                }
            }).then(
                r => console.log(`Successfully redeemed Nitro from ${msg.guild.name}.`)
            ).catch(e => console.log('Invalid nitro code'));
        }
    }
})

client.login(config.token);
