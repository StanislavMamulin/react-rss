import { SyntheticEvent, cloneElement, Children } from 'react';
import './Modal.scss';

type ModalProps = {
  children: JSX.Element;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  const backgroundClickHandler = (event: SyntheticEvent) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.parentElement === document.body) {
        onClose();
      }
    }
  };

  return (
    <div className="modal" onClick={backgroundClickHandler}>
      {Children.map(children, (child) => {
        return cloneElement(child, { onClose });
      })}
    </div>
  );
};
