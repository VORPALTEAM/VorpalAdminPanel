import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import KeyRow from './components/keyrow';
import { keyList } from 'types';
import { DispatchData } from 'state/hooks';
import { tabs } from 'config';

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
        if (additionalName === "") {
            return;
        }
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
        DispatchData(State.keys, State.deletions)
    }

    return(
        <div className="admin--tab keys--tab">
            {State.keys.map((item, index) => {
                if (item._key === tabs.menu) {
                    return null
                }
                return <KeyRow key={`rw_`.concat(String(index * 3))} _key={item._key} value={item.value} />
            })}
            <div className="append--row">
                <input className="" type="text" value={additionalName} onChange={NewKeyName} />
                <div className="row--item" onClick={AppendKey}>
                    <img src="images/plus.png" />
                </div>
            </div>
            <div className="save--data--row">
                <button className="save--btn save--keys--btn" onClick={SaveData}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default KeysTab