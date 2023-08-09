import { useEffect } from "react"
import {setPosts} from "../ReduxState/PostSlice"
import { useDispatch, useSelector } from "react-redux"
import PostsDisplay from "./Postsdisplay"

function Posts(){
    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.posts)
    

    async function getPosts(){
        let res = await fetch("https://odd-cyan-chameleon-sock.cyclic.app/posts")
        let data = await res.json()
        dispatch(setPosts({data}))
    }

    useEffect(()=>{
        getPosts()
    },[])


    return (
        <div>
            {posts?.length && posts?.map((post)=> {
                return <PostsDisplay {...post} key={post._id} />
            })}
        </div>
    )
}

export default Posts
