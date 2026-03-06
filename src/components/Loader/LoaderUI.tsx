import React from "react";
import styles from "./Loader.module.css";

const BagLoader: React.FC = () => {
  return (
    <div className={styles.container}>
      <svg width="64" height="75" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg">
        <path className={styles.bagHandle} strokeWidth="1.4" d="M16 16 C16 7.5 32 7.5 32 16" />
        <rect className={styles.bagBody} strokeWidth="1.4" x="6" y="16" width="36" height="34" rx="3" />
      </svg>
      <label className={styles.label}>Loading…</label>
    </div>
  );
};

export default BagLoader;