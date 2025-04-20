import { Link, useLocation } from "react-router-dom";
import { LiaCogSolid } from "react-icons/lia";
import { ListGroup } from "react-bootstrap";

export default function MainPageNav() {
    const { pathname } = useLocation();

    const links = [
        { label: "Overview", path: "/EZERP/Overview", icon: LiaCogSolid },
        { label: "PM", path: "/EZERP/PM", icon: LiaCogSolid },
        { label: "Orders", path: "/EZERP/Orders", icon: LiaCogSolid },
        { label: "Customers", path: "/EZERP/Customers", icon: LiaCogSolid },
        { label: "Finance", path: "/EZERP/Finance", icon: LiaCogSolid },
        { label: "Account", path: "/EZERP/Account", icon: LiaCogSolid },
        { label: "HR", path: "/EZERP/HR", icon: LiaCogSolid }
    ];

    return (
        <div>
            <ListGroup
                id="ezerp-main-nav"
                style={{ width: 120, left: 0, top: 88 }}
                className="list-group rounded-0 position-fixed bottom-0 d-none d-md-block .bg-body z-2"
            >
                {links.map((link) => (
                    <ListGroup.Item
                        key={`${link.path}-${link.label}`}
                        as={Link}
                        to={link.path}
                        className={`bg-body text-center border-0
                        ${pathname.includes(link.label)
                                ? "text-primary bg-dark-subtle"
                                : "text-dark bg-body"}`}
                    >
                        {link.icon({ className: "fs-1" })}
                        <br />
                        {link.label}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}