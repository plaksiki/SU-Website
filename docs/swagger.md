# Swagger Documentation

## Description

Swagger provides an interactive API documentation for the SU Website backend. It automatically generates documentation from the Spring Boot application, so the documentation is always synchronized with the current implementation of the REST API.

**The documentation allows developers, testers, and project owners to:**

- explore all available REST endpoints;
- view request methods (GET, POST, DELETE);
- inspect required path parameters and request bodies;
- see response formats and HTTP status codes;
- test endpoints directly from the browser without using external tools such as Postman.

Endpoints are grouped by controllers (for example, `questionnaire-controller`, `questions-controller`, `options-controller`, etc.), making it easier to navigate between different backend components.

---

## How to use

### Links

[Swagger UI (interactive documentation)](http://10.93.26.192:8080/swagger-ui/index.html)  
[OpenAPI specification (JSON)](http://10.93.26.192:8080/v3/api-docs)  

### Instructions

1. Open the [Swagger UI](http://10.93.26.192:8080/swagger-ui/index.html)  .
2. Browse the list of controllers on the main page.
3. Expand the controller that contains the endpoint you want to inspect.
4. Click on an endpoint to view:
   - endpoint description;
   - HTTP method;
   - path and query parameters;
   - request body (if required);
   - response schema;
   - possible HTTP response codes.
5. Press **Try it out** to test the endpoint.
6. Fill in the required parameters or request body.
7. Click **Execute**.
8. Swagger will display:
   - the generated request;
   - the server response;
   - the response headers;
   - the returned JSON object or error message.
