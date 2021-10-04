import React from 'react'
import { Field, ErrorMessage } from 'formik'
import ErrorText from './ErrorText'
import * as api from '../Api'
import { useMutation } from 'react-query'

function ReceiptInput(props) {
    const { name, placeholder, formik, ...rest } = props
    
    return (
        <>
            <Field className='receipt' placeholder={placeholder} name={name} id={name} {...rest} />
            <button type="submit" disabled={!formik.isValid} className="receipt-btn" >Add</button>
            <ErrorMessage name={name} component={ErrorText} />
        </>
    )
}

export default ReceiptInput
