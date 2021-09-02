import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./App.css";
import Fire, { Glogin ,db} from "./fire";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPhoneNumber, RecaptchaVerifier} from "firebase/auth";


if (localStorage.getItem("config") == null) {
  localStorage.setItem("config", "/");
}
let val = localStorage.getItem("config");

export default function Getstarted() {

  let id=""
  let pass=""

  
  function createId() {
     const auth = getAuth();
createUserWithEmailAndPassword(auth, "ppartha@wtf.com", "1234521")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('done signed in')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }
 
  function  emailLogin( id,pass) {
      console.log(id,pass);
  const auth = getAuth();

  signInWithEmailAndPassword(auth, id, pass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(" yes you are in")
      val="/home"
      localStorage.setItem("config", "/home");
      window.location.reload()
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(" access denied ")
    });


  }


  /// not working btw
  function phoneSignIn(params) {
    
  
  const auth = getAuth();
  auth.languageCode = 'it';
  window.recaptchaVerifier = new RecaptchaVerifier('recap', {
    'size': 'invisible',
    'callback': (response) => {
      console.log(" it worked the");
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      
    }
  }, auth);
  console.log(window.recaptchaVerifier)
 
 
signInWithPhoneNumber(auth, "" ,window.recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log("sms sent");
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      console.warn(" some errors");
      // ...
    });

  }   
  return (
    <>
        
      <div className="loginDiv">
        <form className="login shadow border">
          <div
            className="googleLogin"
            onClick={() => {
              Glogin();
            }}
          ></div>
          <h5>
            Or <br /> Login via Username
          </h5>{" "}
          <hr />
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User Id
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>{ id=e.target.value}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>{ pass=e.target.value}}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="btns">
            <button type="submit" className="btn btn-success logBtn" onClick={(e)=>{ e.preventDefault() ; emailLogin(id,pass)}}>
              Log In
            </button>{" "}
            <br />
            <button type="submit" className="btn btn-primary logBtn disabled">
              Create New Account
            </button>
            <Redirect to={val} />
          </div>
        </form>
      </div>
    </>
  );
}
