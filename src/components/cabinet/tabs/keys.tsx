import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import KeyRow from './components/keyrow';
import { keyList } from 'types';

const KeysTab = () => {

    
    const State = useSelector((state: RootState) => {
       return state
    })
    const dispatch = useDispatch()

    const AppendKey = () => {
        const newList : keyList = []
        State.keys.map((k) => {
            newList.push(k)
        })
        newList.push({
            _key: "",
            value: ""
        })
        dispatch(actions.keys(newList))
    }

    return(
        <div className="admin--tab keys--tab">
            {State.keys.map((item) => {
                console.log(item)
                return <KeyRow _key={item._key} value={item.value} />
            })}
            <div className="append--row">
                <button onClick={AppendKey}>
                    Append key
                </button>
                
            </div>
        </div>
    )
}

export default KeysTab