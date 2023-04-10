import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('should call onClose when clicking on the background', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose}>
        <div data-testid="modal-content">In modal</div>
      </Modal>
    );

    const modal = screen.getByTestId('modal-content').parentElement;
    if (modal) {
      fireEvent.click(modal);
      expect(onClose).toHaveBeenCalled();
    }
  });
});
