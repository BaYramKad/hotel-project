import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import './App.css';

import { Row, Col } from 'antd';
import FormUser from './components/FormUser'
import MainLayout from './components/MainLayout'

function App(){
    return (
        <div className="App">
            <Row>
                <Col>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={FormUser} />
                            <Route exact path="/layout" component={MainLayout} />
                        </Switch>
                    </Router>
                </Col>
            </Row>

            
        </div>
    );
}

export default App;
