import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/hero.jpeg';
import { Contributors, HomeHeader } from '../components'

const Home = styled.div`
  outline: none;
`;

const HomeBody = styled.div`
  width: 100vw;
  height: 100vh;
`;

const HomeBodyBody = styled.div`
  margin: 0px auto;
  padding: 64px 0px 0px;
`;

const HomeBanner = styled.section`
  position: relative;
  height: 30rem;
  background: rgb(43, 72, 69);
  color: rgb(255, 255, 255);
  z-index: 0;
`;

const HomeBannerImgWrapper = styled.div`
  position: absolute;
  inset: 0px;
  z-index: -1;
`;

const HomeBannerImg = styled.div`
  background-image: url(${logo});
  background-size: cover;
  background-position: center center;
  height: 100%;
`;


const HomePage = () => {
  return (
    <Home>
      <HomeBody>
        <HomeHeader />
        <HomeBodyBody>
          <main>
            <HomeBanner>
              <HomeBannerImgWrapper>
                <HomeBannerImg />
              </HomeBannerImgWrapper>
            </HomeBanner>
            <Contributors />
          </main>
        </HomeBodyBody>
      </HomeBody>
    </Home>
  );
};

export default HomePage;
