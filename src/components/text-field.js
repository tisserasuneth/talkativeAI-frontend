import {
    TextField as MuiTextField,
} from '@mui/material';

const TextField = ({ data, executeFunction }) => {

    const { placeholder, userInput, style } = data;

    return (
        <MuiTextField
            placeholder={placeholder}
            value={userInput}
            onChange={(e) => executeFunction(e.target.value)}
            fullWidth
            sx={style}
            autoComplete='off'
        />
    );
};

export default TextField;
