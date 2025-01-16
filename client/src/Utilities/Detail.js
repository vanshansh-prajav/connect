import React from 'react'

const Detail = ({ heading, value, singleLine }) => {
  singleLine = singleLine !== undefined;
  return (
    <div className={`flex flex-col text-md p-2 ${singleLine ? 'grow-[3]' : ''}`}>
      <span>{heading}</span>

      {singleLine ?
        <textarea className={`rounded-xl text-2xl border-2 p-1 pl-2 pr-2 text-balance ${singleLine ? 'h-full' : ''} overflow-y-auto resize-none`}
          rows={5}
          value={value}
          placeholder="Bio"
        ></textarea>:
        <input type='text' className={`rounded-xl text-2xl border-2 p-1 pl-2 pr-2`} value={value} /> 
      }
    </div>
  )
}

export default Detail