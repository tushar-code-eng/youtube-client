import React, { useEffect, useState } from "react";
import "./CardsSM.scss";
// import thumbnail from "../photos/no-image.jpg";
// import channel from "../photos/channelImg.jpg";
import { Link } from "react-router-dom";
import {format} from 'timeago.js'
import axios from "axios";

const CardsSM = ({video}) => {

  const [channel, setChannel] = useState([]);

  useEffect(() => {
    try {
      const fetchChannel = async () => {
        const res = await axios.get(`http://localhost:3000/api/users/find/${video.userId}`);
        setChannel(res.data);
      };
      fetchChannel();
    } catch (err) {
      console.log("Error: ", err);
    }
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
      <div className="cardsContainerSM">
      {video.imgUrl ? (
            <img className="thumbnailImgSM" src={video.imgUrl} alt="" />
          ) : (
            <video className="thumbnailImgSM" src={video.videoUrl} ></video>
          )}
        <div className="detailsSM">
          <div className="textsSM">
            <h1 className="titleSM"> {video.title} </h1>
            <p className="channelNameSM">{channel.name}</p>
            <p className="viewsSM">{video.views} views | {format(video.createdAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardsSM;
