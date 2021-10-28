import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import {useMutation, useQuery} from 'react-query'
import * as api from '../components/Api'
import BookList from '../components/Lists/BookList'
import Title from '../components/Title'

function CacheBook() {
    const getBook = useQuery('book', api.getBook);
    const addBook = useMutation(api.addBook);

    // if(addBook.isSuccess){
    //     window.location.reload();
    // }

    const initialValues = {
        amount: '',
        description: ''
    }

    const validationSchema = Yup.object({
        amount: Yup.number().positive('! Amount must be positive').required('! Required'),
        description: Yup.string().required('! Required')
    })
    const onSubmit = values=>{
        const bookData = {
            amount: values.amount,
            description: values.description
        }
        addBook.mutate(bookData);
    }
    return (
        <div className="addpro_form">
            <div className="container">
            <Title linkTo="/" title="Welcome To" subTitle="Cache Book" buttonValue="back to the dashboard"/> 
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
                                            <FormControl control='input' type='text' name='amount' label='Amount' placeholder='amount' />
                                        </div>
                                        <div className="col-lg-6">
                                            <FormControl control='input' type='text' name='description' label='Description(optional)' placeholder='description' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <button type='submit' disabled={!formik.isValid} className="btn btn-info mt-3">
                                                {
                                                    addBook.isLoading?'submitting..':'submit'
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
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Amount</th>
                                <th>Take by</th>
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getBook.data?.map(book=><BookList key={book.cache_id} book={book}/>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CacheBook
