import styled, { keyframes } from 'styled-components';
import React, { useState, useRef } from 'react';
import { FaVolumeMute, FaVolumeUp, FaPause, FaPlay } from 'react-icons/fa';
// import logoImage from '../../public/logo.jpeg';  // Adjust the path as needed

const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-image: url('/public/iOS 13 and macOS Catalina wallpapers.jpeg');
  background-size: cover;
  background-position: center;
`;

const shrinkAnimation = keyframes`
  0% {
    width: 100vw;
    height: 100vh;
  }
  100% {
    width: 70vw;
    height: 70vh;
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${shrinkAnimation} 3s forwards;
  animation-play-state: ${({ play }) => (play ? 'running' : 'paused')};
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
`;

const HeroText = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const HeroSubText = styled.p`
  font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 50px;
`;

const Logo = styled.img`
  width: 100px;  // Adjust the size as needed
  height: auto;
  margin-bottom: 20px;
`;

const HeroSection = ({ videoSrc, thumbnail, text, subText }) => {
  const [muted, setMuted] = useState(true);
  const [play, setPlay] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlay(true);
    } else {
      videoRef.current.pause();
      setPlay(false);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVideoEnded = () => {
    setPlay(false);
  };

  return (
    <HeroContainer>
      <ButtonContainer>
        <IconButton onClick={toggleMute}>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </IconButton>
        <IconButton onClick={togglePlay}>
          {play ? <FaPause /> : <FaPlay />}
        </IconButton>
      </ButtonContainer>
      <VideoWrapper play={play}>
        <VideoBackground autoPlay loop muted={muted} onEnded={handleVideoEnded} ref={videoRef}>
          <source src="/My honest reaction_.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBackground>
        <HeroContent>
          {/* <Logo src={logoImage} alt="Logo" /> */}
          <HeroText>{text}</HeroText>
          <HeroSubText>{subText}</HeroSubText>
        </HeroContent>
      </VideoWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
