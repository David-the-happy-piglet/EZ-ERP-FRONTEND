import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { authService } from '../services/api';

export enum UserRole {
    ADMIN = 'ADMIN',
    MKT = 'MKT',
    MACHINING = 'MACHINING',
    QC = 'QC',
    CHEMIST = 'CHEMIST',
    FINANCE = 'FINANCE',
    HR = 'HR',
    GUEST = 'GUEST'
}

interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    dob: string;
}

interface UserFormData {
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    dob: string;
}

export default function HumanResource() {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.GUEST,
        dob: ''
    });

    const currentUser = useSelector((state: any) => state.accountReducer?.currentUser);
    const canManageUsers = currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.HR;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await authService.getAllUsers();
            setUsers(response.data as User[]);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch users');
        }
    };

    const handleShowModal = (user?: User) => {
        if (user) {
            setSelectedUser(user);
            setFormData({
                username: user.username,
                password: '',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                dob: user.dob
            });
        } else {
            setSelectedUser(null);
            setFormData({
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: '',
                role: UserRole.GUEST,
                dob: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setFormData({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            role: UserRole.GUEST,
            dob: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                const { password, dob, ...updateData } = formData;
                await authService.updateUser(selectedUser._id, updateData);
            } else {
                if (!formData.password || !formData.dob) {
                    setError('Password and Date of Birth are required for new users');
                    return;
                }
                await authService.createUser({
                    username: formData.username,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    role: formData.role,
                    dob: formData.dob
                });
            }
            fetchUsers();
            handleCloseModal();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await authService.deleteUser(userId);
                fetchUsers();
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">User Management</h2>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            {canManageUsers && (
                <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                    Add New User
                </Button>
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        {canManageUsers && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            {canManageUsers && (
                                <td>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleShowModal(user)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser ? 'Edit User' : 'Create New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                        disabled={!!selectedUser}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required={!selectedUser}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                                        required
                                    >
                                        <option value={UserRole.ADMIN}>Admin</option>
                                        <option value={UserRole.MKT}>Marketing</option>
                                        <option value={UserRole.MACHINING}>Machining</option>
                                        <option value={UserRole.QC}>Quality Control</option>
                                        <option value={UserRole.CHEMIST}>Chemist</option>
                                        <option value={UserRole.FINANCE}>Finance</option>
                                        <option value={UserRole.HR}>Human Resources</option>
                                        <option value={UserRole.GUEST}>Guest</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {!selectedUser && (
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedUser ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}