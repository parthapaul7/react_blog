import React, {  useState,useEffect} from "react";
import Posts from "./Posts";


export default function Blogs({ post}) {
  const [posts, setPost]= useState(post)
  
  
  

  useEffect(() => {

    setPost(post)
    return () => {
    
    }
  }, [post])

  let count=0;



  
  return (
    <div className="container my-3">
      {posts.map((element) => {
        count++;
        return <Posts element={element}   count={count} key={count} post={setPost}  />;
      })}
    </div>
  );
}
