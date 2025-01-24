import React from 'react'

const BinaryInput = ({ heading, getter, setter }) => {
    return (
        <div className={`flex text-lg gap-4`}>
            <button className={`h-3/4 w-10 self-center p-1 rounded-full flex ${getter ? 'justify-end bg-green-500' : 'justify-start bg-red-500'}`} onClick={() => setter(!getter)}>
                <div className='bg-white rounded-full h-4 w-4 ml-1 mr-1 self-center'>
                </div>
            </button>
            <span className='bg-white rounded-lg pl-2 pr-2'>{heading}</span>
        </div>
    )
}

export default BinaryInput