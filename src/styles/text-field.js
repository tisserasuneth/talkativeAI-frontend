
const muiStyles = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        borderRadius: 'inherit',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#424242',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#424242',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#424242',
    },
    '& .MuiFilledInput-root': {
        borderRadius: 'inherit',
        overflow: 'hidden',
    },
}


const HomePageTextFieldStyle = {
    borderRadius: '40px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    ...muiStyles,
};

const ChatPageTextFieldStyle = {
    backgroundColor: '#1e1e1e',
    borderRadius: '40px',
    ...muiStyles,
}

export { HomePageTextFieldStyle, ChatPageTextFieldStyle };