<h1 align="center">
  Orcana
</h1>
<p align="center">
  <a href="https://github.com/martin-olivier/dylib/releases/tag/v1.0.0">
    <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="version"/>
  </a>
</p>

### Orcana is a GraphQL API admin panel

With Orcana you can have an administrator panel and observe through log and statistics different things like:

- Create an account
- Connect to an account
- Security with an json web token
- search an user by name
- Search an user by id
- Reset your password
- Change your name
- Delete your account
- Change the role of a user if the user has a role below yours
- You can send a message to another user
- Delete your message
- Get in real time the message sent

# Installation

To get started, just clone the repository and run yarn install && yarn dev:

```
git clone https://github.com/KylianGERMAIN/orcana.git
yarn install
yarn dev
```

# Environnement

Here is the environment that the project needs :

```
LINK_DB= (mango db url)
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

For tests

EMAIL_LOGIN_TEST=
PASSWORD_LOGIN_TEST=
ID_LOGIN_TEST=
ACCESS_TOKEN_LOGIN_TEST=
REFRESH_TOKEN_LOGIN_TEST=

```

Access the GraphQL Playground at http://localhost:4000

## Contributions
All contributions are welcome. Please open an issue or create a pull request if you have any suggestions or fixes.
