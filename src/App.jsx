import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "./App.scss";

import { logout } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home.jsx";
import Videos from "./components/pages/Videos/Videos.jsx";
import Search from "./components/pages/Search/Search.jsx";

function App() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const dispatch = useDispatch();
  window.onbeforeunload = () => {
    dispatch(logout);
  };
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <div>
            <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          </div>
          <div className="appContainer">
            <Sidebar openSidebar={openSidebar} />
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route path="video">
                  <Route
                    path=":id"
                    element={
                      <Videos
                        openSidebar={openSidebar}
                        setOpenSidebar={setOpenSidebar}
                      />
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
