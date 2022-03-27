import React, { useState, useEffect } from "react";
import axios from "axios";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import { useParams } from "react-router-dom";

import CoinInfo from "../components/CoinInfo";

import ReactHtmlParser from "react-html-parser";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carousel";

const CoinPage = () => {
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const { id } = useParams();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin);

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
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
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
        </div>
      </div>

      {/*  */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
