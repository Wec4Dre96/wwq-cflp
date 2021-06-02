import React from "react";
import styled from "styled-components";
import WuwenqiLogo from "../assets/WechatIMG418.jpeg";
import ZywLogo from "../assets/zhangyouwu.jpeg";
import XyrLogo from "../assets/xuyiruo.jpeg";
import HjyLogo from "../assets/hujiayi.jpeg";

const ContributorsWrapper = styled.div`
  position: relative;
  padding: 2rem;
  max-width: 80rem;
  width: 100%;
  height: 100%;
  margin: 0px;
`;

const InnerContributors = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SingleContributor = styled.div`
  margin: 10px;
  display: inline-block;
  width: 6rem;
  height: 8rem;
  text-decoration: none;
  text-align: center;
  color: rgb(43, 72, 69);
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 88px;
  width: 88px;
  border: 4px solid transparent;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 0px;
  transition: border 0.5s ease 0s, box-shadow 0.5s ease 0s;
  opacity: 0.9;
`;

const Title = styled.h2`
  text-align: center;
`;

const Contributors = () => {
  return (
    <section
      style={{
        background: `rgb(232, 232, 232)`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ContributorsWrapper>
        <div>
          <Title>Contributors</Title>
          <InnerContributors>
            <SingleContributor>
              <Avatar src={`${WuwenqiLogo}`} />
              <div>Wu Wenqi</div>
            </SingleContributor>
            <SingleContributor>
              <Avatar src={`${ZywLogo}`} />
              <div>Zhang Youwu</div>
            </SingleContributor>
            <SingleContributor>
              <Avatar src={`${XyrLogo}`} />
              <div>Xu Yiruo</div>
            </SingleContributor>
            <SingleContributor>
              <Avatar src={`${HjyLogo}`} />
              <div>Hu Jiayi</div>
            </SingleContributor>
          </InnerContributors>
        </div>
      </ContributorsWrapper>
    </section>
  );
};

export default Contributors;
