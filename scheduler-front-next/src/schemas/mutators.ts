"use server";

import { fetchAuth, fetchNoAuth } from "@/service/BackendService";

export const serverActionMutatorAuth = createFetchMutator(() => fetchAuth);
export const serverActionMutatorNoAuth = createFetchMutator(() => fetchNoAuth);
