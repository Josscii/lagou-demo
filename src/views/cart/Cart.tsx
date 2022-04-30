import * as React from "react";
import styled from "styled-components";
import CartCheckout from "./CartCheckout";
import CartList from "./CartList";

const Cart = () => {
  return (
    <Wrapper>
      <CartListWrapper>
        <CartList />
      </CartListWrapper>
      <CartCheckoutWrapper>
        <CartCheckout />
      </CartCheckoutWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 64px;
  display: flex;
  gap: 24px;
`;

const CartListWrapper = styled.div`
  flex: 1;
`;

const CartCheckoutWrapper = styled.div`
  width: 300px;
`;

export default Cart;
