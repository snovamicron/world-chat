
// MUI components
import {
    Box, Typography
} from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { makeStyles } from '@mui/styles';


const NoActiveUser = ()=>{
    const useStyles = makeStyles({
        wraper:{
            height:'40%',
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center' ,
            flexDirection:'column'     
        },
        icon:{
            fontSize:'6.8rem !important',
            color:'#7b827a'
        }
    })

    const classes = useStyles()
    return (
        <>
        <Box className={classes.wraper}>
            <SentimentDissatisfiedIcon className={classes.icon}/>
            <Typography sx={{fontSize:'1.8rem'}}>Sorry No Active Connectors !</Typography>
        </Box>
        </>
    )
}

export default NoActiveUser 