import { ChangeEvent, FC } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);  
  };

  return (
    <div className="input-wrapper">
      <input
        type="search"
        name="search"
        placeholder="Buscar productos"
        className="search-field"
        onChange={handleInputChange} 
      />
    </div>
  );
};

export default SearchBar;
