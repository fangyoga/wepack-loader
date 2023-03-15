module.exports = function (source) { // 复杂转换可以将source转换成AST处理
  let newSource = source;
  newSource = newSource.replace(/titleOne/g, 'PageOne_Title');
  newSource = newSource.replace(/titleTwo/g, 'PageTwo_Title');
  return newSource;
};
