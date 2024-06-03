import React from 'react';
import styled from 'styled-components';

const ParallaxContainer = styled.div`
  position: relative;
  height: 500px; /* Adjust the height as needed */
  background: url('download.jpeg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Add a transparent overlay */
    z-index: 1;
  }
`;

const ParallaxContent = styled.div`
  position: relative;
  z-index: 2;
  color: #fff;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1); /* Adjust the transparency as needed */
  border-radius: 10px;
`;

const ParallaxSection = ({ title, subtitle }) => {
  return (
    <ParallaxContainer>
      <ParallaxContent>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </ParallaxContent>
    </ParallaxContainer>
  );
};

export default ParallaxSection;
