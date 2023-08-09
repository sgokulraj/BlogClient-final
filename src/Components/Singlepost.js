import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import "../Stylesheets/Singlepost.css"
import { MdMail } from "react-icons/md"
import { useDeletePostMutation } from "../ReduxState/appApi"

function Singlepost() {
    const { id } = useParams()
    const [singlePost, setSinglePost] = useState(null)
    const user = useSelector((state) => state.user)
    const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation()
    const navigate = useNavigate()


    async function getSinglePost() {
        const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/posts/${id}`)
        const data = await res.json()
        setSinglePost(data)
        console.log(user);
    }

    useEffect(() => {
        getSinglePost()
    }, [id])

    function deleteMyPost(postId, userId) {
        if (window.confirm("Are you sure about it?")) {
            deletePost({ postId, userId })
        }
    }

    if (isSuccess) {
        navigate("/posts")
    }


    return (
        <div className="singlepost">
            <h1 className="title">{singlePost?.title}</h1>
            <p className="singlepostauthor">
                <span>Created By @{singlePost?.author?.username}</span>{" "}
            </p>
            {user._id === singlePost?.author?._id ? (
                <div className="editContainer">
                    <Link to={`/edit/${singlePost?._id}`}>
                        <AiFillEdit className="editpostBtn" />
                    </Link>
                    <Link>
                        <AiFillDelete
                            className="editpostBtn"
                            onClick={() => deleteMyPost(singlePost?._id, user._id)}
                            disabled={isLoading}
                        />
                    </Link>
                </div>
            ) : (
                <div className="text-center my-3">
                    <a href={`mailto:${singlePost?.author?.email}`}>
                        Contact me @<MdMail style={{ fontSize: "20px" }} />
                    </a>
                </div>
            )}
            <div className="imgContain">
                <img src={singlePost?.cover[0]?.url} alt="img" />
            </div>
            <div className="desc">
                <div dangerouslySetInnerHTML={{ __html: singlePost?.description }} />
            </div>
        </div>
    )
}

export default Singlepost