import { useEffect, useState } from "react";
import useGetTheUser from "../../hooks/useGettheuser";

const UserDetails = () => {
  const [getUser] = useGetTheUser();
  const [user, setUser] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await getUser();
      console.log(response);
      setUser(response);
    } catch (error) {
      console.log(error);
      setUser([]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (user.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-dvh flex items-center justify-center">
      <div className=" flex flex-col items-center p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <img
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="User"
          className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="text-lg">
          <p className="mb-2">
            <strong>Name:</strong> {user[0].name}
          </p>
          <p>
            <strong>Email:</strong> {user[0].email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
