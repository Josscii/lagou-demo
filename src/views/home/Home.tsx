import * as React from "react";
import styled from "styled-components";
import NewList from "./NewList";
import SearchList from "./SearchList";
import TopList from "./TopList";

const Home = () => {
  return (
    <Wrapper>
      <SearchList />
      <NewList />
      <TopList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 64px;
`;

export default Home;
