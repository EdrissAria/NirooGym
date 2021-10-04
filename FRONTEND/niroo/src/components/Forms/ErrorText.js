import React from 'react'

function ErrorText(props) {
    return (
        <div className="text-danger">
            {props.children}
        </div>
    )
}

export default ErrorText
