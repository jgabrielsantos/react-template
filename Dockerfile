# Step 1: Build the React application
FROM node:18 AS build
WORKDIR /
COPY package.json package-lock.json ./

ENV REACT_APP_BASE_URL=http://localhost:8080
ENV REACT_APP_SESSION_COOKIE_NAME=userSession

RUN npm install
COPY . ./
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]