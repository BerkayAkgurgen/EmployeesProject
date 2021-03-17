import {Request} from "./request"

const form = document.getElementById("employee-form")
const nameInput = document.getElementById("name")
const departmentInput = document.getElementById("department")
const salaryInput = document.getElementById("salary")
const employeeList = document.getElementById("employees")
const updateEmployeeButton = document.getElementById("update")

const request = new Request("http://localhost:3000/employees")

// request.get()
// .then(emp => console.log(emp))
// .catch(err => console.log(err))

// request.post({name:"Serhat Say",department:"Pazarlama",salary:3800})
// .then(emp => console.log(emp))
// .catch(err => console.log(err))

// request.put(4,{name:"Gökhan Uçak",department:"Marketing",salary:3500})
// .then(emp => console.log(emp))
// .catch(err => console.log(err))

request.delete(6)
.then(emp => console.log(emp))
.catch(err => console.log(err))