import React from 'react'
import { Field, ErrorMessage } from 'formik'
import ErrorText from './ErrorText'
import * as api from '../Api'
import { useMutation } from 'react-query'

function Input(props) {
    const { name, label, placeholder, ...rest } = props
    
    return (
        <div className='form-group my-2'>
            <label htmlFor={name}>{label}</label>
            <Field className='form-control' placeholder={placeholder} name={name} id={name} {...rest} />
            <ErrorMessage name={name} component={ErrorText} />
        </div>
    )
}

export default Input
