const fetch = require('node-fetch');

module.exports = async () => {
    const villages = {
        data: [],
        count: 0
    };

    const result_villages = await fetch('https://pl140.plemiona.pl/map/village.txt');
    const data_villages = await result_villages.text();

    for(const row of data_villages.split("\n")) {
        const [id, name, x, y, player_id, points] = row.replace(/\+/g, '%20').split(",");

        villages.data[+id] = {
            name: decodeURIComponent(name),
            x: +x,
            y: +y,
            player_id: +player_id,
            points: +points,
            conquer: []
        }

        villages.count++;
    }

    const result_conquer = await fetch('https://pl140.plemiona.pl/map/conquer.txt');
    const data_conquer = await result_conquer.text();

    for(const row of data_conquer.split("\n")) {
        const [id, date, new_id, old_id] = row.replace(/\+/g, '%20').split(",");
        
        villages.data[+id].conquer.push({
            date: +date,
            new_id: +new_id,
            old_id: +old_id
        })
    }
    return villages;
};