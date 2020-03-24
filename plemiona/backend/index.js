// Imports
const fetch = require('node-fetch');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors());

// Data Schema
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    villages: [
        {
            id: Number,
            units: [Number]
        }
    ],
    support: [
        {
            id: Number,
            units: [Number]
        }
    ],
    premium: [
        {
            date: String,
            transaction: String,
            change: Number,
            newBalance: Number,
            notes: String
        }
    ],
    stats: {
        graph_res_looted_breakdown: String,
        graph_enemy_units: String,
        graph_units_diff: String,
        graph_resource_spending: String
    },
    date: { type: Date, default: Date.now }
});
const Player = mongoose.model('Player', playerSchema);

// POST
app.post('/', (req, res, next) => {
    Player.updateOne({ name: req.body.name }, req.body, {upsert: true, setDefaultsOnInsert: true})
    .then(result => {
        console.log(req.body);
        res.send("OK");
    })
    .catch(error => {
        res.send(error);
    });   
});

// GET
app.get('/', (req, res, next) => {
    Player.find().then(docs => {
        res.json(docs);
    })
});

// DB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster-aoztp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    app.listen(5000);
})
.catch(console.error);