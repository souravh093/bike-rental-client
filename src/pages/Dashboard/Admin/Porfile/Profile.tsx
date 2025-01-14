import { useState } from "react"
import { useGetProfileQuery } from "@/redux/features/user/userApi"
import Loader from "@/components/shared/Loader"
import ProfileCard from "./ProfileCard"
import EditProfileModal from "./EditProfileModal"


const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { data: userData, isLoading, error } = useGetProfileQuery(undefined)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error loading profile data</div>
  }

  if (!userData) {
    return <div>No profile data available</div>
  }

  return (
    <div className="py-10">
      <ProfileCard 
        userData={userData.data} 
        onEdit={() => setIsEditModalOpen(true)} 
      />
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        userData={userData.data}
      />
    </div>
  )
}

export default Profile