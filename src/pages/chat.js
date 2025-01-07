import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ChatAvatar, ChatMessages, ChatInput, ChatDrawer, ChatProfile } from '../components/chat';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';

const Chat = ({ character, setCharacter }) => {
    console.log('Chat', character);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [socket, setSocket] = useState(null);

    const PROTOCOL = process.env.WSS_PROTOCOL || 'ws';
    const HOST = process.env.HOST || 'localhost:8080';

    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const socketAddress = useMemo(() => `${PROTOCOL}://${HOST}`, [PROTOCOL, HOST]);
    const socketConfig = useMemo(() => ({
        path: '/chat',
        query: {
            characterId: character?._id,
        },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 10,
    }), [character?._id]);

    useEffect(() => {
        if (!character) {
            navigate('/');
            return;
        }

        const newSocket = io(socketAddress, socketConfig);

        newSocket.on(Chat.EVENTS.SYSTEM_MESSAGE_CHUNK, handleSystemMessageChunk);
        newSocket.on(Chat.EVENTS.SYSTEM_MESSAGE_END, handleSystemMessageEnd);
        newSocket.on(Chat.EVENTS.ERROR, handleError);

        setSocket(newSocket);

        return () => {
            newSocket.off(Chat.EVENTS.SYSTEM_MESSAGE_CHUNK, handleSystemMessageChunk);
            newSocket.off(Chat.EVENTS.SYSTEM_MESSAGE_END, handleSystemMessageEnd);
            newSocket.off(Chat.EVENTS.ERROR, handleError);
            newSocket.disconnect();
        };
    }, [socketAddress, socketConfig, character, navigate]);

    const handleSystemMessageChunk = (chunk) => {
        setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            {
                ...prevMessages[prevMessages.length - 1],
                text: (prevMessages[prevMessages.length - 1]?.text || '') + chunk,
            },
        ]);
        setLoading(true);
    };

    const handleSystemMessageEnd = () => {
        setLoading(false);
    };

    const handleError = (error) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Error: ${error}`, sender: 'system' },
        ]);
        setLoading(false);
    };

    const handleSendMessage = () => {
        if (!userInput.trim() || !socket) return;

        const userMessage = { text: userInput, sender: 'user' };
        const loadingMessage = { text: '', sender: 'ai' };
        setMessages([...messages, userMessage, loadingMessage]);
        setUserInput('');
        setLoading(true);

        socket.emit(Chat.EVENTS.NEW_MESSAGE, {
            message: userInput,
        });
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
                <ChatInput
                    functions={{ handleSendMessage, setUserInput }}
                    userInput={userInput}
                    loading={loading}
                />
            </Box>
            <ChatProfile character={character} />
        </Box>
    );
};

Chat.EVENTS = {
    SYSTEM_MESSAGE_CHUNK: 'system_message_chunk',
    SYSTEM_MESSAGE_END: 'system_message_end',
    MESSAGE_END: 'message_end',
    DISCONNECT: 'disconnect',
    ERROR: 'error',
    NEW_MESSAGE: 'new_message',
};

export default Chat;
