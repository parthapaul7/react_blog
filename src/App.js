import React from "react";
import Navbar from "./Navbar";
import Write from "./Write";

function App() {
  let post = [];

  localStorage.getItem("posts") == null
    ? (post = [])
    : (post = JSON.parse(localStorage.getItem("posts")));

  function del(h, m) {
    let hr = 0;
    let min = 0;

    for (let i = 0; i < post.length; ) {
      hr = JSON.parse(post[i]).title;
      min = JSON.parse(post[i]).descrip;

      if (hr === h && min === m) {
        post.splice(i, 1);

        localStorage.clear();
        localStorage.setItem("posts", JSON.stringify(post));
      } else {
        ++i;
      }
      

    }
  }
  return (
    <>
      
      <Navbar />
      <Write post={post} del={del} />
    </>
  );
}

export default App;
