// import React from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./Authentification/AuthModal";
import UserSidebar from "./Authentification/UserSidebar";

// ? styles imports
import {
  AppBar,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider
} from "@material-ui/core";

import { CryptoState } from "../CryptoContext";

// * assigning functions
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark"
  }
});


const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {currency, setCurrency, user} = CryptoState();

  console.log(currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              className={classes.title}
            >
              Weirdos Crypto Hunt
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                border: "1px solid gold",
                color: "gold",
              }}
              value={currency}
              onChange={(e) => (
                setCurrency(e.target.value)
              )}
             >
              <MenuItem style={{ color: "gold" }} value={"USD"}>
                USD
              </MenuItem>
              <MenuItem style={{ color: "gold" }} value={"NGN"}>
                NGN
              </MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
