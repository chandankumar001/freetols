import { LOADING, SETCROPPEDIMAGE } from "./CropImageType"

export const loaderAction = (loader) =>{
  return (dispatch)=>{
    dispatch({
      type:LOADING,
      payload:loader
    })
  }
}

export const setcroppedImage = (image) =>{
  console.log("image",image)
  return (dispatch)=>{
    dispatch({
      type:SETCROPPEDIMAGE,
      payload:image
    })
  }
}