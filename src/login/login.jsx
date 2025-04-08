import React from 'react';
import './login.css'
import { Auth } from './auth'
import { Deauth } from './deauth';

export function Login(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState('')

    async function loginUser() {
        loginOrCreateUser('/api/auth/login')
    }

    async function createUser() {
        loginOrCreateUser('/api/auth/create')
    }

    async function loginOrCreateUser(endpoint)
    {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
            props.setAuth(true)
          } else {
            const body = await response.json();
            alert(`Error: ${body.msg}`);
          }
    }

    async function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .finally(() => {
                localStorage.removeItem('userName')
                props.setAuth(false)
            })
    }

    function auth() {
        if (props.authenticated) return <Deauth
            userName={userName}
            logout={() => logout()}
        />
        return <Auth
            userName={userName}
            password={password}
            loginUser={() => loginUser()}
            createUser={() => createUser()}
            setUserName={(userName) => setUserName(userName)}
            setPassword={(password) => setPassword(password)}
        />
    }

    return (
        <main className="login-main container-fluid bg-dark text-center">
            {auth()}
        </main>
    );
}