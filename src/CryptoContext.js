import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from './firebase';
import { onSnapshot, doc } from 'firebase/firestore';


const Crypto = createContext();


const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  })

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid)
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins)
          setWatchlist(coin.data().coins)
        }
        else {
          console.log("No Items in Watchlist")
        }
      })
      return () => {
        unsubscribe()
      }
    }
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    })
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency))
    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    if (currency === "INR") setsymbol("₹");
    else if (currency === "USD") setsymbol("$");
  }, [currency])


  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins, loading, fetchCoins, alert, user, setAlert, watchlist }}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext
export const CryptoState = () => {
  return useContext(Crypto);
};