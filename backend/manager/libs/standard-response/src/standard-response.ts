export function standardResponse<T>(
  message = '',
  data: T | null = null,
  success = true,
) {
  return { message, success, data };
}