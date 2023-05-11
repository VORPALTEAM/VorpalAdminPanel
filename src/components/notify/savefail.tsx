import { ErrMessages, NOTIFY_LIFETIME, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from 'state/reducer';


const SaveFail = () => {

    const dispatch = useDispatch()

    const CloseWindow = () => {
        dispatch(actions.notify(notifyNames.none))
    }

    useEffect(()=> {
        setTimeout(CloseWindow, NOTIFY_LIFETIME)
    }, [])
    
    return(
        <div className="notify--window window--fail">
            <div className="notify--message">
                 {ErrMessages.unsaved || "Unknown error"}
            </div>
            <div className="close--icon" onClick={CloseWindow} />
        </div>
    )
}

export default SaveFail