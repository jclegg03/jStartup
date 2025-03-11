import React from "react"

export function Notification()
{
    return(
        <div id="notifications">
                <div className="notification">
                    <span  className="message">Sally earned the 7 days strong achievement</span>
                    <span className="time">4h ago</span>
                </div>
                <div className="notification">
                    <span  className="message">Bob earned the Double down achievement</span>
                    <span className="time">2s ago</span>
                </div>
            </div>
    )
}