import { CheckOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Row } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import roomStyles from './index.module.scss'

function SingleRoomPage({room}) {
  console.log('room: ', room);
  const history = useHistory()
  return ( <div className={roomStyles.room_wrapper}>
      <div>
        <Button onClick={() => history.push('/rooms/')}  className={roomStyles.room_button_home} type="link" icon={<HomeOutlined />}>Back home</Button>
        <div className={roomStyles.room}>
        <Row justify="space-around">
          <Col span={10}>
              <Carousel effect={'fade'} dotPosition={'left'} className={roomStyles.room_carousel} >
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
                  <span>Romm {room.key}</span>
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
                  <Button type='ghost'>Chek in</Button>
                  <Button type='primary'>Chek Out</Button>
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
    </div>
  )
}

export default SingleRoomPage
