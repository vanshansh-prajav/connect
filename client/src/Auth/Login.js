import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Utilities/Button';
import BinaryInput from '../Utilities/BinaryInput';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLogIn, setKeepLogIn] = useState(false);
    const relocate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userData');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            relocate("/home", { state: { user, keepLogin: true } });
        }
    }, [relocate])

    const submit = async () => {
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const res = await response.json();
            if (response.status === 201) {
                relocate("/home", { state: { user: res.user, keepLogin: keepLogIn } });
            }
            else {
                throw new Error(res);
            }
        }
        catch (e) {
            alert(`Error: ${e}`);
        }
    }
    return (
        <div className='flex flex-col border-2 rounded-md bg-zinc-600 opacity-80 h-fit w-fit align-center'>
            <div className='flex flex-col self-center p-4 gap-2 items-center'>
                <h1 className='text-4xl'>Login</h1>
                <div>
                    <div className='text-xl text-semibold'>Email</div>
                    <input className='p-1 rounded-md outline-0' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <div className='text-xl text-semibold'>Password</div>
                    <input className='p-1 rounded-md outline-0' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <BinaryInput heading={"Keep Logged In"} getter={keepLogIn} setter={setKeepLogIn} />
                </div>
                <div>
                    <Button type="submit" data="Login" click={submit} />
                </div>
                <div>
                    <div className='text-blue-300 hover:text-blue-500'><Link to="/signup">Dont have an account?</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login