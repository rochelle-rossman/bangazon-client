
# Bangazon E-commerce Client

Welcome to the Bangazon E-commerce Client repository. This is the frontend component of a full-stack e-commerce application where users can purchase and sell products.

## Overview
This client-side application was built using React and communicates with a server-side application built with Python and Django. The server repository can be found here: https://github.com/rochelle-rossman/bangazon-server. Together, the client and server-side applications allow users to:

- Browse and purchase products from the Bangazon marketplace
- Create an account and store their billing information for a seamless checkout experience
- Sell their own products by creating a store and uploading products for sale
## Screenshots

[![Screenshot-2023-02-03-at-2-41-04-PM.png](https://i.postimg.cc/SRrZ9kVk/Screenshot-2023-02-03-at-2-41-04-PM.png)](https://postimg.cc/0KzdRgLB)


## ERD
https://drawsql.app/teams/rochelle-rossman/diagrams/bangazon/embed
## Wireframe
https://miro.com/app/board/uXjVP0zoFEU=/?share_link_id=622351770943
## Run Locally
First:
- Create a Firebase project and enable authentication through Google
- Clone the server-side repository and make migrations

Then:

Clone the repository

```bash
  git clone git@github.com:rochelle-rossman/bangazon-client.git
```

Go to the project directory

```bash
  cd bangazon-client
```

Install dependencies in the root directory

```bash
  npm install
```
```bash
  npm run prepare
```
Create an env file and copy over the required variables
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_DATABASE_URL=http://localhost:8000 
```

Start the server

```bash
  npm run dev
```
