# SQL Azure Leave Tracker
<details>
  <summary>Click to expand!</summary>
  
  ## Heading
  1. A numbered
  2. list
     * With some
     * Sub bullets
</details>



 ## BACKEND (root folder, not /backend)
  

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


 ## FRONTEND 

  //for the entry point put to server.js instead of index.js
  ```git bash
  npm react-bootstrap axios react-router-dom react-bootstrap-table-next
  ```

  To add into package.json "scripts" (Frontend)
   ```bash
   frontend localhost:3000 & backend on port 3002, need to proxy
   "proxy": "http://127.0.0.1:3002",
   ```
