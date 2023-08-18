import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Button, FloatingLabel, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useEditUserMutation } from "../ReduxState/appApi"
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../ReduxState/UserSlice';


function Profile() {
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState({
        userId:"",
        username: "",
        email: "",
        mobile: "",
        gender: ""
    })
    const [images, setImages] = useState(null)
    const [imgBtn, setImgBtn] = useState(false)
    const [removeImg, setRemoveImg] = useState(null)
    const [disableImg, setDisableImg] = useState(false)
    // const [editUserDetails, setEditUserDetails] = useState(false)
    const [disable, setDisable] = useState(true)
    const [editBtn, setEditBtn] = useState(false)
    const [updateBtn, setUpdateBtn] = useState(true)
    const dispatch = useDispatch()


    async function getUserProfile() {
        const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/users/${user._id}`)
        const userDetails = await res.json()
        // console.log(userDetails);
        setUserData((preVal) => {
            return { ...preVal,userId: userDetails._id ,username: userDetails.username, email: userDetails.email, mobile: userDetails.mobile, gender: userDetails.gender }
        })
        // console.log(userData);
        setImages(userDetails?.profilephoto[0])
        setImgBtn(true)
    }
    useEffect(() => {
        getUserProfile()
    }, [])

    function selectImg() {
        const cloudWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dmaqngqvx",
                uploadPreset: "uozi891b"
            },
            (err, result) => {
                if (!err && result.event === "success") {
                    setImages({ url: result.info.url, public_id: result.info.public_id })
                    setImgBtn(true)
                }
            }
        )
        cloudWidget.open()
    }

    async function deleteImage(deleteImg) {
        setRemoveImg(deleteImg.public_id);
        let res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/images/${deleteImg.public_id}`, {
            method: "DELETE"
        })
        setRemoveImg(null);
        setImages(null)
        setImgBtn(false)
    }

    const [editUser, { isError, error, isLoading, isSuccess }] = useEditUserMutation()

    function handleEditBtn(e) {
        e.preventDefault();
        setDisable(false)
        setEditBtn(true)
        setUpdateBtn(false)
        setDisableImg(true)
    }


    function handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target;
        setUserData((preVal) => {
            return { ...preVal, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const username = userData.username;
        const email = userData.email;
        const mobile = userData.mobile;
        const gender = userData.gender;
        const userId = userData.userId
        editUser({ userId, username, email, mobile, gender, images })
        
        setDisable(true)
        setEditBtn(false)
        setUpdateBtn(true)
    }


    async function deleteUser() {
        if (window.confirm("Are you sure about deleting your account?")) {
            const userId = user._id;
            const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/users/${userId}`, {
                method: "DELETE"
            })
            console.log(res);
            if (res.ok) {
                alert("User deleted successfully!!")
                dispatch(setLogout())
            }
        }
    }
    return (
        <div className='loginContainer'>
            <div className='formlog'>
                <h3>Your Profile</h3>
                <form>
                    {isSuccess && <Alert variant="success">Profile details updated successfully</Alert>}
                    {isError && <p className='errormsg'>{error.data}</p>}
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="username"
                            type="text"
                            placeholder="Username"
                            name='username'
                            value={userData.username}
                            onChange={handleChange}
                            disabled={disable}
                        />
                        <label htmlFor="username">Username</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            name='email'
                            value={userData.email}
                            disabled
                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="mobile"
                            type="number"
                            placeholder="Mobile number"
                            name='mobile'
                            value={userData.mobile}
                            onChange={handleChange}
                            disabled={disable}
                        />
                        <label htmlFor="mobile">Mobile Number</label>
                    </Form.Floating>
                    <FloatingLabel controlId="floatingSelect" label="Choose Gender" className="mb-4">
                        <Form.Select aria-label="Floating label select example" name='gender' value={userData.gender} onChange={handleChange} disabled={disable}>
                            <option>Open this select menu</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel className="mb-4">
                        <Button type="button" onClick={selectImg} disabled={imgBtn}>Upload Profile Photo</Button>
                        <div className="previewContainer">
                            {imgBtn && (
                                <div className="imgPreview" style={{ width: "300px", margin: "0 auto" }}>
                                    <img src={images?.url} alt="" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                                    {removeImg != images.public_id && disableImg && <AiOutlineMinusCircle className="deleteImg" style={{ position: "absolute", top: "0px", left: "30px" }} title='Delete Profile Photo' onClick={() => deleteImage(images)} />}
                                </div>
                            )}
                        </div>
                    </FloatingLabel>
                    {editBtn ||
                        <Button type="submit" variant="primary" className='me-2' onClick={handleEditBtn}>Edit</Button>
                    }
                    {updateBtn ||
                        <Button type="submit" variant="primary" className='me-2' disabled={isLoading} onClick={handleSubmit} >Update</Button>
                    }
                    <Button type="button" variant="danger" onClick={deleteUser}>Delete</Button>
                </form>
            </div>
        </div>
    )
}

export default Profile