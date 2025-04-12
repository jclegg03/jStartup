const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
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

function getGoals(user) {
    const cursor = goalCollection.find({ name: user})
    return cursor.toArray()
}

async function addGoal(goal) {
    await goalCollection.insertOne(goal)
}

async function deleteGoal(goal) {
    await goalCollection.deleteOne({ name: goal.user, id: goal.id })
}

function getRequests(user) {
    return requestCollection.find({ name: user}).toArray()
}

async function addRequest(request) {
    await requestCollection.insertOne(request)
}

async function deleteRequest(request) {
    await requestCollection.deleteOne({ $or: [{name: request.user}, {userName: request.user}], id: request.id})
}

function getFriends(user) {
    return friendCollection.find({ $or: [{name: user}, {userName: user}]}).toArray()
}

async function addFriend(friend) {
    await friendCollection.insertOne(friend)
}

async function deleteFriend(friend) {
    await friendCollection.deleteOne({ $or: [{name: friend.user}, {userName: friend.user}], id: friend.id})
}

module.exports = {
    getUser,
    getUserByToken,
    getGoals,
    addUser,
    updateUser,
    addGoal,
    deleteGoal,
    getRequests,
    addRequest,
    deleteRequest,
    getFriends,
    addFriend,
    deleteFriend
}