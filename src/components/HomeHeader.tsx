import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeBodyHeader = styled.div`
  z-index: 1001;
  height: 64px;
  padding: 0px 36px;
  top: 0px;
  left: 0px;
  width: 100vw;
  user-select: none;
  position: fixed;
  background-color: rgb(16, 25, 24);
  color: rgb(255, 255, 255);
`;

const HomeHeader = () => {
  return (
    <HomeBodyHeader>
      <button>
        <Link to="/login">To login</Link>
      </button>
      <button>
        <Link to="/application">To Map</Link>
      </button>
    </HomeBodyHeader>
  );
};

export default HomeHeader;
