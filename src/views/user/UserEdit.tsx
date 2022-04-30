import { Button, Form, Input, message } from "antd";
import * as React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/store";
import { update } from "../../store/userSlice";

const UserEdit = () => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <Form
        name="basic"
        onFinish={async ({ name, email, password }) => {
          const resultAction = await dispatch(
            update({ name, email, password })
          );
          if (update.fulfilled.match(resultAction)) {
            message.success("修改成功");
          } else {
            const payload = resultAction.payload as { error: string };
            message.error(payload.error);
          }
        }}
        autoComplete="off"
      >
        <Form.Item label="昵称" name="name" rules={[{ message: "请输入昵称" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ message: "请输入邮箱" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default UserEdit;
