import { Menu, MenuProps } from "antd";
import * as React from "react";
import styled from "styled-components";
import UserEdit from "./UserEdit";
import UserInfo from "./UserInfo";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { label: "个人信息", key: "1" },
  { label: "资料更新", key: "2" },
];

const Dashboard = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(["1"]);

  return (
    <Wrapper>
      <MenuWrapper>
        <Menu
          selectedKeys={selectedKeys}
          items={items}
          onSelect={(info) => setSelectedKeys(info.selectedKeys)}
        />
      </MenuWrapper>
      {selectedKeys.includes("1") ? <UserInfo></UserInfo> : null}
      {selectedKeys.includes("2") ? <UserEdit></UserEdit> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 64px;
  display: flex;
  gap: 16px;
`;

const MenuWrapper = styled.div`
  width: 200px;
`;

export default Dashboard;
