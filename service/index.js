const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js')

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

//makes sure the response only contains goals for that person.
async function validGoals(user) {
    let goals = await DB.getGoals(user.email)
    return goals
}

//does the actual deleting of a goal
async function deleteGoal(body) {
    await DB.deleteGoal(body)
}

// GetGoals
apiRouter.get('/goals', verifyAuth, (req, res) => {
    validGoals(req.user)
        .then(goals => res.send(goals))
});

// UpdateGoal
apiRouter.put('/goal', verifyAuth, async(req, res) => {
    await DB.updateGoal(req.body)
    validGoals(req.user)
        .then((goals) => res.send(goals))
})

// SubmitGoal
apiRouter.post('/goal', verifyAuth, async (req, res) => {
    await DB.addGoal(req.body)
    validGoals(req.user)
        .then((goals) => res.send(goals))
});

// DeleteGoal
apiRouter.delete('/goal', verifyAuth, async (req, res) => {
    await deleteGoal(req.body);
    validGoals(req.user)
        .then(goals => res.send(goals))
});

//does the actual deleting of a friend
async function deleteFriend(body) {
    await DB.deleteFriend(body)
}

//makes sure the response only contains friends for that person.
function validFriends(user) {
    return DB.getFriends(user.email)
}

async function getFriendGoals(user, friendName) {
    const email = user.email;
    let friends = await validFriends(user)
    let isFriends = false
    for (let i = 0; i < friends.length; i++) {
        if ((friends[i].name == email && friends[i].userName == friendName) ||
            (friends[i].name == friendName && friends[i].userName == email)) {
            isFriends = true
            break
        }
    }

    if (isFriends) {
        let goals = await DB.getGoals(friendName);
        return goals
    }
    else return []
}

// GetFriendsGoals
apiRouter.get('/friend/goals', verifyAuth, (req, res) => {
    getFriendGoals(req.user, req.query.friend)
        .then(goals => res.send(goals))
});

// GetFriends
apiRouter.get('/friends', verifyAuth, (req, res) => {
    validFriends(req.user)
        .then(friends => res.send(friends))
});

// SubmitFriend
apiRouter.post('/friend', verifyAuth, async (req, res) => {
    await DB.addFriend(req.body)
    validFriends(req.user)
        .then(friends => res.send(friends))
});

// DeleteFriend
apiRouter.delete('/friend', verifyAuth, async (req, res) => {
    await deleteFriend(req.body);
    validFriends(req.user)
        .then(friends => res.send(friends))
});

// Gets the list of requests for that user
async function getRequests(user) {
    const email = user.email;
    let requests = await DB.getRequests(email);
    return requests
}

//does the actual deleting of a friend request
async function deleteRequest(body) {
    await DB.deleteRequest(body)
}

// GetFriendRequests
apiRouter.get('/request', verifyAuth, (req, res) => {
    getRequests(req.user)
        .then(requests => res.send(requests))
});

// SubmitFriendRequest
apiRouter.post('/request', verifyAuth, (req, res) => {
    // friendRequests.push(req.body);
    DB.addRequest(req.body)
});

// DeleteFriendRequest
apiRouter.delete('/request', verifyAuth, async (req, res) => {
    await deleteRequest(req.body)
    getRequests(req.user)
        .then(requests => res.send(requests))
    });

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user)

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService)