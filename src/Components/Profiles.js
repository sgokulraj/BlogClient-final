import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Button, Alert, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useEditUserMutation } from "../ReduxState/appApi"
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { setLogout } from "../ReduxState/UserSlice"
import { setEmpty } from '../ReduxState/PostSlice';

function Profile() {
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [mobile, setMobile] = useState(null)
    const [images, setImages] = useState(null)
    const [imgBtn, setImgBtn] = useState(false)
    const [removeImg, setRemoveImg] = useState(null)
    const [disable, setDisable] = useState(true)
    const [editBtn, setEditBtn] = useState(false)
    const [updateBtn, setUpdateBtn] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function getUser() {
        const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/users/${user._id}`)
        const data = await res.json()
        console.log(data);
        setUsername(data?.username)
        setEmail(data?.email)
        setGender(data?.gender)
        setMobile(data?.mobile)
        setImages(data?.profilephoto[0])
        setImgBtn(true)
    }
    useEffect(() => {
        getUser()
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

    const [editUser, { isLoading, isError, isSuccess, error }] = useEditUserMutation()

    function handleEditBtn(e) {
        e.preventDefault();
        setDisable(false)
        setEditBtn(true)
        setUpdateBtn(false)
    }

    async function handleUpdate(e) {
        e.preventDefault();
        editUser({ id: user._id, username, email, gender, mobile, images })
        setDisable(true)
        setEditBtn(false)
        setUpdateBtn(true)
    }

    async function handleDelete() {
        if (window.confirm("Are you sure about deleting your account?")) {
            const userId = user._id;
            console.log(userId);
            const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/users/${userId}`, {
                method: "DELETE"
            })
            console.log(res);
            if (res.ok) {
                dispatch(setLogout())
                dispatch(setEmpty())
                alert("User deleted successfully!!")
                navigate("/login")
            }
        }
    }

    return (
        <div className='loginContainer'>
            <div className='formlog'>
                <h3>Profile Details</h3>
                {isSuccess && <Alert variant="success">Profile updated successfully</Alert>}
                {isError && <Alert variant="danger">{error.data}</Alert>}
                <form>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="username"
                            type="text"
                            placeholder="Username"
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={email}
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
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            disabled={disable}
                        />
                        <label htmlFor="mobile">Mobile Number</label>
                    </Form.Floating>
                    <FloatingLabel controlId="floatingSelect" label="Choose Gender" className="mb-4">
                        <Form.Select aria-label="Floating label select example" name='gender' value={gender} onChange={(e) => setGender(e.target.value)} disabled={disable}>
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
                                    <img src={images?.url} alt="image" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                                    {removeImg != images?.public_id && <AiOutlineMinusCircle className="deleteImg" style={{ position: "absolute", top: "0px", left: "30px" }} title='Delete Profile Photo' onClick={() => deleteImage(images)} />}
                                </div>
                            )}
                        </div>
                    </FloatingLabel>

                    {editBtn ||
                        <Button type="submit" variant="primary" className='me-2' onClick={handleEditBtn}>Edit</Button>
                    }
                    {updateBtn ||
                        <Button type="submit" variant="primary" className='me-2' onClick={handleUpdate} >Update</Button>
                    }
                    <Button type="submit" variant="danger" onClick={handleDelete}>Delete</Button>
                </form>
            </div>
        </div>
    )
}

export default Profile