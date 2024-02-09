import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cards from '../../Cards/Cards.jsx'
import './Search.scss'

const Search = () => {
  const [videos, setVideos] = useState([]);
  const getQuery = useLocation().search; // --------we did this to get the query from navbar, we can also get the query by passing it into the component Search

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/search${getQuery}`, {
          withCredentials: true,
        });
        setVideos(res.data);
      } catch (err) {}
    };
    fetchVideos();
  }, [getQuery]);

  return <div className="searchContainer">
    {videos.map(video=>(
        <Cards key={video._id} video={video}/>
    ))}
  </div>;
};

export default Search;
