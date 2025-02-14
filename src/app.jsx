import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-secondary text-light">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="goals.html">Your goals</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="friends.html">Friends</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="achievements.html">Achievements</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main>App here</main>

        <footer>
            <p>
                Jay Clegg
                <a href="https://github.com/jclegg03/jStartup">Github</a>
            </p>
        </footer>
    </div>
  );
}