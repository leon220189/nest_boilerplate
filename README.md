<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<!--
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p> -->
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

[![pipeline status](https://gitlab.com/lexuanbinh220189/nestjs_blank_v1/badges/main/pipeline.svg)](https://gitlab.com/lexuanbinh220189/nestjs_blank_v1/-/commits/main)

[![coverage report](https://gitlab.com/lexuanbinh220189/nestjs_blank_v1/badges/main/coverage.svg)](https://gitlab.com/lexuanbinh220189/nestjs_blank_v1/-/commits/main)

[![Latest Release](https://gitlab.com/lexuanbinh220189/nestjs_blank_v1/-/badges/release.svg)](https://gitlab.com/lexuanbinh220189/nestjs_blank_v1/-/releases)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Start server with docker compose

```bash
$ pnpm install
$ docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### TYPEORM config start

### Configuring package.json

NOTE: the migration script runs inside the Docker container

To be able to run these commands, it's best to expose them in your `package.json` file in the `scripts` section.

Copy and paste the below:

```json
{
	"scripts": {
		"migration:create": "ts-node -r tsconfig-paths/register src/cli.ts typeorm migration:create",
		"migration:generate": "ts-node -r tsconfig-paths/register src/cli.ts typeorm migration:generate",
		"migration:run": "ts-node -r tsconfig-paths/register src/cli.ts typeorm migration:run",
		"migration:revert": "ts-node -r tsconfig-paths/register src/cli.ts typeorm migration:revert",
		"migration:show": "ts-node -r tsconfig-paths/register src/cli.ts typeorm migration:show",
		"schema:drop": "ts-node -r tsconfig-paths/register src/cli.ts typeorm schema:drop",
		"schema:log": "ts-node -r tsconfig-paths/register src/cli.ts typeorm schema:log",
		"schema:sync": "ts-node -r tsconfig-paths/register src/cli.ts typeorm schema:sync",
		"typeorm:cache:clear": "ts-node -r tsconfig-paths/register src/cli.ts typeorm cache:clear",
		"typeorm:query": "ts-node -r tsconfig-paths/register src/cli.ts typeorm query",
		"typeorm:version": "ts-node -r tsconfig-paths/register src/cli.ts typeorm version"
	}
}
```

_If you are not using NestJS's monorepo and you use relative paths for imports, as well as no aliases, you may omit the `-r tsconfig-paths/register` part of these commands, for readability._

_If you have integrated nest-commander via a different file than `src/cli.ts` then replace it here._

### Usage

Now you have access to the following commands:

- `npm run migration:create MigrationName` - create an empty migration with the given name
- `npm run migration:generate MigrationName` - automatically create a migration with the given name
- `npm run migration:run` - run pending migrations
- `npm run migration:revert` -- revert last migration
- `npm run migration:show` - show list of migrations and their status
- `npm run schema:drop` - drop the db schema
- `npm run schema:log` - show diff between db schema and codebase
- `npm run schema:sync` - sync the db schema with the codebase
- `npm run typeorm:cache:clear` - clear query cache
- `npm run typeorm:query "SELECT * FROM migrations"` - run an SQL query
- `npm run typeorm:version` - check TypeORM version

## Disclaimer

This package simply reimplements the TypeORM CLI commands in a "NestJS-way", injecting the application's `DataSource` into the commands, so the configuration can be fully reused. The actual command code is 100% based on the original commands and some small features might be missing.

For full visibility:

- the commands use the default `DataSource` (connection) to the database. Support for handling multiple connections / specifying which connection should be used in on TODO list.
- `migration:generate` and `migration:create` only supports TypeScript migrations, no JS files
- Output coloring has been removed for simplicity. It might be added later.
- Error handling is simplified and errors simply uncaught.

### TYPEORM config end
