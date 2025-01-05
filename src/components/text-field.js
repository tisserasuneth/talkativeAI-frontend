import {
    TextField as MuiTextField,
} from '@mui/material';

const TextField = ({ data, executeFunction }) => {

    const { placeholder, userInput, style, multiline = false } = data;

    return (
        <MuiTextField
            placeholder={placeholder}
            multiline={multiline}
            {...(multiline && { rows: 15 })}
            value={userInput}
            onChange={(e) => executeFunction(e.target.value)}
            fullWidth
            sx={style}
            autoComplete='off'
        />
    );
};

export default TextField;
