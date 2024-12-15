import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
    Container,
    Box,
    Typography,
    IconButton,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Carousel from '../components/carousel';
import WebGlCanvas from '../components/background-animation';
import TextField from '../components/text-field';

import { HomePageTextFieldStyle } from '../styles/text-field';

const HomePage = ({ setCharacter }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [personalize, setPersonalize] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setCharacter({ name, description, personalize });
        navigate('/chat');
    };

    useEffect(() => {
        if (!name) {
            setPersonalize('');
            setDescription('');
        }
    }, [name]);

    return (
        <div
            style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: -1,
                    width: '100%',
                    height: '100%',
                    opacity: 0.97,
                }}
            >
                <WebGlCanvas />
            </Box>
            <Container
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                }}
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '45%',
                        gap: 1,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1
                            style={{
                                color: 'white',
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Talkative.AI
                        </h1>
                    </motion.div>

                    <TextField
                        data={{ placeholder: 'Character name', userInput: name, style: HomePageTextFieldStyle }}
                        executeFunction={setName}
                    />

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {name && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="h6" sx={{ color: 'white', marginBottom: '0.5rem', fontSize: '15px' }}>
                                    Description
                                </Typography>
                                <TextField
                                    data={{ placeholder: `A Software Engineer. He likes to listen to many types of music... `, userInput: description, style: HomePageTextFieldStyle }}
                                    executeFunction={setDescription}
                                />
                            </motion.div>
                        )}

                        {(name && description) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >

                                <Typography variant="h6" sx={{ color: 'white', marginBottom: '0.5rem', fontSize: '15px' }}>
                                    Personalize
                                </Typography>
                                <TextField
                                    data={{ placeholder: 'Respond in the tone of David Attenborough narrating a nature documentary... ', userInput: personalize, style: HomePageTextFieldStyle }}
                                    executeFunction={setPersonalize}
                                />
                            </motion.div>
                        )}

                        {(name && description && personalize) && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <IconButton
                                        type='submit'
                                        disabled={!personalize.trim()}
                                        sx={{
                                            color: personalize.trim() ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        <ArrowForwardIcon
                                            sx={{
                                                color: personalize.trim() ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.5)',
                                            }}
                                        />
                                    </IconButton>
                                </motion.div>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '200px',
                    }}
                >
                    <Carousel />
                </Box>
            </Container>
        </div >
    );
};

export default HomePage;
