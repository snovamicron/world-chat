import { useContext, useState, useEffect } from "react"

// context
import { DataContext } from "../../../../context/DataContext"

// MUI components
import { Box, TextField, Avatar, Typography, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"

const MessageTemplate = () => {
    const matches = useMediaQuery('(min-width:800px)')
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
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding:'0 20px',
            paddingTop:15,
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
        },
        chat:{  
            backgroundColor:'#b5ffca',
            padding:'5px 10px',
            borderRadius:15,
            maxWidth:matches?300:200,
            wordWrap:'break-word'
        }
    })
    const classes = useStyles()
    interface userObj {
        message: string,
        id: string,
        connectorId:string
    }
    const { messageReciver, socket, textMessagesStore, setTextMessagesStore } = useContext(DataContext)
    const user = JSON.parse(localStorage.getItem('user'))
    const [textMessage, setTextMessage] = useState<userObj>({ message: '', id: user.id, connectorId:messageReciver.id })
    const onTextChange = (e: any): void => {
        setTextMessage({ ...textMessage, message: e.target.value })
    }
    const onSend = (e: any): void => {
        if (e.key === 'Enter') {
            setTextMessagesStore([...textMessagesStore, textMessage])
            setTextMessage({ ...textMessage, message: '' })
            socket.current.emit('sendMessage', { id: user.id, socketId: messageReciver.socketId, message: textMessage.message })
        }

    }

    useEffect(()=>{
        setTextMessage({...textMessage, connectorId:messageReciver.id})
        // eslint-disable-next-line
    },[messageReciver])
    return (
        <>
            <Box className={classes.wraper}>
                <Box className={classes.navBar}>
                    <Avatar className={classes.avatar}>{messageReciver.name.charAt(0)}</Avatar>
                    <Typography sx={{ fontWeight: 'bold' }}>{messageReciver.name}</Typography>
                </Box>
                <Box className={classes.chatBox}>
                    {
                        textMessagesStore.map((ele, index) => {
                            if (ele.id === user.id && ele.connectorId === messageReciver.id){
                                return (
                                   <Box key={index} sx={{ alignSelf: 'flex-end' }} className={classes.chat}>
                                        <Typography sx={{fontWeight:'bold'}}>{ele.message}</Typography>
                                   </Box>
                                )
                            }
                            if (ele.id === messageReciver.id) {
                                return (
                                    <Box key={index} sx={{ alignSelf: 'flex-start' }} className={classes.chat}>
                                        <Typography sx={{fontWeight:'bold'}}>{ele.message}</Typography>
                                    </Box>
                                )
                            }
                            return null
                        })
                    }
                </Box>
                <TextField
                    fullWidth
                    color="success"
                    focused className={classes.textForm}
                    label="TextField"
                    onKeyUp={(e) => onSend(e)}
                    onChange={(e) => onTextChange(e)}
                    value={textMessage.message}
                />
            </Box>
        </>
    )
}

export default MessageTemplate