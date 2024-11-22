import { Box, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const ChatAvatar = ({ character, messages }) => {
    return (
        <Box sx={{
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
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
                        width: messages.length > 0 ? '50px' : '100px',
                        height: messages.length > 0 ? '50px' : '100px',
                    }}>
                </Avatar>

                <Typography>
                    {character && character.name}
                </Typography>
            </motion.div>
        </Box>
    );
}

export default ChatAvatar;