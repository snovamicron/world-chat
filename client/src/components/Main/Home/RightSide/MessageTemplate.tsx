import { useContext } from "react"

// context
import { DataContext } from "../../../../context/DataContext"

// MUI components
import { Box, TextField, Avatar, Typography, InputAdornment } from "@mui/material"
import { makeStyles } from "@mui/styles"
import AccountCircle from '@mui/icons-material/AccountCircle';

const MessageTemplate = () => {
    const useStyles = makeStyles({
        wraper: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column'
        },
        navBar: {
            height: '10%',
            backgroundColor: '#b5ffca',
            borderBottom: '1px solid #000',
            display: 'flex',
            alignItems: 'center'
        },
        chatBox: {
            height: '100%'
        },
        textForm: {
            margin: '0 !important',
            backgroundColor: '#e7eee9',
            '& > div > fieldset': {
                borderRadius: '0 !important',
                borderColor: '#000 !important',
                borderWidth: '1px !important',
                borderRight: 'none !important'
            },
            '& > div > input': {
                padding: '14px 16px !important',
                fontWeight: '600 !important',
            }
        },
        avatar: {
            margin: '0 10px',
            width: '50px !important',
            height: '50px !important',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#000 !important',
            border: '1px solid #000'
        }
    })
    const classes = useStyles()
    const { messageReciver } = useContext(DataContext)
    return (
        <>
            <Box className={classes.wraper}>
                <Box className={classes.navBar}>
                    <Avatar className={classes.avatar}>{messageReciver.name.charAt(0)}</Avatar>
                    <Typography sx={{ fontWeight: 'bold' }}>{messageReciver.name}</Typography>
                </Box>
                <Box className={classes.chatBox}>

                </Box>
                <TextField
                    fullWidth
                    color="success"
                    focused className={classes.textForm}
                    label="TextField"
                    onKeyUp={(e)=> console.log(e.key)}
                />
            </Box>
        </>
    )
}

export default MessageTemplate