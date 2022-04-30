import { useRequest } from "ahooks";
import { Button, Divider, Spin } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getProduct,
  getRelatedProduct,
  Product as ProductModel,
} from "../../api/product";
import { BASE_URL } from "../../constants/url";
import { formatDate } from "../../helpers/formatDate";
import { addToCart } from "../../store/cartSlice";
import ProductCard from "../home/components/ProductCard";

const Product = () => {
  const { id } = useParams();

  const {
    data: product,
    error,
    loading,
  } = useRequest(getProduct, {
    defaultParams: [id ?? ""],
  });

  const { data: related } = useRequest(getRelatedProduct, {
    defaultParams: [id ?? ""],
  });

  const dispatch = useDispatch();

  return (
    <Wrapper>
      {loading ? <Spin /> : null}
      {error ? <div>该商品不存在</div> : null}
      {product ? (
        <CardWrapper>
          <CoverWrapper>
            <Cover src={`${BASE_URL}/product/photo/${id}`} />
          </CoverWrapper>
          <ContentWrapper>
            <Name>{product.name}</Name>
            <Desc>{product.description}</Desc>
            <PriceWrapper>
              <Sales>销量 {product.sold}</Sales>
              <Price>价格 {product.price}</Price>
            </PriceWrapper>
            <AddTime>
              上架时间 {formatDate(new Date(product.createdAt))}
            </AddTime>
            <Category>所属分类 {product.category.name}</Category>
            <Divider style={{ marginTop: "auto" }} />
            <ButtonWrapper>
              <Button
                type="primary"
                onClick={() => dispatch(addToCart(product))}
              >
                加入购物车
              </Button>
            </ButtonWrapper>
          </ContentWrapper>
        </CardWrapper>
      ) : null}
      <RelatedWrapper>
        {related != null && related.length > 0 ? (
          <ProductCard product={related[0]} canClick={false} />
        ) : null}
      </RelatedWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 48px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const CoverWrapper = styled.div`
  width: 50%;
`;

const Cover = styled.img``;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3``;

const Desc = styled.p``;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Sales = styled.p``;

const Price = styled.p``;

const AddTime = styled.p``;

const Category = styled.p``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RelatedWrapper = styled.div`
  width: 300px;
`;

export default Product;
