// // 전역공간에서 this(Node.js 환경)

// console.log(this); // 전역 컨텍스트에서의 this 출력
// console.log(global); // Node.js 전역 객체인 global 출력
// console.log(this === global); // this와 global이 동일한 객체인지 확인

// // 전역변수와 전역객체(1)
// var a = 1;
// console.log(a);
// console.log(global.a);
// console.log(this.a);

// var a = 1;
// global.b = 2;
// console.log(a, global.a, this.a);

// // 함수로서 호출, 메서드로서 호출
// var func = function (x) {
//   console.log(this, x);
// };
// func(1);

// var obj = {
//   method: func,
// };
// obj.method(2);

// // 메서드로서 호출- 점 표기법, 대괄호 표기법
// var obj = {
//   method: function (x) {
//     console.log(this, x);
//   },
// };
// obj.method(1);
// obj['method'](2);

// console.log('--------------------------');
// // 메서드 내부에서의 this
// var obj = {
//   methodA: function () {
//     console.log(this);
//   },
//   inner: {
//     methodB: function () {
//       console.log(this);
//     },
//   },
// };
// obj.methodA();
// obj['methodA']();

// obj.inner.methodB();
// obj.inner['methodB']();
// obj['inner'].methodB();
// obj['inner']['methodB']();
// console.log('--------------------------');

// // 내부함수에서의 this
// var obj1 = {
//   outer: function () {
//     console.log(this);
//     var innerFunc = function () {
//       console.log(this);
//     };
//     innerFunc();

//     var obj2 = {
//       innerMethod: innerFunc,
//     };
//     obj2.innerMethod();
//   },
// };
// obj1.outer();

// console.log('--------------------------');
// // 내부함수에서의 this를 우회하는 방법
// var obj = {
//   outer: function () {
//     console.log(this);
//     var innerFunc1 = function () {
//       console.log(this);
//     };
//     innerFunc1();

//     var self = this;
//     var innerFunc2 = function () {
//       console.log(self);
//     };
//     innerFunc2();
//   },
// };
// obj.outer();

// console.log('--------------------------');
// // this를 바인딩 하지 않는 함수(화살표 함수)
// var obj = {
//   outer: function () {
//     console.log(this);
//     var innerFunc = () => {
//       console.log(this);
//     };
//     innerFunc();
//   },
// };
// obj.outer();

// console.log('--------------------------');
// // jsdom설치
// // 콜백 함수 내부에서의 this
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Create a virtual DOM
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

// Access the document object
const document = dom.window.document;

// setTimeout(function () {
//   console.log(this);
// }, 300);

// [1, 2, 3, 4, 5].forEach(function (x) {
//   console.log(this, x);
// });

// document.body.innerHTML += '<button id="a">클릭</button>';
// document.body.querySelector('#a').addEventListener('click', function (e) {
//   console.log(this, e);
// });

// console.log('--------------------------');

// // 생성자 함수
// var Cat = function (name, age) {
//   this.bark = '야옹';
//   this.name = name;
//   this.age = age;
// };
// var choco = new Cat('초코', 7);
// var nabi = new Cat('나비', 5);
// console.log(choco, nabi);

// console.log('--------------------------');
// // call 메서드
// // Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])

// // call 메서드1
// var func = function (a, b, c) {
//   console.log(this, a, b, c);
// };

// func(1, 2, 3);
// func.call({ x: 1 }, 4, 5, 6);

// console.log('--------------------------');
// // call 메서드2
// var obj = {
//   a: 1,
//   method: function (x, y) {
//     console.log(this.a, x, y);
//   },
// };

// obj.method(2, 3);
// obj.method.call({ a: 4 }, 5, 6);

// console.log('--------------------------');
// // apply 메서드
// // Function.prototype.apply(thisArg[, argsArray])

// // apply 메서드1
// var func = function (a, b, c) {
//   console.log(this, a, b, c);
// };
// func.apply({ x: 1 }, [4, 5, 6]);

