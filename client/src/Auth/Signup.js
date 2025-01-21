import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react'
import Button from '../Utilities/Button';
import profilePic from '../Assets/default_profile.png'

const Signup = () => {
    const imageInputRef = useRef(null);
    const [image, setImage] = useState(profilePic/* "https://www.pngitem.com/pimgs/m/228-2289292_share-friends-circle-hd-png-download.png" */);
    const [changedImage, setChangedImage] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [match, setMatch] = useState(false);
    const relocate = useNavigate();
    const handleFileChange = (event) => {
        setChangedImage(true);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;

                img.onload = () => {

                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 200;
                    const MAX_HEIGHT = 200;
                    let width = img.width;
                    let height = img.height;


                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }


                    canvas.width = width;
                    canvas.height = height;


                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);


                    const base64String = canvas.toDataURL("image/jpeg", 0.7);
                    setImage(base64String);
                };
            };

            reader.readAsDataURL(file);
        } else {
            alert('No file selected');
        }
    };

    const submit = async () => {
        const profilePicture = changedImage ? image : null;
        try {
            const response = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, profilePicture }),
            });
            const res = await response.json();
            if (response.status === 201) {
                relocate("/");
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
        <div className='flex gap-4'>
            <div className='flex flex-col border-2 rounded-md bg-zinc-600 opacity-70 h-fit w-fit p align-center'>
                <div className='flex flex-col self-center p-4 gap-2 items-center'>
                    <h1 className='text-4xl'>Sign Up</h1>
                    <div>
                        <div className='text-xl text-semibold'>Name</div>
                        <input required className='p-1 rounded-md outline-0' type="text" placeholder='Name' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <div className='text-xl text-semibold'>Email</div>
                        <input required className='p-1 rounded-md outline-0' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <div className='text-xl text-semibold'>Password</div>
                        <input required className='p-1 rounded-md outline-0' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <div className='text-xl text-semibold'>Confirm Password</div>
                        <input required className='p-1 rounded-md outline-0' type="password" placeholder='Password' onChange={(e) => {
                            let pass = e.target.value;
                            if (pass === password)
                                setMatch(true);
                            else setMatch(false);
                        }}
                            disabled={!password}
                        />
                        <div className='h-4'>
                            {match && password !== "" && <div className='text-green-500'>✔️matches</div>}
                            {!match && password !== "" && <div className='text-red-500'>❌does not match</div>}
                        </div>
                    </div>

                    <div>
                        <Button type="submit" data="Sign Up" click={submit} />
                    </div>
                    <div>
                        <div className='text-blue-300 hover:text-blue-500' ><Link to="/">Already have an account?</Link></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-8">
                <input
                    ref={imageInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <Button
                    type="button"
                    newStyle="cursor-pointer bg-slate-500 text-white font-md py-2 px-4 rounded-md hover:bg-gray-600 h-content"
                    click={() => imageInputRef.current.click()}
                    data={"Upload Profile Picture"}
                />
                <div className='h-32 w-32 bg-slate-300 rounded-full overflow-hidden'>
                    <img alt="profile" src={image} className="object-scale-down w-full h-full" />
                </div>
                <Button
                    type={"button"}
                    newStyle="cursor-pointer bg-red-500 text-white font-md py-2 px-4 rounded-md hover:bg-gray-600 h-content"
                    click={() => {
                        imageInputRef.current.value = '';
                        setImage(profilePic);
                        setChangedImage(false);
                    }}
                    data="Clear"
                />
            </div>
        </div>
    )
}

export default Signup;