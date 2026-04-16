/**
 * Defines the standardized structure for API responses.
 */
export interface ApiResponse<T> {
    data: T | null;
    message: string;
    token?: string | null;
    success: boolean;
}