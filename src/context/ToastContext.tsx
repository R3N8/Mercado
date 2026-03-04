"use client";

import { createContext, useContext, useState } from "react";

type ToastType = "success" | "error";

interface Toast {
    message: string;
    type:ToastType;
}

interface ToastContext {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContext | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = (message: string, type: ToastType = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div
                className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white ${
                    toast.type === "error" ? "bg-red-600" : "bg-green-600"
                }`}
                >
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    )
}

export function useToast () {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }
    return context;
}