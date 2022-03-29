import axios from "axios";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './config/firebase';
import React, { useState, useEffect, createContext, useContext } from "react";
import { CoinList } from "./config/Api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("NGN");
  const [symbol, setSymbol] = useState("N");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const  [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success" 
  });

    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));

      setCoins(data);
      setLoading(false);
    };

    const userState = () => {
      onAuthStateChanged(auth, user => {
        if(user){
          setUser(user);
        }else{
          setUser(null);
        }
      });
    }

    useEffect(() => {
      userState();
    }, [])

    console.log(user);

  useEffect(() => {
    if (currency === "NGN") {
      return setSymbol("N");
    } else if (currency === "USD") {
      return setSymbol("$");
    }
  }, [currency]);

  


  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, setUser }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
