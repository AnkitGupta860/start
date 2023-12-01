import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SignUp = ({}) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        validName: false,
        validEmail: false,
        validPassword: false,
        errors: {
            name: '',
            email: '',
            password: '',
        },
    });

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        const newName = e.target.value;
        validateName(newName);
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        validateEmail(newEmail);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        validatePassword(newPassword);
    };

    const validateName = (name) => {
        setState(prevState => ({
            ...prevState,
            name: name,
            validName: name.length >= 3,
            errors: { ...prevState.errors, name: name.length < 3 ? "Name length should be greater than 3" : '' }
        }));
    }

    const validateEmail = (email) => {
        setState(prevState => ({
            ...prevState,
            email: email,
            validEmail: /^\S+@\S+\.\S+$/.test(email),
            errors: { ...prevState.errors, email: /^\S+@\S+\.\S+$/.test(email) ? '' : 'Enter a valid email address' }
        }));
    };

    const validatePassword = (password) => {
        setState(prevState => ({
            ...prevState,
            password: password,
            validPassword: password.length >= 6,
            errors: { ...prevState.errors, password: password.length < 6 ? 'Password must be at least 6 characters' : '' }
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        switch (name) {
            case 'name':
                validateName(state.name);
                break;
            case 'email':
                validateEmail(state.email);
                break;
            case 'password':
                validatePassword(state.password);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async () => {
        if (!state.validName) {
            validateName(state.name);
        }
        if (!state.validEmail) {
            validateEmail(state.email);
        }
        if (!state.validPassword) {
            validatePassword(state.password);
        }

        if(state.validName && state.validEmail && state.validPassword)
        {
            let result = await fetch('http://localhost:8000/registration',{
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
            },
            })

            result = await result.json();
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");
        }

    };

    const { name, email, password, errors } = state;

    return (
        <div className='register'>
            <h1>Register</h1>

            <input
                className='inputBox'
                type='text'
                name="name"
                value={name}
                onChange={handleNameChange}
                onBlur={handleBlur}
                placeholder='Enter Name'
            />
            <span className="invalid-input">{errors.name}</span>

            <input
                className='inputBox'
                type='text'
                name="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                placeholder='Enter Email'
            />
            <span className="invalid-input">{errors.email}</span>

            <input
                className='inputBox'
                type='password'
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handleBlur}
                placeholder='Enter Password'
            />
            <span className="invalid-input">{errors.password}</span>

            <button className="appButton" type='button' onClick={handleSubmit}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;

