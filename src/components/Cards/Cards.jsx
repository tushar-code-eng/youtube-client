import React, { useEffect, useState} from "react";
import "./Cards.scss";
// import thumbnail from "../photos/no-image.jpg";
// import channel from "../photos/channelImg.jpg";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const Cards = ({ video }) => {

  const [channel, setChannel] = useState([]);


  useEffect(() => {
    try {
      const fetchChannel = async () => {
        const res = await axios.get(`/api/users/find/${video.userId}`);
        setChannel(res.data);
      };
      fetchChannel();
    } catch (err) {
      console.log("Error: ", err);
    }
  }, [video.userId]);

  return (
    <Link
      className="linki"
      to={`/video/${video._id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="cardsContainer" >
        <div className="imageContainer" >
          {video.imgUrl ? (
            <img className="thumbnailImg" src={video.imgUrl} alt="" />
          ) : (
            <video
              src={video.videoUrl}
              controls
            ></video>
          )}
        </div>
        <div className="details">
          <img src={channel.img} alt="" className="channelImg" />
          <div className="texts">
            <h1 className="title">{video.title}</h1>
            <p className="channelName">{channel.name}</p>
            <p className="views">
              {video.views} views | {format(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
