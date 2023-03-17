module.exports = function (source) { // 复杂转换可以将source转换成AST处理
  let newSource = source;
  newSource = newSource.replace(/titleOne/g, 'titleOneAfterTranstion');
  newSource = newSource.replace(/titleTwo/g, 'titleTwoAfterTranstion');
  return newSource;
};
