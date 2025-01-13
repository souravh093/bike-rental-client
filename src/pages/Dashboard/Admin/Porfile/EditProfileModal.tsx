/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useUpdateProfileMutation } from "@/redux/features/user/userApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userData: {
    name: string
    email: string
    phone: string
    address: string
  }
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userData }) => {
  const [updateUser, { isLoading: updateLoading }] = useUpdateProfileMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
    },
  })

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      const res = await updateUser(data).unwrap()
      if (res.success) {
        toast({
          title: "Profile updated successfully",
          description: res.message,
        })
        onClose()
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error?.data?.message || "An error occurred",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={userData.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal

