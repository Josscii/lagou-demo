import { Radio, Space } from "antd";
import * as React from "react";
import styled from "styled-components";

const PRICE_RANGE = [
  [],
  [1, 50],
  [51, 100],
  [101, 150],
  [151, 200],
  [201, 500],
];

const PriceFilter = ({
  onSelectPriceRange,
}: {
  onSelectPriceRange: (priceRange: number[]) => void;
}) => {
  return (
    <Wrapper>
      <Title>按照价格筛选</Title>
      <Radio.Group
        defaultValue={0}
        onChange={(e) => onSelectPriceRange(PRICE_RANGE[e.target.value])}
      >
        <Space direction="vertical">
          {PRICE_RANGE.map(([min, max], index) =>
            index === 0 ? (
              <Radio key={index} value={index}>
                不限制价格
              </Radio>
            ) : (
              <Radio key={index} value={index}>{`${min}-${max}`}</Radio>
            )
          )}
        </Space>
      </Radio.Group>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h3``;

export default PriceFilter;
