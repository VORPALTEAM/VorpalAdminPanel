import store from './store'
import * as config from '../config'
import Web3 from 'web3';
import { actions } from './reducer';
import sha256 from 'sha256'

declare global {
    interface Window {
      ethereum: any
    }
  }

export const env = window.ethereum 

function RejectAuth () {
  store.dispatch(actions.notify(config.notifyNames.authfail));
  store.dispatch(actions.setIsAuth(false))
  return false
}

function GenerateAuthMessage () {
     const dt = new Date().getTime()
     const timeMark = dt - (dt % 600000)
     const msgstring = 'getcontent_' + String(timeMark)
    // console.log(msgstring) 
     const hash : string = sha256(msgstring)
     return hash;
}

async function CheckAuth (signature : string) {
    const dt = new Date().getTime()
    const timeMark = dt - (dt % 600000)
    const msgstring = 'getcontent_' + String(timeMark)
    const hash : string = sha256(msgstring)
    const web3 = new Web3(env)
    const recover = web3.eth.accounts.recover(hash, signature).toLowerCase()
    console.log(recover)
    console.log(config.testAdminKeys.indexOf(recover))
    return config.testAdminKeys.indexOf(recover) > -1 ? true : false
    // Request to api will be here
}

export async function AuthUser () {

   if (!env) {
     return RejectAuth ()
   }

   const msg = GenerateAuthMessage ()
   const web3 = new Web3(env)
   const accs = await env.request({ method: "eth_requestAccounts" }, config.connectOptions)
   let signature = ''
   try {

      signature = await web3.eth.personal.sign(msg, accs[0], '')

   } catch (e) {
      return RejectAuth ()
   }

   const isValid = await CheckAuth (signature)
   if ( isValid ) {
      store.dispatch(actions.setIsAuth(true))
      store.dispatch(actions.notify(config.notifyNames.authok))
      return true
   } else {
      return RejectAuth () 
   }

}