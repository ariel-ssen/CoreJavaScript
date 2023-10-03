//실행 컨텍스트와 콜 스택
// var a = 1;
// function outer() {
//   function inner() {
//     console.log(a);
//     var a = 3;
//   }
//   inner();
//   console.log(a);
// }
// outer();
// console.log(a);

//매개변수와 변수에 대한 호이스팅(1) - 원본 코드
// function a(x) {
//   console.log(x);
//   var x;
//   console.log(x);
//   var x = 2;
//   console.log(x);
// }
// a(1)

//매캐변수와 변수에 대한 호이스팅(2)-매개변수를 변수 선언/할당과 같다고 간주해서 변환한 상태
function a() {
  var x = 1;
  console.log('1', x);
  var x;
  console.log('2', x);
  var x = 2;
  console.log('3', x);
}
a();

//매개변수와 변수에 대한 호이스팅(3) - 호이스팅을 마친 상태
function a() {
  var x;
  var x;
  var x;

  x = 1;
  console.log(x);
  console.log(x);
  x = 2;
  console.log(x);
}
a(1);

//함수 선언의 호이스팅(1)-원본 코드
function a() {
  console.log(b);
  var b = 'bbb';
  console.log(b);
  function b() {}
  console.log(b);
}
a();

// 함수선언의 호이스팅(2) - 호이스팅을 마친 상태
function a() {
  var b;
  function b() {}

  console.log(b);
  b = 'bbb';
  console.log(b);
  console.log(b);
}
a();

// 함수선언의 호이스팅(3)- 함수 선언문을 함수 표현식으로 바꾼 코드
function a() {
  var b;
  var b = function b() {};

  console.log(b);
  b = 'bbb';
  console.log(b);
  console.log(b);
}
a();

// 함수를 정의하는 세가지 방식
function a() {}
a();

var b = function () {};
b();

var c = function d() {};
c();
// d(); // 에러

// // 함수 선언문과 함수 표현식(1)- 원본코드
// console.log(sum(1, 2));
// console.log(multiply(3, 4));

// function sum(a, b) {
//   return a + b;
// }

// var multiply = function (a, b) { //에러가 날거임
//   return a * b;
// };

// // 함수 선언문과 함수 표현식(2) - 호이스팅을 마친 상태
// var sum = function sum(a, b) {
//   return a + b;
// };
// var multiply;

// console.log(sum(1, 2));
// console.log(multiply(3, 4));

// multiply = function (a, b) { //에러가 날거임
//   return a * b;
// };

// 스코프 체인
var a = 1;
var outer = function () {
  var inner = function () {
    console.log('inner1', a);
    var a = 3;
  };
  inner();
  console.log('inner2', a);
};
outer();
console.log('outer1', a);

// 스코프 체인 확인(1) - 크롬 전용
var a = 1;
var outer = function () {
  var b = 2;
  var inner = function () {
    console.dir(inner);
  };
  inner();
};
outer();
