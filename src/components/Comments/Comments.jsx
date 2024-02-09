import React, { useState, useEffect,useRef } from "react";
import "./Comments.scss";
// import avatar from "../photos/channelImg.jpg";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";

const Comments = ({ videoId }) => {

  const currentUser = useSelector((state) => state.user.currentUser);

  const [comments, setComments] = useState([]);
  const [newcomment, setNewcomment] = useState("");
  const[ready,setReady] = useState(false)

  const handleComment = async (e) => {
    const res = await axios.post(
      "/api/comments",
      { newcomment, videoId },
      { withCredentials: true }
    )
    setReady(true)
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`, {
          withCredentials: true,
        });
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
    setReady(false)
  }, [videoId,ready]);
  return (
    <>
      <div className="Commentsscontainer">
        <div className="NumberOfComments">{comments.length} Comments</div>
        <div className="NewComment">
          <img src={currentUser.img} alt="" />
          <input
            type="text"
            placeholder="Add a comment.."
            onChange={(e) => setNewcomment(e.target.value)}
          />
          <button  onClick={handleComment}>Add</button>
        </div>
      </div>
      {comments.map((cmnt) => (
        <Comment key={cmnt._id} comments={cmnt} />
      ))}
    </>
  );
};

export default Comments;
