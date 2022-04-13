import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import './App.css';

import { Row, Col } from 'antd';
import MainLayout from './components/pages'
import LogIn from './components/pages/LogIn';
import SingUp from './components/pages/SingUp';

function App() {
    return (
        <div className="App">
            <Row>
                <Col>
                    <Router>
                        <Switch>
                            <Route path="/register" component={SingUp} />
                            <Route path="/layout" component={MainLayout} />
                            <Route exact path="/" component={LogIn} />
                        </Switch>
                    </Router>
                </Col>
            </Row>

            
        </div>
    );
}

export default App;
