import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File, Entry } from '@ionic-native/file';

export type DirInfo = {
    name: string;
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

        this.platform
            .ready()
            .then(
            (valuePlatformReady: any) => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.

                for (let rootDirectory of rootDirs) {

                    ((rootDir: string) => {

                    this.fileService.listDir(this.fileService[rootDir], ".")
                        .then(

                        (listOfEntries: Entry[]) => {

                            let dirInfo: DirInfo = {
                                name: rootDir,
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
                            this.zone.run(() => {
                                this.dirsInfoSubject.next(this.dirsInfo);
                            });
                        }
                        ).catch(

                        (reason: any) => {
                            this.dirsMissing.push(rootDir);
                            this.zone.run(() => {
                                this.dirsMissingSubject.next(this.dirsMissing);
                            });
                            console.log(
                                "Failed to list entries of directory '"
                                + rootDir
                                + "' because '"
                                + reason.toString()
                                + "'.");

                        }
                        );    //           catch(...
                    })(rootDirectory);
                }             //         for (let rootDir of rootDirs) {...
            }                 //       (valuePlatformReady: any) => {...
            );                //     then(...  
    }                         //   ngOnInit() {...
}                             // class

