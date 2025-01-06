import { Button, Drawer, Box, CircularProgress, Typography } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import Avatar from '@mui/material/Avatar';

import LinkedIn from './assets/linkedin.png';
import Github from './assets/github.png';
import Profile from './assets/profile.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChatDrawer = ({ open, toggleDrawer, character, setCharacter }) => {

    const backgroundColor = '#18181b';
    const onHoverColor = '#333333';

    const PROTOCOL = process.env.PROTOCOL || 'http';
    const HOST = process.env.HOST || 'localhost:8080/api';

    const LINKEDIN_URL = 'https://www.linkedin.com/in/tisserasuneth';
    const GITHUB_URL = 'https://www.github.com/tisserasuneth';

    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const deleteCharacter = async () => {
        try {
            const response = await axios.delete(`${PROTOCOL}://${HOST}/person/${character._id}`);

            if (response?.status === 200) {
                setDeleting(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }

        } catch (error) {
            alert('Error encountered while deleting character');
        }
    };

    return (
        <>
            <Button
                onClick={toggleDrawer(true)}
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 1200,
                    borderRadius: '0',
                    backgroundColor,
                    color: 'white',
                    '&:hover': { backgroundColor: onHoverColor },
                }}
            >
                <PsychologyAltIcon sx={{
                    fontSize: '1.8rem',
                }} />
            </Button>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                transitionDuration={700}
                sx={{
                    position: 'absolute',
                    '& .MuiDrawer-paper': {
                        width: '15vw',
                        backgroundColor,
                        borderRight: '1px solid #333333',
                    },
                }}
                ModalProps={{
                    disableEnforceFocus: true,
                    disableScrollLock: true,
                }}
            >
                <Box
                    sx={{
                        paddingTop: '1rem',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: '1.2rem',
                            color: 'white',
                            fontWeight: '800',
                        }}
                    >
                        Connect With Me
                    </Typography>

                    <Avatar
                        src={Profile}
                        sx={{
                            width: '100px',
                            height: '100px',
                        }}
                    >
                    </Avatar>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                color: 'white',
                                fontWeight: '600',
                            }}
                        >
                            Suneth Tissera
                        </Typography>

                        <Box
                        sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1rem',
                        }}
                    >
                            <Box
                                component="img"
                                src={LinkedIn}
                                alt="LinkedIn"
                                sx={{
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                            }}
                                onClick={() => window.open(LINKEDIN_URL, '_blank')}
                            />

                            <Box
                                component="img"
                                src={Github}
                                alt="Github"
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => window.open(GITHUB_URL, '_blank')}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '15vw',
                        height: '100vh',
                        backgroundColor,
                        borderRight: '1px solid #333333',
                    }}
                    onClick={toggleDrawer(false)}
                >
                </Box>

                <Button>
                    {deleting ? (
                        <CircularProgress size={24} sx={{ color: 'rgba(255, 255, 255, 0.87)' }} />
                    ) : (
                        <DeleteForeverIcon
                            onClick={deleteCharacter}
                            sx={{
                                fontSize: '1.5rem',
                                color: '#d11a2a',
                            }} />
                    )}
                </Button>
            </Drawer>
        </>
    );
}

export default ChatDrawer;
