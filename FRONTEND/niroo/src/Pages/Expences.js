import React,{useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import * as api from '../components/Api'
import { useMutation, useQuery } from 'react-query'
import ExpencesList from '../components/Lists/ExpencesList'
import Title from '../components/Title'
import {Context} from '../components/Contexts/ContextProvider'

function Expences() {
    const getExpence = useQuery('expence', api.getExpence);
    const addExpense = useMutation(api.addExpense); 
    const {userData} = useContext(Context); 

    // if(addExpense.isSuccess){
    //     getExpence.refetch(); 
    // }
    const initialValues = {
        type: '',
        amount: ''
    }

    const validationSchema = Yup.object({
        type: Yup.string().required('! Required'),
        amount: Yup.number().positive('! Amount must be positive').required('! Required')
    })
    const onSubmit = values=>{
        const expenseData = {
            write_by: userData.user,
            expense: values.type,
            amount: values.amount
        }
        addExpense.mutate(expenseData)
    }
    return (
        <div className="addpro_form">
            <div className="container">
            <Title linkTo="/" title="Record Your" subTitle="Expences" buttonValue="back to dashboard"/>
                <div className="add_time">
                    <Formik
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit}
                        >
                        {
                            formik =>{
                                return (
                                    <Form>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <FormControl control='input' type='text' name='type' label='Expence' placeholder='type' />
                                            </div>
                                            <div className="col-lg-6">
                                                <FormControl control='input' type='text' name='amount' label='Amount' placeholder='amount' />
                                            </div>
                                            <div className='col-lg-4'>
                                                <button type='submit' disabled={!formik.isValid} className="btn btn-info mt-3">
                                                    {
                                                        addExpense.isLoading?'submitting...':'submit'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>
                <div className="add_time">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Expence</th>
                                <th>Amount</th>
                                <th>Write by</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getExpence.data?.map((expense, index)=><ExpencesList key={expense.expense_id} expense={expense} no={index}/>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Expences
