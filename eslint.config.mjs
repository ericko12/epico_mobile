import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
    ...nextCoreWebVitals,
    ...nextTypescript,
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "public/sw.js",
        "public/sw.js.map",
        "public/workbox-*",
        "public/worker-*",
        // Fork: árboles de trabajo de Claude Code dentro del repo (copias completas del
        // código). Sin esto `eslint .` los linta y duplica todos los avisos.
        ".claude/worktrees/**",
    ]),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", {
                args: "all",
                argsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            }],
        },
    },
]);