/**
 * behavior:
 * hover -> heartbeat
 * click -> bg fills + cute pop animation
 */
"use client";

import { useState } from "react";
import { FaRegHeart , FaHeart, FaHeartCrack } from "react-icons/fa6";
import styles from "./button.module.css";

export const HeartBtn = () => {
    const [liked, setLiked] = useState(false);
    const [breaking, setBreaking] = useState(false);

    const handleClick = () => {
        if (liked) {
            setBreaking(true)
            setLiked(false)

            setTimeout(() => {
                setBreaking(false);
            }, 300);
        } else {
            setLiked(true);
        }
    };

    return (
        <button
        onClick={handleClick}
        className={[
            styles.heartBtn, 
            liked ? styles.liked : "",
            breaking ? styles.breaking : "",
        ].join(" ")}
        aria-label={liked ? "Unlike" : "Like"}
        >
            {breaking ? (<FaHeartCrack />) : liked ? (<FaHeart />) : (<FaRegHeart />)}
        </button>
    );
};