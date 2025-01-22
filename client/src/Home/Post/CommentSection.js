import React from 'react'
import Comment from './Comment'

const CommentSection = ({ id, comments }) => {
    return (
        <div className='max-h-full bg-gray-200 overflow-y-scroll'>
            <ul>
                {comments.map((comment, index) => {
                    return (
                        <li key={index}>
                            <Comment comment={comment} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CommentSection