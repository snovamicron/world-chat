import randomColor from 'randomcolor'

// MUI components
import { Box, Avatar, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'

// dev needs
import { arr } from '../../../dev_needs/constant'

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
            fontSize:'1.3rem !important',
            color:'#000',
            fontWeight:'bold !important'
        }
    })
    const classes = useStyles()
    return(
        <>
        <Box className={classes.wraper}>
            {
                arr.map((ele, index) => {
                    var colorcode = randomColor(
                        {
                            luminosity: 'light',
                            hue: 'green'
                         }
                    )
                    return (
                        <>
                        <Box className={classes.userBox} key={index}>
                            <Avatar sx={{bgcolor:colorcode}}>
                                <Typography className={classes.avatarFont}>
                                {ele.name.charAt(0)}
                                </Typography>
                            </Avatar>
                        </Box>
                        <Divider variant='inset'/>
                        </>
                    )
                })
            }
        </Box>
        </>
    )
}

export default LeftSide