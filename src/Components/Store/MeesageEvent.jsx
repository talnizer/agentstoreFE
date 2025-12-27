import React, { useEffect, useState } from 'react';
import Echo from '../../config/echo';
import AuthUser from '../Common/AuthUser';

function MeesageEvent(props) {
    const { user } = AuthUser();
    const [notifications, setNotifications] = useState([]);
    let userId = user?._id;

    const handleNotification = (data) => {
        // check
        props.sendConfirmationToParent(true, data);
    };

    useEffect(() => {
        const channel = window.Echo.private(`notif.${userId}`); // Or your specific channel
        //TODO: subscribe and listen events depending on user role
        channel.listen('.OrderPlacedEvent', (data) => {
            handleNotification({ isRead: false, data: data });
            setNotifications((prevNotifications) => [...prevNotifications, { isRead: false, data: data }]);
            // Process the received data here (e.g., update state, display message)
        })           // });
        channel.listen('.OrderPlacedMessageEvent', (data) => {
            console.log(data);
            let order = JSON.parse(data?.order);
            let obj = { message: data.message, order: order, userId: data.userId };
            // console.log(val);
            handleNotification({ isRead: false, data: obj });
            setNotifications((prevNotifications) => [...prevNotifications, { isRead: false, data: data }]);
            // Process the received data here (e.g., update state, display message)
        });
        return () => {
            Echo.leaveChannel(`notif.${userId}`);
        };
    }, [userId]); // Depend on userId or other relevant state

    return (
        <div>
        </div>
    );
}

export default MeesageEvent;