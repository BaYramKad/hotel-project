import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from "react-router-dom";

import './App.css';
import { Row, Col, Button } from 'antd';

import RoomsTablePage from './components/Table'
import SingleRoomPage from './components/SingleRoomPage/SingleRoomPage';
import LogIn from './components/AuthAndRegistration/LogIn';
import SingUp from './components/AuthAndRegistration/SingUp';
import Header from './components/Header';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, remove} from "firebase/database";
import { HomeOutlined } from '@ant-design/icons';

function App() {
    const history = useHistory()
    const location = useLocation()
    const auth = getAuth()
    const db = getDatabase();

    const [ users, setUsers ] = useState()
    const [ rooms, setRooms ] = useState()
    const [ singleRoom, setRoom ] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(location.pathname);
            if(location.pathname === '/hotel-project/') {
                user ? history.push('/') : history.push('/login')
            }
        })
    }, [])

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db);
            onValue(starCountRef, (snapshot) => {
                const {users, Rooms, Accounts} = snapshot.val();
                setUsers(users)
                setRooms(Rooms)
            });
    }, [])



    useEffect(() => {
            let roomId = location.pathname.split('/rooms/')[1]
            if(rooms && roomId) {
                let singleRoomObj = rooms.find(item => item.id === roomId)
                setRoom(singleRoomObj)
            }
    }, [location.pathname, rooms])
    
    const deleteRoom = (roomId) => {
        const updateRoom = rooms.filter(item => item.id !== roomId)
        setRooms(updateRoom)
        set(ref(db, 'Rooms/'), updateRoom);
        history.push('/')
    }

    return (
        <div className="App">
            <Row>
                <Col>
                    { rooms && <Header /> }
                        <Route path="/register" component={ () => <SingUp {...users}/> } />
                            <Route exact path="/" >
                                <RoomsTablePage
                                    rooms={rooms}
                                    singleRoom={ (id) => history.push(`/rooms/${id}`) }
                                />
                            </Route>
                        <Route exact path="/login" component={ () => <LogIn {...users}/> } />
                    <Route exact path="/rooms/:id">
                        <SingleRoomPage
                            room={singleRoom && singleRoom}
                            roomsLength={rooms && rooms}
                            deleteRoom={deleteRoom}
                        />
                    </Route>
                    
                </Col>
            </Row>
                    {/* <Route path="/">
                        <h1 style={{
                            'margin': "40px 0 0 15px",
                            'textAlign': "center"
                        }}> Welcome to Hotel <br/>
                        
                        <Button onClick={() => history.push('/')} type="link" icon={<HomeOutlined />}>Whatch rooms</Button>
                        </h1>
                    </Route> */}
        </div>
    );
}

export default App;
