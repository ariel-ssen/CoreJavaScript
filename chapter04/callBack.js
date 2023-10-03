// 콜백 함수 예제
// var count = 0;
// var timer = setInterval(function () {
//   console.log(count);
//   if (++count > 4) clearInterval(timer);
// }, 300);
console.log('--------------------------');

// 콜백 함수 예제 2
// var count = 0;
// var cbFunc = function () {
//   console.log(count);
//   if (++count > 4) clearInterval(timer);
// };
// var timer = setInterval(cbFunc, 300);

console.log('--------------------------');
// 콜백 함수 예제 2-1
var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
});
console.log(newArr);

console.log('--------------------------');
// 콜백 함수 예제 2-2
var newArr2 = [10, 20, 30].map(function (index, currentValue) {
  console.log(index, currentValue);
  return currentValue + 5;
});
console.log(newArr2);
console.log('--------------------------');
// 콜백 함수 예제 2-3
Array.prototype.map = function (callback, thisArg) {
  var mappedArr = [];
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || global, this[i], i, this);
    mappedArr[i] = mappedValue;
  }
  return mappedArr;
};
console.log('--------------------------');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Create a virtual DOM
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

// Access the document object
const document = dom.window.document;
// 콜백 함수 내부에서의 this
setTimeout(function () {
  console.log(this);
}, 300);

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a').addEventListener('click', function (e) {
  console.log(this, e);
});

console.log('--------------------------');
// 메서드를 콜백 함수로 전달한 경우
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i);
  },
};
obj.logValues(1, 2);
[4, 5, 6].forEach(obj.logValues);
console.log('--------------------------');
// 콜백 함수 내부의 this 에 다른 갑승ㄹ 바인딩 하는 방법
var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this;
    return function () {
      console.log(self.name);
    };
  },
};
var callback = obj1.func();
setTimeout(callback, 1000);
var obj2 = {
  name: 'obj2',
  func: obj1.func,
};
var callback2 = obj2.func();
setTimeout(callback2, 1500);

var obj3 = { name: 'obj3' };
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 2000);
console.log('--------------------------');
// 콜백 함수 내부에서 this를 사용하지 않은 경우
// var obj1 = {
//   name: 'obj1',
//   func: function () {
//     console.log(obj1.name);
//   },
// };
// setTimeout(obj1.func, 1000);
console.log('--------------------------');
// 콜백 함수 내부의 this에 다른 값을 바인딩 하는 방법 bind 메서드 활용
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(this.name);
  },
};
setTimeout(obj1.func.bind(obj1), 1000);
var obj2 = { name: 'obj2' };
setTimeout(obj1.func.bind(obj2), 1500);
console.log('--------------------------');
// 콜백 지옥 예시
setTimeout(
  function (name) {
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(
      function (name) {
        coffeeList += ', ' + name;
        console.log(coffeeList);

        setTimeout(
          function (name) {
            coffeeList += ', ' + name;
            console.log(coffeeList);

            setTimeout(
              function (name) {
                coffeeList += ', ' + name;
                console.log(coffeeList);
              },
              500,
              '카페라떼'
            );
          },
          500,
          '카페모카'
        );
      },
      500,
      '아메리카노'
    );
  },
  500,
  '에스프레소'
);
console.log('--------------------------');
// 콜백 지옥 해결 - 기명 함수로 변환
var coffeeList = '';

var addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, '아메리카노');
};
var addAmericano = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, '카페모카');
};
var addMocha = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, '카페라떼');
};
var addLatte = function (name) {
  coffeeList = name;
  console.log(coffeeList);
};
setTimeout(addEspresso, 500, '에스프레소');
console.log('--------------------------');
// 비동기 작업의 동기적 표현
new Promise(function (resolve) {
  setTimeout(function () {
    var name = '에스프레소';
    console.log(name);
    resolve(name);
  }, 500);
})
  .then(function (prevName) {
    return new Promise(function (resolve) {
      // 오타 수정
      setTimeout(function () {
        var name = prevName + ', 아메리카노';
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 카페라떼';
        console.log(name);
        resolve(name);
      }, 500);
    });
  });

console.log('--------------------------');

// 비동기 작업의 동기적 표현
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var newName = prevName ? prevName + ', ' + name : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};
addCoffee('에스프레소')()
  .then(addCoffee('아메리카노'))
  .then(addCoffee('카페모카'))
  .then(addCoffee('카페라떼'));

console.log('--------------------------');
// 비동기 작업의 동기적 표현
// var addCoffee = function (prevName, name) {
//   setTimeout(function () {
//     coffeeMaker.next(prevName ? prevName + ', ' + name : name);
//   }, 500);
// };
// var coffeeGenerator = function* () {
//   var espresso = yield addCoffee('', '에스프레소');
//   console.log(espresso);
//   var americano = yield addCoffee(espresso, '아메리카노');
//   console.log(americano);
//   var mocha = yield addCoffee(americano, '카페모카');
//   console.log(mocha);
//   var latte = yield addCoffee(mocha, '카페라떼');
//   console.log(latte);
// };
// var coffeeMaker = coffeeGenerator();
// coffeeMaker.next();
console.log('--------------------------');
// 비동기 작업의 동기적 표현 - Promise +Async/await
var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 500);
  });
};
var coffeeMaker = async function () {
  var coffeeList = '';
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ',' : '') + (await addCoffee(name));
  };
  await _addCoffee('에스프레소');
  console.log(coffeeList);
  await _addCoffee('아메리카노');
  console.log(coffeeList);
  await _addCoffee('카페모카');
  console.log(coffeeList);
  await _addCoffee('카페라떼');
  console.log(coffeeList);
};
coffeeMaker();
