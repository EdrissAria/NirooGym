import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import Title from '../components/Title'
import * as api from '../components/Api'

function ViewEarningsPage() {
    const { id, earn } = useParams();
    const getTime = useQuery(['getsingletime', id, earn], () => api.getSingleTime(id, earn));
    switch (earn) {
        case 'agreement_time':
            if (getTime.isSuccess) {
                return (
                    <div className="addpro_form">
                        <div className="container">
                            <Title linkTo="/earnings" title="Veiw" subTitle="Single Agreement time" buttonValue="back to the Earnings" />
                            <div className="add_time">
                                <table className="table agrTable table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>phone</th>
                                            <th>Amount/Hour</th>
                                            <th>Recived</th>
                                            <th>Entry Date</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Play Days</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Wrote by</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{getTime.data.agr_id}</td>
                                            <td>{getTime.data.name}</td>
                                            <td>{getTime.data.phone}</td>
                                            <td>{getTime.data.amount_per_hour}</td>
                                            <td>{getTime.data.recived}</td>
                                            <td>{getTime.data.entry_date}</td>
                                            <td>{getTime.data.start_date}</td>
                                            <td>{getTime.data.end_date}</td>
                                            <td>{getTime.data.play_days}</td>
                                            <td>{getTime.data.time}</td>
                                            <td>{getTime.data.status}</td>
                                            <td>{getTime.data.wrote_by}</td>
                                            <td>{getTime.data.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return getTime.isLoading ? 'loading...' : null
            }
            break;
        case 'regular_time':
            if (getTime.isSuccess) {
                return (
                    <div className="addpro_form">
                        <div className="container">
                            <Title linkTo="/earnings" title="View" subTitle="Single Regular time" buttonValue="back to the earnings" />
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{getTime.data.reg_id}</td>
                                            <td>{getTime.data.name}</td>
                                            <td>{getTime.data.phone}</td>
                                            <td>{getTime.data.amount}</td>
                                            <td>{getTime.data.recived}</td>
                                            <td>{getTime.data.entry_date}</td>
                                            <td>{getTime.data.play_date}</td>
                                            <td>{getTime.data.time}</td>
                                            <td>{getTime.data.wrote_by}</td>
                                            <td>{getTime.data.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return getTime.isLoading ? 'loading...' : null
            }
            break;
        default:
            return null;
    }
}

export default ViewEarningsPage
