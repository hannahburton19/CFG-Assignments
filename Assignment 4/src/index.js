//setting up the server

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const PORT = 8888;

require('dotenv').config();  //loading in the environment variables from the .env file

app.use(bodyParser.json());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('API up and running!');
});

//creating connection to SQL database

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//POST request: adding a new user

app.post('/new-user', (req, res) => {
    const {username} = req.body;

    //validate if a username is provided
    if (!username) {
        return res.status(400).json({error: 'No username provided'})
    }

    const sql = 'INSERT INTO users (username) VALUES (?)';
    pool.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error creating new user', err.message);
            return res.status(500).json({error: 'Database error'});
        }
       
        res.status(201).json({ id: result.insertId, message: 'New user created successfully'});
    });
});

//POST request: adding a new recipe

app.post('/new-recipe', (req, res) => {
    const {user_id, recipe_name, instructions} = req.body;

    //basic validation checks
if (!user_id) {
    return res.status(400).json({error: 'Valid user ID is required'});
}

if (isNaN(user_id)) {
    return res.status(400).json({error: 'User ID must be a number'});
}

if (!recipe_name) {
    return res.status(400).json({error: 'Recipe name is required'});
}

if (!instructions) {
    return res.status(400).json({error: 'Recipe instructions are required'});
}

//inserting new recipe into the database
    const sql = 'INSERT INTO recipes (user_id, recipe_name, instructions) VALUES (?, ?, ?)';
    pool.query(sql, [user_id, recipe_name, instructions], (err, result) => {
        if (err) {
            console.error('Error creating new recipe:', err.message);
            return res.status(500).json({error: 'Database error'});
        }
        
        res.status(201).json({ id: result.insertId, message: 'New recipe added successfully'});
    });
});

//POST request: adding ingredients to a recipe

app.post('/add-ingredients', (req, res) => {
    const ingredients = req.body; //expected input is an array of ingredient objects

    //checking if the ingredients array is empty
    if(!Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({error: 'No ingredients provided'});
    }

    const promises = []; //array to hold promises for each query

    ingredients.forEach(ingredient => {
        const { recipe_id, ingredient_name, quantity} = ingredient;

        //checking that there are no empty required fields
        if (!recipe_id || !ingredient_name || !quantity) {
            return res.status(400).json({error: 'Missing required fields'});
        }

        const sql = 'INSERT INTO ingredients (recipe_id, ingredient_name, quantity) VALUES (?, ?, ?)';

        //push the query promise to the array
        promises.push(
            new Promise((resolve, reject) => {
                pool.query(sql, [recipe_id, ingredient_name, quantity], (err, result) => {
                    if (err) {
                        console.error('Error adding new ingredient:', err.message);
                        return reject(err); //reject the promise if there's an error
                    }
            
            resolve(result.insertId); // resolve the promise with the inserted ID
                });
            })
     );
        
});

 //wait for all queries to complete
 
 Promise.all(promises).then(insertedIds => {
    res.status(201).json({
        ids: insertedIds,
        message: 'New ingredient list added successfully'
    });
 })
      .catch(err => {
        res.status(500).json({ error: 'Database error: ' + err.message});
      });
    });

    //GET request: get recipe by ID, returns the recipe name and instructions

    app.get('/recipes/:recipe_id', (req, res) => {
        const recipeId = req.params.recipe_id;

        if (isNaN(recipeId)) {
            return res.status(400).json({error: 'Recipe ID must be a number'});
        }
        const sql = 'SELECT recipe_name, instructions FROM recipes WHERE recipe_id = ?';

        pool.query(sql, [recipeId], (err, results) => {
            if (err) {
                console.log('Error fetching recipe:', err.message);
                return res.status(500).json({error: 'Database error'});
            }

            res.status(200).json(results);
        });
        
    });

    //GET request: get ingredients by recipe ID, returns an array of ingredients for the specified recipe

    app.get('/ingredients/:recipe_id', (req, res)=> {
        const recipeId = req.params.recipe_id;

        if (isNaN(recipeId)) {
            return res.status(400).json({error: 'Recipe ID must be a number'});
        }
        const sql = 'SELECT ingredient_name, quantity FROM ingredients WHERE recipe_id = ?';

        pool.query(sql, [recipeId], (err, results) => {
            if (err) {
                console.log('Error fetching ingredients:', err.message);
                return res.status(500).json({error: 'Database error'});
            }

            //if no ingredients are found, return a 404 error
            if (results.length === 0) {
                return res.status(404).json({error: 'No ingredients found for this recipe'});
            }

            res.status(200).json(results);
        });
    });


    //PUT request: update the instructions for a recipe

    app.put('/update-recipe/:recipe_id', (req, res) => {
        const recipeId = req.params.recipe_id;
        const { instructions } = req.body;

        if (isNaN(recipeId)) {
            return res.status(400).json({error: 'Recipe ID must be a number'});
        }

        if (!instructions) {
            return res.status(400).json({error: 'No recipe instructions updated'});
        }

        const sql = 'UPDATE recipes SET instructions = ? WHERE recipe_id = ?';
        pool.query(sql, [instructions, recipeId], (err, result) => {
            if (err) {
                console.error('Error updating recipe instructions:', err.message);
                return res.status(500).json({error: 'Database error'});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({error: 'Recipe not found'});
            }

            res.status(200).json({message: 'Recipe instructions updated successfully'});
        });
    });

    //DELETE request: deleting a recipe 

    app.delete('/delete-recipe/:recipe_id', (req, res) => {
        const recipeId = req.params.recipe_id;

        if (isNaN(recipeId)) {
            return res.status(400).json({error: 'Recipe ID must be a number'});
        }

        const sql = 'DELETE FROM recipes WHERE recipe_id = ?';
        pool.query(sql, [recipeId], (err, result) => {
            if (err) {
                console.error('Error deleting recipe:', err.message);
                return res.status(500).json({error: 'Database error'});
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({error: 'Recipe not found'});
            }

            res.status(200).json({message: 'Recipe successfully deleted'});
        });
    });