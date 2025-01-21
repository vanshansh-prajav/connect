import React from 'react'

const Detail = ({ heading, singleLine, placeholder, setter, getter }) => {
  singleLine = singleLine !== undefined;

  return (
    <div className={`flex flex-col text-md`}>
      <span>{heading}</span>

      {singleLine ?
        <textarea className={`shrink-0 rounded-xl text-2xl border-2 p-1 pl-2 pr-2 h-64 text-balance overflow-y-auto resize-none`}
          rows={5}
          value={getter}
          placeholder={placeholder}
          onChange={(e) => setter(e.target.value)}
        ></textarea> :
        <input type='text' placeholder={placeholder} className={`shrink-0 rounded-xl text-2xl border-2 p-1 pl-2 pr-2`} value={getter} onChange={(e) => {setter(e.target.value);}} />
      }
    </div>
  )
}

export default Detail