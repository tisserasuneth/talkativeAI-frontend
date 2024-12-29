import { Button, Drawer, Box, CircularProgress, Typography } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChatDrawer = ({ open, toggleDrawer, character }) => {

    const backgroundColor = '#18181b';
    const onHoverColor = '#333333';

    const PROTOCOL = process.env.PROTOCOL || 'http';
    const HOST = process.env.HOST || 'localhost:8080/api';

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
    }

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
                hideBackdrop={true}
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
