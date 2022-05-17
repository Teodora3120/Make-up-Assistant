const data = require("./datadb");

class Controller {
       // getting all todos
    async getTodos(){
         // return all todos
        return new Promise((resolve, reject) => {
            if(resolve) {
                resolve(data);
            } else if(reject){
                reject(console.log("Error: Can't get the data!"));
            }
        })
    }

    async getTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === id);
            if (todo) {
                // return the todo
                resolve(todo);
            } else {
                // return an error
                reject(`Todo with id ${id} not found `);
            }
        });
    }

      // creating a todo
      async createTodo(todo) {
        return new Promise((resolve, _ ) => {
            // create a todo, with random id and data sent
            let newTodo = {
                "id": Math.floor(4 + Math.random() * 10),
                ...todo,
            };

            // return the new created todo
            resolve(newTodo);
        });
    }


    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let todo = data.find((todo) => todo.id === id);
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            todo["description"] = "new description";
            // return the updated todo
            resolve(todo);
        });
    }

    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === id);
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            // else, return a success message
            resolve(`Todo deleted successfully`);
        });
    }

}

module.exports = Controller;