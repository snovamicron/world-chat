import React, { ReactNode, createContext, useState } from "react";
import {arr} from '../dev_needs/constant'
import { io } from 'socket.io-client'

export interface userInfoType{
    name:string,
    id:string,
    socketId:any
}

interface contextType {
    userData:userInfoType[],
    setUserData:React.Dispatch<React.SetStateAction<userInfoType[]>>,
    messageReciver:userInfoType,
    setMessageReciver:React.Dispatch<React.SetStateAction<userInfoType>>,
    socket: any
}

export const DataContext = createContext<contextType | null>(null)

type Props = {
    children: ReactNode
}



export default function DataContextProvider ({children}:Props){
    const [userData, setUserData] = useState<Array<userInfoType>>([])
    const [messageReciver, setMessageReciver] = useState<userInfoType | null>(null)
    const socket = io('http://localhost:4000')
    return (
        <DataContext.Provider value={{userData, setUserData, messageReciver, setMessageReciver, socket}}>
            {
                children
            }
        </DataContext.Provider>
    )
}