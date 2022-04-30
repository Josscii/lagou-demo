import { useRequest } from "ahooks";
import { Button, Space, Spin } from "antd";
import * as React from "react";
import styled from "styled-components";
import { filterProducts, PagedProducts } from "../../api/product";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import CardList from "../home/components/CardList";
import ProductCard from "../home/components/ProductCard";

const Mall = () => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<number[]>(
    []
  );
  const [pagedProducts, setPagedProducts] = React.useState<PagedProducts>();

  const [hasMore, setHasMore] = React.useState(true);

  const { loading, run: filter } = useRequest(filterProducts, {
    onSuccess: (result) => {
      setPagedProducts(result);
    },
  });

  const { loading: loadingMore, run: loadMore } = useRequest(filterProducts, {
    manual: true,
    onSuccess: (result) => {
      if (pagedProducts) {
        setPagedProducts({
          size: pagedProducts.data.length + result.data.length,
          data: pagedProducts.data.concat(result.data),
        });
      } else {
        setPagedProducts(result);
      }
      if (result.data.length === 0) {
        setHasMore(false);
      }
    },
  });

  return (
    <Wrapper>
      <Aside>
        <Space direction="vertical" size="large">
          <CategoryFilter
            onSelectCategories={(ids) => {
              setSelectedCategories(ids);
              setHasMore(true);
              filter(0, {
                category: ids,
                price: selectedPriceRange ?? [],
              });
            }}
          />
          <PriceFilter
            onSelectPriceRange={(range) => {
              setSelectedPriceRange(range);
              setHasMore(true);
              filter(0, {
                category: selectedCategories ?? [],
                price: range,
              });
            }}
          />
        </Space>
      </Aside>
      <Content>
        {loading ? (
          <Spin />
        ) : (
          <CardList>
            {pagedProducts?.data != null && pagedProducts.data.length > 0 ? (
              pagedProducts.data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div>暂时没有商品</div>
            )}
          </CardList>
        )}
        {hasMore && !loading ? (
          <HasMoreWrapper>
            <Button
              loading={loadingMore}
              onClick={() =>
                loadMore(pagedProducts?.data?.length ?? 0, {
                  category: selectedCategories ?? [],
                  price: selectedPriceRange ?? [],
                })
              }
            >
              加载更多
            </Button>
          </HasMoreWrapper>
        ) : null}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 16px 64px;
`;

const Aside = styled.aside`
  width: 200px;
`;

const Content = styled.div`
  flex: 1;
`;

const HasMoreWrapper = styled.div`
  text-align: center;
  padding: 16px 0;
`;

export default Mall;
