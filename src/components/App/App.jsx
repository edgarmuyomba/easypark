import { Outlet } from "react-router-dom"

import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Main from "../Main/Main"

function App() {

  return (
    <>
      <Navbar />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  )
}

export default App
