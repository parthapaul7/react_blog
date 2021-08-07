import React from 'react'
import Blogs from './Blogs'

export default function Allposts({post,del}) {
    return (
        <div className="container my-5">
           <Blogs post={post} del={del} />
        </div>
    )
}
