import axios from "axios";
import React, { useState, useEffect } from "react";
import CardsSM from '../Cards/CardsSM.jsx'

const Recomendations = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fecthVideo = async () => {
      try {
        const res = await axios.get(`/api/videos/random`, {
          withCredentials: true,
        });
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fecthVideo()
  }, [tags]);

  return (
    <div className="recContainer">
        {videos.map(video=>(
            <CardsSM key={video._id} video={video} />
        ))}
    </div>
    );
};

export default Recomendations;
