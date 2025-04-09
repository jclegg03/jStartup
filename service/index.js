const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let goals = [];
let friends = [];

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
function validGoals(user){
    let goalList = [];

    for (let i = 0; i < goals.length; i++) {
        let goal = goals[i];
        if(user.email == goal.name) {
            goalList.push(goal);
        }
    }
    return goalList;
}

//does the actual deleting of a goal
function deleteGoal(body) {
    for (let i = 0; i < goals.length; i++) {
        let goal = goals[i];
        let currentID = goal.id;
        let user = goal.name;
        if (currentID == body.id && user == body.user) {
            goals.splice(i, 1);
            break;
        }
    }
}

// GetGoals
apiRouter.get('/goals', verifyAuth, (req, res) => {
    res.send(validGoals(req.user));
});

// SubmitGoal
apiRouter.post('/goal', verifyAuth, (req, res) => {
    goals.push(req.body);
    res.send(validGoals(req.user));
});

// DeleteGoal
apiRouter.delete('/goal', verifyAuth, (req, res) => {
    deleteGoal(req.body);
    res.send(validGoals(req.user));
});

// GetFriends
apiRouter.get('/friends', verifyAuth, (_req, res) => {
    res.send(friends);
});

// SubmitFriend
apiRouter.post('/friend', verifyAuth, (req, res) => {
    friends.push(req.friend);
    res.send(friends);
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
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});