import {LOADING} from './ResizeImageType'


const initialState = {
  isloading:false
}


const resizeImageReducer = (state=initialState,action) =>{
  switch(action.type){
    case LOADING:
      return{
        ...state,
        isloading:action.payload
      }
    default:
      return state
  }
}

export default resizeImageReducer;