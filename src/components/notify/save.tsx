import { OkMessages, notifyNames } from 'config';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const Save = () => {
    return(
        <div className="notify--window window--success">
            {OkMessages.saved || "Success"}
        </div>
    )
}

export default Save