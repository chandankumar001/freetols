import React,{Fragment, useState, useEffect, useLayoutEffect, useRef} from 'react'
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import {Row, message, Upload, Col, Card, Image, Input,Select, Button, Form, Spin } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import Resizer from "react-image-file-resizer";
import './ResizeImage.scss'
import { loaderAction } from './ResizeImageAction';
import { useDispatch, useSelector } from 'react-redux';
import autoAnimate from "@formkit/auto-animate";
const { Dragger } = Upload;
const {Option} = Select

const ResizeImage = () => {
  const imageRef = useRef()
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isloading = useSelector(state=>state.resizeimage.isloading)
  const [fileList, setfileList] = useState([])
  const [Islayover, setIslayover] = useState(false)
  const [imageDetails, setimageDetails] = useState({})
  const [outputFileList, setoutputFileList] = useState([])
  const [outFileBlob, setoutFileBlob] = useState([])
  const [idscroll, setidscroll] = useState('')
  const supportedFormat = [
    'jpg',
    'png',
    'WEBP'
  ]
  const imagedetaildesc = {
    width:0,
    height:0,
    descType:'',
    quality:100
  }

  useEffect(() => {
    if (imageRef.current) {
      autoAnimate(imageRef.current);   
    }
  }, [imageRef])

  useEffect(() => {
    return () => {
      
    }
  }, [outputFileList])

  useLayoutEffect(() => {
    if(idscroll){
      let element = document.getElementById(idscroll)
      if(element){
        element.scrollIntoView({behavior: 'smooth', block: 'start' });
      }
    }
    
    return () => {
      
    };
  }, [idscroll])
  

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const propsresize = {
    name: 'file',
    multiple: true,
    onChange : async(info) => {
    },
    onDrop(e) {

    },
    // handleupload(info) {
    // },
    beforeUpload: async(file, fileListupload)=>{
        dispatch(loaderAction(true))
        let tempfileList = [...fileList]
        for(let beforekey in fileListupload){
          tempfileList.unshift(fileListupload[beforekey])
        }
        for(let key in tempfileList){
          tempfileList[key]["preview"] =  await handlePreview(tempfileList[key])

        }
        setfileList(tempfileList)
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


  const handlePreview = async (file) => {
    let response = await getBase64(file)
    return response
  };

  const ondeleteimage = (key) =>{
    let tempfileList = [...fileList]
    tempfileList.splice(key,1)
    let tempoutputFileList = [...outputFileList]
    tempoutputFileList.splice(key,1)
    setfileList(tempfileList)
    setoutputFileList(tempoutputFileList)
  }

  const resizeFile = (file,params) =>{
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      params['maxWidth'],
      params['maxHeight'],
      params['compressFormat'],
      params['quality'],
      params['rotation'],
      (uri) => {
        resolve(uri);
      },
      "base64",
      params['minWidth'],
      params['minHeight'],
    );
  })};

  const resizeImage = async(key,file) =>{
    let tempoutputFileList = [...outputFileList]
    let tempoutputFileBlob = [...outFileBlob]
    let imageblob
    let resizedfile
    let dimensions = {
    }
    dispatch(loaderAction(true))
    try {
      
      if(key === "all"){
          tempoutputFileList = []
          tempoutputFileBlob = []
          for(let keyfile in fileList){
            dimensions = {
              maxWidth:imageDetails[keyfile]?imageDetails[keyfile]['width']:300,
              maxHeight:imageDetails[keyfile]?imageDetails[keyfile]['height']:300,
              compressFormat:imageDetails[keyfile]?imageDetails[keyfile]['format']:file['type'],
              quality:imageDetails[keyfile]?imageDetails[keyfile]['quality']:100,
              rotation:0,
              minWidth:imageDetails[keyfile]?imageDetails[keyfile]['width']:300,
              minHeight :imageDetails[keyfile]?imageDetails[keyfile]['width']:300,
            }
            imageblob = await resizeFile(fileList[keyfile],dimensions);
            tempoutputFileBlob.push(imageblob)
            resizedfile = new File([imageblob], file.name);
            tempoutputFileList.push(resizedfile)
          }
          setidscroll("all-downloadref")
      }
      else{
          dimensions = {
            maxWidth:imageDetails[key]?imageDetails[key]['width']:300,
            maxHeight:imageDetails[key]?imageDetails[key]['height']:300,
            compressFormat:imageDetails[key]?imageDetails[key]['format']:file['type'],
            quality:imageDetails[key]?imageDetails[key]['quality']:50,
            rotation:0,
            minWidth:imageDetails[key]?imageDetails[key]['width']:300,
            minHeight :imageDetails[key]?imageDetails[key]['width']:300,
          }
          imageblob = await resizeFile(file,dimensions);
          
          
          resizedfile = new File([imageblob], file.name);
          if(tempoutputFileBlob[key]){
            tempoutputFileBlob.splice(key,1,imageblob)
            tempoutputFileList.splice(key,1,resizedfile)
          }
          else{
            tempoutputFileBlob.push(imageblob)
            tempoutputFileList.push(resizedfile)
          }
          setidscroll(file.name)
      }
      setoutputFileList(tempoutputFileList)
      setoutFileBlob(tempoutputFileBlob)
      dispatch(loaderAction(false))
      let element = document.getElementById(idscroll)
      if(idscroll){
        element.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        setidscroll('')
      }
    } catch (err) {
      // console.log(err);
    }
  } 

  const onchange = (value,type,key) =>{
    let tempimageDetails = {...imageDetails}
    if(key==="all"){
      for(let keyall in fileList){
        if(!tempimageDetails[keyall]){
          tempimageDetails[keyall] = {}
        }   
        tempimageDetails[keyall][type] = value
      }
      if(!tempimageDetails["all"]){
        tempimageDetails["all"] = {}
      }
      tempimageDetails["all"][type] = value
    }
    else{
      if(!tempimageDetails[key]){
        tempimageDetails[key] = {}
      }
      tempimageDetails[key][type] = value;
    }
    
    setimageDetails(tempimageDetails)
  }

  const dowloadImage = (key,value,file) =>{
      var a = document.createElement('a');
      a.href = value;
      a.download=file['name']
      a.click()
  } 

  return (
    <div ref={imageRef}  className="resize-container">
      {isloading && <Spin className='spin-loader' size="large" />}
      <Row className='row-width' justify='center'>
        <Col lg={24} md={24} sm={24} xs={24} className='page-header-resize-col'>
          <div className='page-header-resize'>
            Resize Images Online
          </div>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24} className='page-header-resize-col'>
          <div className='page-subheader-resize'>
            Change the  Size of image with Custom quality selection.
          </div>
        </Col>
      </Row>
      <Row className='row-width' justify='center'>
        <Col lg={24} md={24} sm={24} xs={24} className="dragger-conatiner">
          <Row className='row-width'>
            <Col lg={3} md={3} sm={0} xs={0}  ></Col>
              <Col lg={18} md={18} sm={22} xs={22} className='dragger-conatiner-upload-container' >
                <Dragger {...propsresize} className='dragger-conatiner-upload'>
                  <Row justify='center' align='center'>
                    <Col lg={4} md={4} sm={4} xs={4} className="upload-icon-div">
                      <CloudUploadOutlined  className="upload-icon" />
                    </Col>
                    <Col lg={18} md={18} sm={18} xs={18} className="upload-text-col">
                      <span className="upload-text">Upload from PC or Mobile</span>
                    </Col>
                  </Row>
                </Dragger>
                <Row justify='center' align='center'>
                  <Col lg={11} md={11} sm={24} xs={24}>
                    <Image
                      className='header-logo-myimage'
                      height={"100%"}
                      src={"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"}
                      preview={false}
                    />
                  </Col>
                  <Col lg={1} md={1} sm={24} xs={24}></Col>
                  <Col lg={11} md={11} sm={24} xs={24}>
                    <Col lg={24} md={24} sm={24} xs={24} className='col-resize-conatiner' >
                      <Card className="card-resize-all">
                        <Form
                          form={form}
                          layout="vertical"
                        >
                          <Row className='row-width'>
                            <Col lg={11} md={11} sm={11} xs={11} className="load-image-desc-left">
                              <Form.Item 
                                label="Width"  
                                className='width-item form-item'
                              >
                                <Input type="number" placeholder='300' onChange={(e)=>onchange(e.target.value,'width',"all")} value={imageDetails["all"]?imageDetails["all"]['width']:""}></Input>
                              </Form.Item>
                              <Form.Item 
                                label="px/percent"  
                                className='select-item form-item'
                              >
                              <Select onChange={(e)=>onchange(e,'descType',"all")}  value={imageDetails["all"]?imageDetails["all"]['descType']:"pixels"}>
                                  <Option value="pixels">Pixels</Option>
                                  <Option value="percent">Percent</Option>
                                </Select>
                              </Form.Item>
                              
                            </Col>
                            <Col lg={1} md={1} sm={1} xs={1} ></Col>
                            <Col lg={11} md={11} sm={11} xs={11} className="load-image-desc-right">
                              <Form.Item 
                                label="Height"  
                                className='height-item form-item'
                              >
                                <Input type="number" placeholder='300' onChange={(e)=>onchange(e.target.value,'height',"all")} value={imageDetails["all"]?imageDetails["all"]['height']:""}></Input>
                              </Form.Item>
                              
                              <Form.Item 
                                label="Quality"  
                                className='quality-item form-item'
                              >
                                <Input type="number" placeholder='100' onChange={(e)=>onchange(e.target.value,'quality',"all")} value={imageDetails["all"]?imageDetails["all"]['quality']:""}></Input>
                              </Form.Item>
                            </Col>
                            <Col lg={1} md={1} sm={1} xs={1} ></Col>
                            <Col lg={11} md={11} sm={11} xs={11} className="load-image-desc-right"> 
                              <Form.Item 
                                label="Format" 
                                className='select-item form-item'
                              >
                                <Select onChange={(e)=>onchange(e,'format',"all")}  value={imageDetails["all"]?imageDetails["all"]['deformatscType']:"jpg"}>
                                  <Option value="jpg">JPG</Option>
                                  <Option value="png">PNG</Option>
                                  <Option value="WEBP">WEBP</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row justify="center">
                            <Col lg={11} md={11} sm={11} xs={11}>
                              <Button className="resize-button-all" onClick={()=>resizeImage("all",{})}>Resize</Button>
                            </Col>
                            <Col lg={2} md={2} sm={2} xs={2}></Col>
                            <Col lg={11} md={11} sm={11} xs={11}>
                              <Button className="cancel-button-all" onClick={()=>resizeImage("all",{})}>Cancel</Button>
                            </Col>
                          </Row>
                      </Form>
                      </Card>
                    </Col>
                  </Col>
                </Row>
              </Col>
            <Col lg={3} md={3} sm={0} xs={0}  ></Col>
          </Row>
          
        </Col>
        {fileList.length>1 && 
          <Col lg={8} md={8} sm={24} xs={24} className='col-resize-conatiner' >
            <Card className="card-resize-all">
            <Form
              form={form}
              layout="vertical"
            >
              <Row className='row-width'>
                <Col lg={12} md={12} sm={12} xs={12} className="load-image-desc-left">
                  <Form.Item 
                    label="Width"  
                    tooltip="This is a required field"
                    className='width-item'
                  >
                    <Input type="number" placeholder='300' onChange={(e)=>onchange(e.target.value,'width',"all")} value={imageDetails["all"]?imageDetails["all"]['width']:""}></Input>
                  </Form.Item>
                  <Form.Item 
                    label="px/percent"  
                    tooltip="This is a required field"
                    className='select-item'
                  >
                   <Select onChange={(e)=>onchange(e,'descType',"all")}  value={imageDetails["all"]?imageDetails["all"]['descType']:"pixels"}>
                      <Option value="pixels">Pixels</Option>
                      <Option value="percent">Percent</Option>
                    </Select>
                  </Form.Item>
                  
                </Col>
                <Col lg={12} md={12} sm={12} xs={12} className="load-image-desc-right">
                  <Form.Item 
                    label="Height"  
                    tooltip="This is a required field"
                    className='height-item'
                  >
                    <Input type="number" placeholder='300' onChange={(e)=>onchange(e.target.value,'height',"all")} value={imageDetails["all"]?imageDetails["all"]['height']:""}></Input>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Quality"  
                    tooltip="This is a required field"
                    className='quality-item'
                  >
                    <Input type="number" placeholder='100' onChange={(e)=>onchange(e.target.value,'quality',"all")} value={imageDetails["all"]?imageDetails["all"]['quality']:""}></Input>
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12} className="load-image-desc-right"> 
                  <Form.Item 
                    label="Format" 
                    tooltip="This is a required field"
                    className='select-item'
                  >
                    <Select onChange={(e)=>onchange(e,'format',"all")}  value={imageDetails["all"]?imageDetails["all"]['deformatscType']:"jpg"}>
                      <Option value="jpg">JPG</Option>
                      <Option value="png">PNG</Option>
                      <Option value="WEBP">WEBP</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Row justify="center">
                <Button className="resize-button-all" onClick={()=>resizeImage("all",{})}>Resize All</Button>
              </Row>
            </Form>
            </Card>
          </Col>
        }
      </Row>

      <Row className={fileList.length>0?'row-width site-card-border-less-wrapper':""} justify={fileList.length>2?'space-between':'center'}>
        {fileList.length>0 && fileList.map((value,key)=>{
          return(
            <Fragment key={"upload-imahge"+key}>
            <Col lg={7} md={7} sm={24} xs={24} className="card-image-conatiner">
              <Card className="card-image-conatiner-card"   >
              
                <div  className="image-overlay">
                  <div className={"overlay"}>
                  </div>
                  <DeleteFilled  
                    onClick={()=>{ondeleteimage(key)}} 
                    className='delete-icon'  
                    style={{ color: '#ab0000',cursor:"pointer" }}
                  />
                  <Image
                    className='header-logo-myimage'
                    height={300}
                    src={value['preview']}
                    preview={false}
                  />
                </div>
                
                <Form
                    form={form}
                    layout="vertical"
                    className="form-image-details-resize"
                  >
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className="load-image-desc-left">
                      <Form.Item 
                        label="Width"  
                        tooltip="This is a required field"
                        className='width-item'
                      >
                        <Input type="number" placeholder='300' onChange={(e)=>onchange(e.target.value,'width',key)} value={imageDetails[key]?imageDetails[key]['width']:""}></Input>
                      </Form.Item>
                      <Form.Item 
                        label="px/percent" 
                        required 
                        tooltip="This is a required field"
                        className='select-item'
                      >
                        <Select onChange={(e)=>onchange(e,'descType',key)}  value={imageDetails[key]?imageDetails[key]['descType']:"pixels"}>
                          <Option value="pixels">Pixels</Option>
                          <Option value="percent">Percent</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12} className="load-image-desc-right">
                        <Form.Item 
                          label="Height"  
                          tooltip="This is a required field"
                          className='height-item'
                        > 
                          <Input type="number" placeholder='300' onChange={(e)=>onchange(e.target.value,'height',key)} value={imageDetails[key]?imageDetails[key]['height']:""}></Input>
                      </Form.Item>
                      
                      <Form.Item 
                        label="Quality"  
                        tooltip="This is a required field"
                        className='quality-item'
                      >
                        <Input type="number" placeholder='100' onChange={(e)=>onchange(e.target.value,'quality',key)} value={imageDetails[key]?imageDetails[key]['quality']:""}></Input>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12} className="load-image-desc-right">
                      
                      <Form.Item 
                        label="Format" 
                        tooltip="This is a required field"
                        className='select-item'
                      >
                        <Select onChange={(e)=>onchange(e,'format',key)}  value={imageDetails[key]?imageDetails[key]['deformatscType']:supportedFormat.indexOf(fileList[key]['type'].split("/")[1])!==-1?fileList[key]['type'].split("/")[1]:'jpg'}>
                          <Option value="jpg">JPG</Option>
                          <Option value="png">PNG</Option>
                          <Option value="WEBP">WEBP</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row justify="center">
                    <Button onClick={()=>resizeImage(key,value)} className="resize-button">Resize Image</Button>
                  </Row>
                </Form>
              </Card>
            </Col>
            {(key+1)%3!==0 && 
            <Col lg={1} md={1} sm={24} xs={24}>

            </Col>}
            </Fragment>
          )
        })}
      </Row>

      <Row className={outputFileList.length>0?'row-width site-card-border-less-wrapper':""} justify={outputFileList.length>2?'space-between':'center'}>
        <div id="all-downloadref"></div>
        {outputFileList.length>0 && outputFileList.map((value,key)=>{
          return(
            <Fragment key={"upload-imahge"+key}>
            <Col lg={7} md={7} sm={24} xs={24} className="card-image-conatiner">
            <div id={value["name"]}></div>
              <Card className="card-image-conatiner-card"   >
                  <Image
                    className='header-logo-myimage'
                    height={300}
                    src={outFileBlob[key]}
                    preview={false}
                  />
                <Form
                    form={form}
                    layout="vertical"
                    className="form-image-details-resize"
                  >
                    <Row justify="center">
                      {outputFileList[key]['size']}
                  </Row>
                  <Row justify="center">
                    <Button onClick={()=>dowloadImage(key,outFileBlob[key],outputFileList[key])} className="resize-button">Dowload Image</Button>
                  </Row>
                </Form>
              </Card>
            </Col>
            {(key+1)%3!==0 && 
            <Col lg={1} md={1} sm={24} xs={24}>

            </Col>}
            </Fragment>
          )
        })}
      </Row>
    </div>
  )
}

export default ResizeImage