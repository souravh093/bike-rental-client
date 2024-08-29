/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import moment from "moment";
import { TQueryParam } from "@/types/global";
import { TUser } from "@/types/users";
import {
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "@/redux/features/user/userApi";
import { toast } from "@/components/ui/use-toast";
import ConfirmDeleteUserModal from "@/components/modal/ConfirmDeleteUserModal";

const Users = () => {
  const [updateRole] =
    useUpdateRoleMutation();
  const [params] = useState<TQueryParam[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: allUsers,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery([...params, { name: "page", value: currentPage }]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { totalPage } = allUsers?.meta || {};

  const handleRoleChange = async (id: string, value: string) => {
    try {
      const res = await updateRole({ data: { role: value }, id }).unwrap();

      if (res.success) {
        toast({
          variant: "default",
          title: res.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NO:</TableHead>
            <TableHead>Joining Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Role Action</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || isFetching ? (
            <LoadingSkeleton />
          ) : allUsers?.data.length < 1 || allUsers?.data?.success === false ? (
            <div className="text-red-500 py-5">No Users found</div>
          ) : (
            allUsers?.data?.map(
              (
                { name, email, address, phone, _id, createdAt, role }: TUser,
                _index: number
              ) => (
                <TableRow key={_index}>
                  <TableCell className="font-medium">{_index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {moment(createdAt).format("MMM Do YY")}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>{address}</TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(newRole) =>
                        handleRoleChange(_id, newRole)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={role} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <ConfirmDeleteUserModal id={_id} />
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
      <Pagination className="flex justify-end mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {[...Array(totalPage)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                handlePageChange(Math.min(totalPage, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default Users;
