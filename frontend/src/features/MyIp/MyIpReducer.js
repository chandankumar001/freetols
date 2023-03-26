import {LOADING, MYIP, SEARCHIP, LOADINGSEARCH} from './MyIpType'


const initialState = {
  data:{},
  isloading:false,
  isloadingsearch:false,
  searchdata:{},
}


const myipReducer = (state=initialState,action) =>{
  switch(action.type){
    case MYIP:
      return{
        ...state,
        data:action.payload,
        searchdata:action.payload,
      }
    case SEARCHIP:
      return{
        ...state,
        searchdata:action.payload
      }
    case LOADING:
      return{
        ...state,
        isloading:action.payload
      }
    case LOADINGSEARCH:
      return{
        ...state,
        isloadingsearch:action.payload
      }
    default:
      return state
  }
}

export default myipReducer;