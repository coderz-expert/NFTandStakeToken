'use client'

import { useState, createContext } from "react";
import Navigation from "./component/Navbar";


const App = createContext();

const Layout = ({ children }) => {

  return (
    <App.Provider>
      <div className="main_body_div">
        <Navigation />
        {children}
      </div>
    </App.Provider>
  )
}

export default Layout;
