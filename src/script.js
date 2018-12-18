/*global $, jQuery, alert*/
'use strict';
require(jQuery);
require('mathjs');
$(function() {
  var strSum = '',
    symbol = '',
    estArr = [],
    regex = /e/g,
    result;

  $('.button-symbols').prop('disabled', true);
  $('.button-plusMinus').prop('disabled', true);

  function screenDigits(str) {
    var strToNum = Number(str);
    strSum = strToNum.toExponential(4).toString();
  }

  function estimations(input1, input2, symbol) {
    switch (symbol) {
      case '*':
        result = Math.multiply(input1, input2);
        //            console.log(result);
        break;
      case '-':
        result = Math.subtract(input1, input2);
        //            console.log(result);
        break;
      case '+':
        result = Math.add(input1, input2);
        //            console.log(result);
        break;
      case '/':
        result = Math.divide(input1, input2);
        //            console.log(result);
        break;
      case '𝓍^𝓎':
        result = Math.pow(input1, input2); //            console.log(result);
        break;
    }
  }
  function manageFloatsAndlength(result) {
    var getNum;
    if (!Number.isInteger(result)) {
      //            console.log(result);
      //            console.log(strSum);
      if (strSum.length > 10) {
        getNum = Number(strSum);
        strSum = getNum.toExponential(4).toString();
        return $('.screen').append(strSum);
      } else {
        return $('.screen').append(result);
      }
    } else {
      if (strSum.length > 10) {
        //                console.log(strSum);
        getNum = Number(strSum);
        strSum = getNum.toExponential(4).toString();
        return $('.screen').append(strSum);
      } else {
        return $('.screen').append(result);
      }
    }
  }
  function clearExp(strSum) {
    var chechChar = strSum.charAt(strSum.length - 1);
    if (chechChar !== '+' && chechChar !== '-') {
      return strSum;
    } else {
      $('.button-symbols').prop('disabled', true);
      $('.button-clearOne').prop('disabled', true);
      $('.button-sqrt').prop('disabled', true);
      $('.button-reciprocal').prop('disabled', true);
    }
  }
  function directEst(operation) {
    if (estArr.length === 3) {
      //            console.log(strSum);
      result = operation;
      strSum = result.toString();
      manageFloatsAndlength(result);
      estArr[2] = strSum;
      $('.screen').text('');
      $('.screen').append(strSum);
    } else {
      result = operation;
      strSum = result.toString();
      manageFloatsAndlength(result);
      $('.screen').text('');
      $('.screen').append(strSum);
    }
  }
  $('.button').on('click', function() {
    var value = $(this).val();
    $('.button-symbols').prop('disabled', false);
    $('.button-plusMinus').prop('disabled', false);
    $('.button-sqrt').prop('disabled', false);
    $('.button-clearOne').prop('disabled', false);
    $('.button-reciprocal').prop('disabled', false);
    if (estArr.length >= 2) {
      strSum += value;
      if (strSum.length > 10) {
        screenDigits(strSum);
      }
      if (strSum === 'Infinity') {
        $('.button').prop('disabled', true);
        $('.button-clearOne').prop('disabled', true);
      }
      estArr[2] = strSum;
      $('.screen').text('');
      $('.screen').append(strSum); //            console.log(estArr);
      $('.button-symbols').prop('disabled', true);
      $('.button-reciprocal').prop('disabled', false);
    } else {
      strSum += value;
      if (strSum.length > 10) {
        screenDigits(strSum);
      }
      if (strSum === 'Infinity') {
        $('.button').prop('disabled', true);
        $('.button-clearOne').prop('disabled', true);
      }
      //            console.log(strSum.length);
      $('.screen').text('');
      $('.screen').append(strSum);
    }
  });
  $('.button-symbols').on('click', function() {
    var value = $(this).val(); //        console.log(value);
    symbol = value;
    estArr.push(strSum, symbol);
    strSum = '';
    if (symbol !== '𝓍^𝓎') {
      $('.screen').append(symbol);
    } else {
      symbol = '^';
      $('.screen').append('^');
    }
    //        console.log(estArr);
    $('.button-symbols').prop('disabled', true);
    $('.button').prop('disabled', false);
    $('.button-sqrt').prop('disabled', true);
    $('.button-reciprocal').prop('disabled', true);
  });
  $('#equal-btn').on('click', function() {
    if (estArr.length === 3) {
      $('.screen').text('');
      estimations(estArr[0], estArr[2], estArr[1]);
      strSum = result.toString();
      estArr = [];
      $('.button').prop('disabled', true);
      $('.button-symbols').prop('disabled', false);
      $('.button-sqrt').prop('disabled', false);
      manageFloatsAndlength(result);
      if (strSum === 'Infinity') {
        $('.button-clearOne').prop('disabled', true);
      }
    }
  });
  $('.button-clearOne').on('click', function() {
    //        console.log(strSum);
    $('.button').prop('disabled', false);
    strSum = strSum.substring(0, strSum.length - 1);
    $('.screen').text(strSum);
    if (estArr.length === 3) {
      estArr[2] = strSum;
      clearExp(strSum);
      $('.screen').text(estArr[2]);
    } else if (estArr.length === 2) {
      strSum = estArr[0];
      clearExp(strSum);
      $('.screen').text(strSum);
      estArr = [];
      $('.button-symbols').prop('disabled', false);
    } else {
      clearExp(strSum);
      $('.screen').text(strSum);
    }
  });
  $('.button-clearEntry').on('click', function() {
    if (estArr.length === 3) {
      estArr[2] = '';
      strSum = '';
      $('.screen').text(estArr[0] + estArr[1]);
    } else {
      strSum = '';
      estArr = [];
      $('.screen').text('');
      $('.button').prop('disabled', false);
    }
  });
  $('.button-clearAll').on('click', function() {
    strSum = '';
    estArr = [];
    $('.button').prop('disabled', false);
    $('.button-symbols').prop('disabled', true);
    $('.button-clearOne').prop('disabled', false);
    $('.button-plusMinus').prop('disabled', true);
    $('.button-sqrt').prop('disabled', true);
    $('.button-reciprocal').prop('disabled', true);
    $('.screen').text('');
  });
  $('.button-plusMinus').on('click', function() {
    if (estArr.length === 3) {
      if (strSum.search(regex) !== -1) {
        strSum = Math.unaryMinus(strSum);
        strSum = strSum.toExponential(4).toString();
        estArr[2] = strSum;
      } else {
        strSum = Math.unaryMinus(strSum);
        strSum = strSum.toString();
        estArr[2] = strSum;
      }
      $('.screen').text('');
      $('.screen').append(strSum);
    } else if (estArr.length === 2) {
      strSum = estArr[0];
      if (strSum.search(regex) !== -1) {
        strSum = Math.unaryMinus(strSum);
        strSum = strSum.toExponential(4).toString();
        estArr[0] = strSum;
      } else {
        strSum = Math.unaryMinus(strSum);
        strSum = strSum.toString();
        estArr[0] = strSum;
      }
      strSum = '';
      $('.screen').text('');
      $('.screen').append(estArr[0] + symbol);
    } else {
      if (strSum.search(regex) !== -1) {
        strSum = Math.unaryMinus(strSum);
        strSum = strSum.toExponential(4).toString();
      } else {
        //                console.log(strSum);
        strSum = Math.unaryMinus(strSum);
        strSum = strSum.toString();
      }
      $('.screen').text('');
      $('.screen').append(strSum);
    }
  });
  $('.button-sqrt').on('click', function() {
    var getNum = Number($('.screen').text());
    if (getNum >= 0) {
      directEst(Math.sqrt(getNum));
    } else {
      strSum = '';
      estArr = [];
      $('.screen').text('');
      $('.button-symbols').prop('disabled', true);
      $('.button-sqrt').prop('disabled', true);
      $('.button-reciprocal').prop('disabled', true);
      $('.button-plusMinus').prop('disabled', true);
      return $('.screen').append('Error!');
    }
  });
  $('.button-reciprocal').on('click', function() {
    var getNum = Number($('.screen').text());
    directEst(Math.inv(getNum));
  });
  $('#point').on('click', function() {
    $('#point').prop('disabled', true);
  });
});
