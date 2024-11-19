const TextFieldStyle = {
    borderRadius: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    '& .MuiInputBase-root': {
        color: 'white',
    },
    '& .MuiFormLabel-root': {
        color: 'white',
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: 'lightblue',
    },
    '& .MuiFilledInput-underline': {
        borderBottom: 'hidden',
    },
    '& .MuiFilledInput-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 'inherit',
        overflow: 'hidden',
    },
};

export default TextFieldStyle;