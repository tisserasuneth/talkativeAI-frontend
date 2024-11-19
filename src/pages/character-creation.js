import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Carousel from '../components/carousel';
import WebGlCanvas from '../components/background-animation';

import TextFieldStyle from '../styles/text-field';

const CharacterCreation = ({ setCharacter }) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setCharacter({ name });
        navigate('/chat');
    };

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
                        gap: 2,
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
                        label='Character Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        rows={1}
                        fullWidth
                        sx={TextFieldStyle}
                        variant='filled'
                    />

                    <motion.div
                        className='homepage-button-container'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <Button
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: "rgba(0, 0, 0, 1)",
                                color: 'white',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                                borderRadius: '50px',
                            }}
                            type='submit'
                        >
                            Bring Alive
                        </Button>
                    </motion.div>
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

export default CharacterCreation;
