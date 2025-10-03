const BASE_URL = "https://www.dnd5eapi.co/api/2014/ability-scores/cha";

export async function getModifier() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch modifier');
  return res.json();
}



/*

JOGADOR

- dados da classe por nome (https://5e-bits.github.io/docs/api/get-a-class-by-index)

- dados da subclasse por nome (https://5e-bits.github.io/docs/api/get-a-subclass-by-index)

- recursos da classe por nivel (https://5e-bits.github.io/docs/api/get-level-resource-for-a-class-and-level)

- dados da raca por nome (https://5e-bits.github.io/docs/api/get-a-race-by-index)

- dados de spells por nome (https://5e-bits.github.io/docs/api/get-a-spell-by-index)

- dados de uma lingua por nome (https://5e-bits.github.io/docs/api/get-a-language-by-index)

- dados de uma habilidade por nome (https://5e-bits.github.io/docs/api/get-a-skill-by-index)

- tipo de dano (https://5e-bits.github.io/docs/api/get-a-damage-type-by-index)

- escolas de magia (https://5e-bits.github.io/docs/api/get-a-magic-school-by-index)


MESTRE

- dados de uma condicao (https://5e-bits.github.io/docs/api/get-a-condition-by-index)

- dados do monstro por nome (https://5e-bits.github.io/docs/api/get-monster-by-index)

**/