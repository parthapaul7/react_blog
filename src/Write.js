import React, { useState } from "react";
import Blogs from "./Blogs";

export default function Write({ saveData, post }) {
  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");

  function saveData() {
    if (title == "" || descrip == "")
      return alert("title and description cant be empty");

    let obj = { title: title, descrip: descrip };

    console.log(obj);

    post.push(JSON.stringify(obj));
    localStorage.setItem("posts", JSON.stringify(post));

    setTitle("");
    setDescrip("");
  }
  return (
    <div className="container my-5">
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
        <input
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
      <button type="button" class="btn btn-success" onClick={saveData}>
        Post
      </button>
      <hr />
      <h3> your posts will show here </h3>

      <Blogs post={post} />
    </div>
  );
}
