import React from 'react'
import { useState } from 'react/cjs/react.development'
import RegisterdAgree from '../components/RegisterdAgree'
import RegisterdReg from '../components/RegisterdReg'

function RegisterdTime() {
    const [link, setlink] = useState('Agreement Times');

    const handleclick = ()=>{
        link != 'regular Times'?setlink('regular Times'):setlink('Agreement Times');
    }
    return (
    <div className="addpro_form">
        <div className="container">
            <div className="row">
                    <div className="col lg-5">
                        <div className="user_name">
                            <h2>View Your Registerd Times <strong>(</strong>{
                                link != 'regular Times'?'regular Times':'Agreement Times'
                            }<strong>)</strong></h2>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="add_link">
                            <button onClick={handleclick} className="btn btn-secondary btn-block">{link}</button>
                        </div>
                    </div>
                </div>
                <div className="add_time">
                {
                    link != 'regular Times'?<RegisterdReg />:<RegisterdAgree />
                }
            </div>
        </div>
    </div>
    )
}

export default RegisterdTime
