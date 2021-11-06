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