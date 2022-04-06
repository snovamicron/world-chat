import { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid'

// context
import { DataContext } from '../../../context/DataContext';
import { userInfoType } from '../../../context/DataContext';

// MUI components
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@mui/material'

type Props = {
  open: boolean,
  handleClickOpen: () => void,
  handleClose: () => void
}

const UserDialog = ({ open, handleClose }: Props) => {
  interface userInfoTypeForSend {
    name: string,
    id: string
  }
  const [userInfo, setUserInfo] = useState<userInfoTypeForSend>({ name: '', id: uuid() })
  const { socket, setUserData, setMessageSender } = useContext(DataContext)
  const onTextChange = (e: any): void => {
    setUserInfo({ ...userInfo, name: e.target.value })
  }
  const onHandleClick = (): void => {
    setMessageSender(userInfo)
      sessionStorage.setItem("reloading", "true")
      socket.current.emit('requestToJoinTheChat', userInfo)
      socket.current.on('allUserData', (userArray: userInfoType[]): void => {
        console.log(userArray)
        setUserData(userArray)
      })
    handleClose()
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>join the chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join as a connector in the chat please enter your name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Name"
            type="text"
            fullWidth
            variant="standard"
            value={userInfo.name}
            onChange={(e) => onTextChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClick}>Join</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserDialog