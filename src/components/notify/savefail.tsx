import { ErrMessages, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const SaveFail = () => {
    return(
        <div className="notify--window window--fail">
            {ErrMessages.unsaved || "Unknown error"}
        </div>
    )
}

export default SaveFail