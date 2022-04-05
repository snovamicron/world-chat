import { useContext } from 'react'

// context
import { DataContext } from '../../../context/DataContext'

// components
import MessageTemplate from './RightSide/MessageTemplate'

// MUI components
import { Box, Typography, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'

const RightSide = () => {
    const useStyles = makeStyles({
        wraper: {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        backgroundLogo: {
            height: '40%',
            opacity: 0.8
        },
        messageTitle: {
            fontSize: '1.5rem !important',
            marginBottom: '75px !important',
            marginTop: '10px !important'
        }
    })
    const classes = useStyles()
    const { messageReciver } = useContext(DataContext)
    const matches:boolean = useMediaQuery('(min-width:600px)')
    return (
        <>
            <Box sx={{ height: matches?'91vh':'100vh' }}>
                {
                    !messageReciver &&
                    <Box className={classes.wraper}>
                        <img className={classes.backgroundLogo} src='background.png' alt='network image' />
                        <Typography className={classes.messageTitle}>Let's sent a message to the connectors</Typography>
                    </Box>
                }
                {
                    messageReciver && <MessageTemplate/>
                }
            </Box>

        </>
    )
}

export default RightSide