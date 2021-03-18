import {
    Request
} from "./request"
import {
    UI
} from "./ui"

const form = document.getElementById("employee-form")
const nameInput = document.getElementById("name")
const departmentInput = document.getElementById("department")
const salaryInput = document.getElementById("salary")
const employeeList = document.getElementById("employees")
const updateEmployeeButton = document.getElementById("update")
const filterInput = document.getElementById("filter")

const request = new Request("http://localhost:3000/employees")
const ui = new UI()

let updateState = null

eventListeners()

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees)
    form.addEventListener("submit", addEmployee)
    employeeList.addEventListener('click', UpdateOrDelete)
    updateEmployeeButton.addEventListener('click', updateEmployee)
    filterInput.addEventListener('input', filterEmployee)
}

function getAllEmployees() {
    request.get()
        .then(employees => {
            ui.addAllEmployeesToUI(employees)
        })
        .catch(error => console.log(error))
}

function addEmployee(e) {
    const employeeName = nameInput.value.trim()
    const employeeDepartment = departmentInput.value.trim()
    const employeeSalary = salaryInput.value.trim()
    request.get()
        .then(employee => {
            let empName = employee.map(emp => emp.name)
            if (employeeName === "" || employeeDepartment === "" || employeeSalary === "") {
                alert("Lütfen Tüm Alanları Doldurunuz.")
            } else if (empName.indexOf(employeeName) === -1) {
                request.post({
                        name: employeeName,
                        department: employeeDepartment,
                        salary: Number(employeeSalary)
                    })
                    .then(employees => {
                        ui.addEmployeesToUI(employees)
                    })
                    .catch(error => console.log(error))
            } else if (confirm("Aynı İsim Girilecek Onaylıyor Musunuz?") == true) {
                request.post({
                        name: employeeName,
                        department: employeeDepartment,
                        salary: employeeSalary
                    })
                    .then(employees => {
                        ui.addEmployeesToUI(employees)
                    })
                    .catch(error => console.log(error))
            } else {
                alert("Aynı isim girilmez.")
            }
        })
    ui.clearInputs()
    e.preventDefault()
}

function UpdateOrDelete(event) {
    if (event.target.id === "delete-employee") {
        deleteEmployee(event.target)
    } else if (event.target.id === "update-employee") {
        updateEmployeeController(event.target.parentElement.parentElement)
    }
}

function deleteEmployee(targetEmployee) {
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent

    request.delete(id)
        .then(message => {
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement)
        })
        .catch(error => console.log(error))
}

function updateEmployeeController(targetEmployee) {
    ui.toggleUpdateButton(targetEmployee)
    if (updateState === null) {
        updateState = {
            updateId: targetEmployee.children[3].textContent,
            updateParent: targetEmployee
        }
    } else {
        updateState = null
    }
}

function updateEmployee() {
    if (updateState) {
        const data = {
            name: nameInput.value.trim(),
            department: departmentInput.value.trim(),
            salary: Number(salaryInput.value.trim())
        }
        request.put(updateState.updateId, data)
            .then(updateEmployee => {
                ui.updateEmployeeOnUI(updateEmployee, updateState.updateParent)
            })
            .catch(error => console.log(error))
    }
}

function filterEmployee() {
    const filterText = filterInput.value.trim().toLowerCase();
    const listItems = document.querySelectorAll("#employees tr");

    for (const elem of listItems) {
        const elemText = elem.firstElementChild.textContent.trim().toLowerCase();
        if (elemText.indexOf(filterText) === -1) {
            elem.setAttribute("style", "display: none!important;");
        } else {
            elem.setAttribute("style", "display: table-row!important");
        }
    }
}