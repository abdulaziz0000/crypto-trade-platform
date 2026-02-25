import React, { useEffect } from "react"
import Navbar from "./page/Home/Navbar/Navbar"
import Home from "./page/Home/Home"
import { Route, Routes } from "react-router-dom"
import Portfolio from "./page/Portfolio/Portfolio"
import Activity from "./page/Activity/Activity"
import Wallet from "./page/Wallet/Wallet"
import Withdrawal from "./page/Withdrawal/Withdrawal"
import PaymentDetails from "./page/PaymentDetails/PaymentDetails"
import StockDetails from "./page/StockDetails/StockDetails"
import Watchlist from "./page/Watchlist/Watchlist"
import Profile from "./page/Profile/Profile"
import SearchCoin from "./page/Search/SearchCoin"
import NotFound from "./page/NotFound/NotFound"
import Auth from "./page/Auth/Auth"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./State/Auth/Action"


function App() {
const auth = useSelector((state) => state.auth); 
const dispatch = useDispatch()
console.log(auth)

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")))
}, [ auth.jwt])


  return (
    <>
 
    {auth.user? <div>
      <Navbar /> 
      <Routes>
              <Route path="/signin" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/forgot-password" element={<Auth />} />
        <Route path="/" element={<Home/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/activity" element={<Activity/>} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/withdrawal" element={<Withdrawal/>} />
        <Route path="/paymentDetails" element={<PaymentDetails/>} />
        <Route path="/stockDetails" element={<StockDetails/>} />
        <Route path="/watchlist" element={<Watchlist/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/search" element={<SearchCoin/>} />
        <Route path="/*" element={<NotFound/>} />

      </Routes>
      </div>:
        <Auth/>
      }

    </>
  )
}

export default App
