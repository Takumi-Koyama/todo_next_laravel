import styles from "./Layout.module.css";
import { Header } from "../Header/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
