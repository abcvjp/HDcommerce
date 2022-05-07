export const DEFAULT_DBQUERY_LIMIT = 30;
export const DEFAULT_DBQUERY_SORT: Record<string, 1 | -1> = { createdAt: -1 };

export enum UserRole {
  USER = 1,
  ADMIN = 2,
  SYS_ADMIN = 3,
}
