import React, { useReducer } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';

import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import log from './loginStyle.module.scss'
import 'antd/dist/antd.css';
import reduser from '../../redux/redusers/setUser';

// Создать еще два страницы по регистрации и по входу 
// переделать эту форму

const FormUser = () => {
  const onFinish = (values) => {
    console.log('values: ', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={log.login}>
      <span className={log.title}>Authorization</span>
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
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
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
          LogIn
        </Button>
      </Form.Item>
    </Form>
      </Col>
    </Row>
    </div>
  );
};

export default FormUser
