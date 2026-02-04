/**
 * behavior:
 * initially text only
 * arrow gently bouncing sideways
 * hover -> cart drives across + bg fills
 */

"use client";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { BaseBtn } from "./BaseBtn";
import styles from "./button.module.css";

export const AnimatedArrowBtn = () => {
    return (
        <BaseBtn 
        className={styles.cartBtn}
        >
      <span className={styles.cartIcon}>
        <TiShoppingCart />
      </span>

      {/* Default text */}
      <span className={`${styles.text} ${styles.defaultText}`}>
        Get fashionable
      </span>

      {/* Hover text */}
      <span className={`${styles.text} ${styles.hoverText}`}>
        Let’s shop
      </span>

      {/* Arrow */}
      <span className={styles.arrow}>
        <MdKeyboardDoubleArrowRight />
      </span>
        </BaseBtn>
    );
};