import React from 'react';
import './friends.css';
import { Notifications } from './notifications';

export function Friends(props) {
    return (
        <main className="friends-main container-fluid bg-dark text-center">
                <h1>Friends</h1>
                <div className="section">
                    <div className="friend">
                        <span>Sally</span>
                        <span>3 goals</span>
                        <span>(going strong!)</span>
                        <span><button className="btn btn-primary">▼</button></span>
                        <p className="friend-goal">
                            <span>Run daily</span>
                            <span className="streak">(2 day streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span>Bike weekly</span>
                            <span className="streak">(1 week streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span>Consume no added sugars</span>
                            <span className="streak">(1 day streak!)</span>
                        </p>
                    </div>
                    <div className="friend">
                            <span>Bob</span>
                            <span>2 goals</span>
                            <span>(needs encouragement)</span>
                            <span><button className="btn btn-primary">▼</button></span>
                        <p className="friend-goal">
                            <span>Meet someone new daily</span>
                            <span className="streak">(732 day streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span>Make home cooked meal daily</span>
                            <span className="streak">(3 hours remaining)</span>
                            <span className="encourage"><button className="btn btn-primary">Encourage</button></span>
                        </p>
                    </div>   
                </div>
                <div className="section">
                    <div className="section">
                        <h2>Add friends</h2>
                        <form action="friends.html">
                            <div id="add">
                                <button className="btn btn-primary" type="submit">➕</button>
                                <input className="form-control" type="text" placeholder="Enter Friend's username"/>
                            </div>
                        </form>
                    </div>
                    <div className="section">
                        <h3>Friend Requests</h3>
                        <p>
                            <span className="request-name">Jeff</span>
                            <span className="options">
                                <button className="btn btn-primary">✅</button>
                                <button className="btn btn-primary">❌</button>
                            </span>
                        </p>
                    </div>
                </div>
                <Notifications
                    notifications={props.notifications}
                    setNotifications={(notifications) => props.setNotifications(notifications)}
                />
            </main>
  );
}