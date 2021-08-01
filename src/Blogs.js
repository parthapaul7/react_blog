import React from 'react'
import Posts from './Posts'

export default function Blogs({post}) {

    
    
    return (
        <div className="container my-3">
            <hr/>
            <h3> your posts will show here   </h3>
            
            {
            post.map((element)=>{
                 return <Posts element= {element} post={post}/>

            })
            }
           
            
            
        </div>
    )
}
