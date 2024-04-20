import classes from "./Header.module.css";

const Header = () => {
  return (
    <>
      <div className={classes.HeaderContainer}>
        <h1 className={classes.HeaderHeading}>
          Welcome to Expense Tracker Website
        </h1>
        <p className={classes.HeaderHeading}>
          Where You Can Expense Your Money
        </p>
      </div>
    </>
  );
};

export default Header;
