import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    textColor: string;
    secondaryText: string;
    borderColor: string;
    backgroundColor: string;
    headingColor: string;
    codeBackground: string;
    tagBackground: string;
    tagText: string;
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: "#0070f3",
  textColor: "#2c3e50",
  secondaryText: "#666666",
  borderColor: "#eaeaea",
  backgroundColor: "#ffffff",
  headingColor: "#1a202c",
  codeBackground: "#f8f9fa",
  tagBackground: "#e9ecef",
  tagText: "#495057",
};

export const darkTheme: DefaultTheme = {
  primaryColor: "#3291ff",
  textColor: "#e4e4e4",
  secondaryText: "#a0a0a0",
  borderColor: "#2d2d2d",
  backgroundColor: "#1a1a1a",
  headingColor: "#ffffff",
  codeBackground: "#2d2d2d",
  tagBackground: "#4a4a4a",
  tagText: "#e4e4e4",
};
