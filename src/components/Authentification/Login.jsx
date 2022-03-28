import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../config/firebase';
import { CryptoState } from '../../CryptoContext';
import {Box, Button, TextField} from "@material-ui/core";

const Login = ({handleClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();

    const {setAlert} = CryptoState();

    const handleSubmit = async () => {
      if(!email || !password){
        setAlert({
          open: true,
          message: "fill out all Fields",
          type: "error"
        });
        return;
      }

      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setAlert({
          open: true,
          message: `Sign In Successfull.. Welcom ${result.user.email}`,
          type: "success"
        })
        handleClose();
        return;
      } catch (error) {
        setAlert({
          open: true,
          message: error.messege,
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign In
      </Button>
    </Box>
  );
}

export default Login