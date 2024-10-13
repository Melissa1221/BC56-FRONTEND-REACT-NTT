// src/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);  // Llamamos a la función onSearch con el valor actual del input
  };

  return (
    <div className="input-wrapper">
      <input
        type="search"
        name="search"
        placeholder="Buscar productos"
        className="search-field"
        onChange={handleInputChange} // Detectamos el cambio en el input
      />
    </div>
  );
};

export default SearchBar;
