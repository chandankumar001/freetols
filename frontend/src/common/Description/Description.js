import React,{useState} from 'react'
import { Row, Col, Card, Image} from 'antd';
import './Description.scss'
const resizeImage = require('../../assets/image/resize-image.jpg')

const Description = () => {
  const [descArr, setdescArr] = useState([1,2,3,4])
  console.log(descArr)
  return (
    <div className='desc-container'>
      <Row  justify='center' className='head-desc'>
        <Col lg={24} md={24} sm={24} xs={24} className="header-text-desc common-center">
            Resize , Crop And Convert Online
        </Col>
        <Col lg={24} md={24} sm={24} xs={24} className="header-content-text-desc common-center">
            It's Free , Easy And Convenient
        </Col>
      </Row>
      <Row  className='head-desc-image'>
      {descArr.length>0 && descArr.map((value,key)=>{
          console.log(key)
          return(
            <Col lg={24} md={24} sm={24} xs={24} className='card-container-desc' key={"image-card"+key}>
              <Card className='card-container flex-card-container'>
                <Row className='row-width'>
                  <Col lg={6} md={6} sm={8} xs={8} className='card-image-desc'>
                    <Image 
                      src={resizeImage}
                      preview={false}
                      className='image-desc-container'
                    />
                  </Col>
                  <Col lg={18} md={18} sm={24} xs={24} >
                    <Row className='row-width'>
                      <Col lg={24} md={24} sm={24} xs={24} className='image-desc-header'>
                        Resize Image
                      </Col>
                      <Col lg={24} md={24} sm={24} xs={24} className='image-desc-content'>
                      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."
                      </Col>
                    </Row>
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

export default Description