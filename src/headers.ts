import type { Header } from "next/dist/lib/load-custom-routes";

export const headers = async (headerFn?: () => Promise<Header[]>): Promise<Header[]> => {
  return [
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
    ...(await headerFn?.()) ?? [],
  ]
};
