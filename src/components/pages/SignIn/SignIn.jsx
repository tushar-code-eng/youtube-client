// import React, { useRef, useState,useEffect } from "react";
// import "./SignIn.scss";
// import axios from "axios";
// import dps from "../../photos/channelimg.jpg";
// import { useDispatch } from "react-redux";
// import {
//   loginFailure,
//   loginStart,
//   loginSucces,
// } from "../../../redux/userSlice";

// import { useNavigate } from "react-router-dom";
// import app from "../../../firebase.js";

// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// import GoogleIcon from "@mui/icons-material/Google";

// const SignIn = () => {
//   const navigate = useNavigate();

//   const inputref = useRef(null);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [dp, setDp] = useState(null);
//   const [senddp, setSenddp] = useState(null);
  
//   const dispatch = useDispatch(); // ----------------------react-redux

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     dispatch(loginStart()); // ----------------we have to pass a payload but this doesnt have any payload
//     try {
//       const res = await axios.post(
//         "/api/auth/signin",
//         { name, password },
//         { withCredentials: true }
//       );
//       dispatch(loginSucces(res.data)); //--------------------we passed a payload here
//       navigate(`/`);
//     } catch (err) {
//       dispatch(loginFailure());
//     }
//   };
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "/api/auth/signup",
//         { senddp,name, email, password },
//         { withCredentials: true }
//       );
//       dispatch(loginSucces(res.data)); //--------------------we passed a payload here
//       navigate(`/`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  


//   useEffect(() => {
//     dp && uploadFile(dp);
//   }, [dp]);

//   const uploadFile = (file) => {
//     const storage = getStorage(app); //this app is from firebase.js
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);

//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//             break;
//         }
//       },
//       (error) => {},
//       () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setSenddp(downloadURL);
//         });
//       }
//     );
//   };


//   const handleDpChange = (event) => {
//     const file = event.target.files[0];
//     const imgname = event.target.files[0].name;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       const img = new Image();
//       img.src = reader.result;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const maxSize = Math.max(img.width, img.height);
//         canvas.width = maxSize;
//         canvas.height = maxSize;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(
//           img,
//           (maxSize - img.width) / 2,
//           (maxSize - img.height) / 2
//         );
//         canvas.toBlob(
//           (blob) => {
//             const file = new File([blob], imgname, {
//               type: "image/png",
//               lastModified: Date.now(),
//             });
//             // console.log(file);
//             setDp(file);
//           },
//           "image/jpeg",
//           0.8
//         );
//       };
//     };
//   };

//   return (
//     <>
//       <div className="signgoogle">
//         <button className="buttongoogle" onClick={signInWithGoogle}>
//           {" "}
//           <GoogleIcon style={{ backgroundColor: "transparent" }} /> Sign In with
//           google
//         </button>
//       </div>
//       <div className="maincontent">
//         <div className="SignContainer">
//           <h1 className="h1signin">SignIn</h1>
//           <div className="form">
//             <input
//               type="text"
//               name="name"
//               id=""
//               placeholder="Username"
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="password"
//               name="password"
//               id=""
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>SignIn</button>
//           </div>
//         </div>

//         <div className="SignContainer">
//           <h1 className="h1signup">SignUp</h1>
//           <p>Upload Image</p>
//           <div
//             className="dp"
//             onClick={() => {
//               inputref.current.click();
//             }}
//           >
//             {dp ? (
//               <img src={URL.createObjectURL(dp)} alt="" />
//             ) : (
//               <img src={dps} alt="" />
//             )}
//             <input
//               type="file"
//               ref={inputref}
//               accept="image/*"
//               onChange={handleDpChange}
//               style={{ display: "none" }}
//             />
//           </div>
//           <div className="form">
//             <input
//               type="email"
//               name="email"
//               id=""
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="text"
//               name="name"
//               id=""
//               placeholder="UserName"
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="password"
//               name="password"
//               id=""
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleSignUp}>SignUp</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignIn;




