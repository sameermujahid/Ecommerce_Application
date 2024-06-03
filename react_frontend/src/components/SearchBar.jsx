import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { debounce } from 'lodash';

const SearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1002;
`;

const SearchContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchResultItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/search/?q=${query}`);
          if (Array.isArray(response.data)) {
            setResults(response.data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error('Error searching', error);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    };

    const debouncedFetchResults = debounce(fetchResults, 300);
    debouncedFetchResults();

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [query]);

  return (
    <SearchOverlay onClick={onClose}>
      <SearchContainer onClick={(e) => e.stopPropagation()}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for categories or products..."
        />
        {results.length > 0 && (
          <SearchResults>
            {results.map((result) => (
              <SearchResultItem key={result.id}>
                {result.type}: {result.name}
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </SearchContainer>
    </SearchOverlay>
  );
};

export default SearchBar;
