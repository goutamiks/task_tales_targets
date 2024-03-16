Getting Started
The web-app can be installed by cloning the git repository

git clone https://github.com/goutamiks/task_tales_targets.git folder-name
Then cd into both directories and run npm i --force

cd folder-name
cd backend
npm i --force
cd.. // return to folder-name
cd client
npm i --force

After the entire installation you need to run the server and the client by running this commands each in client directory

npm start

Prerequisites
You will need to have node and npm installed. In addition you will need a MySQL server running in order to have full functionality of the application


Environment Variables
Change DB variables to match your MySQL setup

PORT=5000
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD=''
DB_NAME='task_tales_targets'
