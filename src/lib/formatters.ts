/**
 * Utility functions for consistent formatting across the application
 */

/**
 * Format a number as USD currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "$1,200")
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "$0";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "Jan 15, 2025")
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "Invalid date";
  }
}

/**
 * Format a date with time
 * @param dateString - ISO date string
 * @returns Formatted date with time (e.g., "Jan 15, 2025 at 3:30 PM")
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(dateString));
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "Invalid date";
  }
}

/**
 * Format a number with commas
 * @param num - The number to format
 * @returns Formatted number (e.g., "1,234,567")
 */
export function formatNumber(num: number | null | undefined): string {
  if (num == null) return "0";
  
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format mileage with unit
 * @param miles - The mileage value
 * @returns Formatted mileage (e.g., "45,000 mi")
 */
export function formatMileage(miles: number | null | undefined): string {
  if (miles == null) return "—";
  return `${formatNumber(miles)} mi`;
}

/**
 * Format a phone number
 * @param phone - Phone number string
 * @returns Formatted phone (e.g., "(555) 123-4567")
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "—";
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Return original if not 10 digits
  return phone;
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string | null | undefined, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Format file size
 * @param bytes - File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number | null | undefined): string {
  if (bytes == null || bytes === 0) return "0 B";
  
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Constants for time calculations
 */
export const TIME_CONSTANTS = {
  ONE_SECOND: 1000,
  ONE_MINUTE: 1000 * 60,
  ONE_HOUR: 1000 * 60 * 60,
  ONE_DAY: 1000 * 60 * 60 * 24,
  ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
  ONE_YEAR: 1000 * 60 * 60 * 24 * 365,
} as const;
