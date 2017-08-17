var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File } from '@ionic-native/file';
var HomePage = (function () {
    function HomePage(fileService, platform, zone) {
        this.fileService = fileService;
        this.platform = platform;
        this.zone = zone;
        this.messages = [];
        // A dictionary/map of root directories and paths by their names
        this.rootDirs = {};
        this.dirsInfo = [];
        this.dirsInfoSubject = new BehaviorSubject([]);
        this.dirsInfo$ = this.dirsInfoSubject.asObservable();
        this.dirsMissing = [];
        this.dirsMissingSubject = new BehaviorSubject([]);
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
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [File,
        Platform,
        NgZone])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map