# Contributing Guidelines

Thank you for being interested in contributing to Basement Chat! Here's the guide we want you to follow:

- [Development Setup](#development-setup)
- [Coding Rules](#coding-rules)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)

## Development Setup

### Requirements

To start developing Basement Chat, make sure you have installed

- `node >= 18`
- `php >= 8.1`
- `docker` or `chromium` to run Laravel Dusk browser tests.

### Installation

- Create a new folder for your project directory. For example, we will call it `basement-chat`.
  ```
  └── basement-chat
  ```
- Clone [this repository](https://github.com/basement-chat/basement-chat) and [package development branch demo repository](https://github.com/basement-chat/demo/tree/package-development) in your `basement-chat` project directory:

  ```
  git clone -b package-development https://github.com/basement-chat/demo.git
  git clone https://github.com/basement-chat/basement-chat.git
  ```

- Now, the directory structure will be something like this:
  ```
  └── basement-chat
      └── basement-chat
      └── demo
  ```
- Inside the `basement-chat/demo` folder:
  - Add the following configuration to your `composer.json`, this will allow you to install the local `basement-chat/basement-chat` project as a dependency:
    ```json
    "repositories": [
        {
            "type": "path",
            "url": "../basement-chat"
        }
    ]
    ```
  - You need to run the following command to install `basement-chat/basement-chat` from local directory and install `npm` dependencies:
    ```
    composer require basement-chat/basement-chat:dev-main
    npm install
    ```
  - Copy from `.env.example` to `.env` and configure your environment as usual. Here, we will use the default configuration and create a new empty file to `database/database.sqlite`.
    ```
    touch database/database.sqlite
    ```
  - Run the database migration with the following command:
    ```
    php artisan migrate
    ```
  - Seed your database with pre-filed users and messages:
    ```
    php artisan db:seed
    ```
  - Build assets with:
    ```
    npm run build
    ```
  - Run the soketi server:
    ```
    npx soketi start
    ```
  - Run the PHP server:
    ```
    php artisan serve
    ```
- Inside the `basement-chat/basement-chat` folder:
  - Run the following command to install all required dependencies:
    ```
    composer install
    npm install
    ```
  - Run the Vite development server and copy the `hot` file to the `basement-chat/demo/public` folder:
    ```
    npm run dev
    cp ./public/hot ../demo/public/hot
    ```
  - When you modify the code in this `basement-chat/basement-chat` folder, all changes will be reflected to `http://127.0.0.1:8000`

### Running tests

When modifying source code files, you can use the following commands to check if your changes break the test:

- Run unit tests:
  ```
  composer run-script test:unit
  ```
- Run feature tests:
  ```
  npx soketi start
  composer run-script test:feature
  ```
- Run browser tests:
  ```
  ./vendor/orchestra/testbench-core/create-sqlite-db
  ./vendor/orchestra/testbench-dusk/create-sqlite-db
  ./vendor/bin/dusk-updater detect --auto-update
  npx soketi start
  composer run-script test:browser
  ```
  Since the browser test is a bit tricky as it may fail depending on your OS environment, it is generally recommended to run tests with docker using the following command:
  ```
  docker-compose --file .devcontainer/docker-compose.yml run --rm test
  ```
  All failed browser test results including logs and screenshots will be stored in [`tests/Browser/console/`](tests/Browser/console/) and [`tests/Browser/screenshots/`](tests/Browser/screenshots/)

### Debugging Guide

The Basement Chat package is integrated with [Laravel Dump Server](https://beyondco.de/docs/laravel-dump-server). This feature makes it easy to perform interactive print debugging. So whenever you use `dd` or `dump`, the dumped data can be seen in the given URL (by default it uses http://localhost:8080/):

```bash
composer run-script dumper:start # start var dump server
composer run-script dumper:serve # serve dumped data to http://localhost:8080
```

### Commonly used scripts

- Composer
  - `composer run-script analyse`: run static code analysis using [PHPStan](https://phpstan.org/)
  - `composer run-script canvas`: run code generators using [canvas](https://github.com/orchestral/canvas), similar to the `artisan make` command
  - `composer run-script format`: format `.php` files to [PSR-12 code style](https://www.php-fig.org/psr/psr-12/) using [Laravel Pint](https://laravel.com/docs/10.x/pint)
  - `composer run-script insights`: run code quality analysis using [PHPInsights](https://phpinsights.com/)
  - `composer run-script test`: run the unit, feature, and browser tests using [PHPUnit](https://phpunit.de/) and [Laravel Dusk](https://laravel.com/docs/10.x/dusk)
- NPM
  - `npm run commit`: commit changes with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) rules using [Commitizen](https://github.com/commitizen/cz-cli)
  - `npm run build`: build production bundles of `.ts` and `.css` assets using [Rollup](https://rollupjs.org/)
  - `npm run dev`: run the [Vite](https://vitejs.dev/) development server
  - `npm run format`: format `.yml`, `.css`, `.blade.php`, and `.json` files using [Prettier](https://prettier.io/)
  - `npm run lint`: fix `.js` and `.ts` files to [Airbnb code style](https://github.com/airbnb/javascript) using [ESLint](https://github.com/eslint/eslint)

## Coding Rules

Here are some guidelines on the code styles used in the Basement Chat project:

### PHP

- Code should be written in PSR-12, and the following command can be used to automatically fix your code style using Laravel Pint
  ```
  composer run-script format
  ```
- Adding PHPDoc to the PHP files you write is not necessary but is highly recommended so it will work well with static analysis using PHP Stan. If you are not familiar with PHPDoc and PHPStan, you can try reading the [following guide](https://phpstan.org/writing-php-code/phpdocs-basics). To run static code analysis, you can use the following command:
  ```
  composer run-script analyse
  ```
  > If you're familiar with TypeScript, think of it like JSDoc in JavaScript with [`// @ts-check`](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) inside.

### Blade views

- Directory structure should be organized using Atomic Design. Here's a brief explanation if you're not familiar with this methodology:
  - `atoms` are UI elements that can’t be broken down any further and serve as the elemental building blocks of an interface. Examples: `button`, `icon`, and `input`.
  - `molecules` are collections of atoms that form relatively simple UI components. Examples: `form-group`.
  - `organisms` are relatively complex components that form discrete sections of an interface. Examples: `chat box header component`, `private messages component`, and `contacts component`.
  ```
  └── resources
      └── views
          └── components
              ├── atoms
              ├── molecules
              └── organisms
  ```
  For more details, you can read on the [following page](https://atomicdesign.bradfrost.com/chapter-2/).
- Code style should use prettier with our opinionated configuration, this can be automatically fixed using the following command:
  ```
  npm run format:blade
  ```

### CSS

TailwindCSS class should be prefixed with `bm-` to prevent style conflicts.

### TypeScript

Basement Chat uses a customized code style based on [Airbnb](https://github.com/airbnb/javascript) guide. You can fix your code style automatically using the following command:

```
npm run lint
```

## Commit Message Guidelines

To make sure every commit work well with our [Semantic Release CI/CD](https://github.com/semantic-release/semantic-release), it is expected that your commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Don't get overwhelmed, you just need to run the following command in the terminal when you commit:

```
npm run commit
```

And it will automatically run [Commitizen](https://github.com/commitizen/cz-cli) to interactively prompt you for commit message type and description.

## Submitting a Pull Request (PR)

Consider these guidelines before submitting PR:

- Make sure the PR that you would like to create has not been assigned by someone else. Please see the [roadmap](https://github.com/basement-chat/basement-chat/projects) page or [pull requests](https://github.com/basement-chat/basement-chat/pulls) page to find out.

- When you have a new idea that hasn't been listed on the [roadmap](https://github.com/basement-chat/basement-chat/projects), feel free to open a PR draft or issue first to discuss your idea.

- Don't commit your `dist` folder when building assets as it will be hard to review your changes. Instead, we build assets using [CI/CD](.github/workflows/semantic-release.yml) when changes are merged into the core branch.

- It is highly recommended that your code follows our [coding rules](#coding-rules).

- Don't forget to make sure you have tested the changes you made, both manually testing and [running automated tests](#running-tests).

- Write clear commit messages according to our [guidelines](#commit-message-guidelines) and include relevant information about the changes you've made.
