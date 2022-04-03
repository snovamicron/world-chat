
// components
import Appbar from './Home/Appbar'
import LeftSide from './Home/LeftSide'
import RightSide from './Home/RightSide'

// MUI components
import { Grid, Box} from '@mui/material'

const Home = ()=>{
    return (
        <>
        <Appbar/>
        <Grid container>
            <Grid xs={3}>
                <LeftSide/>
            </Grid>
            <Grid xs={9}>
                <RightSide/>
            </Grid>
        </Grid>
        </>
    )
}

export default Home