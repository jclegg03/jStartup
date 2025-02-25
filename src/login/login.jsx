import React from 'react';
import './login.css'

export function Login(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState('')
    
    async function loginUser()
    {
        localStorage.setItem('userName', userName)
        props.onLogin(userName)
    }

    async function createUser()
    {
        localStorage.setItem('userName', userName)
        props.onLogin(userName)
    }

    return (
    <main className="login-main container-fluid bg-dark text-center">
        <div>
            <h1>Login</h1>
            <div>
                <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="your.email@mail.com"/>
            </div>
            <div>
                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <button className="btn btn-primary" id="login" onClick={() => loginUser()} disabled={!userName || !password}>
                Login
            </button>
            <button className="btn btn-secondary" id="create" onClick={() => createUser()} disabled={!userName || !password}>
                Create Account
            </button>
        </div>
    </main>
  );
}