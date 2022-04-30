import { useRequest } from "ahooks";
import { Input, Select } from "antd";
import * as React from "react";
import styled from "styled-components";
import { getCategories } from "../../api/category";
import { Product, searchProducts } from "../../api/product";
import CardList from "./components/CardList";
import ProductCard from "./components/ProductCard";
const { Option } = Select;
const { Search } = Input;

const SearchList = () => {
  const { data, error, loading } = useRequest(getCategories);
  const [products, setProducts] = React.useState<Product[] | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const { loading: searchLoading, run } = useRequest(searchProducts, {
    manual: true,
    onSuccess: (result) => {
      setProducts(result);
    },
  });

  return (
    <Wrapper>
      <Search
        disabled={loading || error != null}
        loading={searchLoading}
        onSearch={(value) =>
          run(value, selectedCategory === "all" ? "" : selectedCategory)
        }
        style={{ width: "50%" }}
        addonBefore={
          <Select
            value={selectedCategory}
            disabled={loading || error != null}
            onChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <Option value="all">所有分类</Option>
            {data?.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        }
        placeholder="搜索你想要的商品"
        enterButton="搜索"
      />
      <CardList>
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </CardList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default SearchList;
