import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderTable from './orderTable';
import OrderCreate from './orderCreate';
import OrderDetails from './orderDetails';

export default function Orders() {
    const navigate = useNavigate();
    const { orderNumber } = useParams();
    const currentUser = useSelector((state: any) => state.accountReducer?.currentUser);
    const canManageOrders = currentUser?.role === 'ADMIN' || currentUser?.role === 'MKT';

    const handleOrderClick = (orderNumber: string) => {
        navigate(`/EZERP/Orders/${orderNumber}`);
    };

    const handleCreateOrder = () => {
        navigate('/EZERP/Orders/new');
    };

    if (orderNumber === 'new') {
        return <OrderCreate />;
    }

    if (orderNumber) {
        return <OrderDetails />;
    }

    return (
        <div className="h-100">
            <OrderTable
                onOrderClick={handleOrderClick}
                onCreateOrder={handleCreateOrder}
                canManageOrders={canManageOrders}
            />
        </div>
    );
}