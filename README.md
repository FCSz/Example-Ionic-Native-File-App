## A Sample App Using the Ionic/Cordova native-file Plugins

This app dispays the contents of the documented root directories, via 'ionic-native/file'.
These root directories are:
* applicationDirectory
* applicationStorageDirectory
* dataDirectory
* cacheDirectory
* documentsDirectory
* externalApplicationStorageDirectory
* externalDataDirectory
* externalCacheDirectory
* externalRootDirectory
* sharedDirectory
* syncedDataDirectory
* tempDirectory

It displays:
* the translated directory name
* the contained files names
* the contained subdirectories names

Clicking on a subdirectory name will display the contents of that subdirectory.

There is no 'back' function, but, clicking on the 'home' button (top right location) will start over.

This project has been tested on a Nexus 5X (29/32 GB) with Android 7.1.2 build N2G47Z, using Visual Studio 2017, on Windows 10.

## Notes

Attempting to list the contents of root directory `applicationDirectory`, with path `./`, fails with message NOT_FOUND_ERR.
However, attempting to list the contents of root directory `applicationDirectory`, with path `www/`, works.

There seems to be a difference between `this.fileService.applicationDirectory` and `this.fileService["applicationDirectory"]`.
I use the former.

I added file `...\Example-Ionic-Native-File-App\node_modules\node-sass\vendor\win32-x64-47\binding.node` to the repository because yarn removes it. 
I just use git to get it back.
It might not be required for your environment.

The build system seems to be very fragile. The Visual Studio project might not work 'out of the box'.
