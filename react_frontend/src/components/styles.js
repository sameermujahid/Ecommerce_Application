import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';

export const ToggleButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #000;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #748d92;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #748d92;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: '';
    display: inline-block;
    margin-left: 8px;
    width: 16px;
    height: 16px;
    background: url('data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 L8.59 1.41 L15.17 8 L0 8 L0 10 L15.17 10 L8.59 16.59 L10 18 L20 8 Z" fill="white"/></svg>') no-repeat center center;
    background-size: contain;
    transition: transform 0.3s;
  }

  &:hover::after {
    transform: translateX(2px);
  }
`;
export const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-top: 20px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
  }

  button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
export const SectionWrapper = styled.section`
  position: relative;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.isTransitioning ? 0 : 1)};
    transition: opacity 0.5s ease-in-out;
    z-index: -1;
  }

  h2 {
    font-size: 32px;
    margin: 0px;
    color: #333;
  }
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 10px;
  margin-top:30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const ProductInfo = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

  p {
    font-size: 18px;
    color: #666;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    color: #666;

    div {
      cursor: pointer;
      padding: 5px 10px;
      background-color: #f0f0f0;
      border-radius: 5px;

      &:hover {
        background-color: #ddd;
      }
    }
  }

  button {
    padding: 10px 20px;
    background-color: #748d92;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: #124e66;
    }
  }
`;


export const SectionTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
`;

export const ViewAllLink = styled(Link)`
  font-size: 18px;
  color: #748d92;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const ProductList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 20px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
`;

export const ProductItem = styled.div`
  flex: 0 0 auto;
  width: 250px;
  margin: 10px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  gap: 5px;
    display: flex;
    flex-direction: column;
  

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  ${(props) => props.active && css`
    border: 2px solid #748d92;
  `}

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  h3 {
    font-size: 20px;
    margin-top: 20px;
    color: #333;
  }

  p {
    margin: 10px 0;
    color: #666;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      color: #748d92;
    }
  }
  img{
    height:350px;
    object-fit: cover;  
    border-radius:10px;
  }
`;
export const ArrowButtonContainer = styled.div`
display:flex;
justify-content:end;
gap:10px;

`;
export const ArrowButton = styled.button`
  position: relative;
  overflow: hidden; /* Ensure ripple effect stays within button boundaries */
  background-color: #748d92;
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
  ${(props) => (props.left ? 'left: 0;' : 'right: 0;')}
  border-radius: 50%; /* Round the button */
  width: 50px; /* Adjust width */
  height: 50px; /* Adjust height */
  font-size: 24px; /* Adjust font size */
  display: flex; /* Allows centering content */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 2; /* Ensure button is above product list */

  &:hover {
    background-color: #124e66;
  }

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5); /* Ripple color */
    width: 300%; /* Adjust size of ripple effect */
    height: 300%; /* Adjust size of ripple effect */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s, opacity 0.5s;
    opacity: 0; /* Initially hidden */
  }

  &:active::after {
    width: 0;
    height: 0;
    opacity: 1;
  }
`;

export const GridProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
  justify-content:center;
`;
export const PriceRangeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PriceInput = styled.input`
  width: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const PriceRangeButton = styled.button`
  background-color: #748d92;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #124e66;
  }
`;

export const FilterButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding:0 20px;
`;
export const SortButton = styled.button`
  background-color: #748d92;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #124e66;
  }
`;
export const SortContainer = styled.div`
  display: flex;
  gap: 20px;
`;
export const PriceRange = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  position: relative;
`;

export const PriceHandle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: grab;
  z-index: 1;

  &:active {
    cursor: grabbing;
  }
`;
export const SizeButton = styled.button`
`;