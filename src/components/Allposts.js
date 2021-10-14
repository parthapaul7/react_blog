import React from 'react'
import Blogs from './Blogs'

export default function Allposts({post,del}) {
    return (
        <div className="container my-5">
            <h3>All your Posts are Here</h3>
           <Blogs post={post} del={del} />
        </div>
    )
}


// adding some bullshit comments
