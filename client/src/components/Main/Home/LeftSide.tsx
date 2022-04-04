import { useContext } from 'react'
import randomColor from 'randomcolor'

// context
import { DataContext } from '../../../context/DataContext'

// interfaces
import { userInfoType } from '../../../context/DataContext'

// MUI components
import { Box, Avatar, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'



const LeftSide = ()=>{
    const useStyles = makeStyles({
        wraper:{
            borderRight:'1px solid #000',
            height:'90vh',
            marginTop:6,
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
    return(
        <>
        <Box className={classes.wraper}>
            {
                userData.map((ele:userInfoType, index) => {
                    var colorcode = randomColor(
                        {
                            luminosity: 'light',
                            hue: 'green'
                         }
                    )
                    return (
                        <Box key={index} onClick={():void => onUSerClick(ele)}>
                        <Box className={classes.userBox}>
                            <Avatar sx={{bgcolor:colorcode}}>
                                <Typography className={classes.avatarFont}>
                                {ele.name.charAt(0)}
                                </Typography>
                            </Avatar>
                            <Typography sx={{color:'#000', marginLeft:5, marginBottom:2}}>{ele.name}</Typography>
                        </Box>
                        <Divider sx={{borderColor:'#776868'}} variant='inset'/>
                        </Box>
                    )
                })
            }
        </Box>
        </>
    )
}

export default LeftSide