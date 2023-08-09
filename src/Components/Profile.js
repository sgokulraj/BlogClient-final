import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useEditUserMutation, useDeleteUserMutation } from "../ReduxState/appApi"
import { useSelector, useDispatch } from 'react-redux';
import {setUserDelete} from "../ReduxState/UserSlice"

function Profile() {
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [disable, setDisable] = useState(true)
    const [editBtn, setEditBtn] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function getUser() {
        const res = await fetch(`http://localhost:5050/users/${user._id}`)
        const data = await res.json()
        console.log(data);
        setUsername(data.username)
        setEmail(data.email)
    }
    useEffect(() => {
        getUser()
    }, [])

    const [editUser, { isLoading, isError, isSuccess, error }] = useEditUserMutation()
    
    const [deleteUser, {status}] = useDeleteUserMutation()
    function handleEditBtn(e) {
        e.preventDefault();
        setDisable(false)
        setEditBtn(true)
    }

    async function handleUpdate(e) {
        e.preventDefault();
        editUser({ id: user._id, username, email })
        setDisable(true)
        setEditBtn(false)
    }

    function handleDelete(userId) {
        if (window.confirm("Are you sure about deleting your account")) {
            setDisable(true)
            setEditBtn(true)
            deleteUser(userId)
            if(status == 200){
                dispatch(setUserDelete())
                navigate("/login")
            }
        } else {
            setDisable(true)
            setEditBtn(false)
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

                    <Button type="submit" variant="secondary" className='me-2' onClick={handleEditBtn} disabled={editBtn}>Edit</Button>
                    <Button type="submit" variant="primary" className='me-2' onClick={handleUpdate} disabled={disable}>Update</Button>
                    <Button type="submit" variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                </form>
            </div>
        </div>
    )
}

export default Profile