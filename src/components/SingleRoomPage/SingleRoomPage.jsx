import { CheckOutlined, CloseOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Form, Input, Row } from 'antd';
import { DatePicker, Space } from 'antd';
import { getDatabase, ref, set } from 'firebase/database';

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { checkInGuestReduser } from '../../redux/redusers/checkInGuest';

import roomStyles from './index.module.scss'

function SingleRoomPage({room, roomsLength, deleteRoom}) {

  const history = useHistory()
  const dispatch = useDispatch()
  const db = getDatabase();

  const [visibleCheckIn, setvisibleCheckIn] = useState(false)
  const [visibleCheckOut, setvisibleCheckOut] = useState(false)

  const [date, setDate] = useState()
  const [guestName, setGuestName] = useState()

  function uid() {
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
  };

  const sendInfoAboutGuest = (roomGuest) => {
    const number = roomsLength.length + 1
    const index = roomsLength.length
    let newGuest = {
      ...roomGuest,
      guest: guestName,
      number: number,
      id: uid(),
      date
    }
    dispatch(checkInGuestReduser({
      guest: {date, guestName},
      room: newGuest
    }))

    set(ref(db, 'Rooms/' + index), newGuest);
    setvisibleCheckIn(!visibleCheckIn)
  }

  const onChange = (date, dateString) => {
    setDate(dateString)
  }

  return ( room && <div className={roomStyles.room_wrapper}>
      <div>
        <Button onClick={() => history.push('/rooms/')}  className={roomStyles.room_button_home} type="link" icon={<HomeOutlined />}>Back home</Button>
        <div className={roomStyles.room}>
        <Row justify="space-around">
          <Col span={10}>
              <Carousel effect={'fade'}  dotPosition={'left'} className={roomStyles.room_carousel} >
                    {
                      room && room.gallery && room.gallery.map((item, key) => {
                          return ( <div key={key}>
                                    <img  key={key} src={item} alt='room_image'/>
                            </div>
                          )
                    })
                  }
              </Carousel>
          </Col>
          <Col span={5}>
            {
              room && <div className={roomStyles.room_info}>
                  <span>Romm {room.number}</span>
                  <span> <b>Type: </b>{room.type}</span>
                  <span> <b>Occupancy:  </b>{room.occupancy} </span>
                  <span> <b>Price:  </b>{room.price}</span>
                  <span> <b>Guest:  </b>{room.guest}</span>
               </div>
            }
          </Col>
          <Col span={7}>
            <div>
                <div className={roomStyles.room_buttons}>
                
                  <Button onClick={() => setvisibleCheckIn(true)} type='ghost'>Check in</Button>
                  <Button onClick={() => setvisibleCheckOut(true)}type='primary'>Check Out</Button>
                </div>
                <b className={roomStyles.room_b}>Features</b>
                <p>
                  {
                    room && room.features.map((item, key) => {
                      return (<>
                        <span key={key}>{<CheckOutlined />} {item} </span> <br />
                      </>)
                    })
                  }
                </p>
              </div>
          </Col>
        </Row>
  
        </div>
      </div>
      <div className={roomStyles.room_description}>
          <b>Description:</b>
          <p>
            {
              room && room.description
            }
          </p>
        </div>

          {
            visibleCheckIn &&
            (<div className={roomStyles.checkin}>
              <div>
                <div className={roomStyles.checkin_rules}>
                  <div className={roomStyles.close}>
                    <span>Check In</span>
                    <CloseOutlined onClick={() => setvisibleCheckIn(!visibleCheckIn)} className={roomStyles.close_button} />
                  </div>

                  <div>
                    <Form  layout="vertical" autoComplete="off">
                    <Form.Item
                      name="Please enter the guest`s name"
                      label="Please enter the guest`s name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the guest`s name:',
                        },
                      ]}
                    >
                      <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Guest`s name" />
                    </Form.Item>
                    <Form.Item
                        label='Please enter the approximate date of guest checkout:'
                      rules={[
                        {
                          required: false,
                          message: 'Please enter the approximate date of guest checkout:'
                        }
                      ]}
                    > 
                    <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                    </Space>
                    </Form.Item>
                      </Form>
                  </div>
                    
                  <div className={roomStyles.checkin_buttons}>
                    <Button onClick={() => setvisibleCheckIn(!visibleCheckIn)} type='ghost'>Cancel</Button>
                    <Button onClick={ () => sendInfoAboutGuest(room) } type='primary'>Check In</Button>
                  </div>
                </div>
              </div>
            </div>
            )
          }
            {
              visibleCheckOut && ( <div className={roomStyles.checkin}>
                <div>
                  <div className={roomStyles.checkin_rules}>
                    <div className={roomStyles.close}>
                      <span>Check In</span>
                      <CloseOutlined onClick={() => setvisibleCheckOut(!visibleCheckOut)} className={roomStyles.close_button} />
                    </div>
                    <span className={roomStyles.checkout_leave}>
                      Do you confirm the Check-out Room {room && room.number}?
                    </span>
                    <div className={roomStyles.checkin_buttons}>
                      <Button onClick={() => setvisibleCheckOut(!visibleCheckOut)} type='ghost'>Cancel</Button>
                      <Button onClick={() => deleteRoom(room.id)} type='primary'>Check Out</Button>
                    </div>
                  </div>
                </div>
              </div>
              )
            }
    </div>
  )
}

export default SingleRoomPage
