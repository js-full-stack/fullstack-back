# Endpoints 

### User:

- **GET** `/user` - **Get all users** 
- **GET** `/user/:id` - **Get user by id** 
- **PUT** `/user/:id` - **update user** 

### Register and auth: 

- **POST** `/auth/register` - **register user**
- **POST** `/auth/login` - **authentication user**
 
 --- 

### Program: 

- **POST** `/program` - **add new program** (only for authenticated users with role couch)

- **GET** `/program` - **get all programs** 
- **GET** `/program/:id` - **get program by id** 
- **PUT** `/program/:id` - **update program** 
- **DELETE** `/program/:id` - **delete program**

### Exercise: 

- **POST** `/exercise` - **add new exercise for program** (only for authenticated users with role couch)

- **GET** `/exercise` - **get all exercise** 
- **GET** `/exercise/:id` - **get exercise by id** 
- **PUT** `/exercise/:id` - **update exercise** 
- **DELETE** `/program/:id` - **delete exercise**