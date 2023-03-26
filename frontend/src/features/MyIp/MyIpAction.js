import axios from 'axios'
import {LOADING, MYIP, SEARCHIP, LOADINGSEARCH} from './MyIpType'

export const getIp = (ip='') =>{
   return async(dispatch)=>{
    dispatch({
      type : LOADINGSEARCH,
      payload:true
    })
    const res =  await axios.get('https://geolocation-db.com/json/'+ip)
    dispatch({
      type : LOADINGSEARCH,
      payload:false
    })

    dispatch({
      type : SEARCHIP,
      payload:res.data
    })
  }
}

export const getMyIp = (ip='') =>{
  return async(dispatch)=>{
   dispatch({
     type : LOADING,
     payload:true
   })
   const res =  await axios.get('https://geolocation-db.com/json/'+ip)
   dispatch({
     type : LOADING,
     payload:false
   })

   dispatch({
     type : MYIP,
     payload:res.data
   })
 }
}