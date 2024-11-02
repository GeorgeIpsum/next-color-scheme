import type { Header } from "next/dist/lib/load-custom-routes";
export declare const headers: (headerFn?: () => Promise<Header[]>) => Promise<Header[]>;
