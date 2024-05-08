# Veiligheid en Privacy

UMS is een DLNA server. DLNA is een protocol dat in principe werkt zonder "user". Je hoeft bijvoorbeeld niet in te loggen op je TV. Dit betekent dat alle afspeelapparaten toegang hebben tot dezelfde gegevens/bestanden. Dat is misschien niet helemaal de bedoeling. Als je bijvoorbeeld twee mappen hebt, 'kindveilig' en 'kindonveilig', dan wil je waarschijnlijk dat afspeelapparaten in de kinderkamer alleen toegang hebben tot de map 'kindveilig'. UMS biedt een aantal mogelijkheden om de toegang te beheren. 

## IP filter

IP filtering is the most restrictive method that UMS provides. To use you supply a comma-separated list of IP-addresses that are allowed to connect. A render whose address does not match the entries in the list will simply get its traffic discarded (very early by UMS). It will not be able to access ANY folders (it will not even see a root folder). Use this method to block out the kids altogether. See description of ip_filter in UMS.conf for more details.

Example to allow only 2 addresses

```
ip_filter = 192.168.1.4, 192.168.1.32
```

## Allowlist

Allowlisting is a method that allows you to customize the rootfolder on a per render basis. This makes it possible to share different folder sets to different renderers. It works as follow: To your UMS.conf (currently no GUI options) you add lines of format tag.option = value where tag is either an IP address or a render name. The render name should be with spaces changed to _ (underscore) instead. The option is one of

- folders
- vfolders
- web
- hide_set

The value is option dependent. The last 4 are boolean values. for folders and virtualfolders it is a list of folders.

Example

```
folders = 
hide_video_settings = false
192.168.1.1.folders = c:\\child_safe
192.168.1.1.hide_set = true
```

This will for IP address 192.168.1.1:

- Share the folder c:\child_safe
- Hide the Server Settings folder
- Hide the Recently played list

All other renderers will use the "global" settings i.e. see all folders, and the Server Settings.

If an option is not present it will fallback to the "global" config or if that isn't present to the default value.

## UMS.deny

The whitelist can only modify the rootfolder appearance. But if you have mixed things (you have 10 folders but only one should be restricted to the kids). To control access to individual folders (or media) you can use the UMS.deny. It works as follows: Add a file called UMS.deny into the same directory as your UMS.conf file and inside that file add tag.[name|file|sys]=regex For each folder/file that should be added, UMS will apply the regular expression to the folder name or filename and if the regular expression matches the folder/file will NOT be added. For example:
```
192.168.1.1.name=.*private.*
```

will remove all folders/files which has the word private in it.
```
192.168.1.1.file=c:\\tst.*
```

will remove all files that have c:\tst in their path etc.

If no rule are set in the "UMS.deny" file, the files/folders will be added.

Hiding folders

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN code

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
