import React, {useState} from 'react';
import {auth} from '../../config/firebase';

import {Box, TextField, Button} from "@material-ui/core";
import {CryptoState} from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({handleClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {setAlert} = CryptoState();

    const handleSubmit = async () => {
        if(password !== confirmPassword){
          setAlert({
            open: true,
            message: "password do not match",
            type: "error"
          })
          return; 
        }

        try{
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          console.log(result);

          setAlert({
            open: true,
            message: `Sign Up Successfull.. Welcome ${result.user.email}`,
            type: "success"
          });
          // return;
          handleClose();
        }catch(error){
          setAlert({
            open: true,
            message: error.message,
            type: "error"
          })
          return;
        }
    }



  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirmed Password"
        value={confirmPassword}
        fullWidth
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
          Sign Up
      </Button>
    </Box>
  );
}

export default SignUp