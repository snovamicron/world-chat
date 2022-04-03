import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

const PORT = process.env.PORT || 4000
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:'localhost'
    }
})
app.use(cors())



interface userInfo{
    id:string,
    name:string,
    socketId:any
}
class userDataBase{
    userArray:userInfo[] = []

    saveTheNewUser (user:userInfo):void{
        !this.userArray.some((ele) => ele.id === user.id) && this.userArray.push(user)
    }

    activeUser (id:any):boolean{
        return this.userArray.some((ele)=> ele.id === id)
    }

    disconnectUser (id:string):void{
        this.userArray.some((ele) => ele.id === id ) && this.userArray.splice(this.userArray.findIndex((ele)=> ele.id === id), 1)
    }

}

const database = new userDataBase()

io.on('connection',(socket)=>{

    // initial listener
    socket.on('requestToJoinTheChat', ({ name, id })=>{
        console.log(`${name} join the chat`)
        socket.to(socket.id).emit('allUserData', database.userArray)
        socket.broadcast.emit('newUSerJoinTheChat', name )
        database.saveTheNewUser({
            id,
            name,
            socketId:socket.id
        })
    })

    //massage sending
    socket.on('sendMessage' ,({ senderId, reciverSocketId, message })=>{
        if(database.activeUser(reciverSocketId)){
            socket.to(reciverSocketId).emit('reciveMessage', {message, senderId})
        }   
    })

    // disconnect user from the chat
    socket.on('endTheChat', ({ name, userId })=>{
        socket.broadcast.emit('anyUserLeftTheChat', name)
        database.disconnectUser(userId)
        console.log(`${name} left the chat`)
    })

})


httpServer.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})