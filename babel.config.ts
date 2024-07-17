import type { Config } from "@babel/core";

const config: Config = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};

export default config;
