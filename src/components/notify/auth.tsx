import { OkMessages, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const Auth = () => {
    return(
        <div className="notify--window window--success">
            {OkMessages.auth || "Success"}
        </div>
    )
}

export default Auth