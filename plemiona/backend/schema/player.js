require('moment/locale/pl');
const moment = require('moment');

const { Schema, model } = require('mongoose');
const { CronJob } = require('cron');

const getVillages = require('../data/Villages');
const getTribes = require('../data/Tribes')
const getPlayers = require('../data/Players');

let Villages = null, Tribes = null, Players = null;

new CronJob({
    cronTime: '0 */20 * * * *',
    onTick: async () => {
        [villages, tribes, players] = await Promise.all([getVillages(), getTribes(), getPlayers()]);
        
        Villages = villages.data;
        Tribes = tribes.data;
        Players = players.data;

        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]: Data updated (Villages: ${villages.count}, Tribes: ${tribes.count}, Players: ${players.count})`)
    },
    start: true,
    runOnInit: true
});

// MongoDB Data Schema
var villageSchema = new Schema({
    id: Number,
    units: [Number]
});
villageSchema.virtual('name').get(function() {
    return Villages[this.id].name;
});
villageSchema.virtual('x').get(function() {
    return Villages[this.id].x;
});
villageSchema.virtual('y').get(function() {
    return Villages[this.id].y;
});
villageSchema.virtual('points').get(function() {
    return Villages[this.id].points;
});
villageSchema.virtual('player_id').get(function() {
    return Villages[this.id].player_id;
});
villageSchema.virtual('conquer').get(function() {
    return Villages[this.id].conquer;
});

const playerSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    villages: [villageSchema],
    support: [villageSchema],
    features: {
        premium: { type: Boolean, default: false },
        farm_assistant: { type: Boolean, default: false }
    },
    stats: {
        graph_res_looted_breakdown: { type: String, default: "" },
        graph_enemy_units: { type: String, default: "" },
        graph_units_diff: { type: String, default: "" },
        graph_resource_spending: { type: String, default: "" }
    },
    date: { type: Date, default: Date.now }
});

playerSchema.virtual('name').get(function() {
    return Players[this.id] !== undefined ? Players[this.id].name : '';
});
playerSchema.virtual('tribe').get(function() {
    return Players[this.id] !== undefined ? Tribes[Players[this.id].tribe_id].tag : '';
});
playerSchema.virtual('points').get(function() {
    return Players[this.id] !== undefined ? Players[this.id].points : 0;
});


module.exports = model('Player', playerSchema);
