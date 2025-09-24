"use client";

// Simplified version of the toast hook
import { useState } from "react";

type ToastProps = {
	title?: string;
	description?: string;
	duration?: number;
};

export function useToast() {
	const [toasts, setToasts] = useState<ToastProps[]>([]);

	const toast = (props: ToastProps) => {
		const id = Date.now();
		const newToast = { ...props, id };

		setToasts((prevToasts) => [...prevToasts, newToast]);

		// Auto-dismiss toast after duration
		if (props.duration !== Number.POSITIVE_INFINITY) {
			setTimeout(() => {
				setToasts((prevToasts) =>
					prevToasts.filter((toast) => toast.id !== id),
				);
			}, props.duration || 3000);
		}

		return id;
	};

	return { toast, toasts };
}
