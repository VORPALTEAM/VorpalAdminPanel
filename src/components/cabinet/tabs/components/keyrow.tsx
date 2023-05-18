import React from 'react';
import { useSelector } from 'react-redux';
import { keyItem } from 'types';

const KeyRow = ( pair : keyItem ) => {

    const UpdateKey = (event : any) => {
        const newValue = event.target.value
    }

    const UpdateValue = (event : any) => {
        const newValue = event.target.value
    }

    const DeleteKey = (event : any) => {
        const newValue = event.target.value
    }

    return(
        <div className="key--row">
            <input type="text" value={pair._key} onChange={UpdateKey} />
            <input type="text" value={pair.value} onChange={UpdateValue} />
            <button onClick={DeleteKey}>
                Delete
            </button>
        </div>
    )
}

export default KeyRow