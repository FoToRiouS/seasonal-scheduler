import { auth } from "@/security/authOptions";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

const getBaseUri = (): string => {
    let uri;
    if (process.env.BASE_SSR_URI) {
        uri = process.env.BASE_SSR_URI;
    } else {
        throw new Error("Base URI must be set!");
    }
    return uri;
};

export const fetchAuth = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<any> => {
    let session;
    try {
        session = await auth();
    } catch (e) {
        session = await getSession();
    }

    if (session?.error === "RefreshAccessTokenError") {
        return;
    }

    return await fetch(getBaseUri() + input, buildInit(init, session));
};

export const fetchNoAuth = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<any> => {
    return await fetch(getBaseUri() + input, buildInit(init, null));
};

const buildInit = (init: RequestInit | undefined, session: Session | null): RequestInit => {
    if (init) {
        return {
            ...init,
            headers:
                init.headers ?
                    {
                        ...buildHeader(session),
                        ...init.headers,
                    }
                :   buildHeader(session),
        };
    } else {
        return { headers: buildHeader(session) };
    }
};

const buildHeader = (session: Session | null): HeadersInit => {
    if (session) {
        return {
            ...buildJSONContentType(),
            Authorization: `Bearer ${session.accessToken ?? ""}`,
        };
    } else {
        return buildJSONContentType();
    }
};

const buildJSONContentType = () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

/**
 * Função necessária para evitar problemas de manipulação de erros no Next.js envolvendo Server Actions
 * @param callback
 */
export const resolveServerAction = (callback: (...args: any[]) => Promise<any>) => {
    return async (...args: any[]) => {
        const res = await callback(...args);
        if (res && res.exceptionName) {
            throw new Error(JSON.stringify(res));
        } else if (res && res.error) {
            throw new Error(JSON.stringify(res));
        } else {
            return res;
        }
    };
};
