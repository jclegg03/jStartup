const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const goalCollection = db.collection('goal');
const requestCollection = db.collection('request')
const friendCollection = db.collection('friend')

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addGoal(goal) {
    await goalCollection.insertOne(goal)
}

async function updateGoal(goal) {
    await goalCollection.updateOne({ name: goal.name, id: goal.id }, { $set: goal })
}

async function deleteGoal(goal) {
    await goalCollection.deleteOne({ name: goal.name, id: goal.id })
}

async function addRequest(request) {
    await requestCollection.insertOne(request)
}

async function deleteRequest(request) {
    await requestCollection.deleteOne({ $or: [{name: request.name}, {userName: request.name}]})
}

async function addFriend(friend) {
    await friendCollection.insertOne(friend)
}

async function deleteFriend(friend) {
    await friendCollection.deleteOne({ $or: [{name: friend.name}, {userName: friend.name}]})
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addGoal,
    updateGoal,
    deleteGoal,
    addRequest,
    deleteRequest,
    addFriend,
    deleteFriend
}