import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaShoppingCart, FaUserCircle, FaSearch, FaShoppingBag } from 'react-icons/fa'; // Import FaShoppingBag icon
import SearchBar from './SearchBar'; // Ensure the path is correct

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  width: auto;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s, padding 0.3s, color 0.3s;

  ${(props) =>
    props.isScrolled
      ? css`
          background-color: black;
          padding: 10px 20px;
          color: white;
        `
      : css`
          background-color: white;
          padding: 15px 20px;
          color: black;
        `}
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavLinkItem = styled.li`
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover .user-details {
    display: flex;
    width: 200px;
    color: black;
  }
`;

const UserDetails = styled.div`
  display: none;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: calc(100% + 1px);
  right: 0;
  background-color: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1001;
  width: auto;
`;

const Avatar = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

const Username = styled.span`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #748d92;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
const PurchasesIcon = styled(FaShoppingBag)`
  cursor: pointer;
  font-size: 24px;
`;
const SearchIcon = styled(FaSearch)`
  cursor: pointer;
  font-size: 24px;
`;
const Navbar = ({ user, handleLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = () => {
    if (user) {
      navigate(`/cart/${user.id}`);
    } else {
      navigate('/login');
    }
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Add handlePurchasesClick function to handle clicks on the purchases icon
  const handlePurchasesClick = () => {
    if (user) {
      navigate(`/purchases/user/${user.id}`); // Redirect to the purchases page
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <NavbarContainer isScrolled={isScrolled}>
        <Logo>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            S&M
          </Link>
        </Logo>
        <NavLinks>
          <NavLinkItem>
            <FaShoppingCart onClick={handleCartClick} style={{ cursor: 'pointer', fontSize: '24px' }} />
          </NavLinkItem>
          <NavLinkItem>
            <SearchIcon onClick={toggleSearchBar} />
          </NavLinkItem>
          {/* Render the PurchasesIcon */}
          <NavLinkItem>
            <PurchasesIcon onClick={handlePurchasesClick} />
          </NavLinkItem>
          {user ? (
            <UserSection>
              <Username>Welcome, {user.username}</Username>
              <Avatar>
                <FaUserCircle />
              </Avatar>
              <UserDetails className="user-details">
                <span>Username: {user.username}</span>
                <span>Email: {user.email}</span>
                <Button onClick={handleLogout}>Logout</Button>
              </UserDetails>
            </UserSection>
          ) : (
            <NavLinkItem>
              <Link to="/admin/login">Login</Link>
            </NavLinkItem>
          )}
        </NavLinks>
      </NavbarContainer>
      {isSearchOpen && <SearchBar onClose={toggleSearchBar} />}
    </>
  );
};

export default Navbar;
