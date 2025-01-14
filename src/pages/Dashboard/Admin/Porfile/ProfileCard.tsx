import React from "react";
import { Mail, Phone, MapPin, User, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="relative">
        {/* Banner Image */}
        <div
          className="h-64 md:h-80 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558346648-9757f2fa4474?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Edit Button */}
        <Button
          onClick={onEdit}
          className="absolute top-4 right-4 bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit Profile
        </Button>

        {/* Profile Picture */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {userData.profilePicture ? (
            <img
              src={userData.profilePicture}
              alt={userData.name}
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <User className="h-24 w-24 text-gray-500 bg-white rounded-full dark:bg-gray-900 dark:text-gray-200" />
          )}
        </div>
      </div>

      {/* User Information */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-100 uppercase">{userData.role}</p>
        </div>

        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">Email</p>
                <p className="text-lg">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">Phone</p>
                <p className="text-lg">{userData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 md:col-span-2">
              <MapPin className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">Address</p>
                <p className="text-lg">{userData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
