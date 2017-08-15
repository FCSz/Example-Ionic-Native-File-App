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
        this.dirsInfo = [];
        this.dirsInfoSubject = new BehaviorSubject([]);
        this.dirsInfo$ = this.dirsInfoSubject.asObservable();
        this.dirsMissing = [];
        this.dirsMissingSubject = new BehaviorSubject([]);
        this.dirsMissing$ = this.dirsMissingSubject.asObservable();
    }
    HomePage.prototype.ngOnInit = function () {
        this.showRootDirectories();
    };
    HomePage.prototype.getContentsOfADirectory = function (rootDirectory, path) {
        var _this = this;
        this.fileService.listDir(this.fileService[rootDirectory], path)
            .then(function (listOfEntries) {
            var dirInfo = {
                rootDirName: (rootDirectory),
                path: path,
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
            _this.dirsMissing.push(rootDirectory
                + " ("
                + strReason
                + ")");
            _this.zone.run(function () {
                _this.dirsMissingSubject.next(_this.dirsMissing);
            });
            console.log("Failed to list entries of directory '"
                + rootDirectory
                + "' because '"
                + strReason
                + "'.");
        }); //           catch(...
    };
    HomePage.prototype.showDir = function (dirInfo, subDirName) {
        this.clearData();
        this.getContentsOfADirectory(dirInfo.rootDirName, dirInfo.path + "/" + subDirName);
    };
    HomePage.prototype.showRootDirectories = function () {
        var _this = this;
        var rootDirs = [
            "applicationDirectory",
            "applicationStorageDirectory",
            "dataDirectory",
            "cacheDirectory",
            "documentsDirectory",
            "externalApplicationStorageDirectory",
            "externalDataDirectory",
            "externalCacheDirectory",
            "externalRootDirectory",
            "sharedDirectory",
            "syncedDataDirectory",
            "tempDirectory",
        ];
        this.clearData();
        this.platform
            .ready()
            .then(function (valuePlatformReady) {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            for (var _i = 0, rootDirs_1 = rootDirs; _i < rootDirs_1.length; _i++) {
                var rootDirectory = rootDirs_1[_i];
                _this.getContentsOfADirectory(rootDirectory, ".");
            }
        });
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