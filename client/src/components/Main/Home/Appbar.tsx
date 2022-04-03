import './Appbar.css'

// MUI components
import {
    Box,
    AppBar,
    Toolbar,
    Typography
} from '@mui/material'


const Appbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar  position="static" sx={{backgroundColor:'#fff'}}>
                    <Toolbar>
                        <img className='logo' src='bird.png' alt='logo'/>
                        <Typography sx={{color:'#000', fontSize:'1.8rem', marginLeft:'8px'}}>World Chat</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Appbar