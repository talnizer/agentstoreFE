import Echo from 'laravel-echo';
import axios from "axios";
import Pusher from 'pusher-js';
import { axiosRequestConfiguration } from "./AxiosConfig";
// Ensure TypeScript recognizes Pusher globally
declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<any>;
    }
}

let tokenString = localStorage.getItem('token');
let token = tokenString ? "Bearer " + JSON.parse(tokenString) : null;

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.REACT_APP_REVERB_APP_KEY,//"pzi8jxlb3bbfw0hwxghy",
    wsHost: process.env.REACT_APP_REVERB_HOST,
    // wsHost: "hamrahi.in",
    wsPort: process.env.REACT_APP_REVERB_PORT,
    wssPort: process.env.REACT_APP_REVERB_PORT,
    forceTLS: false,
    // encrypted: false,
    enabledTransports: ['ws', 'wss'],
    // enabledTransports: ['ws'],
    authorizer: (channel: any) => {
        return {
            authorize: (socketId: string, callback: (error: boolean, data: any) => void) => {
                axios
                    .post(axiosRequestConfiguration.baseURL + "/broadcasting/auth",
                        // "http://localhost:8002/api/broadcasting/auth", 
                        {
                            socket_id: socketId,
                            channel_name: channel.name,
                        },
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    )
                    .then((response) => {
                        callback(false, response.data);
                    })
                    .catch((error) => {
                        callback(true, error);
                    });
            },
        };
    },
});
export default window.Echo;