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

  // use effect to run filter rather in callback
  React.useEffect(() => {
    filter(0, {
      category: selectedCategories ?? [],
      price: selectedPriceRange ?? [],
    });
  }, [selectedCategories, selectedPriceRange, filter]);

  // cache callback
  const handleLoadMoreClick = React.useCallback(() => {
    loadMore(pagedProducts?.data?.length ?? 0, {
      category: selectedCategories ?? [],
      price: selectedPriceRange ?? [],
    });
  }, [pagedProducts, selectedCategories, selectedPriceRange, loadMore]);

  return (
    <Wrapper>
      <Aside>
        <Space direction="vertical" size="large">
          <CategoryFilter
            onSelectCategories={(ids) => {
              setSelectedCategories(ids);
              setHasMore(true);
            }}
          />
          <PriceFilter
            onSelectPriceRange={(range) => {
              setSelectedPriceRange(range);
              setHasMore(true);
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
              <div>??????????????????</div>
            )}
          </CardList>
        )}
        {hasMore && !loading ? (
          <HasMoreWrapper>
            <Button loading={loadingMore} onClick={handleLoadMoreClick}>
              ????????????
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
