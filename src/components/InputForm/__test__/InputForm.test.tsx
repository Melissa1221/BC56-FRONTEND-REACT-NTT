import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from '../InputForm';

describe('InputForm Component', () => {
  const defaultProps = {
    id: 'test-id',
    label: 'Test Label',
    name: 'testName',
    type: 'text',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    error: '',
  };

  test('renders the label', () => {
    render(<InputForm {...defaultProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('renders an input field when type is not select', () => {
    render(<InputForm {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'testName');
  });

  test('renders a select field when type is select', () => {
    const props = {
      ...defaultProps,
      type: 'select',
      options: [{ id: '1', name: 'Option 1' }],
    };
    render(<InputForm {...props} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  test('calls onChange when typing in the input field', () => {
    render(<InputForm {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('calls onBlur when input loses focus', () => {
    render(<InputForm {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  test('displays error message when error is passed', () => {
    const props = { ...defaultProps, error: 'Error message' };
    render(<InputForm {...props} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('renders select options correctly', () => {
    const props = {
      ...defaultProps,
      type: 'select',
      options: [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
      ],
    };
    render(<InputForm {...props} />);
    expect(screen.getByText('Seleccione una opción')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
