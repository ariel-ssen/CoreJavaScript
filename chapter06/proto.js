var Person = function (name) {
  this._name = name;
};
Person.prototype.getName = function () {
  return this._name;
};
var suzi = new Person('Suzi');
suzi.__proto__.getName();

Person.prototype === suzi.__proto__;
