import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useEditUserMutation, useDeleteUserMutation } from "../ReduxState/appApi"
import { useSelector } from 'react-redux';


function Profile() {
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [disable, setDisable] = useState(true)
    const [editBtn, setEditBtn] = useState(false)
    const [updateBtn, setUpdateBtn] = useState(true)

    async function getUser() {
        const res = await fetch(`https://odd-cyan-chameleon-sock.cyclic.app/users/${user._id}`)
        const data = await res.json()
        console.log(data);
        setUsername(data.username)
        setEmail(data.email)
    }
    useEffect(() => {
        getUser()
    }, [])

    const [editUser, { isLoading, isError, isSuccess, error }] = useEditUserMutation()

    // const [deleteUser] = useDeleteUserMutation()
    function handleEditBtn(e) {
        e.preventDefault();
        setDisable(false)
        setEditBtn(true)
        setUpdateBtn(false)
    }

    async function handleUpdate(e) {
        e.preventDefault();
        editUser({ id: user._id, username, email })
        setDisable(true)
        setEditBtn(false)
        setUpdateBtn(true)
    }

    // function handleDelete(userId) {
    //     if (window.confirm("Are you sure about deleting your account")) {
    //         setDisable(true)
    //         setEditBtn(true)
    //         deleteUser(userId)
    //     } else {
    //         setDisable(true)
    //         setEditBtn(false)
    //     }
    // }

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


                    {editBtn ||
                        <Button type="submit" variant="primary" className='me-2' onClick={handleEditBtn}>Edit</Button>
                    }
                    {updateBtn ||
                        <Button type="submit" variant="primary" className='me-2' onClick={handleUpdate} >Update</Button>
                    }
                    {/* <Button type="submit" variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button> */}
                </form>
            </div>
        </div>
    )
}

export default Profile