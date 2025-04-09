import React from "react"

export function Notification(props)
{
    return(
        <li className="notification">
            <span  className="message">{props.msg}</span>
            <span className="time">{props.time}</span>
        </li>
    )
}