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
            example:
              "https://i.pinimg.com/736x/59/ee/1c/59ee1ceea702597255e47a823c30ee08.jpg",
          },
          name: {
            type: "string",
            description: "the character name",
            example: "Jane Porter",
          },
          age: {
            type: "integer",
            description: "the character age",
            example: 27,
          },
          weigth: {
            type: "integer",
            description: "the character weigth",
            example: 60,
          },
          history: {
            type: "string",
            description: "the character history",
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
            example: 5,
          },
          image: {
            type: "string",
            description: "the movie image",
            example:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqjiLiIFJaZSqEAtCCT0N1bw1_Wm9oJHVvHHASpr4qdg3TitCB",
          },
          title: {
            type: "string",
            description: "the movie title",
            example: "Enredados",
          },
          quallification: {
            type: "integer",
            description: "rating from 1 to 5",
            example: 3,
          },
          createdAt: {
            type: "string",
            readOnly: true,
            example: "4/20/2022, 2:21:56 PM",
          },
          genreId: {
            type: "integer",
            description: "id of the genre associated with the movie",
            example: 6,
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
