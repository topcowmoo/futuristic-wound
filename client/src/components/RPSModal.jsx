const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal relative flex flex-col mx-auto justify-center items-center ">
      <div className="modal-content flex flex-col items-center ">
        {children}
        <span className="close z-20" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default Modal;
