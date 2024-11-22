import React from 'react';
import { motion } from 'framer-motion';
import { Box, Avatar, Typography } from '@mui/material';
import WebGlCanvas from '../background-animation';


const ChatProfile = ({ character }) => {

    return (
        <Box
            sx={{
                width: '12vw',
                height: '100vh',
                backgroundColor: 'transparent',
                borderLeft: '1px solid #333333',
                display: { sm: 'none', lg: 'flex' },
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
    );
}

export default ChatProfile;