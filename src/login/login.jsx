import React from 'react';
import './login.css'

export function Login(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState('')
    
    return (
    <main className="login-main container-fluid bg-dark text-center">
        <div>
            <h1>Login</h1>
            <form action="goals.html">
                <div>
                    <input className="form-control" type="text" placeholder="Username"/>
                </div>
                <div>
                    <input className="form-control" type="password" placeholder="Password"/>
                </div>
                <button className="btn btn-primary" id="login" type="submit" disabled={!userName || !password}>Login</button>
                <button className="btn btn-secondary" id="create" type="submit" disabled={!userName || !password}>Create Account</button>
            </form>
        </div>
    </main>
  );
}