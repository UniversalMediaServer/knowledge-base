# Renderer Support
Renderer compatibility issues

1. [My device is not supported by UMS. How can I create a custom renderer.conf to make UMS recognize my device?](#my-device-is-not-supported-by-ums-how-can-i-create-a-custom-rendererconf-to-make-ums-recognize-my-device)
2. [If my PS3 has been on for a while and then I start UMS, they do not connect with each other](#if-my-ps3-has-been-on-for-a-while-and-then-i-start-ums-they-do-not-connect-with-eachother)

## My device is not supported by UMS. How can I create a custom renderer.conf to make UMS recognize my device?
UMS contains a directory "renderers" which contains the renderer configuration profiles for all devices that are supported.
Every configuration profile serves two purposes:

- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

When UMS does not recognize your device properly, it means none of the renderer configuration profiles (or the wrong one) matches your device.
The result is that UMS displays an "Unknown Renderer" or an unrelated device, and since it does not know the possibilities of your renderer, it cannot provide optimized output for your device.

##### Solution:
You can try creating your own renderer configuration file. For a detailed description of all available options in a configuration file, examine the file "[DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf)".
The steps below explain how to create a basic .conf file.
1. Make sure your UMS version is 5.0.0 or higher.

2. Create a directory named "backup" and copy all .conf files in the "renderers" directory to it.

3. Remove all .conf files from the "renderers" directory.

4. Choose the .conf file that matches your device most. For example, if your Samsung TV is not recognized, "Samsung.conf" might be a good place to start from. If you do not know which one to choose, pick "DefaultRenderer.conf" as starting point.

5. Copy the chosen .conf file to the "renderers" directory and rename it as your device.

6. Open your .conf file with your favorite text editor. Look for the line that defines "UserAgentSearch" and change it to:

```shell
UserAgentSearch = This should not match anything
```
Look for "UserAgentAdditionalHeader" and "UserAgentAdditionalHeaderSearch" as well, make sure they are empty:

```shell
UserAgentAdditionalHeader =
UserAgentAdditionalHeaderSearch =
```

7. Start UMS

8. Connect your device to UMS. If possible, try to browse UMS and play some media as well. Chances are it does not work at all. This is fine, since we are only after logging information.

9. Open the file "debug.log". If you do not know where it lives on your file system, there is a button "debug.log" on the "Traces" tab in UMS that will open an editor.

10. Shut down UMS

11. Look for lines containing "User-Agent" in your "debug.log" and examine the "Received on socket" lines, for example:

```shell
[New I/O server worker #1-1] TRACE 11:05:50.702 Received on socket: Date: Sun, 02 Oct 2011 09:12:22 GMT
[New I/O server worker #1-1] TRACE 11:05:50.702 Received on socket: Host: 192.168.0.16:5001
[New I/O server worker #1-1] TRACE 11:05:50.703 Received on socket: User-Agent: UPnP/1.0
[New I/O server worker #1-1] TRACE 11:05:50.703 Received on socket: X-AV-Client-Info: av=5.0; cn="Sony Computer Entertainment Inc."; mn="PLAYSTATION 3"; mv="1.0";
```
These lines were captured from a PlayStation 3 trying to connect to UMS and play some media files.
The first two lines are not relevant, but the last two are interesting. They identify the device to UMS.
When you search the "debug.log", you might find that the identifying information is not always the same for each request.
For example (edited for readability):

```shell
Received on socket: User-Agent: PLAYSTATION 3
...
Received on socket: User-Agent: UPnP/1.0
Received on socket: X-AV-Client-Info: av=5.0; cn="Sony Computer Entertainment Inc."; mn="PLAYSTATION 3"; mv="1.0";
...
Received on socket: User-Agent: UPnP/1.0 DLNADOC/1.50
Received on socket: X-AV-Client-Info: av=5.0; cn="Sony Computer Entertainment Inc."; mn="PLAYSTATION 3"; mv="1.0";
```

As you can see, the device does not always send the same "User-Agent" information.
Now you need to integrate this knowledge into your .conf file:
12. Extract all different "User-Agent" snippets from the "debug.log" and copy them into your .conf file as a mental note. For example:

```shell
# ============================================================================
# PlayStation 3 uses the following strings:
#
# User-Agent: PLAYSTATION 3
# ---
# User-Agent: UPnP/1.0
# X-AV-Client-Info: av=5.0; cn="Sony Computer Entertainment Inc."; mn="PLAYSTATION 3"; mv="1.0";
# ---
# User-Agent: UPnP/1.0 DLNADOC/1.50
# X-AV-Client-Info: av=5.0; cn="Sony Computer Entertainment Inc."; mn="PLAYSTATION 3"; mv="1.0";
# ============================================================================
```

13. Edit the "UserAgentSearch" so it matches the headers that you discovered. If there are extra headers that can help with identification, use the "UserAgentAdditionalHeader" and "UserAgendAdditionalHeaderSearch" settings as well. For the PS3, this results in:

```shell
UserAgentSearch = PLAYSTATION
UserAgentAdditionalHeader = X-AV-Client-Info
UserAgentAdditionalHeaderSearch = PLAYSTATION
```
These lines should be interpreted as "if the 'User-Agent' header contains 'PLAYSTATION' or if the 'X-AV-Client-Info' header contains 'PLAYSTATION' we have a definite match with the PS3".

Note that we did not try to match "UPnP/1.0". That string is too generic; another device might use the same string and UMS would wrongly identify it as a PS3. Hence the match for 'PLAYSTATION', which is very specific for the PS3 and no other device. Be sure to look for a specific match for your device as well.

Now UMS will be able to positively match your device to your .conf file. From now on, it will use your .conf file to determine what the device is capable of. Try to determine what formats your device supports, using its manual or Google.
14. Configure the .conf file for your device. Refer to "DefaultRenderer.conf" for a detailed description of each option. At the very least, make sure you configure these settings:

```shell
Video
Audio
Image
MediaInfo
TranscodeVideo
TranscodeAudio
```
You can uncomment other settings if you are not sure they would work for your device.
##### Tip:
If you define `"MediaInfo = true"` and do not define any "Supported" lines, UMS is forced to transcode everything. This is the best way to find out the correct values for "TranscodeVideo" and "TranscodeAudio" for your device.

15. Start UMS and connect your device to it. UMS should recognize it now. If your device is not recognized, return to step 14
16. Try to open media. If it does not work, try different settings for the "TranscodeVideo" and "TranscodeAudio" options in your .conf file. See "[DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf)" for a detailed description of the options.
From there on, you can tune your .conf file by adding "Supported" lines and configuring more options. Use the backup .conf files of similar devices for inspiration.
Restart UMS every time you want to view the results.
Be sure to share your working results on the [Alternative Media Renderers](https://www.universalmediaserver.com/forum/viewforum.php?f=5) forum.

## If my PS3 has been on for a while and then I start UMS, they do not connect with eachother
This is a bug caused by a PS3 firmware update and was first reported in early June 2012.
You can fix it by reverting to an older version of the PS3 firmware or just by restarting your PS3.