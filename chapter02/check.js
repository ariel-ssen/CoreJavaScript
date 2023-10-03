var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};

// 중첩된 객체에 대한 얕은 복사
var user = {
  name: 'Jaenam',
  urls: {
    portfolio: 'http://github.com/abc',
    blog: 'http://blog.com',
    facebook: 'http://facebook.com.abc',
  },
};
// var user2 = copyObject(user);

// user2.name = 'Jung';
// console.log(user.name === user2.name); // false

// user.urls.portfolio = 'http://portfolio.com';
// console.log(user.urls.portfolio === user2.urls.portfolio); // true

// user2.urls.blog = '';
// console.log(user.urls.blog === user2.urls.blog); //ture

// 중첩된 객체에 대한 깊은 복사
var user2 = copyObject(user);
user2.urls = copyObject(user.urls);

user.urls.portfolio = 'http://portfolio.com';
console.log(user.urls.portfolio === user2.urls.portfolio); //false

user2.urls.blog = '';
console.log('last', user.urls.blog === user2.urls.blog); //false

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
