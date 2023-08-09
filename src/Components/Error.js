import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../ReduxState/UserSlice';
import {useNavigate} from "react-router-dom"


function Error(){
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function loggedin(){
        dispatch(setLogout())
        navigate("/")
    }
    return (
        <div>
            <span>Page not found</span>{" "}
            <span onClick={loggedin} style={{textDecoration:"underline", color:"blue", cursor:"pointer"}}>Click here to login</span>
        </div>
        
    )
}


export default Error