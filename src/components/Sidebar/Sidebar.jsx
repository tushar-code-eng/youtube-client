import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GoogleSignIn from "../googleSignin/GoogleSignIn";

const Sidebar = ({ openSidebar }) => {
  const currentUser = useSelector((state) => state.user.currentUser); // ---------------redux

  return (
    <>
      {openSidebar && (
        <div className="sidebarr">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="items" >
              <HomeRoundedIcon style={{ backgroundColor: "transparent" }} />
              Home
            </div>
          </Link>
          <Link to="trends" style={{ textDecoration: "none" }}>
            <div className="items" >
              <ExploreIcon style={{ backgroundColor: "transparent" }} />
              Explore
            </div>
          </Link>
          <Link to="subscriptions" style={{ textDecoration: "none" }}>
            <div className="items" >
              <SubscriptionsIcon style={{ backgroundColor: "transparent" }} />
              Subscriptions
            </div>
          </Link>

          <div className="divider"></div>

          <div className="items">
            <VideoLibraryIcon style={{ backgroundColor: "transparent" }} />
            Library
          </div>
          <div className="items">
            <HistoryIcon style={{ backgroundColor: "transparent" }} />
            History
          </div>

          <div className="divider"></div>

          {!currentUser && (
            <>
              <div className="desc">
                Sign in to like videos, comment and subscribe
                <GoogleSignIn />
              </div>

              <div className="divider"></div>
            </>
          )}

          <div className="items">
            <LibraryMusicIcon style={{ backgroundColor: "transparent" }} />
            Music
          </div>
          <div className="items">
            <SportsBasketballIcon style={{ backgroundColor: "transparent" }} />
            Sports
          </div>
          <div className="items">
            <SportsEsportsIcon style={{ backgroundColor: "transparent" }} />
            Gaming
          </div>
          <div className="items">
            <MovieCreationIcon style={{ backgroundColor: "transparent" }} />
            Movies
          </div>
          <div className="items">
            <ArticleIcon style={{ backgroundColor: "transparent" }} />
            News
          </div>
          <div className="items">
            <LiveTvIcon style={{ backgroundColor: "transparent" }} />
            Live
          </div>

          <div className="divider"></div>

          <div className="items">
            <SettingsIcon style={{ backgroundColor: "transparent" }} />
            Settings
          </div>
          <div className="items">
            <FlagIcon style={{ backgroundColor: "transparent" }} />
            Report
          </div>
          <div className="items">
            <HelpOutlineIcon style={{ backgroundColor: "transparent" }} />
            Help
          </div>
          {/* <div className="items">
        <SettingsBrightnessIcon style={{backgroundColor:"transparent"}} />
        Light Mode
      </div> */}
        </div>
      )}
    </>
  );
};

export default Sidebar;
