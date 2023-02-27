import PropTypes from "prop-types";
import { useEffect, useRef, useState } from 'react';
,

function Modal(props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active)
  }, [props.active])

  return <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
    {props.children}
  </div>;
}

Modal.PropTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export function ModalContent(props) {

  const contentRef = useRef(null)

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active')
    if (props.onClose) props.onClose();
  }

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className=""></i>
      </div> 
    </div>
  )
}

ModalContent.propTypes = {
  onclose: PropTypes.func
}

export default Modal;
