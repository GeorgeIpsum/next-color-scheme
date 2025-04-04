import type { Header } from "next/dist/lib/load-custom-routes";

const defaultHeaderFn = () => Promise.resolve([] as Header[]);

export const withNextHeaders = (
  headerFn: () => Promise<Header[]> = defaultHeaderFn,
): (() => Promise<Header[]>) => {
  return async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Accept-CH",
          value: "Sec-CH-Prefers-Color-Scheme",
        },
        {
          key: "Vary",
          value: "Sec-CH-Prefers-Color-Scheme",
        },
        {
          key: "Critical-CH",
          value: "Sec-CH-Prefers-Color-Scheme",
        },
      ],
    },
    ...(await headerFn()),
  ];
};
