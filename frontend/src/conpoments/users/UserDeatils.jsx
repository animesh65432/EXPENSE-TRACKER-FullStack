import { useEffect, useState } from "react";
import useGetTheUser from "../../hooks/useGettheuser";
import styles from "./UserDetails.module.css";

const UserDetails = () => {
  const [getUser] = useGetTheUser();
  const [user, setUser] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await getUser();
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
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
      <h2 className={styles.title}>User Details</h2>
      <div className={styles.details}>
        <p>
          <strong>Name:</strong> {user[0].name}
        </p>
        <p>
          <strong>Email:</strong> {user[0].email}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
