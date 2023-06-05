import { usePopupClose } from "../hooks/usePopupClose.js";

function ImagePopup(props) {

  usePopupClose(props.isOpen, props.onClose);

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id="popup_image">
      <div className="popup__image-box">
        <img src={props.card.link} className="popup__image" alt={props.card.name} />
        <h2 className="popup__description">{props.card.name}</h2>
        <button type="button" className="popup__close-icon" onClick={props.onClose} />
      </div>
    </div>
  )
}

export default ImagePopup;
