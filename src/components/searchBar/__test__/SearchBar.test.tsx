import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { SearchBarProps } from '../searchBar.domain';

describe('SearchBar Component', () => {
  const onSearch = jest.fn();
  const defaultProps: SearchBarProps = {
    onSearch,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input and button', () => {
    render(<SearchBar {...defaultProps} />);


    const input = screen.getByPlaceholderText('Buscar productos');
    const button = screen.getByLabelText('search');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls onSearch with the correct value when typing in the input', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText('Buscar productos');


    fireEvent.change(input, { target: { value: 'new search term' } });


    expect(onSearch).toHaveBeenCalledWith('new search term');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('does not call onSearch when input is cleared without typing a new term', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText('Buscar productos');

    fireEvent.change(input, { target: { value: 'temporary' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(onSearch).toHaveBeenCalledWith('temporary');
    expect(onSearch).toHaveBeenCalledWith('');
    expect(onSearch).toHaveBeenCalledTimes(2);
  });
});
