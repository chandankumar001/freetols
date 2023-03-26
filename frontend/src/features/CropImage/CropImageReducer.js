import {LOADING,SETCROPPEDIMAGE} from './CropImageType'


const initialState = {
  isloading:false,
  croppedImage :''
}


const CropImageReducer = (state=initialState,action) =>{
  console.log(action.payload)
  switch(action.type){
    case LOADING:
      return{
        ...state,
        isloading:action.payload
      }
    case SETCROPPEDIMAGE:
      return{
        ...state,
        croppedImage:action.payload
      }
    default:
      return state
  }
}

export default CropImageReducer;