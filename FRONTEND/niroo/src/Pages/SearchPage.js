import React, { useContext } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormControl from '../components/FormControl'
import * as api from '../components/Api'
import { useMutation, useQuery } from 'react-query'
import ParkList from '../components/Lists/ParkList'
import Title from '../components/Title'


function SearchPage() {
    const { search } = useParams();

    const searching = useQuery(['search', search], () => api.searching(search));


    if (searching.isSuccess) {
        return (
            <div className="addpro_form">
                <div className="container">
                <h1>Search Results</h1>
                    <div className="add_time">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Amount</th>
                                    <th>Recived</th>
                                    <th>Entry Date</th>
                                    <th>Play Date</th>
                                    <th>Play Time</th>
                                    <th>Wrote by</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searching.data.map(srch => (
                                        srch.agr_id == null?
                                        <tr>
                                            <td>{srch.reg_id}</td>
                                            <td>{srch.name}</td>
                                            <td>{srch.phone}</td>
                                            <td>{srch.amount}</td>
                                            <td>{srch.recived}</td>
                                            <td>{srch.entry_date}</td>
                                            <td>{srch.play_date}</td>
                                            <td>{srch.time}</td>
                                            <td>{srch.wrote_by}</td>
                                            <td>{srch.status}</td>
                                            <td>no action</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td>{srch.reg_id}</td>
                                            <td>{srch.name}</td>
                                            <td>{srch.phone}</td>
                                            <td>{srch.amount}</td>
                                            <td>{srch.recived}</td>
                                            <td>{srch.entry_date}</td>
                                            <td>{srch.play_date}</td>
                                            <td>{srch.time}</td>
                                            <td>{srch.wrote_by}</td>
                                            <td>{srch.status}</td>
                                            <td><Link to={`/ViewEarnings/agreement_time/${srch.agr_id}`} className="btn btn-info btn-sm">agreement time</Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }else if(searching.data == 0){
        return <h2>No result</h2>
    } 
    else {
        return searching.isLoading ? 'loading' : null;
    }
}

export default SearchPage

