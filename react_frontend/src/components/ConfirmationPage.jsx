import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #0070c9;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessMessage = styled.p`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #28a745; /* Green color for success */
  display: flex;
  align-items: center;
`;

const CheckMarkIcon = styled.svg`
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  fill: #28a745; /* Green color */
`;

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
      const redirectTimer = setTimeout(() => {
        navigate('/home'); // Redirect to home page after showing the success message
      }, 2000); // 2 seconds delay to show success message

      // Cleanup redirect timer on component unmount
      return () => clearTimeout(redirectTimer);
    }, 3000); // 3 seconds delay

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageContainer>
      {loading ? (
        <LoadingContainer>
          <Spinner />
          <Message>Processing your payment...</Message>
        </LoadingContainer>
      ) : (
        <SuccessContainer>
          <CheckMarkIcon viewBox="0 0 24 24">
            <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.5 7.5l-1.4-1.4z"/>
          </CheckMarkIcon>
          <SuccessMessage>Payment Successful!</SuccessMessage>
        </SuccessContainer>
      )}
    </PageContainer>
  );
};

export default ConfirmationPage;
