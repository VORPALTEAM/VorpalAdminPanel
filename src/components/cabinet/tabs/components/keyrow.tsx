import React from 'react';
import { useSelector } from 'react-redux';
import { keyItem } from 'types';

const KeyRow = ( pair : keyItem ) => {
    return(
        <div className="key--row">
            <input type="text" value={pair._key} />
            <input type="text" value={pair.value} />
        </div>
    )
}

export default KeyRow