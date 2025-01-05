import { Button, Drawer, Box, CircularProgress, Typography } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import TextField from '../text-field';
import { ChatDrawerTextFieldStyle } from '../../styles/text-field';

import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChatDrawer = ({ open, toggleDrawer, character, setCharacter }) => {

    const backgroundColor = '#18181b';
    const onHoverColor = '#333333';

    const PROTOCOL = process.env.PROTOCOL || 'http';
    const HOST = process.env.HOST || 'localhost:8080/api';

    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [description, setDescription] = useState('');
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

    const updateCharacter = async () => {
        try {
            // const response = await axios.put(`${PROTOCOL}://${HOST}/person/${character._id}`, {
            //     summary: description,
            // });

            const response = {
                status: 200,
            }

            if (response?.status === 200) {
                setUpdating(true);
                setCharacter(character)
                setTimeout(() => {
                    setUpdating(false);
                }, 3000);
            }

        } catch (error) {
            alert('Error encountered while updating character');
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

                    <EmojiPeopleIcon
                        sx={{
                            marginTop: '1rem',
                            fontSize: '4rem',
                            color: 'white',
                        }}
                    />

                     <Typography
                            sx={{
                                fontSize: '1rem',
                                color: 'white',
                                fontWeight: '600',
                            }}
                        >
                            Update Your Character
                        </Typography>

                    <TextField 
                    data={{
                        placeholder: character.summary,
                        userInput: description,
                        style: ChatDrawerTextFieldStyle,
                        multiline: true,
                        }}
                    executeFunction={setDescription}
                    />

                    <IconButton
                        type='submit'
                        sx={{
                            color: 'rgba(255, 255, 255, 0.87)',
                        }}
                    >
                        {updating ? (
                            <CircularProgress size={24} sx={{ color: 'rgba(255, 255, 255, 0.87)' }} />
                        ) : (
                            <ArrowForwardIcon
                                onClick={updateCharacter}
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.87)',
                                }}
                            />
                        )}

                    </IconButton>
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
