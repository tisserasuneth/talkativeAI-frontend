import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const ChatMessages = ({ character, data }) => {
    const { messages, loading } = data;
    const messagesEndRef = useRef(null);
    const [dots, setDots] = useState('...');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (loading) {
            const dotInterval = setInterval(() => {
                setDots((prev) => {
                    if (prev.length === 3) {
                        return '.';
                    } else {
                        return prev + '.';
                    }
                });
            }, 300);
            return () => clearInterval(dotInterval);
        }
    }, [loading]);

    const aiBubbleColor = '#293241';
    const userBubbleColor = '#3d5a80';

    return (
        <Paper
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                width: { xs: '95%', sm: '80%' },
                height: { lg: '70vh', xl: '80vh' },
                overflowY: 'scroll',
                flexDirection: 'column',
            }}
        >
            {messages.map((msg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        display: 'flex',
                        justifyContent:
                            msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '75%',
                            backgroundColor: msg.sender === 'user' ? userBubbleColor : aiBubbleColor,
                            color: 'white',
                            padding: '10px 15px',
                            borderRadius: '15px',
                            borderTopRightRadius:
                                msg.sender === 'user' ? '0' : '15px',
                            borderTopLeftRadius:
                                msg.sender === 'user' ? '15px' : '0',
                            wordBreak: 'break-word',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                            marginBottom: '20px',
                        }}
                    >
                        {loading && index === (messages.length - 1) ? `${character.name} is typing${dots}` : msg.text}
                    </Box>
                </motion.div>
            ))}

            <div ref={messagesEndRef} />
        </Paper>
    );
}

export default ChatMessages;
