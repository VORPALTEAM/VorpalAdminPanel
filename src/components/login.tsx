import React from 'react';
import { useSelector } from 'react-redux';
import { AuthUser } from 'state/hooks';


const LoginForm = () => {

    return(
        <div className="login--form" onClick={AuthUser}>
            Login with wallet
        </div>
    )
}

export default LoginForm