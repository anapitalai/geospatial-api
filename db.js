const Pool = require("pg").Pool;

const pool=new Pool({
    // user:'unicrimeadmin',
    // password:'unicrime2020',
    // database:'unicrime',
    // host:'XXXX',
    // port:'5432'
    user:'postgres',
    password:'',
    database:'unicrime',
    host:'',
    port:'5432'
})

module.exports = pool;








