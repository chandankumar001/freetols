import {COUNTER} from './counterType'
const initialState = {
  value: 0,
  status: 'idle',
};

const CounterReducer = (state=initialState,action) =>{
  switch(action.type){
    case COUNTER :
      return{
        value:action.payload.value,
        status:action.payload.status
      } 
    default:
      return state;
  }
}

export default CounterReducer;