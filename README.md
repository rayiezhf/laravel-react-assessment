## About project

#Backend
###Backend is developed using PHP laravel

- PHP version 8.1.3
- MySql version 8.0


### Setup backend steps

- Clone repository
- `cd` to the cloned folder
- copy .env.example file to .env
- Make sure DB credentials are updated
- create database manually in MySql
- `composer install`
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan serve`

#Frontend
###Frontend is developed using React nodejs

- Node version 16.18.0


### Setup frontend steps

- Clone repository
- `cd` to the cloned folder
- `cd react_frontend`
- copy .env.example file to .env
- Make sure REACT_APP_API_URL has the correct backend api url
- `npm install`
- `npm start`

## Login details

###Superadmin
- email = `superadmin@company.com`
- password = `superadminpassword`

###Admin
- email = `admin@company.com`
- password = `adminpassword`

###Employee
- email = `employee@company.com`
- password = `employeepassword`
