# FedexChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1

# Pre-installation

Use Node.js LTS, you can use NVM to manage Node versions on your local

## Dependencies

Make sure you have `node`, `npm` and `angular/cli` installed in your machine.

### Install node and npm

Must have `node` and `npm` installed, other wise its better to install them using [nvm](#Install-NPM-via-NVM).

### Install Angular/cli

To install `angular/cli` run

```shell
  npm install -g @angular/cli@{{version}}
```

For FedexChallenge we are using version `~12.0.1`, run

```shell
  npm install -g @angular/cli@~12.0.1
```

# Installation

## Copy environment files

```shell
  cp src/environments/environment.dist.ts src/environments/environment.ts
```

## Build the environment

```shell
  npm install
  ng build
```

# Install NPM via NVM

## Installing nvm

1- Clone repository

```shell
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

2- Add this to your profile (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`)

```text
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

3- Restart your machine or run

```shell
  source {{profile}}
```

profile: (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`)

Source [Node Version Manager Installation](https://github.com/nvm-sh/nvm)

## Installing npm

1- To get list of available versions run

```shell
  nvm ls-remote
```

2- Select version from the list and install it run, (Better to install latest LTS version)

```shell
  nvm install {{selected-version}}
```

Source [Installing Angular CLI](https://angular.io/cli#installing-angular-cli)

## Project Structure

The project is divided into 2 main directories: modules and shared.

- Modules directory includes all the lazy loaded modules. Each of which is a standalone entity, that only depends on the shared entities in the shared directory.

  Each module has the following folders:

  - Components: includes implementations of sections to be added to main pages.
  - Containers: includes the full pages that the router redirects to.
  - Shared: includes the shared services, interfaces, constants, etc. needed by only its own module to load its pages.
  - Store: includes all the state logic, including actions, effects, reducers, selectors, etc.

- Shared directory includes the dependencies that all other modules need, mainly general UI components, constants, interfaces, .etc.
They exist in the shared to keep the code DRY.

## Extra Features

In Addition to the requirements in the assignment, I implemented some extra development and practical features.

### Development Extra Features

- Import Sorter: sorts all the imports dynamically on save, in addition to adding the capability of sorting all the project imports in a single click based on the predefined configuration that is based on best practices.
- Sass-lint: linter for all SASS/SCSS files, based on the predefined configuration that is based on best practices.
- Ts-lint: linter for all ts files, based on the predefined configuration that is based on best practices.
- Paths: tsconfig configuration to shorten and organize the project's internal import URLs.
- Deployed the application on Netlify. Can be accessed via this [link](https://60b3fe076643880008752d56--cranky-northcutt-4987f0.netlify.app/).
- Committed changes to a remote GitHub repository. Can be accessed via this [link](https://github.com/Khousheish/fedex-challenge).
- Multi-translate loader: Add the ability to split i18n asset files into their respective module name.
- Husky: Add Husky to make sure that the committed code is properly linted and follows defined code standards.

### Practical Extra Features

- Global Language Change: Add the ability to dynamically change the language, and support the website in 2 languages, English and Dutch.
- Dark Theme: Add the ability to switch the website between light and dark themes. Save Choice in local storage
- Global Error Handling: Give the user direct feedback in case of any API Error via a toast message.

### Technical Decisions

- Validated email through online API that ping the mail server and verifies MX and SMTP records to make sure email is real, exists and is active
- Intercepted incoming responses to check for any errors to handle them in the global error handling feature
- Added a basic welcome page when the sign up API returns a positive response to show the user that the sign up was a success and he is logged in
- Used NGRX to save the response from the API to be accessible from the whole application. Normally the response would be a JWT token which we save in the cookies but for the purposes of this assignment this solution would do.
- Even though the app only contains one module i still lazy loaded it to prepare for future features. Same goes for the store logic lazy loaded the store for only the current module were in and implemented a shared state for general use
- Implemented close to 100% unit test coverage!
- I know that tslint and sass-lint are deprecated but in the scope of this assignment i didn't have time to migrate the rules to more modern packages so i kept them as is for now

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
