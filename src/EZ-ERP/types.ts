export interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

export interface Customer {
    _id: string;
    companyName: string;
    name: string;
    email?: string;
    phone?: string;
    address?: Address;
} 