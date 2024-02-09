import React from "react";
import avatar from "../photos/channelImg.jpg";
import './Comment.scss'
import { format } from "timeago.js";
import { useState,useEffect } from "react";
import axios from 'axios'

const Comment = ({comments}) => {

  const [channel,setChannel] = useState([])

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await axios.get(`/api/users/find/${comments.userId}`,{withCredentials:true})
        setChannel(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchUser()
  },[comments.userId])

  return (
    <div className="CommentContainer">
      <img src={channel.img} alt="" />
      <div className="CommentText">
        <span className="name">{channel.name}</span>
        <span className="date">{format(comments.createdAt)}</span>
        <p className="CommentBody">
          {comments.desc}
        </p>
      </div>
    </div>
  );
};

export default Comment;
