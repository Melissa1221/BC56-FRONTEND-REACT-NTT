import { act, renderHook } from '@testing-library/react';
import usePagination from '../usePagination';

describe('usePagination', () => {
  const items = Array.from({ length: 20 }, (_, i) => i + 1); 

  it('calculates total pages correctly based on itemsPerPage', () => {
    const { result } = renderHook(() => usePagination(items, 8));
    expect(result.current.totalPages).toBe(3); 
  });

  it('returns correct items for the first page', () => {
    const { result } = renderHook(() => usePagination(items, 8));
    expect(result.current.currentItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('goes to specified page and returns correct items', () => {
    const { result } = renderHook(() => usePagination(items, 8));

    act(() => {
      result.current.goToPage(2);
    });
    expect(result.current.currentItems).toEqual([9, 10, 11, 12, 13, 14, 15, 16]);
    expect(result.current.currentPage).toBe(2);
  });

  it('does not go below the first page', () => {
    const { result } = renderHook(() => usePagination(items, 8));

    act(() => {
      result.current.goToPage(0); 
    });
    expect(result.current.currentPage).toBe(1); 
  });

  it('does not exceed the last page', () => {
    const { result } = renderHook(() => usePagination(items, 8));

    act(() => {
      result.current.goToPage(4); 
    });
    expect(result.current.currentPage).toBe(3); 
  });
});
