# Video Problems
Issues with video playback

1. [How can I stop videos from stuttering?](#how-can-i-stop-videos-from-stuttering)
2. [Why aren't Live Subtitles showing up for my language?](#why-arent-live-subtitles-showing-up-for-my-language)
3. [Why aren't my subtitles working?](#why-arent-my-subtitles-working)
4. [How can I make sure the correct 3D video format is detected?](#how-can-i-make-sure-the-correct-3d-video-format-is-detected)

## How can I stop videos from stuttering?
Usually this is due to wireless connections being too slow.
To make the videos use less bandwidth you can go to the Transcoding Settings tab and select a new value in the "Video quality settings" option.
Try moving down the list (don't forget to click Save before testing) until your video plays smoothly.

## Why aren't Live Subtitles showing up for my language?
Make sure your language is in your priority list. You can do this by going to the "Transcoding Settings" tab, then selecting the "Subtitles settings" tab on that page, and add your language to the "Subtitles language priority" input box.
If that doesn't fix it, the subtitle probably doesn't exist for your language.

## Why aren't my subtitles working?
The most likely reason is that your priority settings are not what you would prefer.
You can see your priority settings on the Transcoding Settings tab, in the Subtitles settings section of that tab.

The default value for the "Audio/subtitle language priority" setting for English users is:

```shell
eng,off;*,eng;*,und
```
Which means:
If the audio is English, turn subtitles off. If the audio is anything else, display either English or Undefined subtitles.

If you would like to always display subtitles, you can change it to something like:

```shell
*,*
```

Or just leave it blank.

In the future, there will be a more graphical way to choose your priorities.

## How can I make sure the correct 3D video format is detected?
By default, UMS detects the most common 3D formats by checking the width and height of the video along with the filename. If this automatic detection fails, you can add one of the following tags to the start of the filename:

```shell
Tag:	Description:
3DSBSLF	Side by side (Left eye first)
3DSBSRF	Side by side (Right eye first)
3DOULF	Over Under (Left eye first)
3DOURF	Over Under (Right eye first)
3DARCG	Anaglyph (Red, Cyan, Gray)
3DARCH	Anaglyph (Red, Cyan, Half Color)
3DARCC	Anaglyph (Red, Cyan, Color)
3DARCD	Anaglyph (Red, Cyan, Dubois)
3DAGMG	Anaglyph (Green, Magenta, Gray)
3DAGMH	Anaglyph (Green, Magenta, Half Color)
3DAGMC	Anaglyph (Green, Magenta, Color)
3DAGMD	Anaglyph (Green, Magenta, Dubois)
3DAYBG	Anaglyph (Yellow, Blue, Gray)
3DAYBH	Anaglyph (Yellow, Blue, Half Color)
3DAYBC	Anaglyph (Yellow, Blue, Color)
3DAYBD	Anaglyph (Yellow, Blue, Dubois)
```