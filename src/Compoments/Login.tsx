import React from "react";

export const Login = () => {
    return (
        <>
            <form>
                <label>
                    Login
                    <input type={"text"}/><br/>
                </label>
                <label>
                    Hasło
                    <input type={"password"}/>
                    <br/>
                </label>
                <button type={"submit"}>Zaloguj</button>
            </form>
        </>
    )
}