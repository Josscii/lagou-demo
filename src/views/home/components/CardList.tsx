import styled from "styled-components";

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 16px;
  width: 100%;
`;

export default CardList;
