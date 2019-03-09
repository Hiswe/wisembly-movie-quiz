# da movie quiz

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [requirements](#requirements)
- [commands](#commands)
  - [building dependencies](#building-dependencies)
  - [launching for test](#launching-for-test)
- [configuration](#configuration)
- [refresh movies data](#refresh-movies-data)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## requirements

- [node](http://nodejs.org/download/) >= 10.15.1
- [yarn](https://yarnpkg.com/lang/en/) >= 1.13.0

## commands

### building dependencies

```sh
yarn install
```

### launching for test

```sh
yarn start
```

application will be accessible at `http://localhost:3000/`

## configuration

you can configure the game time by

1. copying the `.quizrc-example` to `.quizrc`
2. changing the `GAME_DURATION_IN_SECOND` value
3. relaunching the app with a `yarn start`

## refresh movies data

you can refresh the movies data by

1. following the step above
2. providing a valid [The Move Database](https://developers.themoviedb.org/3/getting-started/introduction) `API_KEY` in the `.quizrc`
3. running the command `yarn get-api-data`
