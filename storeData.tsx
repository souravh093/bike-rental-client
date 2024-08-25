// import { useState } from "react";
// import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";
// import { TBike } from "@/types/bike";
// import { Delete, Edit } from "lucide-react";
// import { TQueryParam } from "@/types/global";

// const BikeManagement = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedValue, setSelectedValue] = useState<string | undefined>(
//     undefined
//   );
//   const {
//     data: bikeData,
//     isLoading,
//     isFetching,
//   } = useGetBikesQuery([...params, { name: "page", value: currentPage }]);

//   console.log("params", params);
//   console.log("bikeData", bikeData);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleValueChange = (value: string) => {
//     setSelectedValue(value);
//     setParams((prevParams) =>
//       prevParams
//         .filter((param) => param.name !== "model")
//         .concat({ name: "model", value })
//     );
//   };

//   console.log(selectedValue);

//   const { page, limit, total, totalPage } = bikeData?.meta || {};

//   return (
//     <>
//       <div>
//         <Select onValueChange={handleValueChange}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Modal" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="X1">X1</SelectItem>
//             <SelectItem value="X2">X2</SelectItem>
//             <SelectItem value="X3">X3</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>NO:</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Price Per Hour</TableHead>
//             <TableHead>CC</TableHead>
//             <TableHead>Model</TableHead>
//             <TableHead>Year</TableHead>
//             <TableHead>Brand</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {isLoading || isFetching ? (
//             <LoadingSkeleton />
//           ) : bikeData?.data.length < 1 || bikeData?.data?.success === false ? (
//             <div>no data found</div>
//           ) : (
//             bikeData?.data?.map(
//               (
//                 { name, brand, cc, model, pricePerHour, year }: TBike,
//                 _index: number
//               ) => (
//                 <TableRow key={_index}>
//                   <TableCell className="font-medium">{_index + 1}</TableCell>
//                   <TableCell className="font-medium">{name}</TableCell>
//                   <TableCell>{pricePerHour} $</TableCell>
//                   <TableCell>{cc}</TableCell>
//                   <TableCell>{model}</TableCell>
//                   <TableCell>{year}</TableCell>
//                   <TableCell>{brand}</TableCell>
//                   <TableCell className="flex items-center gap-2">
//                     <Button variant="outline">
//                       <Edit className="w-4 h-4" />
//                     </Button>
//                     <Button variant="destructive">
//                       <Delete className="w-4 h-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               )
//             )
//           )}
//         </TableBody>
//       </Table>
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious
//               href="#"
//               onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//             />
//           </PaginationItem>
//           {[...Array(totalPage)].map((_, index) => (
//             <PaginationItem key={index}>
//               <PaginationLink
//                 href="#"
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </PaginationLink>
//             </PaginationItem>
//           ))}
//           <PaginationItem>
//             <PaginationNext
//               href="#"
//               onClick={() =>
//                 handlePageChange(Math.min(totalPage, currentPage + 1))
//               }
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </>
//   );
// };

// export default BikeManagement;
