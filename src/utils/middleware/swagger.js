const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Disney API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      user: {
        type: "object",
        required: ["email", "password", "name"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            readOnly: true,
          },
          email: {
            type: "string",
            description: "the user email",
            example: "alan@email.com",
          },
          password: {
            type: "string",
            description: "the user password",
            example: "alan12345",
          },
          name: {
            type: "string",
            description: "the user name",
            example: "Alan Kay",
          },
        },
      },
      character: {
        type: "object",
        required: ["image", "name", "age", "weigth", "movies"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            readOnly: true,
          },
          image: {
            type: "string",
            description: "the character image",
          },
          name: {
            type: "string",
            description: "the character name",
          },
          age: {
            type: "integer",
            description: "the character age",
          },
          weigth: {
            type: "integer",
            description: "the character weigth",
          },
          history: {
            type: "string",
            description: "the character history",
          },
          movies: {
            type: "array",
            description: "id of the movies associated with the character",
          },
        },
      },
      movie: {
        type: "object",
        required: ["image", "title", "quallification", "genreId"],
        properties: {
          id: {
            type: "integer",
            readOnly: true,
          },
          image: {
            type: "string",
            description: "the movie image",
          },
          title: {
            type: "string",
            description: "the movie title",
          },
          quallification: {
            type: "integer",
            description: "the quallification movie",
          },
          genreId: {
            type: "integer",
            description: "id of the genre associated with the movie",
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/v1/routes/*.js"],
};

module.exports = swaggerJSDoc(swaggerOptions);
