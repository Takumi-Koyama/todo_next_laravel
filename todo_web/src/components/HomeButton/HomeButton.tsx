import styles from "./HomeButton.module.css";
import { useRouter } from "next/router";

export const HomeButton: React.FC = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <button className={styles.homeButton} onClick={goHome}>
      home
    </button>
  );
};
