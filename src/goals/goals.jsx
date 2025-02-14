import React from 'react';
import './goals.css'

export function Goals() {
  return (
    <main className="goals-main container-fluid bg-dark text-center">
            <h1 id="name">[Name]'s goals</h1>
            <p>
                <span className="goal">Read the BOM daily</span>
                <span className="streak">(2 day streak!)</span>
                <button className="reset btn btn-primary">1 hour remaining</button>
            </p>
            <p>
                <span className="goal">Go on a date weekly</span>
                <span className="streak">(7 week streak!)</span>
                <button className="reset btn btn-primary" disabled>1 day 7 hours until reset</button>
            </p>
            <form id="add-goal" action="goals.html">
                <div>
                    <button className="btn btn-primary" type="submit">➕</button>
                    <input type="text" placeholder="New Goal"/>
                    <select>
                        <option>Daily</option>
                        <option>Weekly</option>
                    </select>
                </div>
            </form>
            <div id="achievement">
                <h4>New Achievement</h4>
                <div>
                    <img id="achievement-image" src="images/Handshake.jpg"/>
                    Friendly
                    <button id="x-button" className="btn btn-primary">❌</button>
                </div>
                <p>Add a friend</p>
            </div>
        </main>
  );
}