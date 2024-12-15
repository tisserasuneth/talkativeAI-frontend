import {
    TextField as MuiTextField,
    InputAdornment,
    IconButton,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const SubmitField = ({ data, executeFunction }) => {

    const { placeholder, userInput, style } = data;

    return (
        <MuiTextField
            placeholder={placeholder}
            value={userInput}
            onChange={(e) => executeFunction(e.target.value)}
            fullWidth
            sx={style}
            autoComplete='off'
            slotProps={
                {
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    type='submit'
                                    disabled={!userInput.trim()}
                                    sx={{
                                        color: userInput.trim() ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.5)',
                                    }}
                                >
                                    <ArrowForwardIcon
                                        sx={{
                                            color: userInput.trim() ? 'rgba(255, 255, 255, 0.87)' : 'rgba(255, 255, 255, 0.5)',
                                        }}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                }}
        />
    );
};

export default SubmitField;