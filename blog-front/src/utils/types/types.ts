export interface IOptions extends RequestInit {
  method: string;
  headers: { 'Content-Type': string; Authorization?: string };
  body?: string;
}
