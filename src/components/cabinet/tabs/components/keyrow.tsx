import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import { keyItem, keyList } from 'types';

const KeyRow = ( pair : keyItem ) => {

    const [toDelete, MarkToDelete] = useState(false)
    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()
    
    const UpdateValue = (event : any) => {
        const newValue = event.target.value
        const newState : keyList = []
        State.keys.map((item) => {
            if (item._key !== pair._key) {
                newState.push(item)
            } else {
                newState.push({
                    _key: pair._key,
                    value: String(newValue)
                })
            }
        })
        dispatch(actions.keys(newState))
    }

    const MarkToDeleteKey = (event : any) => {
        const dels : string[] = []
        State.deletions.forEach((item) => {
            if (item !== pair._key) {
                dels.push(item)
            }
        })
        if (!toDelete) {
            MarkToDelete(true)
            dels.push(pair._key)
        } else {
            MarkToDelete(false)
        }
        dispatch(actions.deletions(dels))
        console.log(State.deletions)
    }

    return(
        <div className={`key--row${toDelete ? " to--delete" : ""}`}>
            <div className="val--key">
               {pair._key}
            </div>
            <input type="text" value={pair.value} onChange={UpdateValue} />
            <button onClick={MarkToDeleteKey}>
                Delete
            </button>
        </div>
    )
}

export default KeyRow