// var obj = {
//   a: 1,
//   method: function (x, y) {
//     console.log(this.a, x, y);
//   },
// };
// obj.method.apply({ a: 4 }, [5, 6]);

// console.log('--------------------------');
// // call/apply 메서드의 활용 -> 유사배열객체에 배열 메서드를 적용
// var obj = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   length: 3,
// };
// Array.prototype.push.call(obj, 'd');
// console.log(obj);

// var arr = Array.prototype.slice.call(obj);
// console.log(arr);

// console.log('--------------------------');
// // call/apply 메서드의 활용 -> argments.NodeList에 배열 메서드를 적용
// // function a() {
// //   var agrv = Array.prototype.slice.call(arguments);
// //   agrv.forEach(function (arg) {
// //     console.log(arg);
// //   });
// // }
// // a(1, 2, 3);

// // document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
// // var nodeList = document.querySelectorAll('div');
// // var nodeArr = Array.prototype.slice.call(nodeList);
// // nodeArr.forEach(function (node) {
// //   console.log(node);
// // });

// function a() {
//   var agrv = Array.prototype.slice.call(arguments);
//   agrv.forEach(function (arg) {
//     console.log(arg);
//   });
// }
// a(1, 2, 3);

// document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
// var nodeList = document.querySelectorAll('div');
// var nodeArr = Array.prototype.slice.call(nodeList);
// nodeArr.forEach(function (node) {
//   console.log(node);
// });

// // call/apply 메서드의 활용 -> argments.NodeList에 배열 메서드를 적용
var str = 'abc def';

// Array.prototype.push.call(str, ',pushed string');

Array.prototype.concat.call(str, 'string');

Array.prototype.every.call(str, function (char) {
  return char !== '';
});

Array.prototype.some.call(str, function (char) {
  return char !== '';
});

var newArr = Array.prototype.map.call(str, function (char) {
  return char + '!';
});

console.log(newArr);

var newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) {
    return string + char + i;
  },
  '',
]);
console.log(newStr);

// call/apply 메서드의 활용
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};
var arr = Array.from(obj);
console.log(arr);

// call/apply 메서드의 활용
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}
function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.company = company;
}
var by = new Student('보영', 'female', '단국대');
var jn = new Employee('재난', 'male', '구골');

// call/apply 메서드의 활용
var numbers = [10, 20, 3, 16, 45];
var max = (min = numbers[0]);
numbers.forEach(function (number) {
  if (number > max) {
    max = number;
  }
  if (number < min) {
    min = number;
  }
});
console.log(max, min);

// call/apply 메서드의 활용
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);
console.log(max, min);

// call/apply 메서드의 활용
var numbers = [10, 20, 3, 16, 45];
var max = Math.max(...numbers);
var min = Math.min(...numbers);
console.log(max, min);

//bind 메서드
// Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])

var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4);

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8);

var bindFunc2 = func.bind({ x: 1 }, 4, 5);
bindFunc2(6, 7);
bindFunc2(8, 9);

//bind 메서드 - name 프로퍼티
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
var bindFunc = func.bind({ x: 1 }, 4, 5);
console.log(func.name);
console.log(bindFunc.name);

// 내부함수에 this 전달 - call vs.bind
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc.call(this);
  },
};
obj.outer();
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc();
  },
};
obj.outer();

console.log('--------------------------');
//bind 메서드 - 내부함수에 this 전달
var obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000);
  },
};
obj.logThisLater1();
obj.logThisLater2();
console.log('--------------------------');
//화살표 함수 내부에서의 this
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc();
  },
};
obj.outer();
console.log('--------------------------');
//thisArg 를 받는 경우 예시 - forEach메서드
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  },
  average: function () {
    return this.sum / this.count;
  },
};
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average());

console.log('--------------------------');
//콜백 함수와 함께 thisArg 인자로 받는 메서드
// Array.prototype.forEach(callback[, thisArg])
