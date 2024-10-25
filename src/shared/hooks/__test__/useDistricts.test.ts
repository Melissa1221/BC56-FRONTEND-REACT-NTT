import { renderHook} from "@testing-library/react";
import districts from "../../../data/districts";
import useDistricts from "../useDistricts";


describe('useDistricts Hook', () => {
    test('loads districts after mounting', () => {
      const { result } = renderHook(() => useDistricts());
  
      expect(result.current).toEqual(districts); 
    });
  });