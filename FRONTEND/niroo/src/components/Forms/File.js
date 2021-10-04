import React from 'react'
import {ErrorMessage, Field} from 'formik' 
import ErrorText from './ErrorText'

function File(props) {
    const {name, label, formik, ...rest} = props
    return (
        <div className='form-group my-2'>
            <label htmlFor={name}>{label}</label>
            <input type='file' className='form-control' name={name} id={name}
            onChange={(e)=> formik.setFieldValue(name,e.target.files[0])}
            {...rest} />
            <ErrorMessage name={name} component={ErrorText} />
        </div>
    )
}

export default File
