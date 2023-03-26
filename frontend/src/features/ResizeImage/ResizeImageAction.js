import { LOADING } from "./ResizeImageType"

export const loaderAction = (loader) =>{
  return (dispatch)=>{
    dispatch({
      type:LOADING,
      payload:loader
    })
  }
}