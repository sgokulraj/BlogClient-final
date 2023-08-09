import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Spinner } from 'react-bootstrap';
import PostsDisplay from "./Postsdisplay"
import "../Stylesheets/Mypost.css"


function Mypost() {
    const user = useSelector((state) => state.user)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)


    async function getUserPosts() {
        const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/users/${user._id}/post`)
        const data = await res.json()
        // console.log(data); // array of objects => containing post details
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getUserPosts()
    }, [])
    return (
        <>
            {
                loading ? (
                    <div className="loading"> <Spinner animation="border" variant="primary" /> </div>
                ) : (
                    <div>
                        <h2 className="my-4 text-center">Your Posts</h2>
                        {posts.length ?
                            (posts.map((post) => {
                                return <PostsDisplay {...post} key={post._id} />
                            })) : (<h3 className="my-4 text-center">You haven't created any post yet</h3>)}
                    </div>
                )
            }
        </>
    )
}

export default Mypost