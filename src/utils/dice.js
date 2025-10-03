function rollDice(quantity, sides) {
    const rolls = [];
    for (let i = 0; i < quantity; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
}

module.exports = { rollDice };
