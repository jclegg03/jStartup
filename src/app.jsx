import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Goals } from './goals/goals';
import { Friends } from './friends/friends';
import { Achievements } from './achievements/achievements';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || "Unidentified")

    return (
    <BrowserRouter>
        <div className="body bg-secondary text-light">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark">
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className='nav-link' to=''>Login</NavLink>
                        </li>
                        {userName !== 'Unidentified' && (
                            <li className="nav-item">
                                <NavLink className='nav-link' to='goals'>Your Goals</NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className='nav-link' to='friends'>Friends</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='achievements'>Achievements</NavLink>
                        </li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route
                    path='/' 
                    element=
                    {
                        <Login />
                    } 
                    exact
                />
                <Route path='/goals' element={<Goals />} />
                <Route path='/friends' element={<Friends />} />
                <Route path='/achievements' element={<Achievements />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <p>
                    Jay Clegg
                    <a href="https://github.com/jclegg03/jStartup">Github</a>
                </p>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }