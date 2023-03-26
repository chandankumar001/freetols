import { COUNTER,DEFAULT } from "./counterType";
import { createAsyncThunk } from '@reduxjs/toolkit';

// A mock function to mimic making an async request for data
export function fetchCount(count,amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount+count }), 500)
  );
}

export const selectCount = () =>{
  return (dispatch)=>{
    dispatch({
      type:DEFAULT,
    })
  }
} 

export const decrement = (count) =>{
  console.log("count",count)
  let payload = {
    value:count-1,
    status:"idle"
  }
  return (dispatch)=>{
    dispatch({
      type:COUNTER,
      payload:payload
    })
  }
}

export const increment = (count) =>{
  let payload = {
    value:count+1,
    status:"idle"
  }
  return (dispatch)=>{
    dispatch({
      type:COUNTER,
      payload:payload
    })
  }
}

export const incrementByAmount = (count,amount) =>{
  let payload = {
    value:count+amount,
    status:"idle"
  }
  return (dispatch)=>{
    dispatch({
      type:COUNTER,
      payload:payload
    })
  }
}

export const incrementIfOdd = (count,amount) =>{
  console.log("count",count,amount)
  let payload = {value:count,status:"idle"}
  if(count % 2===1){
   payload = {
      value:count+amount,
      status:"idle"
    }
  }
  return (dispatch)=>{
    if(count % 2===1){
      dispatch({
        type:COUNTER,
        payload:payload
      })
    }
  }
}

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (count,amount) => {
    const response = await fetchCount(count,amount);
    // The value we return becomes the `fulfilled` action payload
    let payload = {value:count+response.data,status:"idle"}
    return (dispatch) =>{
      dispatch({
        type:COUNTER,
        payload:payload
      })
    }
    
  }
);
