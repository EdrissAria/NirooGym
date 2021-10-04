import React, {useContext} from 'react'
import {Context} from './Contexts/ContextProvider';

function SelectEarning() {
    const {selectEarning} = useContext(Context);
    return (
        <div>
            <select name='type' className="form-control" onChange={(e) => selectEarning(e.target.value)}>
                <option value="">Choose The Earnings</option>
                <option value="regular_time">Reguler Time</option>
                <option value="agreement_time">Agreement Time</option>
                <option value="parking">Parking</option>
            </select>
        </div>
    )
}

export default SelectEarning
