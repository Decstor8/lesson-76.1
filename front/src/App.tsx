import React, { useState, useEffect } from 'react';

import {Messages} from "./types";

const App: React.FC = () => {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [dateTime] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const url = `http://localhost:8000/messages`;

                const response = await fetch(url);
                const data = await response.json();
                setMessages(data)
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchMessages()
        const intervalMessage = setInterval(fetchMessages, 4000);
        return() => clearInterval(intervalMessage);
    },[dateTime]);

    const submit = async (author: string, message: string) => {
        try {
            const messagesData = {
              author,
              message,
            }

            await fetch('http://localhost:8000/messages', {
                method: 'POST',
                body: JSON.stringify(messagesData),
                headers:{ 
                  "Content-Type" : "application/json"
                }
            });
        } catch (error) {
            console.error('Ошибка с сообщением:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           
        </div>
    );
};

export default App;