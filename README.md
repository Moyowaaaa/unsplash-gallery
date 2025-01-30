# Unsplash Image Gallery

## Features

- images as well as author details

- Skeleton loaders to provide feedback to users while fetching data from the API

- Allows users to search through different images

- Mobile responsiveness to ensure that it is compatible with all screen sizes

## Tools and Technologies

- Vue.js
- TypeScript
- SCSS
- Axios for data fetching

This project was bootstrapped with [Vite my-vue-app --template vue-ts]( [Vite Configuration Reference](https://vitejs.dev/config/).

## project Setup

To install and run the project locally, download/clone the repo and run the following commands:

```sh
npm install
```

### You need to provide an unsplsh api key which can be gotten from the unsplash api documentation

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Recommended IDE Setup

This template should help get you started developing with Vue 3 in Vite.

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
