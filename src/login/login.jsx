import React from 'react';
import './login.css'

export function Login() {
  return (
    <main className="container-fluid bg-dark text-center">
        <div>
            <h1>Login</h1>
            <form action="goals.html">
                <div>
                    <input className="form-control" type="text" placeholder="Username"/>
                </div>
                <div>
                    <input className="form-control" type="password" placeholder="Password"/>
                </div>
                <button className="btn btn-primary" id="login" type="submit">Login</button>
                <button className="btn btn-secondary" id="create" type="submit">Create Account</button>
            </form>
        </div>
    </main>
  );
}