import {
    Box,
    Typography,
} from '@mui/material';

import { ChatPageTextFieldStyle } from '../../styles/text-field';
import SubmitField from '../submit-field';

const ChatInput = ({ functions, userInput, loading }) => {

    const { handleSendMessage, setUserInput } = functions;

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: { xs: '95%', sm: '80%' },
                    marginTop: '20px',
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
                    <SubmitField
                        data={{
                            placeholder: 'Type a message...',
                            userInput,
                            style: ChatPageTextFieldStyle,
                        }}
                        executeFunction={setUserInput}
                    />
                </Box>
            </Box>
            <Typography
                sx={{
                    color: 'white',
                    marginTop: '5px',
                    fontSize: '0.7rem',
                }}
            >
                Talkative.AI is powered by OpenAI's GPT-4o model.
                Conversations aren’t stored or used to train models.
            </Typography>
        </>
    )
}

export default ChatInput;
