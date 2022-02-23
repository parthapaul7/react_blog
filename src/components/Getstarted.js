import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../App.css";
import Fire, { Glogin, db } from "../fire";


import { Alert } from "react-bootstrap";
import { login, newUser } from "../Auth/control";

if (localStorage.getItem("config") == null) {
  localStorage.setItem("config", "/");
}
let val = localStorage.getItem("config");

export default function Getstarted() {
  let id = "";
  let pass = "";

  const [newId, setNewId] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newName, setNewName] = useState("");

  const [aler, setaler] = useState("Login To Enter");
  const [vari, setvari] = useState("warning");

  const [createAlert, setCreateAlert] = useState(" Enter your credentials");
  const [createVari, setCreateVari] = useState("warning");
  const [match, setMatch] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function emailLogin(email, password) {
    setvari("primary");
    setaler("logging in .....");
    const user = await login(email, password);

    if (!user.id) {
      setaler("Email or password is wrong ! try again");
      setvari("danger");
      setCreateAlert("user already exist ! use differnt email id")
      setCreateVari("danger")
    } else {
      val = "/home";
      localStorage.setItem("config", "/home");
      localStorage.setItem("id", email);
      setaler("Login To Enter");

      window.location.reload();
    }
  }


  async function createNewAccount() {
    try {
      await newUser(newName, newId, newPass);
      setCreateAlert(" Account Created!  Log in");
      setCreateVari("success");
      emailLogin(newId,newPass)
    } catch (err) {
      console.log(err);
    }
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
          <h5 className="loginText">
            Or <br /> Login via Username
          </h5>{" "}
          <hr />
          <Alert variant={vari}>
            <strong>{aler}</strong>
          </Alert>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User Id
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setaler("Login To Enter");

                id = e.target.value;
              }}
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
              onChange={(e) => {
                setaler("Login To Enter");

                pass = e.target.value;
              }}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onClick={(e) => {
                console.log(e.target.value);
              }}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember Me
            </label>
          </div>
          <div className="btns">
            <button
              type="submit"
              className="btn btn-success logBtn"
              onClick={(e) => {
                e.preventDefault();
                emailLogin(id, pass);
              }}
            >
              Log In
            </button>{" "}
            <br />
            <button
              type="submit"
              className="btn btn-primary logBtn"
              onClick={(e) => {
                e.preventDefault();
                handleShow();
              }}
            >
              Create New Account
            </button>
            {/* modal start here  */}
            <Modal
              show={show}
              onHide={handleClose}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body>
                <Alert variant={createVari}>
                  <strong>{createAlert}</strong>
                </Alert>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => {
                        setNewId(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setNewPass(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      {match ? "Password Matched " : "Password not Matched "}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter Password"
                      onChange={(e) => {
                        newPass == e.target.value
                          ? setMatch(true)
                          : setMatch(false);
                      }}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!match}
                    onClick={(e) => {
                      createNewAccount();
                      e.preventDefault();
                      setCreateAlert("creating new Account .... ");
                      setCreateVari("primary");
                    }}
                  >
                    Create New
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Redirect to={val} />
          </div>
        </form>
      </div>
    </>
  );
}
