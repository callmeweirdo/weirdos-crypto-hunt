import React, { useState, useEffect } from "react";
import axios from "axios";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import { useParams } from "react-router-dom";

import CoinInfo from "../components/CoinInfo";

import ReactHtmlParser from "react-html-parser";
import { Button, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const CoinPage = () => {
  const [coin, setCoin] = useState();

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const { id } = useParams();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  // console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    merketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",

      // ? responsiiiiiiiiiive
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) {
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );
  }

  const inWatchlist = watchlist.includes(coin?.id);

  const addTowatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try{
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      })
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist`,
        type: "success"
      })
    }catch(error){
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      })
    }
  }

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch) => watch !== coin?.id)
      },
      {merge: "true"}
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from watchlist !`,
        type: "success"
      })
    }catch(error){
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      })
    }

  }


  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image["large"]}
          alt={coin?.name}
          height="200"
          style={{ marginButtom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>

        <div className={classes.merketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heaading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heaading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
              {symbol}
              {""}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heaading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </Typography>
          </span>

            {user && (
              <Button
                variant="outlined"
                style={{ 
                  width: "100%",
                  height: 40,
                  backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D"
                 }}
                 onClick={inWatchlist ? removeFromWatchlist : addTowatchlist}
              >
                {inWatchlist ? "Remove from watchlist" : "Add to watchlist" }
              </Button>
            )}

        </div>
      </div>

      {/*  */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
