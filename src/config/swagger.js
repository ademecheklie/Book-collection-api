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
  apis: [path.resolve('src/routes/*.js')], // Update path to match your file structure
};


const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  // Route to serve Swagger JSON
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Route for Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: 'https://book-collection-epmy4hw09-ademecheklies-projects.vercel.app/swagger.json', // URL to your working Swagger JSON endpoint
      },
    })
  );
  
  
  

  console.log('Swagger docs available at /api-docs');
};

export default swaggerDocs;
