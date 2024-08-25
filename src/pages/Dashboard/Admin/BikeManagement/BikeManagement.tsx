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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
import { TBike } from "@/types/bike";
import { TQueryParam } from "@/types/global";
import { Input } from "@/components/ui/input";
import { EditBikeModal } from "@/components/modal/EditBikeModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import { CreateBikeModal } from "@/components/modal/CreateBikeModal";

const BikeManagement = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetBikesQuery([...params, { name: "page", value: currentPage }]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleValueChangeModal = (value: string) => {
    setParams((prevParams) =>
      prevParams
        .filter((param) => param.name !== "model")
        .concat({ name: "model", value })
    );
  };
  const handleValueChangeBrand = (value: string) => {
    setParams((prevParams) =>
      prevParams
        .filter((param) => param.name !== "brand")
        .concat({ name: "brand", value })
    );
  };

  const handleSearch = (value: string) => {
    setParams((prevParams) =>
      prevParams
        .filter((param) => param.name !== "searchTerm")
        .concat({ name: "searchTerm", value })
    );
  };

  const { totalPage } = bikeData?.meta || {};

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-5">
          <Select onValueChange={handleValueChangeModal}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Modal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="X1">X1</SelectItem>
              <SelectItem value="X2">X2</SelectItem>
              <SelectItem value="X3">X3</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleValueChangeBrand}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yamaha">Yamaha</SelectItem>
              <SelectItem value="Suzuki">Suzuki</SelectItem>
              <SelectItem value="Honda">Honda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-5">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search bike..."
            className="w-96"
          />
          <CreateBikeModal />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NO:</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price Per Hour</TableHead>
            <TableHead>CC</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || isFetching ? (
            <LoadingSkeleton />
          ) : bikeData?.data.length < 1 || bikeData?.data?.success === false ? (
            <div>no data found</div>
          ) : (
            bikeData?.data?.map(
              (
                {
                  name,
                  brand,
                  cc,
                  model,
                  pricePerHour,
                  year,
                  _id,
                  description,
                }: TBike,
                _index: number
              ) => (
                <TableRow key={_index}>
                  <TableCell className="font-medium">{_index + 1}</TableCell>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{pricePerHour} $</TableCell>
                  <TableCell>{cc}</TableCell>
                  <TableCell>{model}</TableCell>
                  <TableCell>{year}</TableCell>
                  <TableCell>{brand}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <EditBikeModal
                      data={{
                        name,
                        brand,
                        cc,
                        model,
                        pricePerHour,
                        year,
                        _id,
                        description,
                      }}
                    />
                    <ConfirmDeleteModal id={_id} />
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

export default BikeManagement;
