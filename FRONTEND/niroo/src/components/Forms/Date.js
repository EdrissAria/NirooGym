import React from 'react'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Field, ErrorMessage} from 'formik' 
import ErrorText from './ErrorText'
import FormControl from '../FormControl'

function Date(props) {
    const {name, label, ...rest} = props 
    return (
        <div className='form-group my-2'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} style={{width: '400px'}}>
                {
                    ({form, field})=>{
                        const {setFieldValue} = form 
                        const {value} = field
                        return <DateView name={name} {...field} {...rest} selected={value}
                        
                        onChange={(val)=>setFieldValue(name, val)} />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={ErrorText} />
        </div>
    )
}

export default Date
