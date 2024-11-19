import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const Chat = ({ character }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!character) return navigate('/');

    const handleSendMessage = async () => {
        if (!userInput) return;
        setMessages([...messages, { text: userInput, sender: 'user' }]);
        setUserInput('');
        setLoading(true);


        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `Hello, my name is ${character.name}. How can I help you today?`, sender: 'ai' },
            ]);
            setLoading(false);
        }, 1000);
    };


    return (
        <div>
            <h1>Chat with {character.name}</h1>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <strong>{msg.sender === 'user' ? 'You: ' : 'AI: '}</strong>
                        {msg.text}
                    </div>
                ))}
                {loading && <div>AI is typing...</div>}
            </div>

            <TextField
                variant='outlined'
                fullWidth
                multiline
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} disabled={loading}>
                Send
            </button>

            <button onClick={() => navigate('/')}>Back to Character Creation</button>
        </div>
    );
};

export default Chat;
