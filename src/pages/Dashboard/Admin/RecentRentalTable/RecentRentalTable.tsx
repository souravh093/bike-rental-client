import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentRentals = [
  {
    id: "1",
    user: "John Doe",
    bike: "Mountain Bike",
    startTime: "2023-06-01 10:00",
    status: "Active",
  },
  {
    id: "2",
    user: "Jane Smith",
    bike: "City Bike",
    startTime: "2023-06-01 11:30",
    status: "Returned",
  },
  {
    id: "3",
    user: "Bob Johnson",
    bike: "Electric Bike",
    startTime: "2023-06-01 12:15",
    status: "Active",
  },
  {
    id: "4",
    user: "Alice Brown",
    bike: "Folding Bike",
    startTime: "2023-06-01 13:45",
    status: "Active",
  },
];

export function RecentRentalsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Bike</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentRentals.map((rental) => (
          <TableRow key={rental.id}>
            <TableCell>{rental.user}</TableCell>
            <TableCell>{rental.bike}</TableCell>
            <TableCell>{rental.startTime}</TableCell>
            <TableCell>{rental.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
