function SignForm(props) {

    return (
        <div className="sign">
            <div className="sign__container">
                <h2 className="sign__title">{props.title}</h2>
                <form className="form sign__form" submit={props.handleSubmit}>
                    <input className="sign__input" type="email" name="Email" placeholder="Email"></input>
                    <input className="sign__input" type="password" name="Password" placeholder="Пароль"></input>
                    <button className="sign__submit" type="submit">{props.submit}</button>
                </form>
                {props.children}
            </div>
        </div>
    )
}

export default SignForm;