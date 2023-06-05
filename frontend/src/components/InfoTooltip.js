import { usePopupClose } from "../hooks/usePopupClose.js";

function InfoTooltip(props) {

  usePopupClose(props.isOpen, props.onClose);

    const imageClassName = props.isOperationSuccessful ? 'register__icon-successful' : 'register__icon-unsuccessful';

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className={imageClassName}></div>
                <h2 className="register__title">{props.isOperationSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                <button type="button" className="popup__close-icon" onClick={props.onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip;
