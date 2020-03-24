const fetch = require('node-fetch');

module.exports = async () => {
    const players = {
        data: [],
        count: 0
    };
    const result = await fetch('https://pl140.plemiona.pl/map/player.txt');
    const data = await result.text();

    for(const row of data.split("\n")) {
        const [id, name, tribe_id, _, points] = row.replace(/\+/g, '%20').split(",");

        players.data[+id] = {
            name: decodeURIComponent(name),
            tribe_id: +tribe_id,
            points: +points
        }

        players.count++;
    }
    return players;
};