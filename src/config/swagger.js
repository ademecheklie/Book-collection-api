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
        url: 'https://book-collection-api-one.vercel.app/', 
        description: 'Development server',
      },
    ],
  },
  apis: ['src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.1/swagger-ui.min.css";

const swaggerDocs = (app) => {
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Route to serve Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCssUrl: CSS_URL, 
    })
  );

  console.log('Swagger docs available at /api-docs');
};

export default swaggerDocs;
