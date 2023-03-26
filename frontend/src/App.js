import React, { Suspense,lazy ,useRef, useEffect} from 'react';
import autoAnimate from "@formkit/auto-animate";
import './App.scss';
import { Layout, Spin, Row, Col } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LayoutContainer from './common/LayoutContainer/LayoutContainer';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import { useSelector } from 'react-redux';
import ToolsList from './common/ToolsList/ToolsList';
import AdditonalInfo from './common/AdditionalInfo/AdditionaInfo';


const { Content } = Layout;

const Home = lazy(() => import('./features/Homepage/Homepage'));
const MyIp = lazy(() => import('./features/MyIp/MyIp'));
const ResizeImage = lazy(() => import('./features/ResizeImage/ResizeImage'));
const Counter = lazy(() => import('./features/Counter/Counter'));
const CropImage = lazy(() => import('./features/CropImage/CropImage'));

const routes = [
  {
    path: '/',
    component:<LayoutContainer><Home /></LayoutContainer>
  },
  {
    path: '/myip',
    component:<LayoutContainer><MyIp /></LayoutContainer>
  },
  {
    path: '/resizeimage',
    component:<LayoutContainer><ResizeImage /></LayoutContainer>
  },
  {
    path: '/counter',
    component:<LayoutContainer><Counter /></LayoutContainer>
  },
  {
    path: '/cropimage',
    component:<LayoutContainer><CropImage /></LayoutContainer>
  }
]

function App() {
  const parentRef = useRef();
  const isloading = useSelector(state=>state.resizeimage.isloading)

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);   
    }
  }, [parentRef])
  return (
    <div className="App" ref={parentRef}>
      {isloading && <div className='spin-loader-overlay'></div>}
      <Suspense fallback={<Spin className='spin-loader' size="large" />}>
        <Router >
        <Header></Header>
        <div>
          <Content>
            <div>
              <Switch>
                {routes.map((route, index) => (
                  <Route exact path={route.path} key={index} >{route.component}</Route>
                ))}
              </Switch>
            </div>
          </Content>
          <Row justify='center'>
            <Col lg={20} md={20} sm={24} xs={24}>
              <AdditonalInfo />
            </Col>
          </Row>
          <Footer />
        </div>
        </Router>
      </Suspense>
    
    </div>
  );
}

export default App;
