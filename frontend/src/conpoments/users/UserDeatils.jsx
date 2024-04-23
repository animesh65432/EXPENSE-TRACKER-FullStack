import { useEffect, useState } from "react";
import useGettheuser from "../../hooks/useGettheuser";

const UserDeatils = () => {
  const [GetTheCurrentUser] = useGettheuser();
  const [user, setuser] = useState([]);

  const FechtheUserData = async () => {
    try {
      let response = await GetTheCurrentUser();
      setuser(response);
    } catch (error) {
      console.log(error);
      setuser([]);
    }
  };

  useEffect(() => {
    FechtheUserData();
  }, []);

  if (user.length == 0) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <p>Name : {user[0].name}</p>
        <p>Email : {user[0].email}</p>
      </div>
    </>
  );
};

export default UserDeatils;
