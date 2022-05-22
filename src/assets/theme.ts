import { createTheme } from "@mui/material";

export default function getTheme() {
  return (
    createTheme({
      spacing: 4,
      palette: {
        primary: {
          main: '#ed1334',
          light: '#f24962',
          dark: '#bf0d28',
          contrastText: '#fcfafa'
        },
        secondary: {
          main: '#E33E7F',
          light: '#ed85ae'
        }
      }
    })
  );
}