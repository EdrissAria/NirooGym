import React from 'react'
import { Link } from 'react-router-dom'

function Title(props) {
    const {linkTo, title, buttonValue, subTitle} = props
    return (
        <div className="row">
            <div className="col lg-5">
                <div className="user_name">
                    <h2>{title} <strong>{subTitle}</strong></h2>
                </div>
            </div>
            <div className="col-lg-3 offset-lg-4">
                <div className="add_link">
                    <Link to={linkTo} className="btn btn-secondary btn-block">{buttonValue}</Link>
                </div>
            </div>
        </div>
    )
}

export default Title
