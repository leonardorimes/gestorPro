import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  engine: "classic",
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
