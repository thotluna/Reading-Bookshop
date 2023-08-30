<p align="center">
  <a href="https://reading-bookshop.vercel.app/">
       <img src="https://github.com/thotluna/Reading-Bookshop/assets/9143737/fa5197a0-f117-422b-bc06-2e33fa147068" width="300px" height="92px" alt="Reading Bookshop logo"/>
  </a>

<h1 align="center">
  < 📑 > Reading Bookshop
</h1>

<p align="center">
    <a href="https://github.com/thotluna/Reading-Bookshop/actions/workflows/publish.yml"><img src="https://github.com/thotluna/Reading-Bookshop/actions/workflows/publish.yml/badge.svg" alt="Build status"/></a>
</p>

<p align="center">
  In our editorial team, we always think of our readers. That's why we created this web application for you. It is a tool that allows you to list the books you have pending to read from our catalog of available books. With this app, you can keep track of the books you want to read and stay organized. We hope you enjoy the experience!.
  
  
  <br />
  <br />
  <a href="https://github.com/thotluna/Reading-Bookshop/stargazers">Stars are welcome 😊</a>
</p>

## 📚 Application Summary

<p>In the first  challenge of <a href='https://pruebastecnicas.com/'>"Pruebas técnicas de Programación"</a>, you will need to implement a small book list application using your choice of frontend framework. This application should allow users to add, remove, edit, and list the books they want to read.</p>

## 🔨 Install and Run

- `git clone https://github.com/thotluna/Reading-Bookshop.git`: Clone repository
- `pnpm install`: Install dependencies
- `pnpm dev`: Run app in mode development

## ✅ Testing

- `pnpm test`: Run unit test
- `npm test.e2e`: Execute Playwright in cli
- `npm test.e2e.ui`: Execute Playwright with ui

## 🔦 Linting & Format

- `pnpm lint`: Run linter
- `pnpm format`: Fix format issues
- `pnpm format.check`: Check format issues

## 🚀 CI and Publishing

This project comes with a GitHub Actions workflow to automatically publish to any push to main.

For publishing to work you will need to add a secret VERCEL_ORG_ID and VERCEL_PROJECT_ID to your repository

Read the [full documentation on the vercel publish github action](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel).

## 🌈 Tech Stack

- [TypeScript](https://www.typescriptlang.org)
- [vite](https://vitejs.dev/)
- [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- [React](https://react.dev/)
- [tailwindcss](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/) with [Testing Library](https://testing-library.com/docs/) for acceptance/component tests
- [vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/docs/) and [happy-dom](https://github.com/capricorn86/happy-dom) for component and unit tests
- [GitHub Action Workflows](https://github.com/features/actions) set up to run tests and linting on push
- [.editorconfig](https://editorconfig.org) for sharing the IDE config
