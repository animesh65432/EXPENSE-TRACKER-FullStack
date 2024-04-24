import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Logo } from "../assets/image";
import { useDispatch, useSelector } from "react-redux";
import PremuinBottom from "./premiunFeatures/PremuinBottom";
import RazorPay from "../conpoments/payment/RazorPay";
import useGetthefile from "../hooks/useGetthefile";
import { deletethetokens } from "../stroe/slices/index";

const Header = () => {
  const isPremiumUser = useSelector((state) => state.user.ispremuinm);
  const distpatch = useDispatch();
  const [Fechdata] = useGetthefile();

  const Gethefile = () => {
    Fechdata();
  };

  const Onclicklogoust = () => {
    distpatch(deletethetokens());
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} />
        </Link>
      </div>
      <nav className={styles.navbar}>{isPremiumUser && <PremuinBottom />}</nav>
      <nav className={styles.navbar}>
        <Link to="/user">
          <div className={styles.container}>
            <button className={styles.button}>User</button>
          </div>
        </Link>
      </nav>
      <nav className={styles.navbar}>{!isPremiumUser && <RazorPay />}</nav>
      {isPremiumUser && (
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <button className={styles.button} onClick={Gethefile}>
              Upload Expesnse file
            </button>
          </div>
        </nav>
      )}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <button className={styles.button} onClick={Onclicklogoust}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
