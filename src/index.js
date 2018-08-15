import app from "./app";
import chalk from "chalk";

const { PORT = 8080 } = process.env;

app.listen(PORT, () => {
  console.log(chalk.bgHex("#008080").black(` LISTENING `) + ` AT ${PORT}`); // eslint-disable-line no-console
});
