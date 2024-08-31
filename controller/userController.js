const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const validator = require ('validator');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from the JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

exports.readUsersFromFile = readUsersFromFile;  
exports.writeUsersToFile = writeUsersToFile;  

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (!validator.isEmail(email)){
        return res.status(400).json({ message: 'Invalid email format.'});
    }

    const users = readUsersFromFile();

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        id: uuid.v4(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json(newUser);
};

exports.getAllUsers = (req, res) => {
    const {page = 1, limit = 10} = req.query;

    // Validate and convert query parametres
    const pageNumber = parseInt (page, 10);
    const limitNumber = parseInt (limit, 10);

    if(isNaN(pageNumber) || pageNumber < 1){
        return res.status(400).json({ message: 'Invalid page Number.'});
    }

    if(isNaN(limitNumber) || limitNumber <1){
        return res.status(400).json({ message: 'Infalid limit number.'});
    }

    const users = readUsersFromFile();

    // Calculate start and end indices for pagination
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const paginationUsers = users.slice(startIndex.toFixed, endIndex);

    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / limitNumber);

    res.status(200).json({
        page: pageNumber,
        limit: limitNumber,
        totalUsers,
        totalPages,
        users: paginationUsers
    });
};

exports.getUserById = (req, res) => {
    const users = readUsersFromFile();
    const user = users.find(user => user.id === req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
};

exports.updateUser = (req, res) => {
    const { name, email, password } = req.body;
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Validate email format if provided
    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Check if the email is being updated to an existing one
    if (email && users.some(user => user.email === email && user.id !== req.params.id)) {
        return res.status(400).json({ message: 'Email already in use by another user.' });
    }

    const updatedUser = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        password: password ? bcrypt.hashSync(password, 10) : users[userIndex].password,
    };

    users[userIndex] = updatedUser;
    writeUsersToFile(users);

    res.status(200).json(updatedUser);
};


exports.deleteUser = (req, res) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    users.splice(userIndex, 1);
    writeUsersToFile(users);

    res.status(200).json({ message: 'User deleted successfully.' });
};
