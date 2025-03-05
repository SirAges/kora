import Toast from "react-native-toast-message";
import { promoCodes } from "./data";
export const calculateDateDifference = (start, end) => {
    if (!start || !end) return "";

    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const diffMs = endDateTime - startDateTime; // Difference in milliseconds

    if (diffMs <= 0) return "0 min"; // If dates are the same or invalid

    const diffMinutes = Math.floor(diffMs / 60000); // Convert to minutes
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0) return `${diffHours} hr${diffHours > 1 ? "s" : ""}`;
    return `${diffMinutes} min`;
};

export const truncate = (text, len) => {
    const newText = text.slice(0, len);

    return newText.length < text.length ? newText + "..." : text;
};

export const formatDateTime = (dateString: Date | string) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        year: "numeric", // numeric year (e.g., '2023')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true // use 12-hour clock (true) or 24-hour clock (false)
    };

    const yearOptions: Intl.DateTimeFormatOptions = {
        year: "numeric" // numeric year (e.g., '2023')
    };

    const dateDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        year: "numeric", // numeric year (e.g., '2023')
        month: "2-digit", // abbreviated month name (e.g., 'Oct')
        day: "2-digit" // numeric day of the month (e.g., '25')
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric" // numeric day of the month (e.g., '25')
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true // use 12-hour clock (true) or 24-hour clock (false)
    };

    const formattedYear: string = new Date(dateString).toLocaleString(
        "en-US",
        yearOptions
    );

    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );

    const formattedDateDay: string = new Date(dateString).toLocaleString(
        "en-US",
        dateDayOptions
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );

    return {
        dateYear: formattedYear,
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        timeOnly: formattedTime
    };
};

export function formatAmount(amount: number): string {
    if (isNaN(amount)) return null;
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
}
export const applyPromoCode = (price, slug) => {
    const promo = promoCodes.find(promo => promo.slug === slug);

    if (!promo) {
        return price; // Return the original price if the promo code is not found
    }

    const discount = (promo.percentage / 100) * price;
    return price - discount; // Return the new discounted price
};
export const toastMessage = (title: string, message: string) => {
    Toast.show({
        text1: title,
        text2: message,
        type: "toast"
    });
};
