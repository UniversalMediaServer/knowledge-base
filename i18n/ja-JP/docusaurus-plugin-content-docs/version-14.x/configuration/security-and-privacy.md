# セキュリティとプライバシー

## はじめに

UMSは主に2つの方法でメディアを提供しています - メディアプレーヤーアプリで消費されるDLNA/UPnPを介して。 そして、HTTP(S) を介してウェブブラウザ経由で消費されます。

Webブラウザは、ログインしているユーザーアカウントを持つことによって、簡単なセキュリティとプライバシー管理を持っています。

メディアプレーヤーアプリは一般的に「ユーザー」の概念をサポートしていないため、通常、すべてのデバイスは同じコンテンツを取得します。 これはあなたが望むものではないかもしれません。 たとえば、kids_safeとkids_unsafeの2つのフォルダがある場合は、kids_safeフォルダへのアクセスのみをkids_safeフォルダに制限することをお勧めします。 もう一つの一般的な状況は、あなたがあなたのメディアにアクセスしたくない人と同じネットワークにいることです。 フラットメイトのように特定のレンダラーを完全にブロックしたいのです

UMSは、そのような状況でアクセスを制御するためのさまざまな方法を提供します。

## デフォルトでレンダラーまたはネットワークデバイスを許可またはブロックします
レンダラーとネットワークデバイスのデフォルトの戦略を選択できます。 デフォルトでは、完全な制御のためにdenylistsとallowlistsを使用して、許可または拒否することができます。

これは、共有された生活状況や、広い/低信頼のローカルネットワークに役立ちます。 また、近隣からの不要なアクセスを引き起こす可能性があるため、ネットワークに電源ラインアダプタを使用する場合にも便利です。

![設定方法の例](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![レンダラーの設定方法の例 設定で許可する](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## レンダラーとネットワークデバイスをブロック/許可する

デフォルトで認識できないレンダラーを許可するかブロックするかを選択した場合 設定エリアのホーム画面から非表示リストや許可リストを作成できます。

![レンダラーをブロックする方法の例](@site/docs/img/whats-new-in-v14-block-renderer.png)

## レンダラーに担当者をリンク

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## 共有コンテンツを特定のグループに制限する

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## フォルダを非表示

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

## PIN コード

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## カスタムデバイス設定

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- レンダラーのGUIポップアップ・パネルの右上にある「このデバイスをカスタマイズ」ボタンをクリックし、構成の名前を指定します。
- 開いた新しいconfファイルでは、テレビのためにオーバーライドしたいすべての設定を追加します。 をクリックします。
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
