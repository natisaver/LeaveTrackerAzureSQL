# SQL Azure Leave Tracker
<details>
  <summary>Explanation of Files</summary>
  
  Tech Stack:
  - Client Side - ReactJS
  - Server Side - NodeJS, Express
  
  Features:
  - GET, POST from Database
  - Overall List of Leaves
  - Individual Leave History
  
  ## Structure
  1. Config.js
      * Contains all the env variables required
  2. dboperations.js
     * Contains all queries
     * Connects to SQL Server 
  3. server.js
   * Express Server
   * Contains all routes
</details>



 ## Backend (root folder, not /backend)
 <details>
  <summary>NPM Installs and scripts</summary>  

  //for the entry point put to server.js instead of index.js
  ```git bash
  npm init
  npm i -D nodemon concurrently
  npm i mssql dotenv express body-parser cors 
  npm install http-errors --save
  ```

  To add into package.json "scripts" (Root)
  ```bash
      "type": "module"

      "start": "node backend/server",
      "server": "nodemon backend/server",
      "client": "npm start --prefix frontend",
      "dev": "concurrently \"npm run server\" \"npm run client\""
      "data:import": "node backend/seeder -d",
      "data:export": "node backend/seeder",

  ```
</details>

 ## Frontend
 <details>
  <summary>NPM Installs and scripts</summary>  

  //for the entry point put to server.js instead of index.js
  ```git bash
  npm i react-bootstrap axios react-router-dom react-bootstrap-table-next react-dates moment
  ```

  To add into package.json "scripts" (Frontend)
   ```bash
   frontend localhost:3000 & backend on port 3002, need to proxy
   "proxy": "http://127.0.0.1:3002",
   ```
</details>
