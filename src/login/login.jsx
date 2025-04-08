import React from 'react';
import './login.css'
import { Auth } from './auth'
import { Deauth } from './deauth';

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

    async function logout()
    {
        localStorage.removeItem('userName')
        props.setAuth(false)
    }

    function auth()
    {
        if(props.authenticated) return <Deauth
            userName = {userName}
            logout = {() => logout()}
        />
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