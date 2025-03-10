import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ValidationResult } from "./types";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function validateEmail(email: string) {
    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
}

export const validatePassword = (
    password: string,
    passwordConfirmation: string,
): ValidationResult => {
    if (password.length < 8)
        return {
            isValid: false,
            message: "A senha deve ter no mínimo 8 caracteres.",
            id: 1,
        };

    if (password !== passwordConfirmation && passwordConfirmation.length > 0)
        return {
            isValid: false,
            message:
                "As senhas não combinam! Por favor confira os campos e tente novamente.",
            id: 2,
        };

    return {
        isValid: true,
        message: "Senha válida.",
        id: 3,
    };
};

export function removeIfWhitespace(input: string): string {
    if (input.trim() === "") return "";
    return input;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date: Date, dateFormat = "dd MMM yyyy - HH:mm") {
    const formattedDate = format(new Date(date), dateFormat);

    const parts = formattedDate.split(" ");

    if (parts.length !== 3) return formattedDate;

    const [day, month, year] = parts;

    const capitalizedMonth = capitalizeFirstLetter(month);

    return `${day} ${capitalizedMonth} ${year}`;
}

export function resizeTextarea(
    textarea: HTMLTextAreaElement,
    minHeight = 66,
    maxHeight = 500,
) {
    // Reset height to auto to calculate the new height based on content
    textarea.style.height = "auto";

    // Set the height to the scroll height, but clamp it between 66px and 500px
    const newHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight,
    );
    textarea.style.height = `${newHeight}px`;
}

export function mergeRefs<T>(
    ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
    return (value: T) => {
        refs.forEach((ref) => {
            if (!ref) return;
            if (typeof ref === "function") ref(value);
            else (ref as React.MutableRefObject<T | null>).current = value;
        });
    };
}
