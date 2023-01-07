import { useEffect, Dispatch, SetStateAction, useRef, RefObject } from 'react';

export const useClickOutside = (
  setDisplay: Dispatch<SetStateAction<boolean>>
): RefObject<HTMLFormElement | HTMLUListElement> => {
  const domNode = useRef<HTMLFormElement | HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: any): void => {
      console.log(domNode.current);

      if (domNode.current && !domNode.current.contains(e.target)) {
        setTimeout(() => {
          setDisplay(false);
        }, 0);
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [domNode, setDisplay]);

  return domNode;
};