import { Button, Card, Divider } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../../api/product";
import { BASE_URL } from "../../../constants/url";
import { formatDate } from "../../../helpers/formatDate";
import { addToCart } from "../../../store/cartSlice";

const ProductCard = ({
  product,
  canClick = true,
}: {
  product: Product;
  canClick?: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card
      hoverable={canClick}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <ContentWrapper>
        <CoverWrapper>
          <Cover src={`${BASE_URL}/product/photo/${product._id}`} />
        </CoverWrapper>
        <Name>{product.name}</Name>
        <Desc>{product.description}</Desc>
        <PriceWrapper>
          <Sales>销量 {product.sold}</Sales>
          <Price>价格 {product.price}</Price>
        </PriceWrapper>
        <AddTime>上架时间 {formatDate(new Date(product.createdAt))}</AddTime>
        <Category>所属分类 {product.category.name}</Category>
      </ContentWrapper>
      <Divider />
      <ButtonWrapper>
        {canClick ? <Button>查看详情</Button> : null}
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
        >
          加入购物车
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

const ContentWrapper = styled.div``;

const CoverWrapper = styled.div``;

const Cover = styled.img``;

const Name = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

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
  justify-content: space-between;
`;

export default ProductCard;
