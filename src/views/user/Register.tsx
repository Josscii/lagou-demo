import { Button, Form, Input, message } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../store/store";
import { register } from "../../store/userSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <FormWrapper>
        <Form
          name="register"
          onFinish={async ({ name, email, password }) => {
            const resultAction = await dispatch(
              register({ name, email, password })
            );
            if (register.fulfilled.match(resultAction)) {
              navigate("/login");
            } else {
              const payload = resultAction.payload as { error: string };
              message.error(payload.error);
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            label="昵称"
            name="name"
            rules={[{ required: true, message: "请输入昵称" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 64px;
`;

const FormWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
`;

export default Register;
