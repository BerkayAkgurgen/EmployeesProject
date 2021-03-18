export class UI {
    constructor() {
        this.employeesList = document.getElementById("employees")
        this.updateButton = document.getElementById("update")
        this.nameInput = document.getElementById("name")
        this.departmentInput = document.getElementById("department")
        this.salaryInput = document.getElementById("salary")
        this.tableBody = document.getElementById("employees")
    }

    addAllEmployeesToUI(employees) {
        let tableInner = employees.map(employee => {
            return `
        <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `
        })
        tableInner = tableInner.join(" ")
        this.tableBody.innerHTML = tableInner
    }

    clearInputs() {
        this.nameInput.value = ""
        this.departmentInput.value = ""
        this.salaryInput.value = ""
    }

    addEmployeesToUI(employee) {
        this.employeesList.innerHTML += `
        <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#_" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#_" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `
    }

    deleteEmployeeFromUI(parentElement) {
    parentElement.remove()
    }

    toggleUpdateButton(targetEmployee) {
        if(this.updateButton.style.display === "none") {
            this.updateButton.style.display = "block"
            this.addEmployeeInfoToInputs(targetEmployee)
        } else {
            this.updateButton.style.display = "none"
            this.clearInputs()
        }
    }

    addEmployeeInfoToInputs(target) {
    const children = target.children
    this.nameInput.value = children[0].textContent
    this.departmentInput.value = children[1].textContent
    this.salaryInput.value = children[2].textContent
    }

    updateEmployeeOnUI(employee,parent) {
    parent.innerHTML = `
    <tr>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#_" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#_" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>
    `
    this.clearInputs()
    this.updateButton.style.display = "none"
    }

}