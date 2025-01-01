Install Command For First Time
1. npm i express
2. npm install -g nodemon
3. 

Project File Structure
Project Structure :
blog-app/
│
├── src/
│   ├── controllers/
│   │   ├── admin/             
│   │   │   ├── PostController.js           
│   │   │   └── UserController.js           
│   │   ├── web/                 
│   │   │   ├── HomeController.js         
│   │   │   └── PostController.js            
│   │   └── api/ 
│   │       ├── PostController.js             
│   │       └── UserController.js            
│   │
│   ├── models/                                   
│   │   ├── User.js                                
│   │   └── Post.js                                
│   │
│   ├── scripts/
│   │   ├── migration.js
│   │   └── seed.js                        
│   │
│   ├── routes/                                    
│   │   ├── web/                                  
│   │   │   ├── home.js                        
│   │   │   ├── post.js                          
│   │   │   └── auth.js                          
│   │   ├── api/                                   
│   │   │   ├── post.js                          
│   │   │   └── user.js                          
│   │   └── admin/                              
│   │       ├── post.js                           
│   │       └── user.js                           
│   │
│   ├── middleware/                          
│   │   ├── authMiddleware.js            
│   │   └── errorMiddleware.js           
│   │
│   ├── services/                       
│   │   ├── PostService.js              
│   │   └── UserService.js              
│   │
│   ├── logs/
│   │   ├── app.log
│   │   └── logger.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   └── validation.js
│   │
│   ├── validation/
│   │   ├── userValidation.js
│   │   └── postValidation.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── app.js
│   ├── db
│   │   │   
│   │   ├── migrations
│   │   ├── seeds/
│   │   └── db.js
│   │
│   ├── app.js
│   └── dbConnect.js
│
├── public/
│   ├── admin/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── web/
│       ├── css/
│       ├── js/
│       └── images/
│
├── views/
│   ├── admin/
│   │   ├── auth/
│   │   │   ├── login.ejs
│   │   │   └── register.ejs
│   │   ├── dashboard.ejs            
│   │   ├── post-management.ejs
│   │   └── user-management.ejs
│   ├── web/                   
│   │   ├── home.ejs           
│   │   ├── post-list.ejs      
│   │   └── post-detail.ejs    
│   └── index.ejs              
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js


1st time command run
1. npm install mongoose


``
node src/scripts/migration.js // npm run migrate
node src/scripts/migration.js down  // npm run migrate:down
node src/scripts/generateMigration.js // npm run make:migration

