import React from 'react';
import './achievements.css'

export function Achievements() {
  return (
    <main className="achievements-main container-fluid bg-dark text-center">
            <h1>Achievements</h1>
            <div className="achievement">
                <h3>Friendly</h3>
                <div className="data">
                    <img src="Handshake.jpg" height="50" width="50"/>
                    <span>Add a friend</span>
                </div>
            </div>
            <div className="achievement">
                <h3>7 days strong</h3>
                <div className="data">
                    <img src="7.png" height="50" width="50"/>
                    <span>Achieve a 7 day streak</span>
                </div>
            </div>
            <div className="achievement">
                <h3>Double down</h3>
                <div className="data">
                    <img src="2x.png" height="50" width="50"/>
                    <span>Have 2 active goals</span>
                </div>
            </div>
        </main>
  );
}