import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import { useNavigate } from "react-router-dom";

export default function WelcomeBadge() {
    const currentUser = useSelector((state: any) => state.accountReducer?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getGreeting = () => {
        const hour = new Date().getHours();
        //console.log(hour)
        if (6 < hour && hour < 12) {
            return "Good Morning";
        } else if ((12 < hour || hour == 12) && hour < 18) {
            return "Good Afternoon";
        } else if ((18 < hour || hour == 18) && hour < 22) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    };

    const logout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Login");
    };

    if (!currentUser) {
        return null; // Don't show anything if user is not logged in
    }

    return (
        <div className="ezerp-welcome-badge">
            <h1>{getGreeting()}, {currentUser.firstName}</h1>

            <div className="signout-container">
                <Button onClick={logout} id="ezerp-signout-btn" className="btn-sm btn-danger">
                    Sign out
                </Button>
            </div>
        </div>
    )
}