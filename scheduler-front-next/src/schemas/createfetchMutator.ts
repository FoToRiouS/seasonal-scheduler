const handleResponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) {
        let errorData;
        try {
            errorData = await res.json();
        } catch {
            try {
                errorData = { message: await res.text() };
            } catch {
                errorData = { message: res.statusText };
            }
        }

        throw new Error(
            JSON.stringify({
                status: res.status,
                ...(typeof errorData === "object" ? errorData : { message: errorData }),
            }),
        );
    }

    const data = await res.json();

    return {
        data,
        status: res.status,
        headers: res.headers,
    } as T;
};

const adjustConfigBody = (config: RequestInit): RequestInit => {
    if (config.body && typeof config.body === "string") {
        const bodyStr = config.body.trim();
        if (bodyStr.startsWith('"') && bodyStr.endsWith('"')) {
            try {
                const parsed = JSON.parse(bodyStr);
                if (typeof parsed === "string") {
                    return {
                        ...config,
                        body: parsed,
                    };
                }
            } catch {
                // Ignora se não for JSON válido
            }
        }
    }
    return config;
};

const createFetchMutator = (fetchOrGetFetch: typeof fetch | (() => typeof fetch)) => {
    return async <T>(url: string, config: RequestInit): Promise<T> => {
        const adjustedConfig = adjustConfigBody(config);
        const fetchFn =
            typeof fetchOrGetFetch === "function" && fetchOrGetFetch.length === 0 ?
                (fetchOrGetFetch as () => typeof fetch)()
            :   (fetchOrGetFetch as typeof fetch);
        const res = await fetchFn(url, adjustedConfig);
        return handleResponse<T>(res);
    };
};
