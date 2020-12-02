import React, { useState } from 'react'

function TextInput ({placeholder, onChange}) {
    return (
        <input placeholder={placeholder} onChange={onChange}/>
    )
}

export default TextInput