import React, { useState } from 'react'
import Title from '../Title'
import * as api from '../Api'
import { useQuery } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import AgrRegList from './AgrRegList'

function SingleAgrTime() {

    const { id } = useParams();
    const viewAgr = useQuery(['viewSingleAgreement', id], () => api.getSingleAgr(id));
    if (viewAgr.isSuccess) {
        return (
            <div className="addpro_form">
                <div className="container">
                    <Title linkTo="/registerdTime" title="View Your" subTitle="Agreement times" buttonValue="back to Registerd times" />
                    <div className="veiw_agr_time">
                        <table className="table agrTable table-striped text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount/Hour</th>
                                    <th>Recived</th>
                                    <th>Entry Date</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Play Days</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Wrote by</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{viewAgr.data.agr_id}</td>
                                    <td>{viewAgr.data.amount_per_hour}</td>
                                    <td>{viewAgr.data.recived}</td>
                                    <td>{viewAgr.data.entry_date}</td>
                                    <td>{viewAgr.data.start_date}</td>
                                    <td>{viewAgr.data.end_date}</td>
                                    <td>{viewAgr.data.play_days}</td>
                                    <td>{viewAgr.data.time}</td>
                                    <td>{viewAgr.data.status}</td>
                                    <td>{viewAgr.data.wrote_by}</td>
                                    <td><Link to={`/updateAgreementTime/${viewAgr.data.agr_id}`} className="btn btn-sm btn-warning">Edit</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2>Reguler times of These Agreement</h2>
                    <div className="add_time">
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Amount</th>
                                    <th>Recived</th>
                                    <th>Play Date</th>
                                    <th>Play Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AgrRegList agr_id={viewAgr.data.agr_id} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    } else {
        return viewAgr.isLoading ? 'Loading...' : null;
    }
}

export default SingleAgrTime
