// fs import
const { addUser, listUser, updateUser, deleteUser } = require("./controller/UserController")

// const { argv } = require('yargs')
const yargs = require('yargs')


// definition of add command
yargs.command({
    command: 'add',
    description: 'This command will add users',
    handler: ((argv) => {
        addUser(argv)
    }),
    builder: {
        name: {
            describe: 'The name of the user',
            type: "string",
            demandOption: true,
        },
        email: {
            describe: 'The email of the user',
            type: "string",
            demandOption: true,
        },
        password: {
            describe: 'The password of the user',
            type: "string",
            demandOption: true,
        },
        address: {
            describe: 'The address of the user',
            type: "string",
            demandOption: true,
        }
    }

})

// list all users
// if email as argument is provided then finds that user
// if no argument is provided then all users are listed
yargs.command({
    command: 'list',
    description: 'This command will list all users or only one user based on the provided email.',
    handler: ((argv) => {
        listUser(argv)
    }),
    builder: {
        email: {
            describe: 'The email of the user',
            type: "string"
        }
    }

})

// definition of update command
yargs.command({
    command: 'update',
    description: 'This command will update information of the user with provided email.',
    handler: ((argv) => {
        updateUser(argv)
    }),
    builder: {
        name: {
            describe: 'The name to be updated',
            type: "string",
        },
        email: {
            describe: 'The email of the user',
            type: "string",
            // demandOption: true,
        },
        password: {
            describe: 'The password to be updated',
            type: "string",
        },
        address: {
            describe: 'The address to be updated',
            type: "string",
        }
    }

})

// definition of update command
yargs.command({
    command: 'delete',
    description: 'This command will delete user with provided email',
    handler: ((argv) => {
        deleteUser(argv)
    }),
    builder: {
        email: {
            describe: 'The email of the user to be deleted',
            type: "string",
            demandOption: true,
        }
    }

})

yargs.parse()