import db from '../config/database/db.js';

class User {

    static async insertUser(data, result){
        const sql = 'INSERT INTO user (alias, password, creation_timestamp, role) VALUES (?,?,NOW(), "user")';
        return db.query(sql, [data.alias, data.password], (err,res,fields)=>{
            if(err){ 
                console.log(err);
                result(null, err);
                return;
            }
            result(null, res);
        })
    }

    static async getUserByAlias(alias, result){
        const sql = 'SELECT * FROM user WHERE alias = ?';
        db.query(sql, [alias], (err, res)=>{
            if(err){
                console.log(err);
                result(null, err);
                return;
            }else {
                result(null, res)

            }
        })
    }

}

export default User;