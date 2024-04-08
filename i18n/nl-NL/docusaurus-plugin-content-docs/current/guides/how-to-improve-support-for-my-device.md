# How to improve support for my device

Als je apparaat niets kan doen, zoals browsen in mappen of het spelen van een bestand, Mogelijk is het mogelijk om dit op te lossen door de instellingen te wijzigen in het speler-configuratiebestand. Different devices/renderers/clients communicate with servers like UMS in different ways, so the config file tells UMS how to speak the same language as your device.

We have a default renderer config file that contains documentation on all of our renderer settings. See the latest version at https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

Common settings to look at are `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, and `ChunkedTransfer`.

As well as that, you can have a look at other renderer configs inside the "renderers" folder in your installation directory, to see what they are doing. Sometimes you will need help, which we can give you on our forum, and please remember to tell us about the improvement when you make it, so that other users with your device can benefit from the fix. We will credit you in our release announcement and changelog.

If you have a new renderer config to contribute to the project, please create a **Pull Request** on our GitHub repository https://github.com/UniversalMediaServer/UniversalMediaServer
