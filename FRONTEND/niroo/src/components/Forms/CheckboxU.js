import React, {useState} from 'react'
import { Field, ErrorMessage } from 'formik'
import ErrorText from './ErrorText'

function CheckboxU(props) {
    const [check, setcheck] = useState(false);
    const { name, label, options, selected, ...rest } = props

    return (
        <div className='form-group my-2'>
            <label>{label}</label>
            <table>
                <tbody>
                    <tr style={{ borderTop: '1px solid darkgray', width: '100%' }}>
                        {
                            options.map(option => {
                                return (
                                    <td key={option.value} className="tddays">
                                        <Field type="Checkbox" name={name} value={option.value} id={option.value}
                                            defaultChecked={selected.includes(option.value)?true:false}                  
                                        className="pdays" />
                                        <label htmlFor={option.value}>{option.key}</label>
                                    </td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
            <ErrorMessage name={name} component={ErrorText} />
        </div>
    )
}

export default CheckboxU
