import React from 'react'
import './Footer.scss'
import { Row, Col, Image } from 'antd';
import { useHistory } from 'react-router-dom';
const blockLogo = require('../../assets/image/blockslogo.png')
const happySmiley = require('../../assets/image/happysmiley.png')

const Footer = () => {
  const history = useHistory()

  const navigatePage = (page) =>{
    history.push('/'+page)
  }


  return (
    <div className='footer-app'>
      <Row className='footer-row' justify='flex-start' align='center'>
        <Col lg={20} md={20} sm={24} xs={24} className='col-footer-comapany'>
          <Row justify='flex-start'  style={{width:'100%'}}>
            <Col lg={2} md={2} sm={4} xs={4} className='common_center-left'>
              <Image
                width={40}
                src={blockLogo}
                preview={false}
              />
            </Col>
            <Col lg={4} md={4} sm={8} xs={8} className='common_center-left text-style'>
              Makes Life Easy 
            </Col>
            <Col lg={8} md={8} sm={8} xs={8} className='common_center-left text-style'>
              
              <Image
                width={40}
                src={happySmiley}
                preview={false}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Footer