import { useRequest } from "ahooks";
import { Spin } from "antd";
import * as React from "react";
import styled from "styled-components";
import { getNewProducts } from "../../api/product";
import CardList from "./components/CardList";
import ProductCard from "./components/ProductCard";

const NewList = () => {
  const { data, error, loading } = useRequest(getNewProducts);

  return (
    <Wrapper>
      <Header>最新上架 {loading ? <Spin /> : null}</Header>
      {error ? "暂时没有商品" : null}
      <CardList>
        {data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </CardList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
`;

const Header = styled.h2``;

export default NewList;
