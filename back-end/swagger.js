import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for IOT project',
        },
        servers: [
            {
                url: 'http://localhost:3333', // URL của ứng dụng của bạn
            },
        ],
    },
    apis: ['./controller/*.js'], // Đường dẫn đến các tệp chứa comments Swagger
};

const specs = swaggerJsdoc(options);

export function swagger(app) {
    app.use('/api-docs', serve, setup(specs));
};
