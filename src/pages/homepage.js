import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, IconButton, CircularProgress, MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Carousel from '../components/carousel';
import WebGlCanvas from '../components/background-animation';
import TextField from '../components/text-field';
import { HomePageTextFieldStyle } from '../styles/text-field';
import PERSON_STATES from '../constants/person';

const PROTOCOL = process.env.PROTOCOL || 'http';
const HOST = process.env.HOST || 'localhost:8080/api';

const HomePage = ({ setCharacter }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tone, setTone] = useState('');
    const [creating, setCreating] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const fetchCharacterImage = async (character) => {
        try {
            const response = await axios.get(`${PROTOCOL}://${HOST}/person/${character._id}/image`);
            return response?.data?.image;
        } catch (error) {
            return null;
        }
    }

    const resetForm = () => {
        setName('');
        setDescription('');
        setTone('');
        setCreating(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);

        const DELAY = 3000;
        const TIMEOUT = 30000;
        const START_TIME = Date.now();
        let COMPLETED = false;

        let characterId = null;

        try {
            const response = await axios.post(`${PROTOCOL}://${HOST}/person`, {
                name,
                description,
                tone,
            });

            characterId = response?.data?.character;

            while (!COMPLETED && Date.now() - START_TIME < TIMEOUT) {
                const response = await axios.get(`${PROTOCOL}://${HOST}/person/${characterId}`);
                const character = response?.data;

                if (character?.metaData?.state === PERSON_STATES.COMPLETED) {
                    COMPLETED = true;
                    character.image = await fetchCharacterImage(character);

                    setCharacter(character);
                    navigate('/chat');
                } else if (character?.metaData?.state === PERSON_STATES.FAILED) {
                    COMPLETED = true;
                    setAlertMessage('Character creation failed. Please try again.');
                    setAlertOpen(true);
                }

                await new Promise((resolve) => setTimeout(resolve, DELAY));
            }

        } catch (error) {
            setAlertMessage('Character creation failed. Please try again.');
            setAlertOpen(true);
        } finally {
            setCreating(false);
            setTimeout(() => {  
                resetForm();
            }, 1500);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    useEffect(() => {
        if (!name) {
            setTone('');
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

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h6" sx={{ color: 'white', marginBottom: '0.5rem', fontSize: '15px' }}>
                            Name
                        </Typography>
                        <TextField
                            data={{ placeholder: 'Character name', userInput: name, style: HomePageTextFieldStyle }}
                            executeFunction={setName}
                        />
                    </motion.div>
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
                                    data={{ placeholder: `A friendly man that likes dance music and going to concerts, raves`, userInput: description, style: HomePageTextFieldStyle }}
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
                                    Tone
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                        displayEmpty
                                        sx={{
                                            ...HomePageTextFieldStyle,
                                            color: 'white',
                                            '.MuiSelect-icon': {
                                                color: '#424242',
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                                    color: 'black',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Tone
                                        </MenuItem>
                                        <MenuItem value="PROFESSIONAL">
                                            Professional - Clear, confident, and formal
                                        </MenuItem>
                                        <MenuItem value="FRIENDLY">
                                            Friendly - Warm, supportive, and approachable
                                        </MenuItem>
                                        <MenuItem value="CREATIVE">
                                            Creative - Expressive, imaginative, and unique
                                        </MenuItem>
                                        <MenuItem value="HUMOROUS">
                                            Humorous - Witty, playful, and lighthearted
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </motion.div>
                        )}

                        {(name && description && tone) && (
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
                                        disabled={!tone.trim()}
                                        sx={{
                                            color: tone.trim() ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        {creating ? (
                                            <CircularProgress size={24} sx={{ color: 'rgba(255, 255, 255, 0.87)' }} />
                                        ) : (
                                                <ArrowForwardIcon
                                                    sx={{
                                                        color: tone.trim() ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.5)',
                                                    }}
                                                />
                                        )}
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
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div >
    );
};

export default HomePage;
