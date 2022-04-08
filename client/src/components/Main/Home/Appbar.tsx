import { useContext } from 'react'
import './Appbar.css'

// MUI components
import {
    Box,
    AppBar,
    Toolbar,
    Typography
} from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

// context
import { DataContext } from '../../../context/DataContext'


const Appbar = () => {
    const {setMessageReciver} = useContext(DataContext)
    const goHome = ():void=>{
        setMessageReciver(null)
    }
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar  position="static" sx={{backgroundColor:'#fff'}}>
                    <Toolbar sx={{justifyContent:'space-between'}}>
                        <Box sx={{display:'flex', cursor:'pointer'}} onClick={goHome}>
                        <img className='logo' src='bird.png' alt='logo'/>
                        <Typography sx={{color:'#000', fontSize:'1.8rem', marginLeft:'8px'}}>World Chat</Typography>
                        </Box>
                        <Box sx={{display:'flex', cursor:'pointer', alignItems:'center', marginRight:2}} onClick={goHome}>
                            <AccountCircleOutlinedIcon sx={{color:'#9eaba0', fontSize:'2rem', marginRight:1}}/>
                        <Typography sx={{color:'#000', fontSize:'1.2rem'}}>{user.name}</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Appbar