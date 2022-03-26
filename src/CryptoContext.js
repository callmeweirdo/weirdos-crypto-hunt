import React, { useState, useEffect, createContext, useContext } from 'react';


const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("NGN");
    const [symbol, setSymbol] = useState("N");

    useEffect(() => {
        if(currency === "NGN"){
            return setSymbol("N");
        }else if(currency === "USD"){
            return setSymbol("$");
        }
    }, [currency])

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}