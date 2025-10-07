import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getClassDataByIndex } from '../utils/dndApi.js';

export default {
  data: new SlashCommandBuilder()
    .setName('info-classe')
    .setDescription('Retorna as informações de uma classe.')
    .addStringOption(option =>
      option.setName('classe')
        .setDescription('Selecione a classe desejada')
        .setRequired(true)
        .addChoices(
          { name: 'Bárbaro', value: 'barbarian' },
          { name: 'Bardo', value: 'bard' },
          { name: 'Bruxo', value: 'warlock' },
          { name: 'Clérigo', value: 'cleric' },
          { name: 'Druida', value: 'druid' },
          { name: 'Feiticeiro', value: 'sorcerer' },
          { name: 'Guerreiro', value: 'fighter' },
          { name: 'Ladino', value: 'rogue' },
          { name: 'Mago', value: 'wizard' },
          { name: 'Monge', value: 'monk' },
          { name: 'Paladino', value: 'paladin' },
          { name: 'Patrulheiro', value: 'ranger' }
        )
    ),
  async execute(interaction) {
    const classe = interaction.options.getString('classe');
    const data = await getClassDataByIndex(classe);

    const embed = new EmbedBuilder()
      .setTitle(`${data.name}`)
      .setDescription(`Informações da classe **${data.name}**`)
      .setColor(0x5865F2)
      .addFields(
        { name: 'Dado de Vida', value: `d${data.hit_die}`, inline: true },
        { name: 'Salvaguardas', value: data.saving_throws.map(st => st.name).join(', '), inline: true },
        { name: 'Proficiências', value: data.proficiencies.map(p => p.name).join(', ') || 'Nenhuma', inline: false },
        { name: 'Subclasses', value: data.subclasses.map(sc => sc.name).join(', ') || 'Nenhuma', inline: false },
      );

    // Se a classe tiver magia
    if (data.spellcasting) {
      embed.addFields({
        name: 'Conjuração',
        value: `Habilidade de conjuração: **${data.spellcasting.spellcasting_ability.name}** (nível ${data.spellcasting.level}+).`,
        inline: false,
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
};
