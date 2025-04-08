import React from 'react';
import './login.css'
import { Auth } from './auth'

export function Login(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState('')
    
    async function loginUser()
    {
        localStorage.setItem('userName', userName)
        props.onLogin(userName)
        props.setAuth(true)
    }

    async function createUser()
    {
        localStorage.setItem('userName', userName)
        props.onLogin(userName)
    }

    function auth()
    {
        if(props.authenticated) return
        return <Auth
            userName = {userName}
            password = {password}
            loginUser = {() => loginUser()}
            createUser = {() => createUser()}
            setUserName = {(userName) => setUserName(userName)}
            setPassword = {(password) => setPassword(password)}
        />
    }

    return (
    <main className="login-main container-fluid bg-dark text-center">
        {auth()}
    </main>
  );
}