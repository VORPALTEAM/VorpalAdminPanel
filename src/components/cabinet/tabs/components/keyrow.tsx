import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from 'state/reducer';
import { keyItem, keyList } from 'types';

const KeyRow = ( pair : keyItem ) => {

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

    const DeleteKey = (event : any) => {
        const newValue = event.target.value
    }

    return(
        <div className="key--row">
            <div className="val--key">
               {pair._key}
            </div>
            <input type="text" value={pair.value} onChange={UpdateValue} />
            <button onClick={DeleteKey}>
                Delete
            </button>
        </div>
    )
}

export default KeyRow