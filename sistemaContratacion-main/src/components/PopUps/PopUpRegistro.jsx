import * as React from 'react';
import useState from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}



export default function PopUpRegistro() {
  const [open, setOpen] = React.useState(false);

  const [otp, setOTP] = React.useState('');
  const [otpInput, setOTPInput] = React.useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleSendOTP = () => {
    // Generar un número aleatorio como OTP
    const otp_val = Math.floor(Math.random() * 10000);
    setOTP(otp_val)
   //console.log(email,otp);
    axios.post('http://localhost:8800/send-email', {email: localStorage.getItem('email'), otp: otp_val})
      .then((response) => {
        alert(response.data.message);
    })
      .catch((error) => {
        console.error(error);
        alert('Error sending email');
      });
  };

  const handleVerifyOTP = () => {
    if(otpInput == otp){
      alert("Correo electrónico verificado...");
    }
    else{
        alert("Código inválido");
    }
  };
  const handleClickOpenAndSendOTP = () => {
    handleClickOpen();
    handleSendOTP();
  }
  const handleCloseAndVerifyOTP = () => {
    handleClose();
    handleVerifyOTP();
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenAndSendOTP}>
        Aceptar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Datos enviados correctamente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese el codigo enviado a su correo
          </DialogContentText>
          <TextField id="filled-basic" label="Código" variant="filled" onChange={(e) => setOTPInput(e.target.value)}
          style={{ display: 'flex', justifyContent: 'center' }}
          />    
          </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAndVerifyOTP}>Validar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
