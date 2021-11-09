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
    console.log(searching.data)
    if (searching.isSuccess) {
        if (searching.data.length < 1) {
            return <h2 style={{ textAlign: 'center', marginTop: '30px' }}>No Result</h2>
        }
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
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searching.data.map((srch, index, arr) => (

                                        srch.agr_id == null ?
                                            <tr key={srch.reg_id}>
                                                <td>{++index}</td>
                                                <td>{srch.name.includes(search) ? <span style={{ background: 'yellow' }}>{srch.name}</span> : srch.name}</td>
                                                <td>{srch.phone.includes(search) ? <span style={{ background: 'yellow' }}>{srch.phone}</span> : srch.phone}</td>
                                                <td>{srch.amount.includes(search) ? <span style={{ background: 'yellow' }}>{srch.amount}</span> : srch.amount}</td>
                                                <td>{srch.recived.includes(search) ? <span style={{ background: 'yellow' }}>{srch.recived}</span> : srch.recived}</td>
                                                <td>{srch.entry_date.includes(search) ? <span style={{ background: 'yellow' }}>{srch.entry_date}</span> : srch.entry_date}</td>
                                                <td>{srch.play_date.includes(search) ? <span style={{ background: 'yellow' }}>{srch.play_date}</span> : srch.play_date}</td>
                                                <td>{srch.time.includes(search) ? <span style={{ background: 'yellow' }}>{srch.time}</span> : srch.time}</td>
                                                <td>{srch.wrote_by.includes(search) ? <span style={{ background: 'yellow' }}>{srch.wrote_by}</span> : srch.wrote_by}</td>
                                                <td>{srch.status.includes(search) ? <span style={{ background: 'yellow' }}>{srch.status}</span> : srch.status}</td>
                                                <td>Regular time</td>
                                            </tr>
                                            :
                                            <tr key={srch.reg_id}>
                                                <td>{++index}</td>
                                                <td>{srch.name.includes(search) ? <span style={{ background: 'yellow' }}>{srch.name}</span> : srch.name}</td>
                                                <td>{srch.phone.includes(search) ? <span style={{ background: 'yellow' }}>{srch.phone}</span> : srch.phone}</td>
                                                <td>{srch.amount.includes(search) ? <span style={{ background: 'yellow' }}>{srch.amount}</span> : srch.amount}</td>
                                                <td>{srch.recived.includes(search) ? <span style={{ background: 'yellow' }}>{srch.recived}</span> : srch.recived}</td>
                                                <td>{srch.entry_date.includes(search) ? <span style={{ background: 'yellow' }}>{srch.entry_date}</span> : srch.entry_date}</td>
                                                <td>{srch.play_date.includes(search) ? <span style={{ background: 'yellow' }}>{srch.play_date}</span> : srch.play_date}</td>
                                                <td>{srch.time.includes(search) ? <span style={{ background: 'yellow' }}>{srch.time}</span> : srch.time}</td>
                                                <td>{srch.wrote_by.includes(search) ? <span style={{ background: 'yellow' }}>{srch.wrote_by}</span> : srch.wrote_by}</td>
                                                <td>{srch.status.includes(search) ? <span style={{ background: 'yellow' }}>{srch.status}</span> : srch.status}</td>
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
    } else if (searching.error) {
        return <h2 style={{ color: 'red' }}>Failed: {searching.error}</h2>
    }
    else {
        return searching.isLoading ? 'loading' : null;
    }
}

export default SearchPage

