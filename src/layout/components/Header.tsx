import { Badge, Button, Divider, Dropdown, Menu } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../store/store";
import { logout } from "../../store/userSlice";
import RouteLink from "./RouteLink";

const Header = () => {
  const cartAmount = useSelector((state: RootState) => state.cart.count);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const menu = React.useMemo(
    () => (
      <Menu
        items={[
          {
            label: "个人中心",
            key: "0",
            onClick: () => {
              navigate("/dashboard");
            },
          },
          {
            label: "退出登录",
            key: "1",
            danger: true,
            onClick: () => {
              dispatch(logout()).then((resultAction) => {
                if (logout.fulfilled.match(resultAction)) {
                  navigate("/home");
                }
              });
            },
          },
        ]}
      />
    ),
    []
  );

  return (
    <Wrapper>
      <Link to="Home">
        <Logo>拉勾电商</Logo>
      </Link>
      <Nav>
        <NavItem>
          <RouteLink to="/home">首页</RouteLink>
        </NavItem>
        <NavItem>
          <RouteLink to="/mall">商城</RouteLink>
        </NavItem>
        <NavItem>
          <Badge count={cartAmount} size="small">
            <RouteLink to="/cart">购物车</RouteLink>
          </Badge>
        </NavItem>
      </Nav>
      <ButtonWrapper>
        {user != null ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button shape="circle" onClick={(e) => e.preventDefault()}>
              {user.user.name}
            </Button>
          </Dropdown>
        ) : (
          <>
            <Button
              type="text"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              登录
            </Button>
            <Divider type="vertical" />
            <Button
              type="text"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              注册
            </Button>
          </>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const Logo = styled.h1``;

const Nav = styled.nav`
  display: flex;
  margin-left: 24px;
`;

const NavItem = styled.div`
  margin-right: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export default Header;
