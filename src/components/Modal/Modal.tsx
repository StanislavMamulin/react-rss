import { cloneElement, Children, useRef, MouseEvent } from 'react';
import './Modal.scss';

type ModalProps = {
  children: JSX.Element;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const backgroundClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current === event.target) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={backgroundClickHandler} ref={modalRef}>
      {Children.map(children, (child) => {
        return cloneElement(child, { onClose });
      })}
    </div>
  );
};
