import React from "react";
import { Notification } from "./notification";

export function Notifications(props) {
    return (
        <ul id="notifications">
            <Notification
                msg={'Sally set a new goal'}
                time={'4h ago'}
            />
        </ul>
    )
}