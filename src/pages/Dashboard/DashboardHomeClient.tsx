import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, Clock, MapPin, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHomeClient = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, John!</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Bikes
            </CardTitle>
            <Bike className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">in your area</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.00</div>
            <p className="text-xs text-muted-foreground">credits available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Favorite Station
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Central Park</div>
            <p className="text-xs text-muted-foreground">5 rides this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">No active rentals</div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Nearby Stations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[200px] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground">Map view</span>
              </div>
              <div className="absolute top-2 right-2 bg-background rounded-full p-2">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="absolute bottom-2 left-2 bg-background rounded-md p-2 text-xs">
                3 stations nearby
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Link to={"/all-bikes"} className="flex justify-center">
        <Button size="lg" className="w-full md:w-auto">
          <Bike className="mr-2 h-4 w-4" /> Rent a Bike
        </Button>
      </Link>
    </main>
  );
};

export default DashboardHomeClient;
