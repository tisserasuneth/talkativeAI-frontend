import { Button, Drawer, Box } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

const ChatDrawer = ({ open, toggleDrawer }) => {

    const backgroundColor = '#18181b';
    const onHoverColor = '#333333';

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
            </Drawer>
        </>
    );
}

export default ChatDrawer;
