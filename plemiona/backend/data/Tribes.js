const fetch = require('node-fetch');

module.exports = async () => {
    const tribes = {
        data: [],
        count: 0
    };
    const result = await fetch('https://pl140.plemiona.pl/map/ally.txt');
    const data = await result.text();

    for(const row of data.split("\n")) {
        const [id, name, tag] = row.replace(/\+/g, '%20').split(",");

        tribes.data[+id] = {
            name: decodeURIComponent(name),
            tag: decodeURIComponent(tag)
        }

        tribes.count++;
    }
    return tribes;
};