import { useCallback } from 'react';

const useScrollIntoView = () => {
  const scrollTo = useCallback((containerName:string) => {
    const element:HTMLElement | null = document.querySelector(`[data-container="${containerName}"]`);
    if ( element ) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // eslint-disable-next-line
  }, [])

  return { scrollTo }
}

export default useScrollIntoView;
