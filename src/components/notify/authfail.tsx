import { ErrMessages, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const AuthFail = () => {
    return(
        <div className="notify--window window--fail">
            {ErrMessages.norights|| "Unknown error"}
        </div>
    )
}

export default AuthFail