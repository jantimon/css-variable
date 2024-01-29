import { createVar } from "css-variable";
const primary = createVar("primary--hashed0");
const theme = {
  colors: {
    primary: createVar("primary--colors--theme--hashed1"),
    secondary: {
      inner: createVar("inner--secondary--colors--theme--hashed2"),
    },
  },
};
