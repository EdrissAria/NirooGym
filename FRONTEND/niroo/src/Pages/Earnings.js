import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import * as api from '../components/Api'
import { useQuery } from 'react-query'
import EarningsList from '../components/Lists/ParkEarnList'
import Title from '../components/Title'
import SelectEarning from '../components/SelectEarning'
import {Context} from '../components/Contexts/ContextProvider'
import SwitchEarn from '../components/SwitchEarn'

function Earnings() {
    const getEarning = useQuery('earning', api.getEarning);
    const {earn} = useContext(Context);
    return (
        <div className="addpro_form">
            <div className="container">
            <Title linkTo="/" title="View Your" subTitle="Earnings" buttonValue="back to dashboard"/>
                <div className="add_time">
                   <SelectEarning /> 
                   <SwitchEarn earn={earn} />
            </div>
        </div>
    </div>
    )
}

export default Earnings
