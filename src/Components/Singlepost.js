import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "../Stylesheets/Singlepost.css"
import { useDeletePostMutation  } from "../ReduxState/appApi"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from "react-bootstrap";

import { setPosts } from "../ReduxState/PostSlice"

function Singlepost() {
    const { id } = useParams()
    const [singlePost, setSinglePost] = useState(null)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getSinglePost() {
        const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/posts/${id}`)
        const data = await res.json()
        setSinglePost(data)
        dispatch(setPosts({ data }))
    }

    useEffect(() => {
        getSinglePost()
    }, [id])

    // useEffect(()=>{
    //     getSinglePost()
    // }, [setPost])

    function deleteMyPost(postId, userId) {
        if (window.confirm("Are you sure about it?")) {
            deletePost({ postId, userId })
        }
    }

    if (isSuccess) {
        navigate("/posts")
    }

    // const userId = user._id
    // const [isComments, setIsComments] = useState(false);


    // let isLiked;
    // let likesCount
    // let likes = singlePost?.likes
    // if (likes) {
    //     isLiked = Boolean(likes[userId]);
    //     likesCount = Object.keys(likes).length;
    // }

    // async function likePostUpdate() {
    //     const postId = singlePost?._id
    //     const res = await updateLikes({ postId, userId })
    //     const data = await res?.data
    //     console.log(data);
    //     dispatch(setPosts({ data }))
    //     navigate("/")
    // }


    // const [updateComments] = useUpdateCommentsMutation()
    // const comments = singlePost?.comments

    // async function sendComment() {
    //     if (cmt.length > 0) {
    //         const postId = singlePost?._id
    //         // const commentDetails = { loggedUser: userId, username: user.username, email: user.email, comment: cmt }
    //         const loggedUser = userId;
    //         const username = user.username;
    //         const email = user.email;
    //         const comment = cmt;
    //         const res = await updateComments({ postId, loggedUser, username, email, comment })
    //         const data = await res?.data
    //         dispatch(setPosts({ data }))
    //         navigate("/")


    //     } else {
    //         alert("Enter something to save your comment")
    //     }
    // }

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
                <>
                    <div className="text-center my-3" style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                        {/* <a href={`mailto:${singlePost?.author?.email}`}>
                        Contact me @<MdMail style={{ fontSize: "20px" }} />
                    </a> */}
                        <img src={singlePost?.author?.profilephoto[0]?.url} alt="" style={{ width: "30px", height: "30px", objectFit: "cover", borderRadius: "50%", alignItems: "center", marginRight: "10px" }} />
                        <p style={{ textDecoration: "underline", color: "blue", cursor: "pointer", marginBottom: "0px" }} onClick={handleShow}>View Author details</p>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Author Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className="mb-2">
                                    <Col>Author Name</Col>
                                    <Col>{singlePost?.author?.username}</Col>
                                </Row>
                                <Row>
                                    <Col>Email</Col>
                                    <Col><a href={`mailto:${singlePost?.author?.email}`}>{singlePost?.author?.email}</a></Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
            <div className="imgContain">
                <img src={singlePost?.cover[0]?.url} alt="img" style={{ objectFit: "cover" }} />
            </div>
            <div className="desc">
                <div dangerouslySetInnerHTML={{ __html: singlePost?.description }} />
            </div>
            {/* <hr />
            <div className="postImpressed" style={{ marginTop: "8px" }}>
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
            <div className="commentContainer">
                {isComments && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <input type="text" maxLength={100} placeholder="Enter your comments" name="cmt" style={{ width: "80%", border: "none", outline: "none", borderBottom: "1px solid black" }} value={cmt} onChange={(e) => setCmt(e.target.value)}
                        />
                        <BiSolidSend style={{ fontSize: "20px", cursor: "pointer" }} onClick={sendComment} />
                    </div>
                )}
                <h5 className="my-3">Comments</h5>
                {comments?.map((com, index) => (
                    <div key={index}>
                        <p className="comment" style={{ fontWeight: "600", color: "blue" }} title={com.email}>{com.username}</p>
                        <p className="mx-5"><BsArrowReturnRight  style={{marginTop:"-3px"}}/> {com.comment}</p>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Singlepost