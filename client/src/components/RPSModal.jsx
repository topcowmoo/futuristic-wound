// Functional component definition for Modal
const Modal = ({ isOpen, onClose, children }) => {
  // If modal is not open, return null
  if (!isOpen) return null;

  // Rendering component UI
  return (
    <div className="modal relative flex flex-col mx-auto justify-center items-center">
      {/* Modal content */}
      <div className="modal-content flex flex-col items-center">
        {/* Render children components */}
        {children}
        {/* Close button */}
        <span className="close z-20" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

// Exporting the Modal component
export default Modal;
