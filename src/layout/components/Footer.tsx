import * as React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      该 Demo 由 Josscii 实现，仅作为演示之用，技术栈为 Webpack + TypeScript +
      React + React-Router + Redux + Antd + StyledComponent
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: #f5f5f5;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer;
