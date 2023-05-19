import store from './store'
import * as config from '../config'
import Web3 from 'web3';
import { actions } from './reducer';
import sha256 from 'sha256'
import { keyList } from 'types';

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

   const signedData = JSON.stringify(newData)
   const dt = new Date().getTime()
   const timeMark = dt - (dt % 600000)
   const signableMsg = `${signedData}${timeMark}`
   const accs = await env.request({ method: "eth_requestAccounts" }, config.connectOptions)
   const hash : string = sha256( signableMsg )
   const web3 = new Web3(env)
   let signature = ''
   try {

      signature = await web3.eth.personal.sign(hash, accs[0], '')

   } catch (e) {
      store.dispatch(actions.notify('savefail'))
      return false
   }
   
   const saveResult = await fetch(config.API_URL + '/admin/savedata', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         signature: signature,
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