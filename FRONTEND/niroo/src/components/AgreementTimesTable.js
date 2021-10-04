import React from 'react'

function AgreementTimesTable() {
    return (
        <div>
             <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Amount</th>
                            <th>Recived</th>
                            <th>Play Date</th>
                            <th>Play Time</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>edriss</td>
                            <td>0345345345</td>
                            <td>500</td>
                            <td>500</td>
                            <td>2021/2/1</td>
                            <td>12:00 AM</td>
                            <td>Not</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default AgreementTimesTable
