import React, { useContext, useRef, useState } from 'react'
import DetailInput from '../../Utilities/DetailInput';
import Tag from './Tag';
import Button from '../../Utilities/Button'
import BinaryInput from '../../Utilities/BinaryInput';
import { userContext } from '../Layout'


const AddPost = () => {
    const [user] = useState(useContext(userContext));
    const fileUpload = useRef(null);
    const [uploadedImage, setUploadedImage] = useState();
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postTag, setPostTag] = useState("");
    const [allowComments, setAllowComments] = useState(true);
    const [postTags, setPostTags] = useState([]);
    const addTag = () => {
        if (postTags.indexOf(postTag) !== -1)
            return;
        setPostTags([...postTags, postTag]);
        setPostTag("");
    }

    const removeTag = ({ index }) => {
        if (postTags.length === 1) {
            setPostTags([]);
        }
        else {
            const temp = [...postTags];
            temp.splice(index, 1);
            setPostTags(temp);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;
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
                    setUploadedImage(base64String);
                };
            };
            reader.readAsDataURL(file);
        } else {
            alert('No file selected');
        }
    };

    const publishPost = async () => {
        /* Implement the check for empty strings and null values */
        try {
            const response = await fetch("http://localhost:3001/publishpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: user._id, postTitle, postDescription, postTags, allowComments, uploadedImage })
            });
            const res = await response.json();
            if (response.status === 201) {
                alert(res);
            }
            else {
                throw new Error(res);
            }
        } catch (error) {
            alert(`Error: ${error}`)
        }
    }

    return (
        <div className='flex h-full p-2 gap-2 border'>
            <div className='flex flex-col w-1/2 justify-between '>
                <div className='grow flex justify-center items-center'>
                    {uploadedImage ? <img alt="Upload Here" src={uploadedImage} className="object-scale-down max-h-full max-w-full" /> : <div className="object-scale-down w-full h-full"></div>}
                </div>
                <input ref={fileUpload} type='file' className='hidden' onChange={handleFileChange} />
                <button className='text-lg bg-red-500 w-1/4 p-2 text-white rounded-md hover:bg-red-700 self-center' onClick={() => fileUpload.current.click()} >Add Image</button>
            </div>
            <div className='flex flex-col gap-2 p-2 w-1/2 min-h-full overflow-y-scroll'>
                <div className='self-end'>
                    <Button type={"button"} click={publishPost} data={"Publish"} newStyle={"p-1 pl-4 pr-4 rounded-full text-2xl text-white bg-sky-400 hover:bg-sky-600"} />
                </div>
                <DetailInput heading={"Post Title"} placeholder={"Enter Title"} getter={postTitle} setter={setPostTitle} />
                <DetailInput heading={"Post Description"} placeholder={"Enter Description"} getter={postDescription} setter={setPostDescription} singleLine={true} />
                <BinaryInput heading={"Comments"} getter={allowComments} setter={setAllowComments} />
                <DetailInput heading={"Tags"} placeholder={"Enter Tags"} getter={postTag} setter={setPostTag} />
                <Button type={"button"} click={addTag} data={"Add Tag"} newStyle={"p-2 pl-4 pr-4 rounded-md text-white bg-sky-400 hover:bg-sky-600"} />
                <ul className='flex flex-wrap w-full gap-2'>
                    {postTags.map((tag, index) => {
                        return (
                            <li key={index}>
                                <Tag tag={tag} index={index} removeTag={removeTag} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AddPost