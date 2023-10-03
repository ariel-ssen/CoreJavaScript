//외부 함수의 변수를 참조하는 내부 함수
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
};
outer();
// 외부 함수의 변수를 참조하는 내부 함수
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner();
};
var outer2 = outer();
console.log(outer2);
// 외부 함수의 변수를 참조하는 내부 함수
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2());
console.log(outer2());

// // return 없이도 클로저가 발생하는 다양한 경우
// (function () {
//   var a = 0;
//   var intervalId = null;
//   var inner = function () {
//     if (++a >= 10) {
//       clearInterval(intervalId);
//     }
//     console.log(a);
//   };
//   intervalId = setInterval(inner, 1000);
// })();
// // 2
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;

// // Create a virtual DOM
// const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

// // Access the document object
// const document = dom.window.document;
// (function () {
//   var count = 0;
//   var button = document.createElement('button');
//   button.innerText = 'click';
//   button.addEventListener('click', function () {
//     console.log(++count, 'times clicked');
//   });
//   document.body.appendChild(button);
// })();

// // 클로저의 메모리 관리
// var outer = (function () {
//   var a = 1;
//   var inner = function () {
//     return ++a;
//   };
//   return inner;
// })();
// console.log(outer());
// console.log(outer());
// outer = null;
// //2
// (function () {
//   var a = 0;
//   var intervalId = null;
//   var inner = function () {
//     if (++a >= 10) {
//       clearInterval(intervalId);
//       inner = null;
//     }
//     console.log(a);
//   };
//   intervalId = setInterval(inner, 1000);
// })();

// // 2
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;

// // Create a virtual DOM
// const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

// // Access the document object
// const document = dom.window.document;

// (function () {
//   var count = 0;
//   var button = document.createElement('button');
//   button.innerText = 'click';

//   var clickHandler = function () {
//     console.log(++count, 'times clicked');
//     if (count >= 10) {
//       button.removeEventListener('click', clickHandler);
//       clickHandler = null;
//     }
//   };
//   button.addEventListener('click', clickHandler);
//   document.body.appendChild(button);
// })();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Create a virtual DOM
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

// Access the document object
const document = dom.window.document;
// //콜백 함수와 클로저
// var fruits = ['apple', 'banana', 'peach'];
// var $ul = document.createElement('ul');

// fruits.forEach(function (fruits) {
//   var $li = document.createElement('li');
//   $li.innerText = fruits;
//   $li.addEventListener('click', function () {
//     alert('your choice is ' + fruits);
//   });
//   $ul.appendChild($li);
// });
// document.body.appendChild($ul);

// var car = {
//   fuel: Math.ceil(Math.random() * 10 + 10),
//   power: Math.ceil(Math.random() * 3 + 2),
//   moved: 0,
//   run: function () {
//     var km = Math.ceil(Math.random() * 6);
//     var wasteFuel = km / this.power;
//     if (this.fuel < wasteFuel) {
//       console.log('이동불가');
//       return;
//     }
//     this.fuel -= wasteFuel;
//     this.moved += km;
//     console.log(km + 'km 이동(총' + this.moved + 'km)');
//   },
// };

// car.fuel = 10000;

// var createCar = function () {
//   var fuel = Math.ceil(Math.random() * 10 + 10);
//   var power = Math.ceil(Math.random() * 3 + 2);
//   var moved = 0;
//   return {
//     get moved() {
//       return moved;
//     },
//     run: function () {
//       var km = Math.ceil(Math.random() * 6);
//       var wasteFuel = km / power;
//       if (fuel < wasteFuel) {
//         console.log('이동불가');
//         return;
//       }
//       fuel -= wasteFuel;
//       moved += km;
//       console.log(km + 'km 이동(총' + moved + 'km). 남은연료 : ' + fuel);
//     },
//   };
// };
// var car = createCar();

// car.run();
// console.log(car.moved);
// console.log(car.fuel);
// console.log(car.power);

// car.fuel = 1000;
// console.log(car.fuel);
// car.run();

// bind 메서드를 활용한 부분 적용 함수
var add = function () {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};
var addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

//부분 적용 함수 구현
var partial = function () {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== 'function') {
    throw new Error('첫번째 인자가 함수가 아닙니다.');
  }
  return function () {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = function () {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};
var addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

var dog = {
  name: '강아지',
  greet: partial(function (prefix, suffix) {
    return prefix + this.name + suffix;
  }, '왈왈, '),
};
dog.greet('입니다!');
