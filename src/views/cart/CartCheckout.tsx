import { useRequest } from "ahooks";
import { Button, Input, Space } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { buy } from "../../api/product";
import { RootState } from "../../store/store";

const CartCheckout = () => {
  const selectedCartItems = useSelector((state: RootState) =>
    Object.values(state.cart.items).filter((item) => item.selected)
  );

  const totalPrice = selectedCartItems.reduce(
    (price, item) => price + item.product.price * item.count,
    0
  );

  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const [address, setAddress] = React.useState("");

  const { loading, run } = useRequest(buy, {
    manual: true,
    onSuccess: (result) => {
      if ("result" in result.data) {
        window.location.href = result.data.result;
      }
    },
  });

  return (
    <Wrapper>
      <Space direction="vertical">
        <Input
          placeholder="请输入收货地址"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
        <TotalPrice>商品总价：{totalPrice.toFixed(2)}</TotalPrice>
        {user != null ? (
          <Button
            type="primary"
            disabled={selectedCartItems.length === 0}
            onClick={() => {
              run(selectedCartItems, address, totalPrice);
            }}
            loading={loading}
          >
            提交订单
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            登录
          </Button>
        )}
      </Space>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TotalPrice = styled.h3``;

export default CartCheckout;
