import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as api from '../Api'
import FormControl from '../FormControl'

function AgrList({ time, no }) {
    const [cancel, setCancel] = useState(false);
    const addReg = useMutation(api.addRegAgrtime);
    const subAgr = useMutation(api.submitAgrtime);

    // if (addReg.isSuccess) {
    //     window.location.reload();
    // }
    // if (subAgr.isSuccess) {
    //     window.location.reload();
    // }
    const initialValues = { receipt: '' }
    const validationSchema = Yup.object({
        receipt: Yup.number().integer('! must be an integer').required('! Required')
    })
    const onSubmit = values => {
        const regData = {
            agr_id: time.agr_id,
            custommer_id: time.custommer_id,
            name: time.name,
            phone: time.phone,
            amount: time.amount_per_hour,
            recived: values.receipt,
            reminder: 0,
            entry_date: time.entry_date,
            time: time.time,
            wrote_by: time.wrote_by

        }
        addReg.mutate(regData);
    }
    const submitAgr = (id) => {
        if (window.confirm('are you sure you want to submit this time?')) {
            const subdata = {
                id: id,
                status: cancel ? 'cancel' : 'finish'
            }
            subAgr.mutate(subdata)
        }
    }
    return (
        <tr>
            <td>{no + 1}</td>
            <td>{time.name}</td>
            <td>{time.phone}</td>
            <td>{time.amount_per_hour}</td>
            <td>{time.recived}</td>
            <td className="ck"><input type="checkbox" onChange={() => setCancel(!cancel)} /></td>
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
            <td><Link to={`/viewAgreementTime/${time.agr_id}`} className="btn btn-primary">View</Link></td>
            <td><button onClick={() => submitAgr(time.agr_id)} className="btn btn-warning">Submit</button></td>
        </tr>

    )
}

export default AgrList
