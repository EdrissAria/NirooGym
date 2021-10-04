import React from 'react'
import { useQuery, useMutation } from 'react-query'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as api from '../Api'
import FormControl from '../FormControl'

function AgrList({ time }) {

    const addRec = useMutation(api.addReceipt);
    if(addRec.isSuccess){
        window.location.reload();
    }
    const initialValues = { receipt: ''}
    const validationSchema = Yup.object({
        receipt: Yup.number().integer('! must be an integer')
    })
    const onSubmit = values =>{
        const receiptData = {
            agr_id: time.agr_id,
            receipt: values.receipt
        }
        addRec.mutate(receiptData);
    }
    return (
        <tr>
            <td>{time.agr_id}</td>
            <td>{time.name}</td>
            <td>{time.amount_per_hour}</td>
            <td>{time.recived}</td>
            <td className="ck"><input type="checkbox" /></td>
            <td>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        (formik) => {
                            return (
                                <Form>
                                    <FormControl control="receipt" type="text" formik={formik} name="receipt" placeholder="add receipt" />
                                </Form>
                            )
                        }
                    }
                </Formik>
            </td>
            <td><Link to={`/viewAgreementTime/${time.custommer_id}`} className="btn btn-primary">View</Link></td>
            <td><button className="btn btn-warning">Submit</button></td>
        </tr>

    )
}

export default AgrList
