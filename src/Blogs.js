import React, { useEffect, useState} from "react";
import Posts from "./Posts";

export default function Blogs({ post, del}) {
  const [refresh,setRefresh]= useState(false);


function value(){

    setRefresh(!refresh);
  }


  
  return (
    <div className="container my-3">
      {post.map((element) => {
        return <Posts element={element} del={del} value={value} />;
      })}
    </div>
  );
}
