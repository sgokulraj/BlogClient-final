import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Button, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useRef, useEffect, useState } from 'react';
import { useSignupMutation } from "../ReduxState/appApi"
import {AiOutlineMinusCircle} from "react-icons/ai"

function Signup() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const password = useRef("");
    password.current = watch("password");
    const [images, setImages] = useState(null)
    const [imgBtn, setImgBtn] = useState(false)
    const [removeImg, setRemoveImg] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset]);


    const validation = {
        username: {
            required: {
                value: true,
                message: "Enter username",
            },
        },
        email: {
            required: {
                value: true,
                message: "Enter Email",
            },
            pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Enter valid Email address",
            },
        },
        password: {
            required: {
                value: true,
                message: "Enter Password",
            },
            minLength: {
                value: 6,
                message: "Your password should contain atleast 6 characters",
            },
        },
        confirm: {
            required: {
                value: true,
                message: "Confirm Password",
            },
            minLength: {
                value: 6,
                message: "Your password should contain atleast 6 characters",
            },
            validate: (value) => {
                if (value !== password.current) {
                    return "The passwords doesn't match";
                }
            },
        },
        mobile: {
            required: {
                value: true,
                message: "Enter Phonenumber",
            },
            pattern: {
                value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: "Enter valid phone number",
            },
        },
        gender: {
            required: {
                value: true,
                message: "Select Gender",
            },
        },
    }

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


    const [signup, { isError, error, isLoading }] = useSignupMutation()
    return (
        <div className='loginContainer'>
            <div className='formlog'>
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit(async (data, e) => {
                    e.preventDefault();
                    const username = data.username;
                    const email = data.email;
                    const password = data.password;
                    const mobile = data.mobile;
                    const gender = data.gender;

                    signup({ username, email, password, mobile, gender, images })

                    if (!isError) {
                        alert("Registered Successfully")
                        navigate("/login")
                    }

                })}>
                    {isError && <p className='errormsg'>{error.data}</p>}
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="username"
                            type="text"
                            placeholder="Username"
                            name='username'
                            {...register("username", validation.username)}

                        />
                        <label htmlFor="username">Username</label>
                        <p className="errormsg" style={{textAlign: "left"}}>
                            {errors.username && errors.username.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            name='email'
                            {...register("email", validation.email)}

                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                        <p className="errormsg" style={{textAlign: "left"}}>
                            {errors.email && errors.email.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="password"
                            type="password"
                            placeholder="Password"
                            name='password'
                            {...register("password", validation.password)}

                        />
                        <label htmlFor="password">Password</label>
                        <p className="errormsg" style={{textAlign: "left"}}>
                            {errors.password && errors.password.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="confirm"
                            type="password"
                            placeholder="Confirm Password"
                            name='confirm'
                            {...register("confirm", validation.confirm)}
                        />
                        <label htmlFor="confirm">Confirm Password</label>
                        <p className="errormsg" style={{textAlign: "left"}}>
                            {errors.confirm && errors.confirm.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="mobile"
                            type="number"
                            placeholder="Mobile number"
                            name='mobile'
                            {...register("mobile", validation.mobile)}
                        />
                        <label htmlFor="mobile">Mobile Number</label>
                        <p className="errormsg" style={{textAlign: "left"}}>
                            {errors.mobile && errors.mobile.message}
                        </p>
                    </Form.Floating>
                    <FloatingLabel controlId="floatingSelect" label="Choose Gender" className="mb-4">
                        <Form.Select aria-label="Floating label select example" name='gender' {...register("gender", validation.gender)}>
                            <option>Open this select menu</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </Form.Select>
                    </FloatingLabel>
                    <p className="errormsg mb-3" style={{textAlign: "left"}}>
                        {errors.gender && errors.gender.message}
                    </p>
                    <FloatingLabel className="mb-4">
                        <Button type="button" onClick={selectImg} disabled={imgBtn}>Upload Profile Photo</Button>
                        <div className="previewContainer">
                            {imgBtn && (
                                <div className="imgPreview" style={{ width: "300px", margin: "0 auto" }}>
                                    <img src={images?.url} alt="image" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                                    {removeImg != images.public_id && <AiOutlineMinusCircle className="deleteImg" style={{ position: "absolute", top: "0px", left: "30px" }} title='Delete Profile Photo' onClick={() => deleteImage(images)} />}
                                </div>
                            )}
                        </div>
                    </FloatingLabel>
                    <Button type="submit" variant="primary" className='me-2' disabled={isLoading}>Submit</Button>
                    <Button type="reset" variant="secondary">Reset</Button>
                    <p className='mt-2'>Have an account? <Link to="/login">Click here to Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup