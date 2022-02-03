const fs = require("fs").promises
const { hashPassword } = require("../helpers/hashPassword")
const { logData } = require("../helpers/logData")

// add new user
const addUser = async (args) => {
    // get values from arguments
    const { name, email, password, address } = args

    // clean white spaces
    const cleanEmail = email.trim()

    try {
        // get the data
        const data = await fs.readFile('users.json');
        let userData = JSON.parse(data);


        // check if the email already exists
        if (JSON.stringify(userData).includes(cleanEmail)) {

            return console.log('email already exists !')

        } else {
            // encrypt the password
            const encryptedPassword = await hashPassword(password);
            // create a new user
            const newUser = {
                name,
                email: cleanEmail,
                address,
                password: encryptedPassword
            }

            // add new user to the array
            userData.push(newUser)

            // write the new array
            await fs.writeFile('users.json', JSON.stringify(userData, null, 4));

            // output message
            console.log('Successfully added a new user')

        }

    } catch (e) {
        console.log(e)
    }
}


// list one user based on given email
const listOneUser = async (email) => {
    // console.log("email")
    const cleanEmail = email
    try {
        const data = await fs.readFile('users.json');
        const userData = JSON.parse(data);
        // console.log(userData);

        // check if the email already exists
        if (JSON.stringify(userData).includes(cleanEmail)) {

            const newData = userData.filter(data => data.email === cleanEmail)

            logData(newData[0])

        } else {
            console.log('email does not exist !')
        }



    } catch (e) {
        console.log("Oops something went wrong.")
    }
}

// list all users
const listAllUser = async () => {

    try {
        const data = await fs.readFile('users.json');
        const userData = JSON.parse(data);
        // console.log(userData);

        userData.forEach((data) => {
            logData(data)
        })

    } catch (e) {
        console.log("Oops something went wrong.")
    }

}

// general function to list user
const listUser = (args) => {
    if (args.email) {
        // find user with that email
        listOneUser(args.email)
    } else {
        // find all user
        listAllUser()
    }
}

// update user
const updateUser = async (args) => {
    // console.log("email")
    const { email, password, address, name } = args

    const cleanEmail = email
    try {
        const data = await fs.readFile('users.json');
        const userData = JSON.parse(data);

        // check if the email already exists
        if (JSON.stringify(userData).includes(cleanEmail)) {

            const dataIndex = userData.findIndex(data => data.email == cleanEmail);

            delete args["_"]
            delete args["$0"]

            for (key in args) {
                if (key === 'password') {
                    const encryptedPassword = await hashPassword(args[key])
                    userData[dataIndex][key] = encryptedPassword
                } else {
                    userData[dataIndex][key] = args[key]
                }
            }

            // write file
            await fs.writeFile('users.json', JSON.stringify(userData, null, 4));

        } else {
            console.log('email does not exist !')
        }

    } catch (e) {
        console.log("Oops something went wrong.")
    }
}

const deleteUser = async (args) => {
    // console.log("delete user")
    const { email } = args;
    const cleanEmail = email.trim()

    try {
        // get the data
        const data = await fs.readFile('users.json');
        let userData = JSON.parse(data);


        // check if the email already exists
        if (!JSON.stringify(userData).includes(cleanEmail)) {

            return console.log('email doesn\'t exist !')

        } else {
            // filter out the data containing supplied email
            const newData = userData.filter(data => data.email != cleanEmail)

            await fs.writeFile('users.json', JSON.stringify(newData, null, 4));

            // output message
            console.log('Successfully deleted the user')

        }

    } catch (e) {
        console.log(e)
    }

}

module.exports = { addUser, listUser, updateUser, deleteUser }