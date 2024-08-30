import { useGetProfileQuery } from "@/redux/features/user/userApi";

const DashboardHome = () => {
  const { data: userData } = useGetProfileQuery(undefined);
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center text-5xl font-black capitalize">
      Welcome to dashboard{" "}
      <div className="text-yellow-500 ml-5 uppercase bg-gray-900 px-5 py-2 my-2">
        {userData?.data?.name}
      </div>
    </div>
  );
};

export default DashboardHome;
