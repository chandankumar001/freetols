import React, {useState, UseEffect} from 'react'
import { Row, Col, Card} from 'antd';
import './ToolsList.scss'
import { RightOutlined } from '@ant-design/icons';
import Resize from '../../assets/image/resize.svg';


const ToolsList = () => {
  const [toolsList, settoolsList] = useState([1,2,3,4,5, 6])

  return (
    <div className='tools-list-conatiner'>
      <Row className='category-header-tools'>
        <div>
          Image Tools
        </div>
      </Row>
      <Row className='tools-list-conatiner-row'>
        {toolsList.length && toolsList.map((value,key)=>{
          return(
            <Col lg={8} md={8} sm={12} xs={12} key={"toolslist " + key} className='tools-list-conatiner-col'>
              <Card className='card-container'>
                <Row justify='flex-start'>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <div className='icon-div-tools'>
                      <img src={Resize} alt="React Logo" />
                    </div>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <div className='tools-list-header'>
                      Resize Image
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <div className='icon-div-arrow'>
                      {/* <img src={Resize} alt="React Logo" /> */}
                      <RightOutlined style={{width:'100%', height:"100%"}} />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default ToolsList