import React from 'react'
import Blogs from './Blogs'

export default function Allposts({post,del}) {
    return (
        <div>
           <Blogs post={post} del={del} />
        </div>
    )
}
