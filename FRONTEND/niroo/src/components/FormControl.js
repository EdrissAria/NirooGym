import React from 'react'
import Input from './Forms/Input'
import Select from './Forms/Select'
import Date from './Forms/Date'
import Checkbox from './Forms/Checkbox'
import File from './Forms/File'
import CheckboxU from './Forms/CheckboxU'
import ReceiptInput from './Forms/ReceiptInput'

function FormControl(props) {
    const {control, ...rest} = props
    switch(control){
        case 'input':
            return <Input {...rest} />
        case 'receipt':
            return <ReceiptInput {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'date':
            return <Date {...rest} />
        case 'checkbox':
            return <Checkbox {...rest} />
        case 'checkboxU':
            return <CheckboxU {...rest} />
        case 'file': 
            return <File {...rest} />
        case 'radio':
        default: return null
    }
     
}

export default FormControl
