import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";

import { CryptoState } from "../../CryptoContext";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Avatar, Container } from "@material-ui/core";
import { numberWithCommas } from "../Banner/Carousel";
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from "firebase/firestore";


const useStyles = makeStyles({
  container: {
      width: "350",
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace"
  },
  profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
  },
  picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      backgroundColor: "#EEBC1D",
      objectFit: "contain"
  },
  logout: {
      height: "8%",
      width: "100%",
      backgroundColor: "#EEBC1D",
      marginTop: 20
  },
  watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor: "gray",
      borderRadius: 10,
      padding: 15,
      paddingTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflow: "scroll"
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black"
  }
   
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, coins, watchlist, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
      signOut(auth);

      setAlert({
        open: true,
        type: "success",
        message: "Bye bye"
      });

      toggleDrawer();
  }


  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 5,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoUrl}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoUrl}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ 
                      fontSize:15, textShadow: "0 0 5px black"
                   }}>
                       Watchlist
                  </span>

                   {coins.map((coin) => {
                     if(watchlist.includes(coin.id))
                     return (
                       <div className={classes.coin}>
                         <span>{coin.name}</span>
                         <span  style={{ display: "flex", gap: 8 }}>
                          {symbol}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete
                             style={{ cursor: "pointer" }}
                             fontSize="16"
                             onClick={() => removeFromWatchlist(coin)}
                           />
                         </span>

                       </div>
                     )
                   } )}


                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Fuck Off
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
