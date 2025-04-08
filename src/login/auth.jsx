import React from 'react';

export function Auth(props)
{
    return (
        <div>
            <h1>Login</h1>
            <div>
                <input className="form-control" type="text" onChange={(e) => props.setUserName(e.target.value)} placeholder="your.email@mail.com"/>
            </div>
            <div>
                <input className="form-control" type="password" onChange={(e) => props.setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <button className="btn btn-primary" id="login" onClick={() => props.loginUser()} disabled={!props.userName || !props.password}>
                Login
            </button>
            <button className="btn btn-secondary" id="create" onClick={() => props.createUser()} disabled={!props.userName || !props.password}>
                Create Account
            </button>
        </div>
    )
}