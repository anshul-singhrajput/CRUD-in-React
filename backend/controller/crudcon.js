var config = require('../dbConfig');
const sql = require('mssql');

async function insertStudent(data) {
    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('name', sql.NVarChar(50), data.name)
            .input('email', sql.NVarChar(50), data.email)
            .input('phone_no', sql.NVarChar(15), data.phone_no)
            .query(`
                INSERT INTO Students (name, email, phone_no)
                VALUES (@name, @Email, @phone_no)
            `);
        return results;
    } catch (error) {
        console.log(error);
    }
}

async function getInfoData() {
    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .query(`select * from Students`);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUserById(ID) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('ID', sql.Int, ID)
            .query('SELECT * FROM Students WHERE ID = @ID');
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateStudent(data) {
    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('ID', sql.Int, data.ID)
            .input('name', sql.NVarChar(50), data.name)
            .input('email', sql.NVarChar(50), data.email)
            .input('phone_no', sql.NVarChar(15), data.phone_no)
            .query(`
                UPDATE Students
                SET
                    name = @name,
                    email = @email,
                    phone_no = @phone_no
                WHERE ID = @ID
            `);
        return results;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function DeleteStudentbyId(ID) {
    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('ID', sql.Int, ID)
            .query('DELETE FROM Students WHERE ID = @ID');
        return results;
    }
    catch (error) {
        console.log(error);
    }

}





module.exports = {
    insertStudent: insertStudent,
    getInfoData: getInfoData,
    getUserById: getUserById,
    updateStudent: updateStudent,
    DeleteStudentbyId: DeleteStudentbyId,
}