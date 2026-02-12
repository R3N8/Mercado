/**
 * This handles:
 * shared props and styles for all buttons
 * each animation lives in its own component
 * accessibility
 */

import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';
import clsx from 'clsx'; // Utility for conditional classNames - simplifies process of managing multiple CSS classes

interface BaseBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const BaseBtn = ({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: BaseBtnProps) => {
    return (
    <button
      {...props}
      className={clsx(styles.baseBtn, styles[variant], className)}
    >
      {children}
    </button>
  );
};