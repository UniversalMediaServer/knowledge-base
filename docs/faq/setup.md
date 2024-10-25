# Setup
Installation or configuration help

1. [Which codecs or codec packs should I install for the best file-support?](#which-codecs-or-codec-packs-should-i-install-for-the-best-file-support)
2. [How can I launch UMS with a custom profile?](#how-can-i-launch-ums-with-a-custom-profile)
3. [The program will not start](#the-program-will-not-start)

## Which codecs or codec packs should I install for the best file-support?
When using the default options in UMS, no codecs are needed. The only time you need codec is to use the AviSynth engine.
In that case we recommend using [K-Lite Mega Codec Pack](http://www.codecguide.com/download_k-lite_codec_pack_mega.htm).
If you already have codecs or a codec pack installed, uninstall them first and restart the computer before installing K-Lite.
In the installer options select "Lots of stuff", the rest can be left at defaults.

## How can I launch UMS with a custom profile?
There are three ways to set up UMS for custom profiles:
1. GUI:
You can select a custom profile (i.e. UMS.conf) or create a new one by launching UMS via the "Universal Media Server (Select Profile)" Start Menu shortcut on Windows and Linux. A similar shortcut/launcher may be available in builds on other platforms.
A profile can be `loaded` by navigating to a directory with a saved .conf file and selecting it.
A profile can be `created` either by navigating to a directory without a UMS.conf file (the profile will be saved there as UMS.conf), or navigating to any directory and manually adding the profile filename (with a .conf extension) after the directory in the file name field.

Note: new profiles should be `saved` via the Save button in the GUI if they are to be reused, and each profile should use a different port if it needs to run at the same time as other profiles.


To distinguish between different profiles in the renderer, set the name option (this must currently be set manually in the .conf file) e.g.:

```shell
name = My Profile
```
If no name is specified, the hostname is used.

2. Environment Variable (Advanced):
UMS also supports multiple profiles by means of the UMS_PROFILE [environment variable](https://en.wikipedia.org/wiki/Environment_variable).

If this variable is unset, the default profile directory is used to locate UMS.conf (and WEB.conf, if used).

If UMS_PROFILE is an absolute or relative (to the working directory) path pointing to an existing directory, then UMS.conf is loaded from and saved to that directory. If UMS_PROFILE is set, but doesn't point to an existing directory, it is assumed to be a relative or absolute path to a profile file. Note: while the file doesn't need to exist, the directory containing it must exist if the file is to be saved.

Examples:
```shell
UMS_PROFILE=UMS.conf ./UMS.sh
UMS_PROFILE=relative/path/to/profile.conf ./UMS.sh
UMS_PROFILE=/absolute/path/to/myprofile.conf ./UMS.sh
```
3. Property (Advanced):
The profile file/directory can also be set via the ums.profile.path property e.g.
```shell
java -Dums.profile.path=/path/to/UMS.conf net.pms.PMS
```
## The program will not start
This can often be fixed by uninstalling Java, restarting the computer, then installing it again.