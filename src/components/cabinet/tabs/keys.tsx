import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'state/reducer';
import KeyRow from './components/keyrow';

const KeysTab = () => {

    
    const State = useSelector((state: RootState) => {
       return state
    })

    return(
        <div className="admin--tab keys--tab">
            {State.keys.map((item) => {
                const k = item._key
                const v = item.value
                return <KeyRow _key={k} value={v} />
            })}
        </div>
    )
}

export default KeysTab