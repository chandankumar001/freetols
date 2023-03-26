import React, {useState, UseEffect} from 'react'
import { Row, Col, Card, Image} from 'antd';
import './AdditionalInfo.scss'
import { RightOutlined } from '@ant-design/icons';
import Resize from '../../assets/image/resize.svg';
const blockLogo = require('../../assets/image/blockslogo.png')

const AdditonalInfo = () => {
  const [toolsList, settoolsList] = useState([1])

  return (
    <div className='additional-info-conatiner'>
      <Row className='additional-info-conatiner-row'>
        <Col lg={8} md={8} sm={24} xs={24} >
          <Row justify='flex-start'>
            <Col lg={24} md={24} sm={12} xs={12} className="logo-desc" >
              <Image
                width={40}
                src={blockLogo}
                preview={false}
              />
            </Col>
            <Col lg={24} md={24} sm={12} xs={12} className="company-desc" >
                MapImage provides free online conversion, pdf, and other handy tools to help you solve problems of all types. All files both processed and unprocessed are deleted after 1 hour
            </Col>
          </Row>
        </Col>
        <Col lg={16} md={16} sm={24} xs={24} >
          <Row justify='flex-start'>
            <Col lg={24} md={24} sm={12} xs={12} className="navigate-desc" >
              Navigate
            </Col>
            <Col lg={24} md={24} sm={12} xs={12}>
              <Row justify='flex-start'>
                <Col lg={2} md={2} sm={12} xs={12} className="navigate-subhead-desc" >
                  Home
                </Col>
                <Col lg={3} md={3} sm={12} xs={12} className="navigate-subhead-desc" >
                  Privacy Policy
                </Col>
                <Col lg={3} md={3} sm={12} xs={12} className="navigate-subhead-desc" >
                  Disclaimer
                </Col>
                <Col lg={3} md={3} sm={12} xs={12} className="navigate-subhead-desc" >
                  Conatct Us
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AdditonalInfo