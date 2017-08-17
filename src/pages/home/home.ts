import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File, Entry } from '@ionic-native/file';

export type DirInfo = {
    rootDirName: string;
    rootPath: string;
    files: [string];
    directories: [string];
};

type DirAndPath = {
    "dir": any,
    "path": string
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    public messages: [string] = <[string]>[];

    // A dictionary/map of root directories and paths by their names
    private rootDirs: any = <any>{};

    private dirsInfo: [DirInfo] = <[DirInfo]>[];
    private dirsInfoSubject: BehaviorSubject<[DirInfo]> = new BehaviorSubject<[DirInfo]>(<[DirInfo]>[]);
    public dirsInfo$: Observable<[DirInfo]> = this.dirsInfoSubject.asObservable();

    private dirsMissing: [string] = <[string]>[];
    private dirsMissingSubject: BehaviorSubject<[string]> = new BehaviorSubject<[string]>(<[string]>[]);
    public dirsMissing$: Observable<[string]> = this.dirsMissingSubject.asObservable();

    constructor(
        private fileService: File,
        private platform: Platform,
        public zone: NgZone
    ) {    }

    ngOnInit() {

        this.platform
            .ready()
            .then(
            (valuePlatformReady: any) => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.

                this.rootDirs = {
                    "applicationDirectory": { "dir": <any>(this.fileService.applicationDirectory || ""), "path": "./" },
                    "applicationDirectory/.": { "dir": (this.fileService.applicationDirectory || ""), "path": "www/" },
                    "applicationStorageDirectory": { "dir": (this.fileService.applicationStorageDirectory || ""), "path": "./" },
                    "dataDirectory": { "dir": (this.fileService.dataDirectory || ""), "path": "./" },
                    "cacheDirectory": { "dir": (this.fileService.cacheDirectory || ""), "path": "./" },
                    "documentsDirectory": { "dir": (this.fileService.documentsDirectory || ""), "path": "./" },
                    "externalApplicationStorageDirectory": { "dir": (this.fileService.externalApplicationStorageDirectory || ""), "path": "./" },
                    "externalDataDirectory": { "dir": (this.fileService.externalDataDirectory || ""), "path": "./" },
                    "externalCacheDirectory": { "dir": (this.fileService.externalCacheDirectory || ""), "path": "./" },
                    "externalRootDirectory": { "dir": (this.fileService.externalRootDirectory || ""), "path": "./" },
                    "sharedDirectory": { "dir": (this.fileService.sharedDirectory || ""), "path": "./" },
                    "syncedDataDirectory": { "dir": (this.fileService.syncedDataDirectory || ""), "path": "./" },
                    "tempDirectory": { "dir": (this.fileService.tempDirectory || ""), "path": "./" },
                };
                this.showRootDirectories();

           }).catch (
            (reason: any) => {
                this.myTrace(
                    "HomePage.ngOnInit() Failed because '"
                    + reason
                    + "'.");
            });
    }

    getContentsOfADirectory(rootDirName: string, rootDir: any, path: string) {

        this.myTrace(
            "  > getContentsOfADirectory( "
            + rootDirName
            + ", >>"
            + rootDir.toString()
            + "<<, "
            + path
            + " )");

        this.fileService.listDir(rootDir, path)
            .then(

            (listOfEntries: Entry[]) => {

                let dirInfo: DirInfo = {
                    rootDirName: (rootDirName),
                    rootPath: path,
                    files: <[string]>[],
                    directories: <[string]>[]
                }

                for (let entry of listOfEntries) {

                    if (entry.isFile) {
                        dirInfo.files.push(entry.name);
                    } else if (entry.isDirectory) {
                        dirInfo.directories.push(entry.name);
                    }

                }
                this.dirsInfo.push(dirInfo);
                this.dirsInfo = this.dirsInfo.sort(
                    (a: DirInfo, b: DirInfo) => {
                        return a.rootDirName.localeCompare(b.rootDirName);
                    }
                );
                this.zone.run(() => {
                    this.dirsInfoSubject.next(this.dirsInfo);
                });
            }
            ).catch(

            (reason: any) => {
                let strReason = reason.toString();
                if ("[object Object]" == strReason) {
                    strReason = JSON.stringify(reason);
                }
                this.dirsMissing.push(
                    rootDirName
                    + " ("
                    + strReason
                    + ")");
                this.zone.run(() => {
                    this.dirsMissingSubject.next(this.dirsMissing);
                });
                this.myTrace(
                    "Failed to list entries of directory '"
                    + rootDirName
                    + "' because '"
                    + strReason
                    + "'.");

            }
            );    //           catch(...
    }

    showDir(dirInfo: DirInfo, subDirName: string) {

        this.clearData();
        this.getContentsOfADirectory(
            dirInfo.rootDirName,
            this.rootDirs[dirInfo.rootDirName].dir,
            dirInfo.rootPath + subDirName + "/"
        );
    }

    showRootDirectories() {

        this.clearData();

        for (let rootDirName of Object.keys(this.rootDirs) ) {
            this.getContentsOfADirectory(
                rootDirName,
                this.rootDirs[rootDirName].dir,
                this.rootDirs[rootDirName].path
            );
        }
    }

    clearData() {

        this.dirsInfo = <[DirInfo]>[];
        this.dirsMissing = <[string]>[];
        this.zone.run(() => {
            this.dirsInfoSubject.next(this.dirsInfo);
            this.dirsMissingSubject.next(this.dirsMissing);
        });
    }

    myTrace(message: string) {
        console.log(message);
        this.zone.run(() => {
            this.messages.push(message);
        });
    }
}       // class

