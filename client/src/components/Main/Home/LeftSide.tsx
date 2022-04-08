import { useContext } from 'react'
import randomColor from 'randomcolor'

// context
import { DataContext } from '../../../context/DataContext'

// interfaces
import { userInfoType } from '../../../context/DataContext'

// MUI components
import { Box, Avatar, Typography, Divider, useMediaQuery, CircularProgress  } from '@mui/material'
import { makeStyles } from '@mui/styles'


// components
import NoActiveUser from './LeftSide/NoActiveUser'


const LeftSide = ()=>{
    const matches:boolean = useMediaQuery('(min-width:600px)')
    const useStyles = makeStyles({
        wraper:{
            borderRight:'1px solid #000',
            height: matches?'91vh':'100vh',
            overflowY:'scroll',
            '&::-webkit-scrollbar':{
               display:'none'
            },
            padding:'0 4px',
            background:'#e7eee9'
        },
        userBox:{
            height:60,
            display:'flex',
            alignItems:'center',
            padding:'0 3px',
            backgroundColor:'#e7eee9'
        },
        avatarFont:{
            fontSize:'1.2rem !important',
            color:'#000',
            fontWeight:'bold !important'
        }
    })
    const classes = useStyles()


    const {userData, setMessageReciver} = useContext(DataContext)
    const onUSerClick = (user:userInfoType):void => {
        setMessageReciver(user)
    }
    const user = JSON.parse(localStorage.getItem('user'))
    return(
        <>
        <Box className={classes.wraper}>
            {userData.length === 0 && <CircularProgress sx={{margin:'50px 180px'}} />}
            {userData.length === 1 && <NoActiveUser/>}
            {
                userData.map((ele:userInfoType, index) => {
                    var colorcode = randomColor(
                        {
                            luminosity: 'light',
                            hue: 'green'
                         }
                    )
                    if(ele.id !== user.id){
                        return (
                            <Box key={index} onClick={():void => onUSerClick(ele)}>
                            <Box className={classes.userBox}>
                                <Avatar sx={{bgcolor:colorcode, border:'1px solid #000'}}>
                                    <Typography className={classes.avatarFont}>
                                    {ele.name.charAt(0)}
                                    </Typography>
                                </Avatar>
                                <Typography sx={{color:'#000', marginLeft:5, marginBottom:2}}>{ele.name}</Typography>
                            </Box>
                            <Divider sx={{borderColor:'#776868'}} variant='inset'/>
                            </Box>
                        )
                    }
                })
            }
        </Box>
        </>
    )
}

export default LeftSide