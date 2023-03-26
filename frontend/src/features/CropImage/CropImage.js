import React,{Fragment, useState, useEffect, useRef, useLayoutEffect} from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import {  canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import {Row, message, Upload, Col, Card, Image, Input, Button, Form, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './CropImage.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { loaderAction } from './CropImageAction';
import { useDispatch, useSelector } from 'react-redux';
import autoAnimate from "@formkit/auto-animate";
const { Dragger } = Upload;

const centerAspectCrop = (
  mediaWidth,
  mediaHeight,
  aspect,
)  => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ResizeImage = () => {
  const croppedFinalImage = useSelector(state=>state.cropImage.croppedImage)
  const imageRefcrop = useRef()
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isloading = useSelector(state=>state.cropImage.isloading)
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(undefined)
  const [canvasstyle, setcanvasstyle] = useState({width:0,height:0})
  const [filevalue, setfilevalue] = useState()

  useLayoutEffect(() => {
    if(document.getElementById('foo')){
      let dompreview = document.getElementById('foo').getBoundingClientRect()
      let tempcanvas = {
        width:dompreview.width,
        height:dompreview.height
        
      }
      setcanvasstyle(tempcanvas)
    }
    
  
    return () => {
      
    };
  }, [completedCrop])

  useEffect(() => {
    if (imageRefcrop.current) {
      autoAnimate(imageRefcrop.current);   
    }
  }, [imageRefcrop])

  

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onSelectFile = (file) => {
    if (file) {
      setCrop(16 / 9) // Makes crop preview update between images.

      setfilevalue(file)
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const { width, height } = imgRef.current
      setAspect(16 / 9)
      setCrop(centerAspectCrop(width, height, 16 / 9))
    }
  }


  const propsresize = {
    name: 'file',
    multiple: false,
    onChange : async(info) => {
    },
    onDrop(e) {

    },
    beforeUpload: async(file, fileListupload)=>{
        dispatch(loaderAction(true))
        let response = await onSelectFile(file)
        setImgSrc(response?.toString() || '')
        dispatch(loaderAction(false))
    },
    customRequest:{dummyRequest}
  };

  

  const getBase64 = (file) =>
   new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


  const dowloadImage = async(key,value,file) =>{
    
      console.log("croppedFinalImage",croppedFinalImage)
      dispatch(loaderAction(true))
      const base64Image =  previewCanvasRef.current.toDataURL();
      var a = document.createElement('a');
      a.href = base64Image;
      a.download=file['name']
      a.click()
      dispatch(loaderAction(false))
      // localStorage.removeItem("image");
  } 

  return (
    <div   className="crop-container">
      {isloading && <Spin className='spin-loader' size="large" />}
      {!imgSrc && 
      <Row className='row-width upload-icon' justify='center'>
        <Col lg={20} md={20} sm={24} xs={24}>
        <Dragger {...propsresize}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
  
        </Dragger>
        </Col>
      </Row>
      }
      {imgSrc && 
      <Row className='image-preview-row' justify='center'>
        <Col lg={18} md={18} sm={23} xs={23} id="foo">
          <Card className="card-image-conatiner-card common-center card-crop"  id="foo"  >
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c,pixelCrop) => {
                setCompletedCrop(c)
              }
              }
              aspect={aspect}
              style={{height:"500px"}}
              className="common-center"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
          </ReactCrop>
          </Card>
        </Col>
        {completedCrop && 
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop.width,
                  height: completedCrop.height,
                  display:"none",
                }}
              />
        }
      </Row>
      }
      
      {imgSrc && 
      // <Row className='row-width' justify='center'>
        <Card className="card-image-conatiner-crop-button common-center card-crop" >
          <Row className='row-width' justify='center'>
          {completedCrop &&
            <Col lg={6} md={12} sm={24} xs={24}>
              <Button className='button-crop' onClick={()=>dowloadImage(0,crop,filevalue)}>Crop Image</Button>
            </Col>}
            <Col lg={6} md={12} sm={24} xs={24}>
              <Button className='button-crop' onClick={()=>dowloadImage(0,crop,filevalue)}>Upload Image</Button>
            </Col>
          </Row>
        </Card>
      // </Row>
      }
    </div>
  )
}

export default ResizeImage