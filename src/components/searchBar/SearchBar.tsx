import { ChangeEvent, FC } from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import styles from './SearchBar.module.css';
import { SearchBarProps } from './searchBar.domain';


const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);  
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="search"
        name="search"
        placeholder="Buscar productos"
        className={styles.searchField}
        onChange={handleInputChange} 
      />
      <button className={styles.searchSubmit} aria-label="search">
        <IonIcon  icon={searchOutline} aria-hidden="true"></IonIcon>
      </button>
    </div>
  );
};

export default SearchBar;
