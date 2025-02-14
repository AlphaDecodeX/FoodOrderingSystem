import React from 'react'
import classes from "./Form.module.css"
import axios from "../../axios";
import { useHistory } from 'react-router';
import { userActions } from '../store/userSlice';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { restActions } from '../store/restSlice';

function Form() {
    let history = useHistory();
    const dispatch = useDispatch();

    const nameInput = useRef();
    const passInput = useRef();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    });

    const loginHandler = async (event) => {
        event.preventDefault();
        let req = await axios.get("/addUser");
        console.log(req.data);
        const usersData = req.data;
        for (const userNo in usersData) {
            if (usersData[userNo].name === nameInput.current.value) {
                if (usersData[userNo].password === passInput.current.value) {
                    dispatch(userActions.setSignInInfo({
                        name: nameInput.current.value,
                        location: [latitude, longitude],
                        signIn: true
                    }))
                    history.push({
                        pathname: "/home"
                    }
                    );
                    return;
                }
            }
        }

        req = await axios.get("/addRest");
        const restsData = req.data;
        for (const restNo in usersData) {
            if (restsData[restNo].name === nameInput.current.value) {
                if (restsData[restNo].password === passInput.current.value) {
                    dispatch(restActions.setSignInInfo({
                        name: nameInput.current.value,
                        location: [latitude, longitude],
                        signIn: true
                    }))
                    history.push({
                        pathname: "/home"
                    }
                    );
                    return;
                }
            }
        }
    }

    const userSignUpHandler = () => {
        return history.push({
            pathname: "/userSignUp"
        }
        );
    }

    const restSignUpHandler = () => {
        return history.push({
            pathname: "/restSignUp"
        }
        );
    }

    return (
        <form className={classes.form}>
            <input type="text" ref={nameInput} />
            <input type="password" ref={passInput} />
            <button className={classes.login_button} onClick={loginHandler}>Login (User/Restaurant)</button>
            <button className={classes.login_button} onClick={userSignUpHandler}>Sign Up as User</button>
            <button className={classes.login_button} onClick={restSignUpHandler}>Register Your Restuarant</button>
        </form>
    )
}

export default Form
