const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'alkemy',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY iduser ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

const createTransactions = async (req, res) => {
    const {amount, date, description, transaction_type_id, category_id, user_id} = req.body;
    const transaction = { 
        amount,
        date,
        description,
        transaction_type_id,
        user_id,
        category_id
        
    }
    const response = pool.query('INSERT INTO transaction (amount, date, description, transaction_type_id, user_id, category_id)VALUES ($1, $2, $3, $4, $5, $6)', [amount, date, description, transaction_type_id, user_id, category_id]);
    console.log('response'+response);

    res.json({
        message: 'User Added successfully',
        body: {
            user: {user_id, amount, description, transaction_type_id}
        }
    })
};

const deleteTransactions = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM transaction WHERE id = $1', [id]);
    res.json('Transaction deleted Successfully');
}

const updateTransactions = async (req, res) => {
    const id = parseInt(req.params.id);
    const {amount, description, transactionType, category} = req.body;
    const response = await pool.query('UPDATE transaction SET amount = $1, description = $2, transactionType = $3, category = $4', [    amount,
        description,
        transactionType,
        category
    ]);
    res.json('Transaction Update Successfully')
}

const getTransactions = async (req, res) => {
    const {user_id} = req.body
    const response = await pool.query('SELECT * FROM transaction WHERE user_id = $1', [user_id]);
    res.json(response.rows);
}

const createCategories = async (req, res) => {
    const {idcategory, category} = req.body;
    await pool.query('INSERT INTO category (idcategory, category) VALUES ($1, $2)', [idcategory, category]);
    res.json({
        message: 'Category Create Successfully',
        body:{
            category: category,
        }
    }
    );

}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createTransactions,
    deleteTransactions,
    createCategories,
    getTransactions
};