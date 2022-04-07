import { useContext, useState } from "react"

// context
import { DataContext } from "../../../../context/DataContext"

// MUI components
import { Box, TextField, Avatar, Typography, InputAdornment } from "@mui/material"
import { makeStyles } from "@mui/styles"

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
            height: '100%',
            display:'flex'
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
    interface userObj{
        message:string,
        id:string
    }
    const { messageReciver } = useContext(DataContext)
    const user = JSON.parse(localStorage.getItem('user'))
    const [textMessage, setTextMessage] = useState<userObj>({message:'',id:user.id})
    const [textMessagesStore, setTextMessagesStore] = useState<Array<userObj>>([])
    const onTextChange = (e:any):void=>{
        setTextMessage({...textMessage, message: e.target.value})
    }
    const onSend = (e:any):void=>{
        if(e.key === 'Enter'){
            setTextMessagesStore([...textMessagesStore,textMessage])
        }
        
    }
    return (
        <>
            <Box className={classes.wraper}>
                <Box className={classes.navBar}>
                    <Avatar className={classes.avatar}>{messageReciver.name.charAt(0)}</Avatar>
                    <Typography sx={{ fontWeight: 'bold' }}>{messageReciver.name}</Typography>
                </Box>
                <Box className={classes.chatBox}>
                    {
                        textMessagesStore.map(ele => {
                            if(ele.id === user.id){
                                return(
                                    <Typography sx={{alignSelf:'flex-end'}}>{ele.message}</Typography>
                                    )
                                }else {
                                    return(
                                    <Typography sx={{alignSelf:'flex-start'}}>{ele.message}</Typography>
                                )
                            }
                        })
                    }
                </Box>
                <TextField
                    fullWidth
                    color="success"
                    focused className={classes.textForm}
                    label="TextField"
                    onKeyUp={(e)=> onSend(e)}
                    onChange={(e)=> onTextChange(e)}
                    value={textMessage.message}
                />
            </Box>
        </>
    )
}

export default MessageTemplate