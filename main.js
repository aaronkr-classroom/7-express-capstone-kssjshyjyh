// main.js
// Capstone 2: Express
"use strict";

// 앱 설정
const port = 3000,
    express = require('express'),
    layout = require('express-ejs-layouts'),
    httpStatus = require('http-status-codes'),
    homeController = require('./controllers/homeController'),
    errorController = require('./controllers/errorController'),
    app = express();
/**
 * Listing 12.7 (p. 179)
 * ejs 레이아웃 렌더링
 */
app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

/**
 * Listing 12.4 (p. 177)
 * body-parser의 추가
 */
app.use(layout);  // layout.ejs를 쓸수있다.
app.use(express.static("public")); //정적 파일 디렉토리


/**
 * Listing 12.6 (p. 178)
 * 각 페이지 및 요청 타입을 위한 라우트 추가
 */
app.get("/", homeController.showIndex);
app.get("/contact", homeController.showContact);
app.get("/courses", homeController.showCourses);
app.get("/error", homeController.showError);
app.post("/contact", homeController.showThanks);



/**
 * Listing 12.12 (p. 184)
 * 에러 처리 라우트 
 */

app.use(errorController.logErrors);
app.use(errorController.pageNotFoundError);
app.use(errorController.InternalServerError);

// 3000번 포트로 리스닝 설정

app.listen(app.get("port"), () => {
    console.log(`Server at http://localhost:${app.get("port")}`);
})