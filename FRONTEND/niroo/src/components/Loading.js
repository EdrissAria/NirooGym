import React from 'react'

function Loading({size}) {
    const loading = {
        fontSize: size,
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='loading' style={loading}>Loading...</div>
        </div>
    )
}

export default Loading
