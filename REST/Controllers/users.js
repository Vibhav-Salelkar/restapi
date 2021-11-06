import { v4 as uuidv4 } from 'uuid';

const users = [
    {
        firstName: "John",
        lastName: "Doe",
        age: 23,
    },
    {
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

    res.send(`user with name ${user.firstName} added successfully`);
}

export const showUser = (req,res) => {
    const {id} = req.params;

    const foundUser = users.find(user=> user.id === id);

    res.send(foundUser);
}