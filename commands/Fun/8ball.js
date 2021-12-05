const { replaceStringTransformer } = require("common-tags");
const Discord = require("discord.js");
const Guild = require('../../models/guild');
const colors = require('../../colors.json');

const answers = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];



module.exports = {
    name: '8ball',
    aliases: ['8'],
    category: 'Fun',
    description: 'Gives a random answer to a question.',
    usage: `8ball <question>`,
    run: async (bot, message, args) => {

        if(!args[2]) return message.channel.send("Please ask a **FULL** question.");



        let result = Math.floor((Math.random() * answers.length));
        let question = args.slice(1).join(" ");

        const embed = new Discord.MessageEmbed()
        .setTitle("8 Ball!")
        .setColor(colors.blue_dark)
        .setDescription(`${answers[result]}`)
        .setFooter(`8 ball! | Question by ${message.author.tag}`)

        message.channel.send(embed);
}}
