import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from "react-router-dom";

import './App.css';
import { Row, Col } from 'antd';

import RoomsTablePage from './components/Table'
import SingleRoomPage from './components/SingleRoomPage/SingleRoomPage';
import LogIn from './components/AuthAndRegistration/LogIn';
import SingUp from './components/AuthAndRegistration/SingUp';
import Header from './components/Header';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";

function App() {
    const history = useHistory()
    const location = useLocation()
    const auth = getAuth()
    const [ users, setUsers ] = useState()
    const [ rooms, setRooms ] = useState()
    const [singleRoom, setRoom] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? history.push('/rooms/') : history.push('/login')
        })
    }, [])

    useEffect(() => {
        
        const db = getDatabase();
        const starCountRef = ref(db);
            onValue(starCountRef, (snapshot) => {
                const {users, Rooms, Accounts} = snapshot.val();
                let result = Rooms.map(item => {
                    return {
                        ...item,
                        key: item.number
                    }
                })
                setUsers(users)
                setRooms(result)
            });
    }, [])

    useEffect(() => {
            let roomId = location.pathname.split('/rooms/')[1]
            if(rooms) {
                let singleRoomObj = rooms.find(item => item.number === Number(roomId))
                setRoom(singleRoomObj)
            }
    }, [location.pathname, rooms])

    return (
        <div className="App">
            <Row>
                <Col>
                    <Header />
                        <Route path="/register" component={ () => <SingUp {...users}/> } />
                            <Route exact path="/rooms/" >
                                <RoomsTablePage
                                    rooms={rooms}
                                    singleRoom={ (id) => history.push(`/rooms/${id}`) }
                                />
                            </Route>
                        <Route exact path="/login" component={ () => <LogIn {...users}/> } />
                    <Route path="/rooms/:id">
                        <SingleRoomPage
                            room={singleRoom && singleRoom}
                        />
                    </Route>
                </Col>
            </Row>
        </div>
    );
}

export default App;
