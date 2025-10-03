const { SlashCommandBuilder } = require('discord.js');
const { rollDice } = require('../utils/dice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Role um dado de D&D!')
        .addStringOption(option =>
            option.setName('dice')
                .setDescription('Selecione o tipo de dado')
                .setRequired(true)
                .addChoices(
                    { name: 'd4', value: '4' },
                    { name: 'd6', value: '6' },
                    { name: 'd8', value: '8' },
                    { name: 'd10', value: '10' },
                    { name: 'd12', value: '12' },
                    { name: 'd20', value: '20' },
                    { name: 'd100', value: '100' },
                ))
        .addIntegerOption(option =>
            option.setName('quantity')
                .setDescription('Quantidade de dados a serem rolados (1-10)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(10))
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('Valor do modificador (opcional)')
                .setRequired(false)),
    async execute(interaction) {
        const diceSides = parseInt(interaction.options.getString('dice'));
        const quantity = interaction.options.getInteger('quantity');
        const modifier = interaction.options.getInteger('modifier') || 0;

        const rolls = rollDice(quantity, diceSides);

        // Quando rolar 1d20, verificar se foi sucesso ou falha critica antes de somar o modificador, se um dos dois bater, ja exibe a mensagem
        if (diceSides == 20 && quantity == 1) {
            if (rolls[0] == 20) {
                await interaction.reply(
                    `${quantity}d${diceSides} - SUCESSO CRÍTICO: ${rolls}`
                );

                return;
            }

            if (rolls[0] == 1) {
               await interaction.reply(
                    `${quantity}d${diceSides} - FALHA CRÍTICA: ${rolls}`
                );

                return;
            }
        }

        // Se não foi resultado critico ou não é um dado d20, soma o modificador e retorna o resultado total
        const sum = rolls.reduce((a,b)=>a+b,0) + modifier;

        let replyMessage = `**${quantity}d${diceSides} - Valor: ${rolls.join(', ')}**\n`;

        if (modifier) {
            replyMessage += `Modificador: ${modifier >= 0 ? '+' : ''}${modifier}\n`;
            replyMessage += `**Total: ${sum}**`;
        }

        await interaction.reply(replyMessage);

    }
};
