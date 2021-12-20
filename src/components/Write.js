import React, { useState } from "react";
import Blogs from "./Blogs";
import "../App.css"


import { postData } from "../Auth/control";

export default function Write({ post, del }) {
  let user= localStorage.getItem("id")
  let dat = Date();


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");

  function saveData() {
    
   
    let obj = { title: title, descrip: descrip, date: dat };

    console.log(obj);

    post.unshift(JSON.stringify(obj));
    localStorage.setItem("posts", JSON.stringify(post));

    setTitle("");
    setDescrip("");
      
    postData(localStorage.getItem("id"), title, descrip)
    
    
  }
  return ( <> 

    <div className="container " id="writing">
    <h3 className="label1">Post something </h3>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          {" "}
          Title :{" "}
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setTitle(e.target.value);
            // if (title != " " &&title != "" && descrip != "") setisDisabled(false)
          }}
          id="formGroupExampleInput"
          placeholder="Example input placeholder"
          value={title}
         
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Description:{" "}
        </label>
   
        <textarea
          type="text"
          className="form-control"
          
          onChange={(e) => {
            setDescrip(e.target.value);
            
          }}
          id="formGroupExampleInput2"
          placeholder="Another input placeholder"
          value={descrip}
        />
      </div>
      <button type="button" className="btn btn-success" id="postBtn" onClick={saveData} disabled={title.length===0 || descrip.length===0}>
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
