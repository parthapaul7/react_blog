import React, { useState } from "react";
import Posts from "./Posts";

export default function Blogs({ post, del }) {
  return (
    <div className="container my-3">
      {post.map((element) => {
        return <Posts element={element} del={del} />;
      })}
    </div>
  );
}
