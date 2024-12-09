import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Book Collection API',
          version: '1.0.0',
          description: 'A simple Book Collection API',
      },
      components: {
          securitySchemes: {
              bearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
              },
          },
      },
      security: [{ bearerAuth: [] }],
      servers: [
          {
              url: 'https://book-collection-api-one.vercel.app',
              description: 'Production server',
          },
      ],
  },
  apis: [path.resolve('src/routes/*.js')],
};


const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at http://localhost:5000/api-docs');
};

export default swaggerDocs;
