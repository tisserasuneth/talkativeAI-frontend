import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SendIcon from '@mui/icons-material/Send';

import WebGlCanvas from '../components/background-animation';

const Chat = ({ character }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Temporary avatar for character
    if (character) {
        character.avatar = 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600';
        character.description = 'a flimsy person that loves enjoying the outdoors and the smaller things in life. Careful with finances but also not shy to spend. Always traveling. Loves cooking. Loves cookies.';
    }

    const [open, setOpen] = useState(false);

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
            }}
        >

            <Box sx={{ display: 'flex', minWidth: '100vw', maxWidth: '100vw' }}>

                <Button
                    onClick={toggleDrawer(true)}
                    sx={{
                        borderRadius: '0',
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                        '&:hover': { backgroundColor: '#333333' },
                    }}
                >
                    <PsychologyAltIcon sx={{
                        fontSize: '1.8rem',
                    }} />
                </Button>
                <Drawer
                    open={open}
                    hideBackdrop={true}
                    onClose={toggleDrawer(false)}
                    transitionDuration={700}
                    sx={{
                        backgroundColor: '#1e1e1e',
                        width: '0vw',
                    }}
                    ModalProps={{
                        disableEnforceFocus: true,
                        disableScrollLock: true,
                    }}
                >
                    <Box
                        sx={{
                            width: '15vw',
                            height: '100vh',
                            backgroundColor: '#1e1e1e',
                            borderRight: '1px solid #333333',
                        }}
                        onClick={toggleDrawer(false)}
                    >
                    </Box>
                </Drawer>


                {/* Main Content */}
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: '#1e1e1e',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '20px',
                        transition: 'margin-left 0.7s ease',
                        marginLeft: open ? '10vw' : '0vw',
                    }}
                >

                    <Box sx={{
                        color: 'white',
                        border: 'none',
                        backgroundColor: 'inherit',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <Avatar
                                src={character && character.avatar}
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                }}>
                            </Avatar>

                            <Typography>
                                {character && character.name}
                            </Typography>

                        </motion.div>

                    </Box>
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: 'transparent',
                            width: { xs: '95%', sm: '80%' },
                            height: { xs: '50vh', sm: '75vh' },
                            overflowY: 'scroll',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            marginTop: '5px',
                        }}
                    >
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        backgroundColor: msg.sender === 'user' ? '#0084FF' : '#1e1e1e',
                                        color: 'white',
                                        padding: '10px 15px',
                                        borderRadius: '15px',
                                        borderTopRightRadius:
                                            msg.sender === 'user' ? '0' : '15px',
                                        borderTopLeftRadius:
                                            msg.sender === 'user' ? '15px' : '0',
                                        wordBreak: 'break-word',
                                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                                    }}
                                >
                                    {msg.text}
                                </Box>
                            </motion.div>
                        ))}

                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        backgroundColor: '#424242',
                                        color: 'white',
                                        padding: '10px 15px',
                                        borderRadius: '15px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {character.name} is typing...
                                </Box>
                            </motion.div>
                        )}
                    </Paper>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: { xs: '95%', sm: '80%' },
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Type your message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                sx={{
                                    backgroundColor: '#1e1e1e',
                                    borderRadius: '40px',
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        borderRadius: 'inherit',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#424242',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#424242',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#424242',
                                    },
                                    '& .MuiFilledInput-root': {
                                        borderRadius: 'inherit',
                                        overflow: 'hidden',
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#0054FF',
                                    borderRadius: '50%',
                                    minWidth: '50px',
                                    minHeight: '50px',
                                    '&:hover': { backgroundColor: '#0084FF' },
                                }}
                            >
                                <SendIcon />
                            </Button>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            color: 'white',
                            marginTop: '10px',
                            fontSize: '0.8rem',
                        }}
                    >
                        Talkative.AI is powered by OpenAI's GPT-4o model.
                        Conversations aren’t stored or used to train models.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: '12vw',
                        height: '100vh',
                        backgroundColor: 'transparent',
                        borderLeft: '1px solid #333333',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: -1,
                            width: '100%',
                            height: '100%',
                            opacity: 0.97,
                        }}
                    >
                        <WebGlCanvas />
                    </Box>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Box
                            sx={{
                                width: '12vw',
                                height: '100vh',
                                backgroundColor: 'transparent',
                                borderLeft: '1px solid #333333',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '&:hover': {
                                    backgroundColor: '#000000',
                                    borderShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <Avatar
                                    src={character && character.avatar}
                                    sx={{
                                        width: '120px',
                                        height: '120px',
                                        marginBottom: '10px',
                                        border: '2px solid #070707',
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                                    }}
                                />
                                <h3 style={{ fontSize: '1.0rem', margin: '5px 0' }}>
                                    {character && character.name ? character.name : 'Unknown Character'}
                                </h3>
                                <p style={{ fontSize: '0.7rem', margin: '5px 0', color: '#bbbbbb' }}>
                                    Age: {character && character.age ? character.age : 'N/A'}
                                </p>
                                <p style={{ fontSize: '0.7rem', margin: '5px 0', color: '#bbbbbb' }}>
                                    {character && character.description ? character.description : 'No description available'}
                                </p>
                            </Box>
                        </Box>
                    </motion.div>
                    <Typography sx={{
                        color: 'white',
                        position: 'absolute',
                        bottom: '20px',
                        padding: '5px',
                        fontSize: '0.6rem',
                    }}>
                        <a
                            href="https://www.linkedin.com/in/tisserasuneth/"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Made with Love. Suneth Tissera
                        </a>
                    </Typography>
                </Box>
            </Box>
        </Box >
    );
};

export default Chat;
