function App(props) {
    return (
        <section>
            <Form
                type={formType}
                setMessage={setMessage}
            />
        </section>
    );
}

function Login(props) {
    return (
        <form
            onSubmit={submit}
            className="block inline-block width"
            action="/login"
            method="post"
        >
            <input
                required
                autoCapitalize="off"
                autoCorrect="off"
                autoFocus
                id="username"
                name="username"
                tabIndex="1"
            />
        </form>
    );
}

function FormJoin(props) {
    return (
        <form
            onSubmit={submit}
            className="block inline-block width"
            action="/join"
            method="post"
        >
            <input id="password" name="password" tabIndex="3" type="password"/>
        </form>
    );
}