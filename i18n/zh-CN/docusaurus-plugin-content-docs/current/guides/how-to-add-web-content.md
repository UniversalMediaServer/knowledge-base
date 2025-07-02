# 如何添加网络内容

本文将介绍如何添加网络内容。

## 视频订阅源

你可以通过添加 RSS 源的链接来订阅视频订阅源或频道，如果是 YouTube 频道，就直接输入频道链接。

### 1: 进入已共享内容部分

在浏览器中的 UMS 设置中，打开菜单，选择已共享的内容  ![设置菜单](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: 打开 “添加新的共享内容” 对话框

当你点击 “添加新的共享内容” 按钮时，会弹出一个对话框，让你添加各种类型的媒体。 你要做的第一步是在类型菜单中选择 “视频订阅源”  ![新的共享内容对话框](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: 添加你的订阅源

现在你可以添加你的订阅源

#### 名称

视频订阅源的 “名称” 一栏被禁用，因为订阅源会自己确定名称

#### 路径

“路径” 一栏决定 UMS 展示的目录结构。 举个例子，如果你输入 “Web/YouTube Channels”，你的订阅就会在 “Web” 目录的 “YouTube Channels” 目录内。 这个功能可以让你按照你的需求更灵活地组织你的内容，在你用 UMS 将多个订阅源放在同一目录时十分有用。

#### 来源/URL:

此处填写视频订阅源的链接。 其通常以 “.xml” 结尾，但我们对YouTube进行特殊处理，使其能够直接使用频道的URL，比如 “https://www.youtube.com/@kurzgesagt”

#### 已授权组

“已授权组” 一栏让你能够使该订阅源只对特定的群组访问。群组在 UMS 中创建，其可与不同的用户和/或设备关联。 见 [安全与隐私](../configuration/security-and-privacy.md#link-person-to-renderer) 了解更多细节。

当你对当前设置满意时，点击 “添加” 按钮添加该视频订阅源。

### 订阅源排序

如果订阅源链接有效，你应该能看见 “名称” 一栏出现内容，现在你可以上下拖拽订阅源来对其进行排序  ![已共享的内容列表和排序功能](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### 保存修改

你可以重复上述操作来添加和编辑更多内容，当你对结果满意时，点击页面底部的 “保存” 按钮保存修改。 现在你可以在你的设备上看到你的内容了:  [在网页播放器中的视频订阅源的例子](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)