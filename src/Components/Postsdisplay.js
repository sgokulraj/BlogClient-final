import "../Stylesheets/Postsdisplay.css"
import {useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";


function PostsDisplay({ _id, title, summary, cover, description, createdAt, author }) {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    function handleAuthenticate(){
        if(user){
            navigate(`/post/${_id}`)
        }else{
            navigate("/login")
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
        </section>
    )
}


export default PostsDisplay