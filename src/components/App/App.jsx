import { Outlet } from "react-router-dom"
import { useState } from "react"

import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Main from "../Main/Main"

import SideContext from '../../Context'

function App() {

  const [active, setActive] = useState(1);

  return (
    <SideContext.Provider value={{ active, setActive }} >
      <Navbar />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </SideContext.Provider>
  )
}

export default App
