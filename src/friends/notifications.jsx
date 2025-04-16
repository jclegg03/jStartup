import React from "react";
import { Notification } from "./notification";
import { makeId } from './../goals/id'

export function Notifications(props) {
    const [notifications, setNotifications] = React.useState([])

    React.useImperativeHandle(props.ref, () => ({
        addNotification
    }))

    function addNotification(notification) {
        const element = <Notification
                            key={makeId()}
                            msg={notification}
                        />
        
        let list = []
        for(let i = 0; i < notifications.length; i++){
            list.push(notifications[i])
        }
        list.push(element)
        setNotifications(list)
    }
    return (
        <ul id="notifications">
            {notifications}
        </ul>
    )
}