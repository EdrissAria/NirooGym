import React from 'react'
import ErrorText from './ErrorText'
import {Field, ErrorMessage} from 'formik'

function Select(props) {
    const {name, label, options, ...rest} = props
    return (
        <div className='form-group my-2'>
            <label>{label}</label>
            <Field name={name} {...rest} className='form-control'>
                {
                    options.map(option =>{
                        return (
                            <React.Fragment key={option.value}>
                                <option value={option.value}>{option.key}</option>
                            </React.Fragment>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={ErrorText}/>
        </div>
    )
}

export default Select
