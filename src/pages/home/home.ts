import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File, Entry } from '@ionic-native/file';

export type DirInfo = {
    rootDirName: string;
    path: string;
    files: [string];
    directories: [string];
};

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {



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
    ) { }

    ngOnInit() {

        this.showRootDirectories();
    }

    getContentsOfADirectory(rootDirectory: string, path: string) {

        this.fileService.listDir(this.fileService[rootDirectory], path)
            .then(

            (listOfEntries: Entry[]) => {

                let dirInfo: DirInfo = {
                    rootDirName: (rootDirectory),
                    path: path,
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
                this.dirsMissing.push(rootDirectory
                    + " ("
                    + strReason
                    + ")");
                this.zone.run(() => {
                    this.dirsMissingSubject.next(this.dirsMissing);
                });
                console.log(
                    "Failed to list entries of directory '"
                    + rootDirectory
                    + "' because '"
                    + strReason
                    + "'.");

            }
            );    //           catch(...
    }

    showDir(dirInfo: DirInfo, subDirName: string) {

        this.clearData();
        this.getContentsOfADirectory(dirInfo.rootDirName, dirInfo.path + "/" + subDirName);
    }

    showRootDirectories() {

        const rootDirs: [string] = [
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
            .then(
            (valuePlatformReady: any) => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.

                for (let rootDirectory of rootDirs) {
                    this.getContentsOfADirectory(rootDirectory, ".");
                }           
            }             
            );      
    }

    clearData() {

        this.dirsInfo = <[DirInfo]>[];
        this.dirsMissing = <[string]>[];
        this.zone.run(() => {
            this.dirsInfoSubject.next(this.dirsInfo);
            this.dirsMissingSubject.next(this.dirsMissing);
        });
    }
}       // class

