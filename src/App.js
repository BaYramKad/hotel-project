import React, { useContext } from 'react';
import './App.css';
import {Context} from './index'

import { Row, Col } from 'antd';
import Login from './components/Login'

function App(){
    const value = useContext(Context)
    console.log('db: ', value);
    return (
        <div className="App">
            <Row align='center' style={{
        verticalAlign: 'middle',
      }}>
                <Col>
                    <Login />
                </Col>
            </Row>
        </div>
    );
}

export default App;
