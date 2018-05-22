# Ward Inventory System

A system to manage the supplies on a ward at a health facility

## Features

- Product Management
- Product Dispensation
- Keypad Hardware Integration

## Technologies

- [Express.js](https://expressjs.com/) as the web framework.
- ES2017+ support with [Babel](https://babeljs.io/).
- Automatic polyfill requires based on environment with [babel-preset-env](https://github.com/babel/babel-preset-env).
- Linting with [ESLint](http://eslint.org/).
- Testing with [Jest](https://facebook.github.io/jest/).
- MVC Architecture File Structure, [here's](MVC.md) a guide
- [Bootstrap 4](https://getbootstrap.com/)
- [Pug](https://pugjs.org/api/getting-started.html) templating engine, See Pug with Express [here](https://expressjs.com/en/guide/using-template-engines.html).

## Getting started

```sh
# Clone the project
git clone https://github.com/zextis/wardinv.git
cd wardinv

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm i

# or if you're using Yarn
yarn
```

Then you can begin development:

```sh
# yarn
yarn run dev

# npm
npm run dev
```

This will launch a [nodemon](https://nodemon.io/) process for automatic server restarts when your code changes.

### Testing

Testing is powered by [Jest](https://facebook.github.io/jest/). This project also uses [supertest](https://github.com/visionmedia/supertest) for demonstrating a simple routing smoke test suite. Feel free to remove supertest entirely if you don't wish to use it.
Start the test runner in watch mode with:

```sh
# yarn
yarn test

# npm
npm test
```

You can also generate coverage with:

```sh
# yarn
yarn test --coverage

# npm
npm test -- --coverage
```

### Linting

Linting is set up using [ESLint](http://eslint.org/). It uses ESLint's default [eslint:recommended](https://github.com/eslint/eslint/blob/master/conf/eslint.json) rules. Feel free to use your own rules and/or extend another popular linting config (e.g. [airbnb's](https://www.npmjs.com/package/eslint-config-airbnb) or [standard](https://github.com/feross/eslint-config-standard)).s

Begin linting in watch mode with:

```sh
# yarn
yarn run lint

# npm
npm run lint
```

To begin linting and start the server simultaneously, edit the `package.json` like this:

```json
"dev": "nodemon src/index.js --exec \"node -r dotenv/config -r babel-register\" | npm run lint"
```

### Environmental variables in development

The project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example`, rename it to `.env` and add your env vars as you see fit.

It is **strongly** recommended **never** to check in your .env file to version control. It should only include environment-specific values such as database passwords or API keys used in development. Your production env variables should be different and be set differently depending on your hosting solution. `dotenv` is only for development.

### Deployment

Deployment is specific to hosting platform/provider but generally:

```sh
# yarn
yarn run build

# npm
npm run build
```

will compile your `src` into `/dist`, and

```sh
# yarn
yarn start

# npm
npm start
```

will run `build` (via the `prestart` hook) and start the compiled application from the `/dist` folder.

The last command is generally what most hosting providers use to start your application when deployed, so it should take care of everything.

You can find small guides for Heroku, App Engine and AWS in [the deployment](DEPLOYMENT.md) document.

## FAQ

**Where is all the configuration for ESLint, Jest and Babel?**

In `package.json`. Feel free to extract them in separate respective config files if you like.

## License

MIT License. See the [LICENSE](LICENSE) file.
