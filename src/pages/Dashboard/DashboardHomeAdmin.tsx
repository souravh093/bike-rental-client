import {
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Users, DollarSign } from "lucide-react";
import { RentalTrendChart } from "./Admin/RentalTrendChart/RentalTrendChart";
import { RecentRentalsTable } from "./Admin/RecentRentalTable/RecentRentalTable";
import { useGetBikesQuery } from "@/redux/features/bike/bikeApi";

const DashboardHomeAdmin = () => {
  const { data: bikes } = useGetBikesQuery(undefined);
  const { data: users } = useGetAllUsersQuery(undefined);
  return (
    <main className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bikes</CardTitle>
            <Bike className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bikes?.data?.length}</div>
            <p className="text-xs text-muted-foreground">
              Bikes available for rent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.data?.length}</div>
            <p className="text-xs text-muted-foreground">
              Users registered on the platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6500</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Coupon
            </CardTitle>
            <Bike className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Total Coupon available
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Rental Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RentalTrendChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentRentalsTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardHomeAdmin;
