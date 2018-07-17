# tool used in this project
- Client
    - vue-cli
    - vuetify                   | v. ^1.0.14
    - material-design-icons     | v. ^3.0.1
    - vuex                      | v. ^3.0.1
    - axios                     | v. ^0.18.0
    - vuelidate                 | v. ^0.6.2
    - Moment                    | v. ^2.22.1
- Server 
    - reference : 
        - https://github.com/waiyaki/postgres-express-node-tutorial
    - requitment : 
        - nodejs                         | v. 9.4.0
        - expressjs                      | v. ^4.16.3
        - morgan                         | v. ^1.9.0
        - body-parser                    | v. ^1.18.2
        - nodemon (Development)          | v. ^1.17.3
        - sequelize-cli (Global)         | v. 4.0.0
        - sequelize                      | v. ^4.3.2 
        - pg                             | v. ^7.4.1
        - pg-hstore                      | v. ^2.3.2
        - passportjs                     | v. ^0.4.0
        - passport-local                 | v. ^1.0.0
        - passport-jwt                   | v. ^4.0.0
        - express-session                | v. ^1.15.6
        - bcrypt-nodejs                  | v. 0.0.3
        - jwt-simple                     | v. ^0.5.1
        - cors                           | v. ^2.8.4
        - multer                         | v. ^1.3.0
        - del                            | v. ^3.0.0
        - querystring                    | v. ^0.2.0
        - node-schedule                  | v. ^1.3.0
    - Environment(additional) :
        - NODE_ENV : 'development'
        - PORT : 8000

- note : 
    - create Table = "sequelize model:create --name Todo --attributes title:string"