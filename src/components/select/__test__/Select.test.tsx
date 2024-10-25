import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default and provided options', () => {
    render(<Select options={options} onChange={onChange} />);

    const select = screen.getByRole('combobox');
    const defaultOption = screen.getByText('Seleccione una opción');
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');

    expect(select).toBeInTheDocument();
    expect(defaultOption).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('calls onChange with the correct value when an option is selected', () => {
    render(<Select options={options} onChange={onChange} />);

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'option2' } });
    expect(onChange).toHaveBeenCalledWith('option2');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('displays the custom default option if provided', () => {
    render(<Select options={options} onChange={onChange} defaultOption="Choose an option" />);

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });
});
