import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import KeyRow from './components/keyrow';
import { keyList } from 'types';
import { DispatchData } from 'state/hooks';

const KeysTab = () => {

    const [additionalName, UpdateAddName] = useState("")
    const State = useSelector((state: RootState) => {
       return state
    })
    const dispatch = useDispatch()

    const NewKeyName = (event : any) => {
         const newName = event.target.value
         UpdateAddName(newName)
    }

    const AppendKey = () => {
        const newList : keyList = []
        State.keys.map((k) => {
            newList.push(k)
        })
        newList.push({
            _key: additionalName,
            value: ""
        })
        dispatch(actions.keys(newList))
    }

    const SaveData = () => {
        DispatchData(State.keys)
    }

    return(
        <div className="admin--tab keys--tab">
            {State.keys.map((item) => {
                console.log(item)
                return <KeyRow _key={item._key} value={item.value} />
            })}
            <div className="append--row">
                <input type="text" value={additionalName} onChange={NewKeyName} />
                <button onClick={AppendKey}>
                    Append key
                </button>
            </div>
            <div className="save--data--row">
                <button className="save--btn" onClick={SaveData}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default KeysTab