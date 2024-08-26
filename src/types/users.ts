export type TUser = {
    _id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    role: "admin" | "user"
    createdAt: Date;
}