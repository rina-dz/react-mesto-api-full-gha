import PopupWithForm from './PopupWithForm.js';
import { usePopupClose } from "../hooks/usePopupClose.js";
import React from 'react';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    usePopupClose(props.isOpen, props.onClose);

    return (
        <PopupWithForm name={'avatar'} onSubmit={handleSubmit} title={'Обновить аватар'} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'}>
            <div>
                <input type="url" ref={avatarRef} name="Avatar" placeholder="Ссылка на картинку" className="popup__text" id="input_avatar" required />
                <span className="popup__error" id="input_avatar-error" />
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;


