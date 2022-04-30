import { useRequest } from "ahooks";
import { Checkbox, Space, Spin } from "antd";
import * as React from "react";
import styled from "styled-components";
import { getCategories } from "../../api/category";

const CategoryFilter = ({
  onSelectCategories,
}: {
  onSelectCategories: (ids: string[]) => void;
}) => {
  const { data, error, loading } = useRequest(getCategories);

  return (
    <Wrapper>
      <Title>按照分类筛选</Title>
      {loading ? <Spin /> : null}
      {error ? <div>请求失败</div> : null}
      <Checkbox.Group
        onChange={(value) => onSelectCategories(value as string[])}
      >
        <Space direction="vertical">
          {data?.map((item) => (
            <Checkbox key={item._id} value={item._id}>
              {item.name}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h3``;

export default CategoryFilter;
