// src/components/LoginHeader.js

import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const LoginHeader = () => {
  return (
    <HeaderWrapper>
      <Logo>Your Logo</Logo>
    </HeaderWrapper>
  );
};

export default LoginHeader;
