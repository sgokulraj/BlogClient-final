import "../Stylesheets/Postsdisplay.css"
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi"
import { BsArrowReturnRight } from "react-icons/bs"
import { setPost } from "../ReduxState/PostSlice"
import { useUpdateLikesMutation, useUpdateCommentsMutation } from "../ReduxState/appApi"
import { useState } from "react"



function PostsDisplay({ _id, title, summary, cover, description, createdAt, author, likes, comments }) {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [updateLikes] = useUpdateLikesMutation()
    const [cmt, setCmt] = useState("")

    function handleAuthenticate() {
        if (user) {
            navigate(`/post/${_id}`)
        } else {
            navigate("/login")
        }
    }

    const userId = user._id
    const [isComments, setIsComments] = useState(false);

    let isLiked;
    let likesCount
    if (likes) {
        isLiked = Boolean(likes[userId]);
        likesCount = Object.keys(likes).length;
    }

    async function likePostUpdate() {
        const postId = _id
        const res = await updateLikes({ postId, userId })
        const data = await res?.data
        // dispatch(setPost({ post: data }))
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateComments] = useUpdateCommentsMutation()

    async function sendComment() {
        if (cmt.length > 0) {
            const postId = _id
            // const commentDetails = { loggedUser: userId, username: user.username, email: user.email, comment: cmt }
            const loggedUser = userId;
            const username = user.username;
            const email = user.email;
            const comment = cmt;
            const res = await updateComments({ postId, loggedUser, username, email, comment })
            const data = await res?.data
            // dispatch(setPost({ post: data }))
            if(data){
                setCmt("")
            }

        } else {
            alert("Enter something to save your comment")
        }
    }
    return (
        <section>
            <div onClick={handleAuthenticate} className="displayPost">
                <div className="post">
                    <div className="imageContainer">
                        <img src={cover[0].url} alt="img" />
                    </div>
                    <div className="info">
                        <h2>{title}</h2>
                        <p className="authorAll">
                            <span>{author?.username}</span>
                            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
                        </p>
                        <p className="summary">{summary}</p>
                    </div>
                </div>
            </div>
            <div className="postImpressed" style={{ marginTop: "8px", paddingLeft:"20px", marginLeft:"20px"}}>
                <div className="postImpressed" style={{ gap: "25px" }}>
                    <div className="postImpressed" style={{ gap: "5px" }}>
                        <p onClick={likePostUpdate}>
                            {isLiked ? (
                                <MdOutlineFavorite className="likes" style={{ fontSize: "20px", cursor: "pointer" }} />
                            ) : (
                                <MdOutlineFavoriteBorder style={{ fontSize: "20px", cursor: "pointer" }} />
                            )}
                        </p>
                        <p>{likesCount}</p>
                    </div>
                    <div className="postImpressed" style={{ gap: "5px" }}>
                        <p onClick={() => setIsComments(!isComments)}>
                            <FaRegComment style={{ fontSize: "20px", cursor: "pointer" }} />
                        </p>
                        <p>{comments ? comments.length : ""}</p>
                    </div>
                </div>
            </div>
            {isComments && (
                <div className="commentContainer">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <input type="text" maxLength={100} placeholder="Enter your comments" name="cmt" style={{ width: "80%", border: "none", outline: "none", borderBottom: "1px solid black" }} value={cmt} onChange={(e) => setCmt(e.target.value)}
                        />
                        <BiSolidSend style={{ fontSize: "20px", cursor: "pointer" }} onClick={sendComment} />
                    </div>
                    <h5 className="my-3">Comments</h5>
                    {comments?.map((com, index) => (
                        <div key={index}>
                            <p className="comment" style={{ fontWeight: "600", color: "blue" }} title={com.email}>{com.username}</p>
                            <p className="mx-5"><BsArrowReturnRight style={{ marginTop: "-3px" }} /> {com.comment}</p>
                        </div>
                    ))}
                </div>
            )}
            <hr />
        </section>
    )
}


export default PostsDisplay