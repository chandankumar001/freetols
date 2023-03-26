import React,{useState, useEffect} from 'react'
import { Row, Col, Image, Drawer, Button, Space } from 'antd';
import './LayoutContainer.scss';

const LayoutContainer = (children) => {

  const [placement, setPlacement] = useState('left');
  const [open, setOpen] = useState(false);

  const onClose = () =>{
    setOpen(false);
  }

  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
    <Row className='app-layout-container'  justify="center" >
      <Col xl={20} xxl={18} lg={20} md={20} sm={24} xs={24} className='app-layout-container-background'>
        {children.children}
      </Col>
    </Row>
    </>
  );
};

export default LayoutContainer;
