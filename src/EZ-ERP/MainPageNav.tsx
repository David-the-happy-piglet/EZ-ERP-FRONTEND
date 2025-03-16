import { Link, useLocation } from "react-router-dom";
import { LiaCogSolid } from "react-icons/lia"; // Add this line
import { ListGroup } from "react-bootstrap";

export default function MainPageNav() {

    const { pathname } = useLocation();

    const links = [
        { label: "Overview", path: "/EZERP/Overview", icon: LiaCogSolid },
        { label: "Order", path: "/EZERP/Order", icon: LiaCogSolid },
        { label: "Customer", path: "/EZERP/Customer", icon: LiaCogSolid },
        { label: "Finance", path: "/EZERP/Finance", icon: LiaCogSolid },
        { label: "Account", path: "/EZERP/Account", icon: LiaCogSolid },
    ]
    return (
        <div>
            <ListGroup id="ezerp-main-nav" style={{ width: 120 }}
                className="list-group rounded-0 position-fixed
        bottom-0 top-0 d-none d-md-block bg-black z-2">
                {links.map((link) => (
                    <ListGroup.Item key={`${link.path}-${link.label}`} as={Link} to={link.path} className={`bg-black text-center border-0
                    ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
                        {link.icon({ className: "fs-1 text-danger" })}
                        <br />
                        {link.label}
                    </ListGroup.Item>

                ))}
            </ListGroup>
        </div>
    )

}