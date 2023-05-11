import Cabinet from 'components/cabinet';
import LoginForm from 'components/login';
import NotifyContainer from 'components/notify';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { env } from 'state/hooks';
import { RootState, actions } from 'state/reducer';

function App() {

  const State = useSelector((state: RootState) => {
    return state
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (!env) {
       dispatch(actions.notify('ismetamask'))
    }
  }, [])

  return (
    <div className="App">
        {
        State.isAuth ? 
        <Cabinet /> :
        <LoginForm />
        }
        <NotifyContainer />
    </div>
  );
}

export default App;

