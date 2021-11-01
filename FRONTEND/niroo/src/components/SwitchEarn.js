import React from 'react'
import ParkEarnList from './Lists/ParkEarnList';
import RegEarnList from './Lists/RegEarnList';
import AgrEarnList from './Lists/AgrEernList'
import * as api from '../components/Api';
import { useQuery } from 'react-query';

function SwitchEarn({ earn }) {
    const getEarn = useQuery(['earn', earn], () => api.getEarning(earn))
    switch (earn) {
        case 'agreement_time':
            return (
                <>
                    {getEarn.isLoading ? "loading.." : (getEarn.isSuccess ? <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Earning</th>
                                <th>Recived</th>
                                <th>Write by</th>
                                <th>Date</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getEarn.data.map((earn, index) => <AgrEarnList key={earn.earning_id} earn={earn} no={index}/>)
                            }
                        </tbody>
                    </table>
                        : 'Something went wrong')
                    }
                </>
            )
            break;
        case 'regular_time':
            return (
                <>
                    {getEarn.isLoading ? "loading.." : (getEarn.isSuccess ? <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Earning</th>
                                <th>Recived</th>
                                <th>Write by</th>
                                <th>Date</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getEarn.data.map((earn, index) => <RegEarnList key={earn.earning_id} earn={earn} no={index}/>)
                            }
                        </tbody>
                    </table>
                        : 'something went wrong')
                    }
                </>
            )
            break;
        case 'parking':
            return (
                <>
                    {getEarn.isLoading ? "loading.." : (getEarn.isSuccess ? <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Earning</th>
                                <th>Amount</th>
                                <th>Write by</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getEarn.data.map((earn, index) => <ParkEarnList key={earn.earning_id} earn={earn} no={index}/>)
                            }
                        </tbody>
                    </table>
                        : 'somethig went wrong')
                    }
                </>
            )
            break;
        default:
            return ''
    }
}

export default SwitchEarn
