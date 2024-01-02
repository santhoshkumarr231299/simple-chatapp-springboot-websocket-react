import React, { useEffect, useState } from "react"
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function App() {
    const [messages, setMessages] = useState<any>([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [stompClient, setStompClient] = useState<any>(null);
    
    const socket = new SockJS("/realstar");
    const client = Stomp.over(socket);
    client.debug = () => {}; //to get rid of the console.log messages

    const onConnected = () => {
        client.subscribe("/topic/public", (message : any) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prev : any) => [receivedMessage, ...prev]);
        })
    };

    const onError = () => {
        console.log("something went wrong");
    }

    const onDisconnect = () => {
        console.log("Websocket Connection Error");
    }

    useEffect(() => {
        client.connect({}, onConnected, onError);
        setStompClient(client);
        return () => client.disconnect(onDisconnect);
    }, []);

    const handleNameChange = (e : any) => {
        setName(e.target.value);
    }

    const handleMessageChange = (e : any) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        if(message.trim() && stompClient) {
            const chatMessage = {
                sender : name,
                message : message,
            }
            stompClient.send("/app/chat", {},JSON.stringify(chatMessage));
            setMessage('');
        }

    }

    return <React.Fragment>
        <ul>
            {
                messages.map((message : any) => <li>
                    {message.sender + " ---- " + message.message}
                </li>)
            }
            Username : <input type="text" placeholder="name" onChange={handleNameChange} /><br />
            Message : <input type="text" id="message" placeholder="message" onChange={handleMessageChange} /><br />
            <button type="button" onClick={sendMessage}>Send Message</button>
        </ul>
    </React.Fragment>
}

export default App;