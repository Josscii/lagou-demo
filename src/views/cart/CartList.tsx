import * as React from "react";
import styled from "styled-components";
import { Button, InputNumber, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CartItem,
  changeCartItemCount,
  deleteCartItem,
  selectCartItems,
} from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { BASE_URL } from "../../constants/url";

const columns: ColumnsType<CartItem> = [
  {
    key: "cover",
    title: "商品封面",
    dataIndex: "id",
    width: "200px",
    render: (id: string) => (
      <CoverWrapper>
        <img src={`${BASE_URL}/product/photo/${id}`} />
      </CoverWrapper>
    ),
  },
  {
    key: "name",
    title: "商品名称",
    dataIndex: ["product", "name"],
  },
  {
    key: "price",
    title: "商品价格",
    dataIndex: ["product", "price"],
  },
  {
    key: "category",
    title: "商品分类",
    dataIndex: ["product", "category", "name"],
  },
  {
    key: "count",
    title: "商品数量",
    dataIndex: "count",
    render: (count: number, item: CartItem) => (
      <InputNumber
        min={1}
        defaultValue={count}
        onChange={(value) => {
          store.dispatch(changeCartItemCount({ id: item.id, count: value }));
        }}
      />
    ),
  },
  {
    key: "operation",
    title: "操作",
    dataIndex: "id",
    render: (id: string) => (
      <Popconfirm
        title="确认要将这个商品移出购物车吗？"
        onConfirm={() => store.dispatch(deleteCartItem(id))}
        okText="确认"
        cancelText="取消"
      >
        <Button danger>移除</Button>
      </Popconfirm>
    ),
  },
];

const CartList = () => {
  const data = useSelector((state: RootState) =>
    state.cart.ids.map((id) => state.cart.items[id])
  );

  const dispatch = useDispatch();
  return (
    <Table<CartItem>
      columns={columns}
      dataSource={data}
      rowKey="id"
      rowSelection={{
        onChange: (selectedRowKeys: React.Key[]) => {
          const ids = selectedRowKeys as string[];
          dispatch(selectCartItems(ids));
        },
        selectedRowKeys: data
          .filter((item) => item.selected)
          .map((item) => item.id),
      }}
    />
  );
};

const CoverWrapper = styled.div``;

export default CartList;
