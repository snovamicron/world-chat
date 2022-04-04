
// MUI components
import { Box, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"

const MessageTemplate = ()=>{
    const useStyles = makeStyles({
        wraper:{
            display:'flex',
            height:'100%',
            flexDirection:'column'
        },
        navBar:{
            height:'8%',
            backgroundColor:'#000'
        },
        chatBox:{
            height:'100%'
        },
        textForm:{
            margin:'0 !important'
        }
    })
    const classes = useStyles()
    return (
        <>
            <Box className={classes.wraper}>
                <Box className={classes.navBar}></Box>
                <Box className={classes.chatBox}>
        
                </Box>
                <TextField className={classes.textForm} />
            </Box>
        </>
    )
}

export default MessageTemplate