import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./App.css";
import Fire, { Glogin } from "./fire";

if (localStorage.getItem("config") == null) {
  console.log("yes");
  localStorage.setItem("config", "/");
}
let val = localStorage.getItem("config");

export default function Getstarted() {
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
            <button type="submit" className="btn btn-success logBtn">
              Log In
            </button>{" "}
            <br />
            <button type="submit" className="btn btn-primary logBtn">
              Create New Account
            </button>
            <Redirect to={val} />
          </div>
        </form>
      </div>
    </>
  );
}
