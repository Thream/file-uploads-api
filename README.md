<h1 align="center"><a href="https://file-uploads-api.thream.divlo.fr/documentation">Thream/file-uploads-api</a></h1>

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="./CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <br />
  <a href="https://github.com/Thream/file-uploads-api/actions/workflows/build.yml"><img src="https://github.com/Thream/file-uploads-api/actions/workflows/build.yml/badge.svg?branch=develop" /></a>
  <a href="https://github.com/Thream/file-uploads-api/actions/workflows/lint.yml"><img src="https://github.com/Thream/file-uploads-api/actions/workflows/lint.yml/badge.svg?branch=develop" /></a>
  <br />
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release" /></a>
</p>

## 📜 About

Thream's application programming interface (API) to upload files.

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16.0.0
- [npm](https://www.npmjs.com/) >= 8.0.0

### Installation

```sh
# Clone the repository
git clone git@github.com:Thream/file-uploads-api.git

# Go to the project root
cd file-uploads-api

# Configure environment variables
cp .env.example .env

# Install
npm install
```

You will need to configure the environment variables by creating an `.env` file at
the root of the project (see `.env.example`).

### Usage

```sh
npm run dev
```

#### Services started

- `file-uploads-api`: <http://127.0.0.1:8000>

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or
even correct a simple spelling mistake.

The steps to contribute can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

[MIT](./LICENSE)
