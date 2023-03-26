import React,{useState, useEffect} from 'react'
import { Row, Col, Image, Drawer, Button, Space,Dropdown , Typography, Menu } from 'antd';
import {ToolOutlined,DownOutlined} from '@ant-design/icons';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import './Header.scss'
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/image/logonew.svg';

import Crop from '../../assets/image/crop.svg';
import Convert from '../../assets/image/convert.svg';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
const blockLogo = require('../../assets/image/blockslogo.png')

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#027878',
      darker: '#027878',
    },
    resizemulti: {
      main: '#027878',
      darker: '#027878',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Header = () => {
  const history = useHistory()
  const [placement, setPlacement] = useState('left');
  const [open, setOpen] = useState(false);

  

  const navigatePage = (page) =>{
    history.push('/'+page)
  }

  const onClose = () =>{
    setOpen(false);
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const menu = (
    <Menu className='common-menu'>
      <Menu.Item key={"resize"} className='common-menu-item'>
         <Row>
          <Col lg={6} md={6} sm={0} xs={0}>
            <div  className='icon-tools'>
              <ThemeProvider theme={theme}>
                <AspectRatioIcon color={'primary'} fontSize={'small'}/>
              </ThemeProvider>
            </div>
          </Col>
          <Col lg={18} md={18} sm={0} xs={0} className='text-tools-col'>
            <Row className='text-tools-row'>
              <Col lg={24} md={24} sm={0} xs={0}>
                <div className='text-tools'>Resize Single Image </div>
              </Col>
              <Col lg={24} md={24} sm={0} xs={0} className='text-tools-subheader'>
                  Free Image Resize
              </Col>
            </Row>
          </Col>
         </Row>
      </Menu.Item>
      <Menu.Item key={"resizemultiple"} className='common-menu-item'>
        <Row>
          <Col lg={6} md={6} sm={0} xs={0}>
            <div  className='icon-tools-multi'>
              <ThemeProvider theme={theme}>
                <AspectRatioIcon color={'resizemulti'} fontSize={'small'}/>
              </ThemeProvider>
            </div>
          </Col>
          <Col lg={18} md={18} sm={0} xs={0} className='text-tools-col'>
            <Row className='text-tools-row'>
              <Col lg={24} md={24} sm={0} xs={0}>
                <div className='text-tools'>Resize Multiple Image </div>
              </Col>
              <Col lg={24} md={24} sm={0} xs={0} className='text-tools-subheader'>
                  Free Image Resize
              </Col>
            </Row>
          </Col>
         </Row>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='header-app'>
          <Row className='header-container header-row ' justify='flex-start' align='flex-start'>
            <Col className='header-brand' lg={2} md={2} sm={1} xs={1}></Col>
            <Col className='header-brand' lg={4} md={4} sm={12} xs={12}>
              <div className='brand-logo'>
                <Image 
                  src={blockLogo} 
                  preview={false}
                  className={'brand-logo-image'}
                />
              </div>
              <div className='brand-text'>
                <span className='brand-text-first'>Abc</span><span className='brand-text-second'>Image</span>
              </div>
            </Col>
            <Col className='header-brand' lg={1} md={1} sm={1} xs={1}></Col>
            <Col className='header-menu' lg={4} md={2} sm={1} xs={1}>
              <div className='image-menu-conatiner menu-conatiner'>
                <Dropdown overlay={menu}>
                  <div> 
                    <span className='menu-conatiner-head'>Image</span>
                    <span><DownOutlined /></span>
                  </div>
                </Dropdown>
              </div>
              <div className='pdf-menu-conatiner'>
                <Dropdown overlay={menu}>
                  <div> 
                    <span className='menu-conatiner-head'>PDF</span>
                    <span><DownOutlined /></span>
                  </div>
                </Dropdown>
              </div>
            </Col>
          </Row>
    </div>
  )
}

export default Header