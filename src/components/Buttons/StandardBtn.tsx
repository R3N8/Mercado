/**
 * This component will be used when btn does not have animation
 */

import { BaseBtn } from "./BaseBtn";
import styles from "./button.module.css";

export const StandardBtn = ({ children }: { children: string }) => {
    return (
        <BaseBtn className={styles.standardBtn}>
            {children}
        </BaseBtn>
    );
};