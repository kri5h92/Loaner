## Kreditpay API SERVER

This submodule contain the kreditpay backend API logic serve using express,node and mongoDB.

## Quick Setup

```bash
## Install dependencies
$ npm install 

## Create env file
$ cp env.sample .env

## Run Server
$ npm run dev

## Create Build 
$ npm run build
```

## Environment Variable Setup

Below is the default config which spin the server on http://localhost:3000

```
PORT=3000
HOST=127.0.0.1
MONGODB_URI=mongodb://localhost:27020/kreditpay
JWT_SECRET=/This secret should be unique/
```

You can change this accordin to your need.
