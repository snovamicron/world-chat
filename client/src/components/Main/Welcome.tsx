import './Welcome.css'

// MUI components
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const Welcome = ()=>{
    const useStyles = makeStyles({
        wraper : {
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            border:'1px solid #000',
            width:'100vw',
            height:'100vh',
            flexDirection:'column'
        }
    })

    const classes = useStyles()
    return(
        <>
        <Box className={classes.wraper}>
            <img className='bird' src='bird.png' alt='logo'/>
            <p className='welcomeNote'>Welcom to world chat</p>
        </Box>
        </>
    )
}

export default Welcome