# Hapi.js Example Application on Clever Cloud

[![Clever Cloud - PaaS](https://img.shields.io/badge/Clever%20Cloud-PaaS-orange)](https://clever-cloud.com)

This is a simple [Hapi.js](https://hapi.dev/) application that demonstrates how to deploy a Node.js web server to Clever Cloud, with structured logging and Elastic APM integration.

## About the Application

This application exposes an HTTP endpoint that can return any HTTP status code on demand. It is useful for testing how proxies, load balancers, and monitoring tools handle different response types.

### Routes

| Route | Description |
|-------|-------------|
| `/{any*}` | Catch-all route, returns an empty JSON object |
| `/status-codes/{statusCode}` | Returns a response with the given HTTP status code |

## Technology Stack

- [Hapi.js](https://hapi.dev/) - A rich framework for building applications and services
- [hapi-pino](https://github.com/hapijs/hapi-pino) - Structured JSON logging via Pino
- [Elastic APM](https://www.elastic.co/apm) - Application performance monitoring
- [convict](https://github.com/mozilla/node-convict) - Configuration management
- Node.js 24

## Prerequisites

- Node.js 24+
- npm

## Running the Application Locally

### Development Mode

```bash
npm run start:dev
```

This starts the application with [nodemon](https://nodemon.io/) for automatic restarts on file changes. The application will be accessible at http://localhost:8080.

### Production Mode

```bash
NODE_ENV=production npm start
```

## Deploying on Clever Cloud

You have two options to deploy your application on Clever Cloud: using the Web Console or using the Clever Tools CLI.

### Option 1: Deploy using the Web Console

#### 1. Create an account on Clever Cloud

If you don't already have an account, go to the [Clever Cloud console](https://console.clever-cloud.com/) and follow the registration instructions.

#### 2. Set up your application on Clever Cloud

1. Log in to the [Clever Cloud console](https://console.clever-cloud.com/)
2. Click on "Create" and select "An application"
3. Choose "Node.js" as the runtime environment
4. Configure your application settings (name, region, etc.)

#### 3. Configure Environment Variables

Add the following environment variables in the Clever Cloud console:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Enables HTTPS enforcement and Elastic APM |
| `PORT` | `8080` | Port the server listens on (default) |

For Elastic APM support (optional — only active when `NODE_ENV=production`):

| Variable | Value | Description |
|----------|-------|-------------|
| `ELASTIC_APM_SERVER_URLS` | `https://your-apm-server:8200` | Elastic APM server URL |
| `ELASTIC_APM_SECRET_TOKEN` | `your-token` | Elastic APM authentication token |
| `STORE_APP_NAME` | `my-app` | Reported as the APM service name |
| `INSTANCE_ID` | *(set by Clever Cloud)* | Reported as the APM service node name |
| `COMMIT_ID` | *(set by Clever Cloud)* | Reported as the APM service version |

#### 4. Deploy Your Application

You can deploy your application using Git:

```bash
# Add Clever Cloud as a remote repository
git remote add clever git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_<your-app-id>.git

# Push your code to deploy
git push clever master
```

### Option 2: Deploy using Clever Tools CLI

#### 1. Install Clever Tools

Install the Clever Tools CLI following the [official documentation](https://www.clever-cloud.com/doc/clever-tools/getting_started/):

```bash
# Using npm
npm install -g clever-tools

# Or using Homebrew (macOS)
brew install clever-tools
```

#### 2. Log in to your Clever Cloud account

```bash
clever login
```

#### 3. Create a new application

```bash
# Initialize the current directory as a Clever Cloud application
clever create --type node <YOUR_APP_NAME>

# Set the required environment variables
clever env set NODE_ENV production
clever env set PORT 8080
```

#### 4. Deploy your application

```bash
clever deploy
```

#### 5. Open your application in a browser

Once deployed, you can access your application at the provided domain.

### Monitoring Your Application

Once deployed, you can monitor your application through:

- **Web Console**: The Clever Cloud console provides logs, metrics, and other tools to help you manage your application.
- **CLI**: Use `clever logs` to view application logs and `clever status` to check the status of your application.

## Additional Resources

- [Hapi.js Documentation](https://hapi.dev/api/)
- [Clever Cloud Documentation](https://www.clever-cloud.com/doc/)
- [Clever Cloud Node.js Deployment](https://www.clever-cloud.com/doc/applications/javascript/nodejs/)
