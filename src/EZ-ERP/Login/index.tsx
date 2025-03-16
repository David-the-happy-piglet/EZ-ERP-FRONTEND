import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import { setCurrentUser } from "../Account/reducer";

export default function Login() {

    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = () => {
        const user = db.users.find(
            (u: any) => u.username === credentials.username && u.password === credentials.password);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/EZERP/Overview");
    }
    return (
        <div>
            <h1>Welcome to EZ-ERP</h1>
            <h2>Please enter your username</h2>
            <Form.Control defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                id="erp-username"
                placeholder="username"
                className="mb-2" />

            <h2>Please enter your password</h2>
            <Form.Control defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                id="erp-password"
                placeholder="password" type="password"
                className="mb-2" />

            <br />
            <br />
            <br />
            <Button onClick={login} id="erp-signin-btn" className="w-100">Login</Button>
        </div>
    )
}