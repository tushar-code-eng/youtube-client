import React, { useEffect, useState } from "react";
import "./uploadVideos.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; //------------------from firebase
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const uploadVideos = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPer, setImgPer] = useState(0);
  const [videoPer, setVideoPer] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "./api/videos",
      { ...inputs, tags },
      { withCredentials: true }
    )
    setOpen(false)

    res.status === 200 && navigate(`/api/video/${res.data._id}`)
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app); //this app is from firebase.js
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (urlType === "imgUrl") {
          setImgPer(Math.round(progress));
        } else {
          setVideoPer(Math.round(progress));
        }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl"); // we did this bec if there is not video then there is no need to run this function
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  return (
    <div className="uploadBackground">
      <div className="uploadContainer">
        <div>
          <button
            className="closebutton"
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </button>
        </div>
        <h2>Upload Videos</h2>
        <div className="labels">Video:</div>
        {videoPer > 0 ? (
          "Uploading" + videoPer + "%"
        ) : (
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          rows={8}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Seperate tags with comas."
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        <div className="labels">Image:</div>
        {imgPer > 0 ? (
          "Uploading" + imgPer + "%"
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <button className="uploadButton" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default uploadVideos;
