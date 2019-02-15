function returnMyname() {
    return name;
}
function sayHello() {
    console.log("hello");
}
sayHello();
function multiply(value1, value2) {
    return value1 * value2;
}
console.log(multiply(2, 4));
//function type
var mymultiply;
mymultiply = multiply;
console.log(mymultiply(50, 2));
