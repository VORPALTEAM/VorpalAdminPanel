import store from './store'
import * as config from '../config'
import Web3 from 'web3';
import { actions } from './reducer';
import sha256 from 'sha256'
import { keyList } from 'types';
import { generateRandomString } from './utils';

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

function GenerateAuthMessage (msg = 'getcontent_') {
     const dt = new Date().getTime()
     const timeMark = dt - (dt % 600000)
     const msgstring = msg + String(timeMark)
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
    console.log(JSON.stringify({
      filter: "All",
      signature:  signature
    }))
    const authResult = await fetch(config.API_URL + '/admin/requestdata', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         filter: "All",
         signature:  signature
       })
    })
    const response = await authResult.json()
    const content : keyList  = []
    
    response.data.content.map((item) => {
      content.push({
         _key: item.key,
         value: item.value
      })
    })
     
    store.dispatch(actions.keys(content))

    return response.data.success ? true : false
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
   console.log(msg)
   console.log(signature)

   const isValid = await CheckAuth (signature)

   if ( isValid ) {
      store.dispatch(actions.setIsAuth(true))
      store.dispatch(actions.notify(config.notifyNames.authok))
      return true
   } else {
      return RejectAuth () 
   }

}

/* 

    {
      signatire: '',
      data: keyList
    }

*/

export async function DispatchData ( newData : keyList) {
   if (!env) {
      return false
   }

   const signedData = generateRandomString (16) // JSON.stringify(newData)
   const msg = GenerateAuthMessage (signedData)

   const web3 = new Web3(env)

   const accs = await env.request({ method: "eth_requestAccounts" }, config.connectOptions)

   let signature = ''

   try {

      signature = await web3.eth.personal.sign(msg, accs[0], '')

   } catch (e) {
      store.dispatch(actions.notify('savefail'))
      return false
   }

   console.log({
      signature: signature,
      message: signedData,
      data: newData
    })
   
   const saveResult = await fetch(config.API_URL + '/admin/savedata', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         signature: signature,
         message: signedData,
         data: newData
       })
    })
   const result = await saveResult.json()
   console.log(result)
   if (result.success) {
      store.dispatch(actions.notify('saveok'))
      return true
   } else {
      store.dispatch(actions.notify('savefail'))
      return false
   }
}