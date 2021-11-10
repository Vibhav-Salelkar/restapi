import { v4 as uuidv4 } from 'uuid';

let users = [
    {
        id: '1',
        firstName: "John",
        lastName: "Doe",
        age: 23,
    },
    {
        id: '2',
        firstName: "Jane",
        lastName: "Doe",
        age: 19,
    }
]

export const showUsers = (req,res) => {
    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;
    const userId = uuidv4();

    users.push({id: userId, ...user});

    res.send({data: users, message:`user with name ${user.firstName} added successfully`});
}

export const showUser = (req,res) => {
    const {id} = req.params;

    const foundUser = users.find(user=> user.id === id);

    res.send(foundUser);
}

export const deleteUser = (req,res) => {
    const {id} = req.params;

    users = users.filter(user=> user.id !== id);

    res.send({data: users, message:`User with id: ${id} deleted successfully`});
}

export const updateUser = (req,res) => {
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;

    const userToUpdate = users.find(user=> user.id === id);

    if(firstName) {
        userToUpdate.firstName = firstName;
    }

    if(lastName) {
        userToUpdate.lastName = lastName;
    }

    if(age) {
        userToUpdate.age = age;
    }

    res.send({data: users, message:`User successfully updated`});
}