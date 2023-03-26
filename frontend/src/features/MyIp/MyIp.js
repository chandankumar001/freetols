import { Card, Row, Col, Button, Input } from 'antd'
import React, {useEffect, useState, useRef } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, useLoadScript, InfoWindow } from '@react-google-maps/api';
import './MyIp.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getIp,getMyIp } from './MyIpAction'

const { Search } = Input;

const containerStyle = {
  width: '100%',
  height: '500px'
};

const MyIp = () => {
  const mapRef = useRef(null);
  const rawRef = useRef(null);
  const dispatch = useDispatch()
  const myip = useSelector(state=>state.myip.data)
  const searchip = useSelector(state=>state.myip.searchdata)
  const isloading = useSelector(state=>state.myip.isloading)
  const isloadingsearch = useSelector(state=>state.myip.isloadingsearch)
  const [myipIPv4,setmyipIPv4] = useState('')
  const [searchkey, setsearchkey] = useState('')
  const [mapshow, setMapshow] = useState(false)
  const [center, setcenter] = useState({
    lat: 28.644800,
    lng: 77.216721
  })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBAZw2Q17Qdxy84C08CNRInYWK_qs3EPP0"
  })

  const tableheader = {
    IPv4 :"IPv4",
    IPv6 :"IPv6",
    city:"City",
    country_name:"Country",
    latitude:"Latitude",
    longitude:"Longitude",
    postal:"Pincode",
    state:"State",
    showonmap:'Show On Map'
  }

  const showonmap = (value) =>{
    setMapshow(value)
    if(mapshow===true){
      setcenter({lat:searchip.latitude,lng:searchip.longitude})
      
    }
  }

  useEffect(() => {
    setsearchkey(myip.IPv4)
    setmyipIPv4(myip.IPv4)
    return () => {
      
    }
  }, [myip])
  
  useEffect(() => {
    dispatch(getMyIp())
  
    return () => {
      
    }
  }, [])

  const onSearch = (ip) =>{
    setsearchkey(ip)
    dispatch(getIp(ip))
    setMapshow(false)
  }

  function handleClickscroll(value) {
    if(value){
      mapRef.current.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
    
    setMapshow(value)
    if(value){
      setcenter({lat:searchip.latitude,lng:searchip.longitude})
      
    }
  }
  
  return (
    <div className='myip-app'>
      <Card className='card-ip-details-header' loading={isloading}>
        <div className='ip-head-text text-align-left'>What is my Ip?</div>
        <div className='ip-content-text text-align-left'>{myipIPv4}</div>
        <div className='ip-note-text text-align-left ip-note-div'>Please scroll down to see details of your Ip address </div>
      </Card>
      <Row className='row-width'>
        <Col lg={12} md={12} sm={24} xs={24} className='card-myip-explain-col-ipdetails'>
          <Card className='card-ip-details common-center' loading={isloading}>
            <Row className='row-width search-row'>
              <Col lg={18} md={18} sm={16} xs={16} className='search-container'>
                <Search placeholder="input search text" value={searchkey} loading={isloadingsearch} onSearch={onSearch} onChange={(e)=>setsearchkey(e.target.value)} enterButton />
              </Col>
              <Col lg={6} md={6} sm={8} xs={8} className='myip-button-container'>
                <Button onClick={()=>onSearch(myipIPv4)}>Show My Ip</Button>
              </Col>
            </Row>
            
            <table style={{'width':'100%'}}  >
              <tbody >
              {!isloading && Object.keys(myip).length>0 && Object.keys(tableheader).map((value,key)=>{
                if(searchip[value]){
                  return(
                    <tr key={value+key} >
                      <th>
                        {tableheader[value]}
                      </th>
                      <td>
                      {searchip[value]}
                      </td>
                    </tr>
                  )
                }
              })}

              </tbody>
             </table>
             
             <div ref={mapRef} className='map-row'>
              
              <Button className='button-map' onClick={()=>handleClickscroll(!mapshow)}>{!mapshow?'Show On Map':'Hide On Map'}</Button>
            </div>
          </Card>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24} className='card-myip-explain-col-ipexplain'>
          <Card className='card-ip-details card-details-myip' loading={isloading}>
            <div className='ip-head-text text-align-left'>What is my Ip?</div>
            <div className='ip-content-text text-align-left'>{myip.IPv4}</div>
            <div className='ip-note-text text-align-left ip-note-div'>Please scroll down to see details of your Ip address </div>
          </Card>
        </Col>
      </Row>
      <Row className='row-width'>
        <Col lg={24} md={24} sm={24} xs={24} >
          <Card  className='card-ip-details card-details-myip' loading={isloading} >
            
          {isLoaded && 
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={mapshow?8:5}
              // onLoad={onLoad}
              center={center}
              
            >
              { /* Child components, such as markers, info windows, etc. */ }
              {mapshow && <MarkerF  position={center}>
              </MarkerF>}
              
            </GoogleMap>}
          </Card>
        </Col>
      </Row>
      <Row className='row-width'>
        <Col lg={8} md={8} sm={24} xs={24} className='card-myip-explain-col-dynamic'>
          <Card title='Dynamic Ip' className='card-ip-details card-myip-explain' loading={isloading} >
          </Card>
        </Col>
        <Col lg={8} md={8} sm={24} xs={24} className='card-myip-explain-col-static'>
          <Card title='Static Ip' className='card-ip-details card-myip-explain' loading={isloading} >
          </Card>
        </Col>
        <Col lg={8} md={8} sm={24} xs={24} className='card-myip-explain-col-physical'>
          <Card title='Physical Ip' className='card-ip-details card-myip-explain' loading={isloading} >
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MyIp