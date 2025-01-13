import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, User } from "lucide-react";

interface ProfileCardProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
    role: string;
  };
  onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData, onEdit }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-100 p-4">
        <CardTitle className="text-2xl font-bold">
          Profile Information
        </CardTitle>
        <Button
          onClick={onEdit}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Edit Profile
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-gray-500" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">{userData.name}</h2>
            <p className="text-gray-500 uppercase">
                {userData.role}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg">{userData.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-lg">{userData.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-lg">{userData.address}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
