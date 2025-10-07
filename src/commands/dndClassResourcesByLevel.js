import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getClassDataByIndex, getClassResourcesByLevel } from '../utils/dndApi.js';

export default {
  data: new SlashCommandBuilder()
    .setName('recursos-da-classe-por-nivel')
    .setDescription('Retorna os recursos de uma classe baseado no nível.')
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
    )
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription('Level desejado (1-20)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(20)),
  async execute(interaction) {
    const classe = interaction.options.getString('classe');
    const level = interaction.options.getInteger('level');
    const data = await getClassResourcesByLevel(classe, level);

    const embed = new EmbedBuilder()
      .setTitle(`🧭 ${data.level}º Nível - ${classe.charAt(0).toUpperCase() + classe.slice(1)}`)
      .setDescription(`Recursos e características da classe **${classe}** no nível **${data.level}**.`)
      .setColor(0x5865F2)
      .addFields(
        { name: '🎯 Bônus de Proficiência', value: `+${data.prof_bonus}`, inline: true },
        { name: '📈 Aumento de Atributo', value: `${data.ability_score_bonuses}`, inline: true },
      );

    // 🪄 Features
    if (data.features?.length) {
      embed.addFields({
        name: '🪄 Características',
        value: data.features.map(f => `• ${f.name}`).join('\n'),
        inline: false,
      });
    }

    // ✨ Spellcasting
    if (data.spellcasting) {
      const s = data.spellcasting;
      const spellSlots = Object.entries(s)
        .filter(([key]) => key.startsWith('spell_slots_level_') && s[key] > 0)
        .map(([key, value]) => {
          const levelNum = key.split('_').pop();
          return `Nível ${levelNum}: ${value}`;
        })
        .join('\n');

      embed.addFields({
        name: '✨ Conjuração',
        value:
          `• Truques conhecidos: ${s.cantrips_known ?? 0}\n` +
          `• Magias conhecidas: ${s.spells_known ?? 0}\n` +
          (spellSlots ? `• Espaços de magia:\n${spellSlots}` : '—'),
        inline: false,
      });
    }

    // 🧩 Class-Specific Details (like Bardic Inspiration, Ki points, etc.)
    if (data.class_specific && Object.keys(data.class_specific).length) {
      const specificText = Object.entries(data.class_specific)
        .map(([key, val]) => `• ${key.replace(/_/g, ' ')}: ${val}`)
        .join('\n');

      embed.addFields({
        name: '🎓 Recursos Específicos',
        value: specificText,
        inline: false,
      });
    }

    // 🏫 Subclass (if unlocked at that level)
    if (data.subclass) {
      embed.addFields({
        name: '🏫 Subclasse',
        value: data.subclass.name,
        inline: false,
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
};
