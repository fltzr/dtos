import express, { type Request, type Response, type NextFunction } from 'express';
import { routes } from './routes';
import { authenticate } from './middleware/authenticate.middleware';

const createApplication = async () => {
  // Create the application
  const app = express();

  app.use(express.json());

  // Add logging
  app.use((request: Request, response: Response, next: NextFunction) => {
    const start = new Date().getTime(); // Optional: for tracking response time

    response.on('finish', () => {
      // Event listener for when the response has been sent
      const duration = new Date().getTime() - start; // Calculate the duration
      console.log(`\n🔖 ${response.statusCode} ${request.method} ${request.url} ${duration}ms`);
    });

    next();
  });

  app.use(authenticate);

  // Add the routes
  app.use(routes);

  // Return the application
  return app;
};

const startServer = async () => {
  const app = await createApplication();

  app.listen(8080, () => {
    console.info(`🚀 Server listening @ 3000`);
    console.info(`🛠 Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();
