import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { authService } from '../services/api';

export default function PasswordChange() {

    const currentUser = useSelector((state: any) => state.accountReducer?.currentUser);

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate passwords
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'danger', text: 'New passwords do not match!' });
            setIsSubmitting(false);
            return;
        }

        try {
            // Call the API to change password
            await authService.changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });

            // Reset form and show success message
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            setMessage({ type: 'success', text: 'Password changed successfully!' });
        } catch (err: any) {
            setMessage({
                type: 'danger',
                text: err.response?.data?.message || 'Failed to change password'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!currentUser) {
        return <Alert variant="warning">Please log in to change your password.</Alert>;
    }

    return (
        <div className="password-change-container">
            <h2 className="mb-4">Change Password</h2>

            {message.text && (
                <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mb-3">
                    {message.text}
                </Alert>
            )}

            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                                placeholder="Enter your current password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                placeholder="Enter your new password"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm your new password"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Changing Password...' : 'Change Password'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
} 