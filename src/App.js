import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css';

import { Row, Col } from 'antd';
import RoomsTablePage from './components/pages'
import LogIn from './components/pages/LogIn';
import SingUp from './components/pages/SingUp';
import { getDatabase, ref, onValue} from "firebase/database";

function App() {
    const { push } = useHistory()
    const [ users, setUsers ] = useState()
    useEffect(() => {
        push('/login')
        const db = getDatabase();
        const starCountRef = ref(db);
            onValue(starCountRef, (snapshot) => {
            const {users} = snapshot.val();
            setUsers(users)
        });
    
    }, [])
    
    return (
        <div className="App">
            <Row>
                <Col>
                    <Router>
                        <Switch>
                            <Route path="/register" component={ () => <SingUp {...users}/> } />
                            <Route path="/rooms" component={RoomsTablePage} />
                            <Route exact path="/login" component={ () => <LogIn {...users}/> } />
                        </Switch>
                    </Router>
                </Col>
            </Row>
        </div>
    );
}

export default App;
