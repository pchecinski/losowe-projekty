const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const monoose = require('mongoose');

const Event = require('./models/event');

const app = express();

app.use(bodyParser.json());
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(event: EventInput): Event 
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find();
        },

        createEvent: (args) => {
            const event = new Event({
                title: args.event.title,
                description: args.event.description,
                price: +args.event.price,
                date: args.event.date   
            });

            return event.save()
            .then(result => {
                console.log(result);    
                return  { ...result._doc };            
            })
            .catch(error => {
                console.log(error)
            });
        }
    },
    graphiql: true
}));

monoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster-aoztp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
.then(() => { 
    app.listen(5000);
})
.catch((db_error) => {
    console.error(db_error);
})


/*
query GetEvents {
  events
}


*/