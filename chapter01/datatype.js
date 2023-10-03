// 변수 선언
var a;
// 변수 선업과 할당
var a; // 변수 a 선언
a = 'abc'; // 변수 a에 데이터 할당

var a = 'abc'; // 변수 선언과 할당을 한 문장으로 표현

// 불변성
var a = 'abc';
a = a + 'def';

var b = 5;
var c = 5;
b = 7;

// 참조형 데이터의 할당
var obj1 = {
  a: 1,
  b: 'bbb',
};

// 참조형 데이터의 프로퍼티 재할당
var obj1 = {
  a: 1,
  b: 'bbb',
};
obj1.a = 2;

// 중첩된 참조형 데이터의 프로퍼티 할당
var obj = {
  x: 3,
  arr: [3, 4, 5],
};

obj.arr = 'str';

// 변수복사
var a = 10;
var b = a;

var obj1 = { c: 10, d: 'ddd' };
var obj2 = obj1;

// 변수 복사 이후 값 변경 결과 비교(1) - 객체의 프로퍼티 변경 시
var a = 10;
var b = a;

var obj1 = { c: 10, d: 'ddd' };
var obj2 = obj1;

b = 15;
obj2.c = 20;

a !== b;
obj1 === obj2;

// 변수 복사 이후 값 변경 결과 비교(2) - 객체 자체를 변경 했을 때
var a = 10;
var b = a;
var obj1 = { c: 10, d: 'ddd' };
var obj2 = obj1;

b = 15;
obj2 = { c: 20, d: 'ddd' };

// 객체의 가변성에 따른 문제점
var user = {
  name: 'Jaenam',
  gender: 'male',
};

var changeName = function (user, newName) {
  var newUser = user;
  newUser.name = newName;
  return newUser;
};

var user2 = changeName(user, 'Jung');

if (user !== user2) {
  console.log('유저 정보가 변경되었습니다.');
}
console.log(user.name, user2.name);
console.log(user === user2);

// 객체의 가변성에 따른 문제점의 해결 방법
var user = {
  name: 'Jaenam',
  gender: 'male',
};

var changeName = function (user, newName) {
  return {
    name: newName,
    gender: user.gender,
  };
};

var user2 = changeName(user, 'Jung');

if (user !== user2) {
  console.log('유저 정보가 변경되었습니다.'); //유저 정보가 변경 되었습니다.
}

console.log(user.name, user2.name); // Jaenam Jung
console.log(user === user2); // false

// 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얕은 복사)
var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};

// copyObject를 이용한 객체 복사
var user = {
  name: 'Jaenam',
  gender: 'male',
};

var user2 = copyObject(user);
user2.name = 'Jung';

if (user !== user2) {
  console.log('유저 정보가 변경되었습니다.'); // 유저 정보가 변경되었습니다.
}
console.log(user.name, user2.name);
console.log(user === user2);

// 중첩된 객체에 대한 얕은 복사
var user = {
  name: 'Jaenam',
  urls: {
    portfolio: 'http://github.com/abc',
    blog: 'http://blog.com',
    facebook: 'http://facebook.com.abc',
  },
};
var user2 = copyObject(user);

user2.name = 'Jung';
console.log(user.name === user2.name); // false

user.urls.portfolio = 'http://portfolio.com';
console.log(user.urls.portfolio === user2.urls.portfolio); // true

user2.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog); //ture

// 위에 예시를 주석으로 만들어야 false가 나옴
// 중첩된 객체에 대한 깊은 복사
var user2 = copyObject(user);
user2.urls = copyObject(user.urls);

user.urls.portfolio = 'http://portfolio.com';
console.log(user.urls.portfolio === user2.urls.portfolio); //false

user2.urls.blog = '';
console.log('last', user.urls.blog === user2.urls.blog); //false

// 객체의 깊은 복사를 수행하는 범용 함수
var copyObjectDeep = function (target) {
  var result = {};
  if (typeof target === 'object' && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]);
    }
  } else {
    result = target;
  }
  return result;
};

// 깊은 복사 결과 확인
var obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
  },
};
var obj2 = copyObjectDeep(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj);
console.log(obj2);

// json을 활용한 간단한 깊은 복사
var copyObjectViaJSON = function (target) {
  return JSON.parse(JSON.stringify(target));
};
var obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
    func1: function () {
      console.log(3);
    },
  },
  func2: function () {
    console.log(4);
  },
};
var obj2 = copyObjectViaJSON(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj);
console.log(obj2);

// 자동으로 undefined를 부여하는 경우
var a;
console.log(a); //(1)undefined. 값을 대입하지 않은 변수에 접근

var obj = { a: 1 };
console.log(obj.a); //1
console.log(obj.b); //(2)존재하지 않는 프로퍼티에 접근
console.log(b);

var func = function () {};
var c = func(); //(3)반환(return) 값이 없으면 undefined 를 반환한 것으로 간주.
console.log(c); // undefined

// undefined 와 배열
var arr1 = [];
arr1.length = 3;
console.log(arr1);

var arr2 = new Array(3);
console.log(arr2);

var arr3 = [undefined, undefined, undefined];
console.log(arr3);

// 빈 요소와 배열의 순회
var arr1 = [undefined, 1];
var arr2 = [];
arr2[1] = 1;

arr1.forEach(function (v, i) {
  console.log(v, i);
});
arr2.forEach(function (v, i) {
  console.log(v, i);
});

arr1.map(function (v, i) {
  return v + i;
});
arr2.map(function (v, i) {
  return v + i;
});

arr1.filter(function (v) {
  return !v;
});
arr2.filter(function (v) {
  return !v;
});

arr1.reduce(function (p, c, i) {
  return p + c + i;
}, '');
arr2.reduce(function (p, c, i) {
  return p + c + i;
}, '');

// undefined 와 null 비교
var n = null;
console.log(typeof n);

console.log(n == undefined);

console.log(n == null);

console.log(n === undefined);

console.log(n === null);
