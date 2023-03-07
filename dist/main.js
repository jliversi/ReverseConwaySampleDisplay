/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DIRS = [\n  [0,-1],\n  [1,-1],\n  [1,0],\n  [1,1],\n  [0,1],\n  [-1,1],\n  [-1,0],\n  [-1,-1]\n]\n\nclass Game {\n  constructor(x,y,ele,inputArr) {\n    this.DIM_X = x;\n    this.DIM_Y = y;\n    this.ele = ele;\n    this.speed = 1000;\n\n    this.buildBoard(inputArr);\n    this.setupListeners();\n\n    this.changeSpeed = this.changeSpeed.bind(this)\n  }\n\n  buildBoard(inputArr) {\n    const table = this.ele;\n    this.eleArr = [];\n    for (let i = 0; i < this.DIM_Y; i++) {\n      const row = document.createElement('tr');\n      const eleRow = [];\n      row.id = i;\n      row.classList.add('row');\n      for (let j = 0; j < this.DIM_X; j++) {\n        const cell = document.createElement('td');\n        cell.id = `${j},${i}`;\n        cell.classList.add('cell');\n        row.appendChild(cell);\n        eleRow.push(cell);\n      }\n      table.appendChild(row);\n      this.eleArr.push(eleRow);\n    }\n    this.setupBoard(inputArr);\n    this.render();\n  }\n\n  setupBoard(gridPattern) {\n    this.board = gridPattern.map(row => {\n      return row.map(ele => ele ? true : false)\n    })\n  }\n\n  setupListeners() {\n    for (let i = 0; i < this.eleArr.length; i++) {\n      for (let j = 0; j < this.eleArr[0].length; j++) {\n        const ele = this.eleArr[i][j];\n        const handleClick = e => {\n          if (this.board[i] && this.board[i][j]) {\n            this.board[i][j] = false;\n            ele.classList.add('off');\n            ele.classList.remove('on');\n          } else {\n            this.board[i][j] = true;\n            ele.classList.add('on');\n            ele.classList.remove('off');\n          }\n        }\n        ele.addEventListener('mousedown', handleClick);\n\n        const handleMouseover = e => {\n          if (e.buttons == 1 || e.buttons == 3) {\n            if (this.board[i] && this.board[i][j]) {\n              this.board[i][j] = false;\n              ele.classList.add('off');\n              ele.classList.remove('on');\n            } else {\n              this.board[i][j] = true;\n              ele.classList.add('on');\n              ele.classList.remove('off');\n            }\n          }\n        }\n\n        ele.addEventListener('mouseover', handleMouseover);\n      }\n    }\n  }\n\n  neighborCoords(x,y) {\n    const nbrArr = DIRS.map(([dx, dy]) => [x + dx, y + dy]);\n    for (let i = 0; i < nbrArr.length; i++) {\n      const nbr = nbrArr[i];\n      if (nbr[0] == this.DIM_X) {\n        nbr[0] = 0;\n      } else if (nbr[0] < 0) {\n        nbr[0] = this.DIM_X - 1;\n      } \n      if (nbr[1] == this.DIM_Y) {\n        nbr[1] = 0;\n      } else if (nbr[1] < 0) {\n        nbr[1] = this.DIM_Y - 1;\n      }     \n    }\n    return nbrArr;\n  }\n\n  numOnNeighbors(x,y) {\n    const nbrs = this.neighborCoords(x,y);\n    let count = 0;\n    for (let i = 0; i < nbrs.length; i++) {\n      const [nbrX, nbrY] = nbrs[i];\n      if (this.board[nbrY] && this.board[nbrY][nbrX]) {\n        count += 1;\n      }\n    }\n    return count;\n  }\n\n  runRound() {\n    const toOn = [];\n    const toOff = [];\n    for (let i = 0; i < this.board.length; i++) {\n      for (let j = 0; j < this.board[0].length; j++) {\n        const nbrsOn = this.numOnNeighbors(j, i);\n        if (this.board[i][j]) {\n          if (nbrsOn < 2 || nbrsOn > 3) {\n            toOff.push([i,j])\n          }\n        } else {\n          if (nbrsOn === 3) {\n            toOn.push([i,j])\n          }\n        }\n      }\n    }\n\n    toOn.forEach(([y,x]) => {\n      this.board[y][x] = true;\n    })\n    toOff.forEach(([y,x]) => {\n      this.board[y][x] = false;\n    })\n\n  }\n\n  render() {\n    for (let i = 0; i < this.board.length; i++) {\n      for (let j = 0; j < this.board[0].length; j++) {\n        const ele = this.eleArr[i][j];\n        if (this.board[i][j]) {\n          ele.classList.add('on');\n          ele.classList.remove('off');\n        } else {\n          ele.classList.add('off');\n          ele.classList.remove('on');\n        }\n      }\n    }\n  }\n\n  run() {\n    if (this.running) {\n      return;\n    }\n    this.running = true;\n    this.intId = setInterval(() => {\n      this.runRound();\n      this.render();\n    }, this.speed);\n  }\n\n  \n\n\n\n  changeSpeed(newSpeed) {\n    this.speed = newSpeed;\n    if (this.running) {\n      this.stop();\n      this.run();\n    }\n  }\n\n  stop() {\n    clearInterval(this.intId);\n    this.running = false;\n  }\n\n  clearBoard() {\n    this.board = Array.from({ length: this.DIM_Y }, () => Array.from({ length: this.DIM_X }, () => false));\n    this.renderScrollX();\n  }\n\n  switchPatterns(pattern) {\n    this.stop();\n    this.board = Array.from({ length: this.DIM_Y }, () => Array.from({ length: this.DIM_X }, () => false));\n    this.renderScrollY()\n    setTimeout(() => {\n      this.board = pattern;\n      this.renderScrollY();\n      setTimeout(() => {\n        this.run();\n      }, 400)\n    }, 400)\n  }\n\n\n  // Fancy renders\n  fancyRun() {\n    if (this.running) {\n      return;\n    }\n    this.running = true;\n    this.intId = setInterval(() => {\n      this.runRound();\n      this.renderScrollX(20);\n      this.renderScrollY(60);\n    }, this.speed);\n  }\n  toggleAnimation() {\n    this.stop();\n    this.run = this.fancyRun === this.run ? this.basicRun : this.fancyRun;\n    this.run();\n  }\n  renderScrollY(t=20,i=0) {\n    setTimeout(() => {\n      for (let j = 0; j < this.board[0].length; j++) {\n        const ele = this.eleArr[i][j];\n        if (this.board[i][j]) {\n          ele.classList.add('on');\n          ele.classList.remove('off');\n        } else {\n          ele.classList.add('off');\n          ele.classList.remove('on');\n        }\n      }\n      if ((i + 1) < this.board.length) {\n        this.renderScrollY(t,i+1);\n      }\n    }, t)\n  }\n  renderScrollX(t=10,j=0) {\n    setTimeout(() => {\n      for (let i = 0; i < this.board.length; i++) {\n        const ele = this.eleArr[i][j];\n        if (this.board[i][j]) {\n          ele.classList.add('on');\n          ele.classList.remove('off');\n        } else {\n          ele.classList.add('off');\n          ele.classList.remove('on');\n        }\n      }\n      if ((j + 1) < this.board[0].length) {\n        this.renderScrollX(t,j+1);\n      }\n    }, t)\n  }\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputs_patterns.js */ \"./src/inputs_patterns.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\n\n\nconst startingPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.face);\n\nconst { x, y } = {\n  x: startingPattern[0].length,\n  y: startingPattern.length\n}\n\nconst game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x,y,document.getElementById('board'),startingPattern);\n\nconst start = document.getElementById('start');\nconst stop = document.getElementById('stop');\nstart.addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  game.run();\n})\n\nstop.addEventListener('click', e => {\n  stop.disabled = true;\n  start.disabled = false;\n  game.stop();\n})\n\ndocument.getElementById('one-step').addEventListener('click', e => {\n  if (game.running) {\n    game.stop();\n    game.runRound();\n    game.renderScrollX();\n    game.run();\n  } else {\n    game.runRound();\n    game.renderScrollX();\n  }\n})\n\ndocument.getElementById('clear').addEventListener('click', e => {\n  game.stop();\n  game.clearBoard();\n})\n\nconst slow = document.getElementById('slow');\nconst fast = document.getElementById('fast');\n\nslow.addEventListener('click', e => {\n  slow.disabled = true;\n  fast.disabled = false;\n  game.changeSpeed(1000);\n})\nfast.addEventListener('click', e => {\n  fast.disabled = true;\n  slow.disabled = false;\n  game.changeSpeed(600);\n})\n\ndocument.getElementById('js').addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  const jsPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.js);\n  game.switchPatterns(jsPattern);\n})\ndocument.getElementById('python').addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  const pythonPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.python);\n  game.switchPatterns(pythonPattern);\n})\ndocument.getElementById('react').addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  const reactPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.react);\n  game.switchPatterns(reactPattern);\n})\ndocument.getElementById('ruby').addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  const rubyPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.ruby);\n  game.switchPatterns(rubyPattern);\n})\ndocument.getElementById('sql').addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  const sqlPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.sql);\n  game.switchPatterns(sqlPattern);\n})\ndocument.getElementById('rails').addEventListener('click', e => {\n  start.disabled = true;\n  stop.disabled = false;\n  const railsPattern = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.transpose)(_inputs_patterns_js__WEBPACK_IMPORTED_MODULE_1__.rails);\n  game.switchPatterns(railsPattern);\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/inputs_patterns.js":
/*!********************************!*\
  !*** ./src/inputs_patterns.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"conway\": () => (/* binding */ conway),\n/* harmony export */   \"face\": () => (/* binding */ face),\n/* harmony export */   \"python\": () => (/* binding */ python)\n/* harmony export */ });\nconst python = [[0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1], [0, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0], [1, 0, 0, 1, 1, 0, 0, 0, 1], [1, 1, 0, 0, 1, 1, 1, 0, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1, 0, 0, 1], [0, 1, 1, 0, 1, 1, 1, 0, 0], [0, 1, 1, 0, 0, 1, 1, 0, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1], [1, 1, 0, 1, 0, 1, 0, 0, 0]]\n\nconst conway = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 1, 1, 0, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 0, 1, 1, 0, 0, 1, 1, 1], [0, 0, 1, 1, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 1, 0, 1, 1, 0, 0, 1, 1], [0, 0, 1, 0, 0, 0, 1, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 1, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0]];\n\nconst face = [[0, 0, 1, 0, 0], [1, 0, 0, 1, 1], [0, 0, 0, 1, 1], [1, 1, 0, 0, 1], [1, 0, 0, 0, 0]];\n\n//# sourceURL=webpack:///./src/inputs_patterns.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"transpose\": () => (/* binding */ transpose)\n/* harmony export */ });\nconst transpose = (arr) => {\n    const result = [];\n    for (let y = arr[0].length - 1; y >= 0; y--) {\n        const row = [];\n        result.push(row);\n        for (let x = 0; x < arr.length; x++) {\n            row.push(arr[x][y])\n        }\n    }\n    return result;\n}\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;