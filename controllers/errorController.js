// errorController.js
"use strict";

const httpStatus = require('http-status-codes');

/**
 * Listing 11.2 (p. 168)
 */

exports.logErrors = (err ,req, res ,next) => {
    console.error(err.stack);
    next(err);
}; // @TODO: 에러 처리를 위한 미들웨어 추가

/** 
 * Listing 12.11 (p. 184)
 * 에러 처리 라우트 추가
 */

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    // res.send(`${errorCode} | The resource does not exist`); 텍스트만 표시
    res.render('error');
}; // @TODO: 404 상태 코드로 모든 에러 처리. 404.html 파일의 콘텐츠 전송

exports.InternalServerError = (err, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.error(`ERROR occured: ${err.stack}`);
    res.status(errorCode);
    // res.send(`${errorCode} | The resource does not exist`); 텍스트만 표시
    res.send(`${errorCode} | sorry, our application is taking a nap`);
}; // @TODO: 500 상태 코드로 모든 에러 처리


/**
 * [노트] 라우트 순서는 중요하다. 이 라우트는 기존에 존재하는 라우트 아래에 와야 한다.
 * 기존 라우트는 범용으로 사용되는 것이며 하위 라우트에 오버라이딩되기 때문이다.
 */