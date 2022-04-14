import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';

import log from './loginStyle.module.scss'
import 'antd/dist/antd.css';

const FormUser = ({title, status, hendleClick}) => {
  const [email, setEmail] = useState()
  const [pass, setPass] = useState()

  const onFinish = () => {
    hendleClick(email, pass)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={log.login}>
      <span className={log.title}>{status}</span>
       <Row align='center'>
      <Col xs={24} xm={24} md={24} sm={24}>
      <Form  name="basic" labelCol={{ span: 5 }}
      wrapperCol={{
        offset: 0,
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Username" name="username" rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password value={pass} onChange={e => setPass(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 0,
          span: 7,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 9,
          span: 1
        }}
      >
        <Button className={log.button} type="primary" htmlType="submit">
           {title}
          </Button>
      </Form.Item>
      
    </Form>
      
      </Col>
    </Row>
    </div>
  );
};

export default FormUser
