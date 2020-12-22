module.exports = {
    "development": {
        "databases": { /** our database declarations from before**/}
    },

    // Special environment only for Database1
    "Database1": {
                "database": process.env.RDS_DATABASE1, 
                "username": process.env.RDS_USERNAME1,  
                "password":  process.env.RDS_PASSWORD1,
                "host": process.env.RDS_HOSTNAME1,
                "port": process.env.RDS_PORT1,
               "dialect": 'mysql'  
            },

    // Special environment only for Database2
    "Database2": {
                "database": process.env.RDS_DATABASE2, 
                "username": process.env.RDS_USERNAME2,  
                "password":  process.env.RDS_PASSWORD2,
                "host": process.env.RDS_HOSTNAME2,
                "port": process.env.RDS_PORT2,
                "dialect": 'mysql'  
            },
 }
