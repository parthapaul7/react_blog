import React, { useState } from "react";
import Blogs from "./Blogs";
import { Modal,Button } from "react-bootstrap";
import "./App.css"

export default function Write({ post, del }) {
  let dat = Date();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");

  function saveData() {
    if (title === "" || descrip === "")  return handleShow();
    
     
    let obj = { title: title, descrip: descrip, date: dat };

    console.log(obj);

    post.unshift(JSON.stringify(obj));
    localStorage.setItem("posts", JSON.stringify(post));

    setTitle("");
    setDescrip("");
  }
  return ( <> 

      <Modal show={show} onHide={handleClose}>
        <Modal.Body> Title or Description Can not be empty </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="container " id="writing">
    <h3 className="label1">Post something </h3>
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label">
          {" "}
          Title :{" "}
        </label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          id="formGroupExampleInput"
          placeholder="Example input placeholder"
          value={title}
        />
      </div>
      <div class="mb-3">
        <label for="formGroupExampleInput2" class="form-label">
          Description:{" "}
        </label>
        <textarea
          type="text"
          class="form-control"
          
          onChange={(e) => {
            setDescrip(e.target.value);
          }}
          id="formGroupExampleInput2"
          placeholder="Another input placeholder"
          value={descrip}
        />
      </div>
      <button type="button" class="btn btn-success" id="postBtn" onClick={saveData}>
        Post
      </button>
      <hr />
      <h3 >Your posts will show here</h3>
      <hr />
      <Blogs post={post} del={del} />
    </div>
    </>
  );
}
