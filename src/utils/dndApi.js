import axios from 'axios';

const BASE_URL = "https://www.dnd5eapi.co/api/2014";

async function fetch(ENDPOINT) {
  return await axios.get(BASE_URL + ENDPOINT, {
    headers: {
      Accept: 'application/json'
    }
  })
}

export async function getClassDataByIndex(className) {
  const res = await fetch(`/classes/${className}`)

  if (res.statusText != 'OK') throw new Error('Failed to fetch class data by index');

  return res.data
}

export async function getClassResourcesByLevel(className, level) {
  const res = await fetch(`/classes/${className}/levels/${level}`)

  if (res.statusText != 'OK') throw new Error('Failed to fetch class resources by level');

  return res.data
}

/*
******* TODO *******


JOGADOR

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