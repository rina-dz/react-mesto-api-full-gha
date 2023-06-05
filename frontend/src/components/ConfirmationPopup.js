function ConfirmationPopup(props) {
    return (
        <div className="popup" id="popup_card-delete">
            <div className="popup__container">
                <h2 className="popup__title">Вы уверены?</h2>
                <button type="button" className="popup__close-icon">Да</button>
            </div>
        </div>
    )
}

export default ConfirmationPopup;
