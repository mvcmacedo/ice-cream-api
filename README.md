# Ice Cream shops API

Find the ice cream parlors closest to you!

## Getting Started

### Prerequisites

Node.js, NPM / Yarn and Docker installed

```
node -v
```

```
yarn -v
```

```
docker -v
```

### Installing

Get a development env running
You'll need to create a Yelp APP KEY. Create one signing up here: https://www.yelp.com/fusion

- Create a .env file
- Copy the content of the .env.example file and paste in your .env
- Paste your YELP APP KEY in the YELP_APP_KEY field

Run:

```
docker-compose up
```

If you are running without docker-compose, fill all the other fields in .env file and run the following command:

```
yarn dev:server
```

## Running the tests

```
yarn test
```

## Building the project

```
yarn build
```

## Built With

- [Express](https://expressjs.com/) - Node.js web application framework
- [Yarn](https://yarnpkg.com/) - Package manager that doubles down as project manager
- [Redis](https://redis.io/) - Open source (BSD licensed), in-memory data structure store
- [Yelp API](https://www.yelp.com/fusion) - Data from over 50 million businesses
- [Jest](https://jestjs.io/) - JavaScript Testing Framework with a focus on simplicity
- [Typescript](https://www.typescriptlang.org/) - Open-source language which builds on JavaScript
- [Babel](https://babeljs.io/) - JavaScript compiler

## Authors

- **Marcus Macedo** - (https://github.com/mvcmacedo)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
