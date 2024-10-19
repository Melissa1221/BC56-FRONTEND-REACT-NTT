import { useState, useEffect } from 'react';
import districts from '../data/districts';

interface District {
  id: string;
  name: string;
}

const useDistricts = () => {
  const [districtList, setDistrictList] = useState<District[]>([]);

  useEffect(() => {
    setDistrictList(districts);
  }, []);

  return districtList;
};

export default useDistricts;
