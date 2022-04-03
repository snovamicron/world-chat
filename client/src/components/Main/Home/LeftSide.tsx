

// MUI components
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

// dev needs
import { arr } from '../../../dev_needs/constant'

const LeftSide = ()=>{
    const useStyles = makeStyles({
        wraper:{
            borderRight:'1px solid #000',
            height:'90vh',
            marginTop:8
        }
    })
    const classes = useStyles()
    return(
        <>
        <Box className={classes.wraper}>
            {
                arr.map((ele, index) => {
                    return (
                        <Box key={index}>{ele.name}</Box>
                    )
                })
            }
        </Box>
        </>
    )
}

export default LeftSide