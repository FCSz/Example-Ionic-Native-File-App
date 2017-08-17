webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(fileService, platform, zone) {
        this.fileService = fileService;
        this.platform = platform;
        this.zone = zone;
        this.messages = [];
        // A dictionary/map of root directories and paths by their names
        this.rootDirs = {};
        this.dirsInfo = [];
        this.dirsInfoSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.dirsInfo$ = this.dirsInfoSubject.asObservable();
        this.dirsMissing = [];
        this.dirsMissingSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.dirsMissing$ = this.dirsMissingSubject.asObservable();
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform
            .ready()
            .then(function (valuePlatformReady) {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.rootDirs = {
                "applicationDirectory": { "dir": (_this.fileService.applicationDirectory || ""), "path": "./" },
                "applicationDirectory/.": { "dir": (_this.fileService.applicationDirectory || ""), "path": "www/" },
                "applicationStorageDirectory": { "dir": (_this.fileService.applicationStorageDirectory || ""), "path": "./" },
                "dataDirectory": { "dir": (_this.fileService.dataDirectory || ""), "path": "./" },
                "cacheDirectory": { "dir": (_this.fileService.cacheDirectory || ""), "path": "./" },
                "documentsDirectory": { "dir": (_this.fileService.documentsDirectory || ""), "path": "./" },
                "externalApplicationStorageDirectory": { "dir": (_this.fileService.externalApplicationStorageDirectory || ""), "path": "./" },
                "externalDataDirectory": { "dir": (_this.fileService.externalDataDirectory || ""), "path": "./" },
                "externalCacheDirectory": { "dir": (_this.fileService.externalCacheDirectory || ""), "path": "./" },
                "externalRootDirectory": { "dir": (_this.fileService.externalRootDirectory || ""), "path": "./" },
                "sharedDirectory": { "dir": (_this.fileService.sharedDirectory || ""), "path": "./" },
                "syncedDataDirectory": { "dir": (_this.fileService.syncedDataDirectory || ""), "path": "./" },
                "tempDirectory": { "dir": (_this.fileService.tempDirectory || ""), "path": "./" },
            };
            _this.showRootDirectories();
        }).catch(function (reason) {
            _this.myTrace("HomePage.ngOnInit() Failed because '"
                + reason
                + "'.");
        });
    };
    HomePage.prototype.getContentsOfADirectory = function (rootDirName, rootDir, path) {
        var _this = this;
        this.myTrace("  > getContentsOfADirectory( "
            + rootDirName
            + ", >>"
            + rootDir.toString()
            + "<<, "
            + path
            + " )");
        this.fileService.listDir(rootDir, path)
            .then(function (listOfEntries) {
            var dirInfo = {
                rootDirName: (rootDirName),
                rootPath: path,
                files: [],
                directories: []
            };
            for (var _i = 0, listOfEntries_1 = listOfEntries; _i < listOfEntries_1.length; _i++) {
                var entry = listOfEntries_1[_i];
                if (entry.isFile) {
                    dirInfo.files.push(entry.name);
                }
                else if (entry.isDirectory) {
                    dirInfo.directories.push(entry.name);
                }
            }
            _this.dirsInfo.push(dirInfo);
            _this.dirsInfo = _this.dirsInfo.sort(function (a, b) {
                return a.rootDirName.localeCompare(b.rootDirName);
            });
            _this.zone.run(function () {
                _this.dirsInfoSubject.next(_this.dirsInfo);
            });
        }).catch(function (reason) {
            var strReason = reason.toString();
            if ("[object Object]" == strReason) {
                strReason = JSON.stringify(reason);
            }
            _this.dirsMissing.push(rootDirName
                + " ("
                + strReason
                + ")");
            _this.zone.run(function () {
                _this.dirsMissingSubject.next(_this.dirsMissing);
            });
            _this.myTrace("Failed to list entries of directory '"
                + rootDirName
                + "' because '"
                + strReason
                + "'.");
        }); //           catch(...
    };
    HomePage.prototype.showDir = function (dirInfo, subDirName) {
        this.clearData();
        this.getContentsOfADirectory(dirInfo.rootDirName, this.rootDirs[dirInfo.rootDirName].dir, dirInfo.rootPath + subDirName + "/");
    };
    HomePage.prototype.showRootDirectories = function () {
        this.clearData();
        for (var _i = 0, _a = Object.keys(this.rootDirs); _i < _a.length; _i++) {
            var rootDirName = _a[_i];
            this.getContentsOfADirectory(rootDirName, this.rootDirs[rootDirName].dir, this.rootDirs[rootDirName].path);
        }
    };
    HomePage.prototype.clearData = function () {
        var _this = this;
        this.dirsInfo = [];
        this.dirsMissing = [];
        this.zone.run(function () {
            _this.dirsInfoSubject.next(_this.dirsInfo);
            _this.dirsMissingSubject.next(_this.dirsMissing);
        });
    };
    HomePage.prototype.myTrace = function (message) {
        var _this = this;
        console.log(message);
        this.zone.run(function () {
            _this.messages.push(message);
        });
    };
    return HomePage;
}()); // class
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\martin\Documents\Visual Studio 2017\Projects\Example-Ionic-Native-File-App\src\pages\home\home.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons end>\n\n      <button \n\n          item-left \n\n          primary\n\n          (click)="showRootDirectories()"\n\n      >\n\n        <ion-icon name="home"></ion-icon>\n\n      </button>\n\n    </ion-buttons>    \n\n    <ion-title>\n\n      Example Ionic Native File App\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n  <!--\n  <div *ngIf="0 < messages.length" class="warnings" >\n    <h1 text-center>MESSAGES</h1>\n    <p *ngFor="let message of messages" text-left>{{ message.toString() }}</p>\n  </div>\n  -->\n  <div	*ngFor="let dirInfo of dirsInfo$ | async">\n\n  	<h2>{{ dirInfo.rootDirName + "/" + dirInfo.rootPath }}</h2>\n    <h6>({{ (rootDirs[dirInfo.rootDirName].dir).toString() + dirInfo.rootPath }})</h6>\n\n  	<h5 text-center>Files ({{ (dirInfo.files).length }})</h5>\n\n  	<div *ngIf="0 == (dirInfo.files).length" class="empty" text-center>< none ></div>\n\n  	<div *ngFor="let fileName of (dirInfo.files).sort()" class="blue">\n\n  	{{ fileName }}\n\n  	</div>\n\n  	<h4 text-center>Sub-Directories ({{ (dirInfo.directories).length }})</h4>\n\n  	<div \n         *ngIf="0 == (dirInfo.directories).length" \n         class="empty" \n         text-center\n    >< none ></div>\n\n  	<p \n\n         *ngFor="let dirName of (dirInfo.directories).sort()" \n\n         class="blue"\n\n         (click)="showDir(dirInfo, dirName)"\n\n    >{{ dirName }}</p>\n\n  	<div class="paddingAfter"></div>\n\n  </div>\n\n  <div *ngIf="0 < (dirsMissing$ | async).length">\n\n  	<h1 text-center>Missing Root Directories ({{ (dirsMissing$ | async).length }})</h1>\n\n  	<div	*ngFor="let dirName of (dirsMissing$ | async).sort()" class="orange">\n\n  	{{ dirName }}\n\n  	</div>\n\n  	<div class="paddingAfter"></div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\martin\Documents\Visual Studio 2017\Projects\Example-Ionic-Native-File-App\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(212);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\martin\Documents\Visual Studio 2017\Projects\Example-Ionic-Native-File-App\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\martin\Documents\Visual Studio 2017\Projects\Example-Ionic-Native-File-App\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[194]);
//# sourceMappingURL=main.js.map