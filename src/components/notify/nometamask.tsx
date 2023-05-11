import { ErrMessages, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const NoMatamask = () => {
    return(
        <div className="notify--window window--fail">
            {ErrMessages.nometamask || "Unknown error"}
        </div>
    )
}

export default NoMatamask 