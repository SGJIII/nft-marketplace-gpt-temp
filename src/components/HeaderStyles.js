import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

export const StyledNav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 1rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #f1c40f;
    }
  }
`;
