import React from 'react'
import { Link } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import Title from '../components/Title'

function Dashboard() {
    return (
        <div className="graph_area">
            <div className="container">
                <Title linkTo="/recordTime" title="Welcome" subTitle="M.Edriss Aria" buttonValue="Record a new time"/> 
                <div className="value_cards_sec">
                    <div className="row">
                        <div className="col col-lg-4">
                            <div className="value_card card_2">
                                <p>Total Plays</p>
                                <h3>45</h3>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="value_card card_3">
                                <p>Total earning</p>
                                <h3>45</h3>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="value_card card_4">
                                <p>something</p>
                                <h3>45</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="graph_sec">
                    <div className="row">
                        <div className="col col-lg-3">
                            <div className="graph_sec_2">
                                <p>sales progress</p>
                                <div>
                                    <Pie
                                    data={{
                                        labels: ['Expences', 'Earnings', 'Losses'],
                                        datasets:[
                                            {
                                                label: 'something',
                                                data: [223, 456,33],
                                                backgroundColor:['#ffff33', '#00ff66', '#ff6633']
                                            }
                                        ] 
                                    }}
                                    height={240}
                                    width={200}
                                    options={{
                                        maintainAspectRatio:false
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
                                            labels: ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                            datasets:[{
                                                label: "Your Wise Sales",
                                                data:[ 
                                                    1001,
                                                    4100,
                                                    3345,
                                                    5094,
                                                    993,
                                                    1234,
                                                    1231,
                                                    2989,
                                                    4999,
                                                    554,
                                                    1244,
                                                    5442
                                                ],
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
}

export default Dashboard
