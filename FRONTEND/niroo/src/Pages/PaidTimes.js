import React, {useState} from 'react'
import AgreementTimesTable from '../components/AgreementTimesTable';
import RegulerTimesTable from '../components/RegulerTimesTable';


function PaidTimes() {
    const [link, setlink] = useState('Agreement Times');

    const clickhandle = ()=>{
        link != 'Reguler Times'?setlink('Reguler Times'):setlink('Agreement Times');
    }
    return (
        <div className="addpro_form">
        <div className="container">
            <div className="row">
                    <div className="col lg-5">
                        <div className="user_name">
                            <h2>View your Payed Times<strong>(</strong>
                            {link != 'Reguler Times'?'Reguler Times':'Agreement Times'}
                            <strong>)</strong></h2>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="add_link">
                            <button className="btn btn-secondary btn-block"
                            onClick={clickhandle}
                            >{link}</button>
                        </div>
                    </div>
                </div>
                <div className="add_time">
                {
                    link != 'Reguler Times'?<RegulerTimesTable />:<AgreementTimesTable />
                }
            </div>
        </div>
    </div>
    )
}

export default PaidTimes
