import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  active: boolean;
  id: string;
  children: React.ReactNode;
  onClose?: () => void;
}

function Modal(props: ModalProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export function ModalContent(props: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    if (contentRef.current) {
      (contentRef.current.parentNode as Element).classList.remove("active");
    }
    if (props.onClose) props.onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className=""></i>
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;
