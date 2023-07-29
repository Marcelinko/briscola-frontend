import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export const Help = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');

  //Always have this over room but only show it full screen if help button is pressed
  useEffect(() => {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      localStorage.setItem('uuid', uuidv4());
    }
  }, []);

  return <p>Stran za pomoč</p>;
};
