import React,{useEffect, useState} from 'react';
import { Row, Col, Card, Image} from 'antd';
import { useHistory } from "react-router-dom"
import './Homepage.scss';
import Resize from '../../assets/image/resize.svg';
import Crop from '../../assets/image/crop.svg';
import Convert from '../../assets/image/convert.svg';
import Description from '../../common/Description/Description';
const allTools = require('../../assets/image/alltools.png')
const imageTools = require('../../assets/image/imagetools.png')
const pdfTools = require('../../assets/image/pdftools.png')


function Homepage() {
  const history = useHistory()
  const [toolsList, settoolsList] = useState([1])
  const [activeTools, setactiveTools] = useState("all")
  const [tagline, settagline] = useState("Your Life")
  const allToolsList = [
    {
      toolName:"Resize Image",
      toolType:"Image Tools",
      toolIcon:imageTools,
      toolDesc:"Resize Your Image"
    },
    {
      toolName:"Compress Image",
      toolType:"Image Tools",
      toolIcon:imageTools,
      toolDesc:"Reduce Your Image Size"
    },
    {
      toolName:"Convert Image to PDF",
      toolType:"Image Tools",
      toolIcon:imageTools,
      toolDesc:"Convert Image to PDF and dowload as pdf"
    },
    {
      toolName:"Merge PDF",
      toolType:"PDF Tools",
      toolIcon:imageTools,
      toolDesc:"Merge multiple PDF pages to single PDF"
    },
    {
      toolName:"Convert PDF to Image",
      toolType:"PDF Tools",
      toolIcon:imageTools,
      toolDesc:"Convert PDF to Image  and dowload as Image "
    },
    {
      toolName:"Word to PDF",
      toolType:"PDF Tools",
      toolIcon:imageTools,
      toolDesc:"Convert a word Document to PDF"
    },
  ]
  const imageToolsList = [
    {
      toolName:"Resize Image",
      toolType:"Image Tools",
      toolIcon:imageTools,
      toolDesc:"Resize Your Image"
    },
    {
      toolName:"Compress Image",
      toolType:"Image Tools",
      toolIcon:imageTools,
      toolDesc:"Reduce Your Image Size"
    },
    {
      toolName:"Convert Image to PDF",
      toolType:"Image Tools",
      toolIcon:imageTools,
      toolDesc:"Convert Image to PDF and dowload as pdf"
    }
  ]
  const pdfToolsList = [
    {
      toolName:"Merge PDF",
      toolType:"PDF Tools",
      toolIcon:imageTools,
      toolDesc:"Merge multiple PDF pages to single PDF"
    },
    {
      toolName:"Convert PDF to Image",
      toolType:"PDF Tools",
      toolIcon:imageTools,
      toolDesc:"Convert PDF to Image  and dowload as Image "
    },
    {
      toolName:"Word to PDF",
      toolType:"PDF Tools",
      toolIcon:imageTools,
      toolDesc:"Convert a word Document to PDF"
    },
  ]
  

  useEffect(() => {
    
  
    return () => {
      settoolsList(allToolsList)
    }
  }, [])
  
  const toolsFilter = (params) =>{
    setactiveTools(params)
    switch(params){
      case 'all':
        settoolsList(allToolsList)
      break;
      case 'image':
        settoolsList(imageToolsList)
      break;
      case 'pdf':
        settoolsList(pdfToolsList)
      break;
      default:
        settoolsList(allToolsList)
      break;
    }
  }

  const toolsAction = (params) =>{
    switch(params){
      case 'Resize Image':
        history.push("/resizeimage")
      break;
      default:
        settoolsList(allToolsList)
      break;
    }
  }

  return (
    <div className='home-conatiner'>
      <Row  justify='center' >
        <Col lg={24} md={24} sm={24} xs={24} className="header-text common-center">
            Free Tools To Make <span className='tagline'>{tagline}</span> Simple
        </Col>
        <Col lg={24} md={24} sm={24} xs={24} className="header-content-text common-center">
          We offer PDF, video, image and other online tools to make your life easier
        </Col>
      </Row>
      <Row  justify='center' className="alltoolsrow-row-wrap">
        <Row  justify='center' className="alltoolsrow-row">
          <Col lg={24} md={24} sm={24} xs={24} className="alltoolsrow" >
            <Row  justify='flex-start'  >
              <Col lg={4} md={4} sm={5} xs={5} className={activeTools==="all"?"all-tools-col-1 alltools-active":"all-tools-col-1 alltools-inactive"} onClick={()=>toolsFilter("all")}>
                <Row  justify='space-around' align='center' className="alltools " >
                  <Col lg={7} md={7} sm={7} xs={7} className="alltools-image">
                    <Image
                      width={20}
                      src={allTools}
                      preview={false}
                    />
                  </Col>
                  <Col lg={16} md={16} sm={16} xs={16} className={activeTools==="all"?"alltools-text-active":"alltools-text"}>
                    All Tools
                  </Col>
                </Row>
              </Col>
              <Col lg={4} md={4} sm={5} xs={5} className={activeTools==="image"?"alltools-active":"alltools-inactive"} onClick={()=>toolsFilter("image")}>
                <Row  justify='space-around' align='center' className="alltools" >
                  <Col lg={7} md={7} sm={7} xs={7} className="alltools-image">
                    <Image
                      width={20}
                      src={imageTools}
                      preview={false}
                    />
                  </Col>
                  <Col lg={16} md={16} sm={16} xs={16} className={activeTools==="image"?"alltools-text-active":"alltools-text"}>
                    Image Tools
                  </Col>
                </Row>
              </Col>
              <Col lg={4} md={4} sm={5} xs={5} className={activeTools==="pdf"?"alltools-active":"alltools-inactive"} onClick={()=>toolsFilter("pdf")}>
                <Row  justify='space-around' align='center' className="alltools" >
                  <Col lg={7} md={7} sm={7} xs={7} className="alltools-image">
                    <Image
                      width={20}
                      src={pdfTools}
                      preview={false}
                    />
                  </Col>
                  <Col lg={16} md={16} sm={16} xs={16} className={activeTools==="pdf"?"alltools-text-active":"alltools-text"}>
                    Pdf Tools
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row  justify='space-between' className='feature-container-list' >
        {toolsList.length>0 && toolsList.map((value,key)=>{
          return(
            <Col lg={7} md={7} sm={11} xs={11} className="col-tools-list flasher" key={"tools"+key} onClick={()=>toolsAction(value["toolName"])}>
              <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Row>
                    <Col lg={4} md={4} sm={4} xs={4} className="list-icon-container">
                      <Image
                        width={20}
                        src={pdfTools}
                        preview={false}
                      />
                    </Col>
                    <Col lg={16} md={16} sm={16} xs={16}>
                      <Row justify='flex-start' className='row-head-tools'>
                        <Col lg={24} md={24} sm={24} xs={24} className="toolstitle">
                          {value["toolName"]}
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24} className="toolssubtitle">
                        {value["toolType"]}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24} className="toolsdesc">
                {value["toolDesc"]}
                </Col>
              </Row>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Homepage