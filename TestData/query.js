let query = function(){
    this.salary = `select first_name, last_name, salary from employees`;
}
module.exports = new query();