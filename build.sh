#!/bin/bash

echo "Instalando frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Instalando backend..."
cd backend
npm install
cd ..