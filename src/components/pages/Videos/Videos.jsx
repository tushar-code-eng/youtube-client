import React, { useEffect, useState } from "react";
import "./Videos.scss";

import Comments from "../../Comments/Comments";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";
import { like, dislike } from "../../../redux/videoSlice.js";
import { subscribtion } from "../../../redux/userSlice.js";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined.js";

import ReplyIcon from "@mui/icons-material/Reply";
import { useLocation } from "react-router-dom";
import { fetchSuccess } from "../../../redux/videoSlice.js";
import Recomendations from "../../Recomendations/Recomendations.jsx";
import SignInError from "../../SignInError/SignInError.jsx";

const Videos = ({openSidebar, setOpenSidebar}) => {
  const {currentUser} = useSelector((state) => state.user);
  const currentVideos = useSelector((state) => state.video);
  const currentVideo = currentVideos.currentVideo
    // console.log(currentVideo)

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, SetChannel] = useState({});
  const [thumbnail,setThumbnail] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`, {
          withCredentials: true,
        });
        const viewsRes = await axios.put(`/api/videos/view/${path}`, {
          withCredentials: true,
        });
        const channelRes = await axios.get(
          `/api/users/find/${videoRes.data.userId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(fetchSuccess(videoRes.data));
        
        SetChannel(channelRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo._id}`, {
      withCredentials: true,
    });
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/api/users/dislike/${currentVideo._id}`, {
      withCredentials: true,
    });
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    if (currentUser.subscribedUsers?.includes(channel._id)) {
      await axios.put(`/api/users/unsub/${channel._id}`, {
        withCredentials: true,
      });
    } else {
      await axios.put(`/api/users/sub/${channel._id}`, {
        withCredentials: true,
      });
    }
    dispatch(subscribtion(channel._id));
  };

  return (  
    !currentUser? <SignInError />: <div className={ openSidebar ? 'videoContainer' : 'videoContainerChange'}>
      <div className="content">
        <div className="videoWrapper">
          <video src={currentVideo.videoUrl} controls autoPlay style={{outlineStyle:"none"}}></video>
        </div>
        <div className="title">
          <h2 className="videoTitle">{currentVideo.title}</h2>
          <div className="desc">
            <p className="videoViews">
              {currentVideo.views} views | {format(currentVideo.createdAt)} 
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20",
              }}
            >
              <button onClick={handleLike}>
                {" "}
                {currentVideo.likes?.includes(currentUser._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {currentVideo.likes?.length}
              </button>
              <button onClick={handleDislike}>
                {" "}
                {currentVideo.dislikes?.includes(currentUser._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlinedIcon />
                )}{" "}
                dislike
              </button>
              <button>
                {" "}
                <ReplyIcon /> Share
              </button>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="channelinfo">
          <div className="channeltext">
            <img src={channel.img} alt="" />
            <div className="channelDetail">
              <p>{channel.name}</p>
              <p
                style={{
                  fontSize: "0.6em",
                  marginTop: "2px",
                  color: "rgb(159, 156, 156)",
                }}
              >
                {channel.subscribers} subscribers
              </p>
            </div>
          </div>
          <button onClick={handleSub}>
            {currentUser.subscribedUsers.includes(channel._id)
              ? "UNSUBSCRIBE"
              : "SUBSCRIBE"}
          </button>
        </div>
        <div className="videodesc">{currentVideo.description}</div>
        <Comments videoId={currentVideo._id} />
      </div>
      <Recomendations tags = {currentVideo.tags } />
    </div>
  )
};

export default Videos;
