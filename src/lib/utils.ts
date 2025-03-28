import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
* Fusionner des classes CSS avec Tailwind.
*
* Exemple :
* ```tsx
* import { cn } from "./utils";
*
* function MyComponent() {
* 	return <div className={cn("text-red-500", "bg-blue-500", {
* 		"text-red-500": true
* 	})} />;
} />;
* @param inputs
* @returns
*/
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
