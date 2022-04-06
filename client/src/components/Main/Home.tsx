import { useContext, useState, useEffect } from 'react'

// context
import { DataContext } from '../../context/DataContext'
import { userInfoType } from '../../context/DataContext'

// components
import Appbar from './Home/Appbar'
import LeftSide from './Home/LeftSide'
import RightSide from './Home/RightSide'

// MUI components
import { Grid, useMediaQuery } from '@mui/material'


const Home = () => {
    const matches: boolean = useMediaQuery('(min-width:600px)')
    const { messageReciver, setUserData, socket } = useContext(DataContext)
    const [updatedUserData , setUpdatedUSerData] = useState<Array<userInfoType>>([])
    if(socket !== null){
        socket.current.on('allNewUserData',(userArray:userInfoType[])=>{
            setUpdatedUSerData(userArray)
        })
    }
    useEffect(()=>{
        setUserData(updatedUserData)
    },[updatedUserData])
    
    return (
        <>
            {
                matches &&
                <>
                <Appbar />
                <Grid container>
                    <Grid item sm={5} md={4} lg={3}>
                        <LeftSide />
                    </Grid>
                    <Grid item sm={7} md={8} lg={9}>
                        <RightSide />
                    </Grid>
                </Grid>
                </>
            }
            {
                !matches &&
               <>
                {!messageReciver && <Appbar />}
                <Grid container>
                    <Grid item xs={12}>
                        {
                            !messageReciver?<LeftSide />:<RightSide/>
                        }
                    </Grid>
                </Grid>
               </>
            }
        </>
    )
}

export default Home