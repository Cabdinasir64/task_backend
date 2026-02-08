export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: (globalThis as any).process?.env?.DATABASE_URL!,
  },
} as const;
