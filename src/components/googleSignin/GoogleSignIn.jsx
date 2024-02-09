import react from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    loginFailure,
    loginStart,
    loginSucces,
} from "../../redux/userSlice.js";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";

import axios from "axios";

import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

import './GoogleSignin.scss'



import React from 'react'

const GoogleSignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signInWithGoogle = () => {

        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then(async (result) => {
                try {
                    const res = await axios.post(
                        "/api/auth/google",
                        {
                            name: result.user.displayName,
                            email: result.user.email,
                            img: result.user.photoURL,
                        },
                        { withCredentials: true }
                    ).then((res) => {
                        dispatch(loginSucces(res.data));
                        navigate(`/`);
                    });
                } catch (err) {
                    console.log(err)
                }

            })
            .catch((error) => {
                dispatch(loginFailure());
            });
    };


    return (
        <div>
            <button className="signbtn" onClick={signInWithGoogle}>
                {" "}
                <SensorOccupiedIcon style={{ backgroundColor: "transparent" }} /> SignIn
            </button>
        </div>
    )
}

export default GoogleSignIn
