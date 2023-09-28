// Create an employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

// Create employee records from an array of arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Create a time-in event and add it to the employee record
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    };
    this.timeInEvents.push(timeInEvent);
    return this;
}

// Create a time-out event and add it to the employee record
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wagesEarned = hoursWorked * this.payPerHour;
    return wagesEarned;
}

// Calculate all wages for an employee
function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(event => event.date);
    const totalWages = eligibleDates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
    return totalWages;
}

// Find an employee by first name in an array of employee records
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculate payroll for all employees in an array of employee records
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
}
