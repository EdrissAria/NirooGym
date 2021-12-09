import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import Title from '../components/Title'
import * as api from '../components/Api'
import { useQuery } from 'react-query'
import {Context} from '../components/Contexts/ContextProvider'


function Dashboard() {
    const dashboard = useQuery('dashboard', api.getInfo);
    const getData = useQuery('data', api.getData);
    const {userData} = useContext(Context); 

    if (dashboard.isSuccess && getData.isSuccess) {
        return (
            <div className="graph_area">
                <div className="container">
                    <Title linkTo="/recordTime" title="Welcome" subTitle="name" buttonValue="Record a new time" />
                    <div className="value_cards_sec">
                        <div className="row">
                            <div className="col col-lg-4">
                                <div className="value_card card_4">
                                    <p>Total Paid Times</p>
                                    <h3>{dashboard.data[0]}</h3>
                                </div>
                            </div>
                            <div className="col col-lg-4">
                                <div className="value_card card_6">
                                    <p>Waiting Times</p>
                                    <h3>{dashboard.data[2]}</h3>
                                </div>
                            </div>
                            <div className="col col-lg-4">
                                <div className="value_card card_7">
                                    <p>cancellations</p>
                                    <h3>{dashboard.data[1]}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="graph_sec">
                        <div className="row">
                            <div className="col col-lg-3">
                                <div className="graph_sec_2">
                                    <p>Progress</p>
                                    <div>
                                        <Pie
                                            data={{
                                                labels: ['Expences', 'Earnings', 'Losses'],
                                                datasets: [
                                                    {
                                                        label: 'something',
                                                        data: [dashboard.data.expense, dashboard.data.earn, dashboard.data.loss],
                                                        backgroundColor: ['#ffff33', '#00ff66', '#ff6633']
                                                    }
                                                ]
                                            }}
                                            height={240}
                                            width={200}
                                            options={{
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col col-lg-9">
                                <div className="graph_sec_2">
                                    <div>
                                        <Bar
                                            data={
                                                {
                                                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                                    datasets: [{
                                                        label: "Your Wise Business "+new Date(dashboard.data.updated_at).toDateString(),
                                                        data: getData.data,
                                                        backgroundColor: [
                                                            '#fe7379',
                                                            '#f54ea1',
                                                            '#b050d1',
                                                            '#6078ea',
                                                            '#19e7da'
                                                        ]
                                                    }]
                                                }
                                            }
                                            height={280}
                                            width={800}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text_copy">
                        <p>copy right M.Edriss Aria. all rights reserved</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return dashboard.isLoading ? 'loading...' : dashboard.error
    }
}

export default Dashboard
