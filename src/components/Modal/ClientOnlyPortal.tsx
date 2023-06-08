import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ClientOnlyPortalProps = {
  children: ReactNode;
};

export const ClientOnlyPortal = ({ children }: ClientOnlyPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};
