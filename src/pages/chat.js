import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import {
    ChatAvatar,
    ChatMessages,
    ChatInput,
    ChatDrawer,
    ChatProfile
} from '../components/chat';

import { motion, AnimatePresence } from 'framer-motion';

const Chat = ({ character, setCharacter }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Redirect to homepage if no character is set
    useEffect(() => {
        if (!character) navigate('/');
    }, [character, navigate]);

    // Placeholder for receiving WebSocket messages
    const receiveMessage = (text) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text, sender: 'ai' },
        ]);
        setLoading(false);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        setMessages([...messages, { text: userInput, sender: 'user' }]);
        setUserInput('');
        setLoading(true);

        // Simulate WebSocket message after delay
        setTimeout(() => {
            receiveMessage(
                `Hello, my name is ${character.name}. How can I help you today?`
            );
        }, 1500);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                position: 'relative',
            }}
        >
            <ChatDrawer open={open} toggleDrawer={toggleDrawer} character={character} setCharacter={setCharacter} />

            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: '#18181b',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100%',
                    transition: 'margin-left 0.7s ease',
                    marginLeft: open ? '10vw' : '0vw',
                }}
            >
                <ChatAvatar character={character} messages={messages} />
                <AnimatePresence>
                    {messages.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 1 }}
                            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                        >
                            <ChatMessages character={character} data={{ messages, loading }} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <ChatInput functions={{ handleSendMessage, setUserInput }} userInput={userInput} loading={loading} />
            </Box>
            <ChatProfile character={character} />
        </Box>
    );

};

export default Chat;
