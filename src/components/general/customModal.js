import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { forwardRef, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line react/display-name
const BackdropUnstyled = forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export function CustomModal({ maxW = '40vw', open, setOpen, children }) {
  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} slots={{ backdrop: Backdrop }}>
        <Box
          className='popupOutlineRemove'
          sx={{
            overflow: 'hidden',
            borderRadius: '1.875rem',
          }}
        >
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: maxW,
              backgroundColor: '#fff',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <Box className='imgPopupCloseButton' onClick={() => handleClose()}>
              <CloseIcon sx={{ color: '#fff' }} />
            </Box>
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
