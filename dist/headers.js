const defaultHeaderFn = () => Promise.resolve([]);
export const withNextHeaders = (headerFn = defaultHeaderFn) => {
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
