import { defineConfig, GeneratorVerbOptions } from "orval";

const schemaUrl = "http://localhost:8080/v3/api-docs.yaml";

export default defineConfig({
    scheduler: {
        input: {
            target: schemaUrl,
        },
        output: {
            target: "./src/schemas/generated/api.ts",
            schemas: "./src/schemas/generated/model",
            mode: "split",
            clean: true,
            formatter: "prettier",
            client: "fetch",
            override: {
                transformer: (verbOptions: GeneratorVerbOptions) => {
                    if (verbOptions.originalOperation["x-no-auth"]) {
                        verbOptions.mutator = {
                            ...verbOptions.mutator!,
                            path: "../mutators",
                            name: "serverActionMutatorNoAuth",
                        };
                    }
                    return verbOptions;
                },
                mutator: {
                    path: "./src/schemas/mutators.ts",
                    name: "serverActionMutatorAuth",
                },
            },
        },
    },
});
