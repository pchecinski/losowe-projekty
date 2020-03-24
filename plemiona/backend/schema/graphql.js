const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLInt, GraphQLString } = require('graphql'); 
const Player = require('./player');

// GraphQL Output Types
const conquerType = new GraphQLObjectType({
    name: 'Conquer',
    fields: () =>  ({
        date: { type: GraphQLInt },
        new_player: { 
            type: playerType, 
            resolve: async (conquer) => {
                const player = await Player.findOne({id: conquer.new_id});
                if(player === null) {
                    return new Player({
                        id: conquer.new_id
                    });
                }
                else {
                    return player;
                }
            } 
        },
        old_player: { 
            type: playerType, 
            resolve: async (conquer) => {
                const player = await Player.findOne({id: conquer.old_id});
                if(player === null) {
                    return new Player({
                        id: conquer.old_id
                    });
                }
                else {
                    return player;
                }
            } 
        },
    })
});
 
const villageType = new GraphQLObjectType({
    name: 'Village',
    fields: {
        id:         { type: new GraphQLNonNull(GraphQLID)},
        name:       { type: GraphQLString },
        x:          { type: GraphQLInt },
        y:          { type: GraphQLInt },
        points:     { type: GraphQLInt },
        player_id:  { type: GraphQLInt },
        conquer:    { type: GraphQLList(conquerType) },
        units:      { type: GraphQLList(GraphQLInt) }
    }
});

const statsType = new GraphQLObjectType({
    name: 'Stats',
    fields: {
        graph_res_looted_breakdown: { type: GraphQLString },
        graph_enemy_units:          { type: GraphQLString },
        graph_units_diff:           { type: GraphQLString },
        graph_resource_spending:    { type: GraphQLString }
    }
});

const featuresType = new GraphQLObjectType({
    name: 'Features',
    fields: {
        premium:        { type: GraphQLBoolean },
        farm_assistant: { type: GraphQLBoolean }
    }
});

const playerType = new GraphQLObjectType({
    name: 'Player',
    fields: {
        id:         { type: GraphQLID },
        name:       { type: GraphQLString },
        tribe:      { type: GraphQLString },
        points:     { type: GraphQLInt },
        villages:   { type: GraphQLList(villageType) },
        support:    { type: GraphQLList(villageType) },
        features:   { type: featuresType },
        stats:      { type: statsType },
        date:       { type: GraphQLString }
    }
});

// GraphQL Input Types 
const villageInputType = new GraphQLInputObjectType({
    name: 'InputVillage',
    fields: {
        id:     { type: new GraphQLNonNull(GraphQLID) },
        units:  { type: GraphQLList(GraphQLInt) }
    }
});

const statsInputType = new GraphQLInputObjectType({
    name: 'InputStats',
    fields: {
        graph_res_looted_breakdown: { type: GraphQLString },
        graph_enemy_units:          { type: GraphQLString },
        graph_units_diff:           { type: GraphQLString },
        graph_resource_spending:    { type: GraphQLString }
    }
});

const featuresInputType = new GraphQLInputObjectType({
    name: 'InputFeatures',
    fields: {
        premium:        { type: GraphQLBoolean },
        farm_assistant: { type: GraphQLBoolean }
    }
});


const playerInputType = new GraphQLInputObjectType({
    name: 'InputPlayer',
    fields: {
        id:         { type: new GraphQLNonNull(GraphQLID) },
        villages:   { type: new GraphQLList(villageInputType) },
        support:    { type: new GraphQLList(villageInputType) },
        features:   { type: new GraphQLNonNull(featuresInputType) },
        stats:      { type: new GraphQLNonNull(statsInputType) }  
    }
})

// GraphQL Root Query & Mutation
const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        player: {
            type: playerType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (_, {id}) => {
                return Player.findOne({id: id});
            }
        },
        players: {
            type: new GraphQLList(playerType),
            resolve: () => {
                return Player.find();
            }
        }
    }
});

const rootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    fields: {
        add: {
            type: GraphQLInt,
            args: {
                player: {
                    type: playerInputType
                } 
            },
            resolve: async (_, {player}) => {
                const result = await Player.updateOne({ id: player.id }, player, { upsert: true, setDefaultsOnInsert: true});
                return result.ok;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});