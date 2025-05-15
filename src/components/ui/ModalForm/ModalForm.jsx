import css from './ModalForm.module.css';
import Button from '../Button/Button';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

Modal.setAppElement('#root');

export default function ModalForm({
  modalIsOpen,
  closeModal,
  children,
  variant = null,
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const baseContentStyles = {
    position: 'relative',
    border: '1px solid rgba(104, 104, 104, 0.2)',
    borderRadius: '12px',
    backgroundColor: '#1f1f1f',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
  };

  const baseOverlayStyles = {
    zIndex: '99999999999999999',
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
  };

  const getVariantStyles = () => {
    let variantStyles = {};

    if (variant === 'book') {
      variantStyles = {
        width: isMobile ? '335px' : '500px',
        padding: isMobile ? '40px' : '50px',
      };
    } else if (variant === 'notification') {
      variantStyles = {
        width: isMobile ? '335px' : '342px',
        padding: isMobile ? '60px 46px' : '50px',
      };
    }
    return {
      content: { ...baseContentStyles, ...variantStyles },
      overlay: baseOverlayStyles,
    };
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={getVariantStyles()}
      bodyOpenClassName={css.modalOpen}
      contentLabel="Modal Window"
    >
      <Button type="button" variant="closeModal" onClick={closeModal}>
        <svg width={22} height={22}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </Button>
      {children}
    </Modal>
  );
}
