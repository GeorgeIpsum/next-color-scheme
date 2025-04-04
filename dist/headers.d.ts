import type { Header } from "next/dist/lib/load-custom-routes";
export declare const withNextHeaders: (headerFn?: () => Promise<Header[]>) => (() => Promise<Header[]>);
