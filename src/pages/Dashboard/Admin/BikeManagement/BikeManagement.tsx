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
        .filter((param) => param.name !== "cc")
        .concat({ name: "cc", value })
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
        <div className="grid lg:grid-cols-1 gap-2 grid-cols-1">
          <div className="flex items-center gap-5">
            <Select onValueChange={handleValueChangeModal}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="CC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="110">110</SelectItem>
                <SelectItem value="125">125</SelectItem>
                <SelectItem value="150">150</SelectItem>
                <SelectItem value="160">160</SelectItem>
                <SelectItem value="180">180</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="250">250</SelectItem>
                <SelectItem value="300">300</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={handleValueChangeBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="yamaha">Yamaha</SelectItem>
                <SelectItem value="suzuki">Suzuki</SelectItem>
                <SelectItem value="bajaj">Bajaj</SelectItem>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="tvs">TVS</SelectItem>
                <SelectItem value="kawasaki">Kawasaki</SelectItem>
                <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
                <SelectItem value="keeway">Keeway</SelectItem>
                <SelectItem value="lifan">Lifan</SelectItem>
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
            <div className="text-red-500 py-5">No Bike found</div>
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
                  image,
                  description,
                }: TBike,
                _index: number
              ) => (
                <TableRow key={_index}>
                  <TableCell className="font-medium">{_index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-2">
                      <img
                        src={image}
                        alt={`bike image`}
                        className="w-12 h-12 object-contain rounded-2xl border-2"
                      />
                      <span>{name}</span>
                    </span>
                  </TableCell>
                  <TableCell>{pricePerHour} BDT</TableCell>
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
