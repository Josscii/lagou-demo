import { useRequest } from "ahooks";
import { Descriptions, Spin } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getUserInfo, UserInfo as UserInfoModel } from "../../api/user";
import { RootState } from "../../store/store";

const UserInfo = () => {
  const id = useSelector((state: RootState) => state.user?.user._id) ?? "";
  const { data, error, loading } = useRequest(getUserInfo, {
    defaultParams: [id],
  });

  return (
    <Wrapper>
      {loading ? (
        <Spin />
      ) : error == null && data != null ? (
        <Descriptions title="用户信息" bordered>
          <Descriptions.Item label="昵称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
        </Descriptions>
      ) : (
        <div>用户信息加载失败</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default UserInfo;
