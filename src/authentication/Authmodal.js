import React from 'react'
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Button, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import GoogleButton from "react-google-button";
import  { CryptoState } from '../CryptoContext';
import { auth } from "../firebase";
import Login from './Login';
import Signup from './Signup';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    google:{
      padding :24,
      paddingTop:0,
      display:"flex",
      flexDirection:"column",
      textAlign:"center",
      gap:20,
      fontSize:20,
    }
  }));

  
const Authmodal = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const {setAlert}= CryptoState();
  
    const handleOpen = () => {
      setOpen(true);
    };
    const [value, setValue]= useState(0);
    const handleChange=(event, newValue)=>{
      setValue(newValue);
    }
  
    const handleClose = () => {
      setOpen(false);
    };

    const googleProvider= new GoogleAuthProvider();

    const signInWithGoogle=()=>{
     signInWithPopup(auth, googleProvider).then((res)=>{
     setAlert({
      open: true,
      message: `Sign Up Successful , Welcome ${res.user.email}`,
      type:"success"
      
     })
     handleClose();
     })
     .catch((error)=>{
      setAlert({
        open:true,
        message:error.message,
        type:"error"
      })
      return;
     })
    }
    
  return (
    <div>
       <Button
         variant= "contained"  style={{
          width: 85, height: 40, marginLeft: 15, backgroundColor:"#EEBC1D",
         }}

         onClick={handleOpen}
       >

        Login
       </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
            position ="static"
            style={{
              backgroundColor:"transparent",
              color:"white"
            }}
            >
              <Tabs
              value={value}
              onChange={handleChange}
                variant="fullWidth"
                style={{borderRadius:10}}
                >
                  <Tab label= "Login"/>
                  <Tab label= "Sign Up"/>
              </Tabs>
            </AppBar>
            {value===0 && <Login handleClose ={handleClose}/>}
            {value===1 && <Signup handleClose ={handleClose}/>}
            <Box className= {classes.google} >
              {/* <span> use another method</span> */}
             
              <GoogleButton
              style= {{width:"100%", outline:"none", marginTop:"15px"}}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Authmodal
