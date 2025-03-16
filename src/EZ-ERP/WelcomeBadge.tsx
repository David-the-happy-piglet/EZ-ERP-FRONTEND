import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import { useNavigate } from "react-router-dom";

export default function WelcomeBadge() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(setCurrentUser(null));
        navigate("/EZERP/Login");
    };
    if (!currentUser) {
        return null; // Don't show anything if user is not logged in
    }
    return (
        <div>
            <h1>Welcome to EZ-ERP {currentUser.firstName} {currentUser.lastName}</h1>
            <p>Click on the links to get started</p>
            <Button onClick={logout} className="w-100 mb-2" id="ezerp-signout-btn">
                Sign out
            </Button>
        </div>
    )
}