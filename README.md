# acg-demo
一个（个人向）的个人剧集推荐



## 部署

在服务器上安装node.js，然后将本项目复制到您的wwwroot下。



## 修改内容

可自定义的内容在`assets`文件夹中。

`head.ico`：网页图标（显示在浏览器标签页中）

`bgm.mp3`：背景音乐

`acg.csv`：网页内容的表格，编码为UTF-8。若要修改为您自己的内容，请填写以下字段：

- `name`：这部剧的名字；
- `path`：封面图的名字，请将这张图片放在`image`文件夹里，但`path`里只填写文件名，不填写路径。例如，`path`填写`001.webp`，对应的文件放在`image/001.webp`里。**以下字段均只需要填写文件名**；
- `background`：背景图的名字，请将这张图片放在`background`文件夹里；
- `resource`：一张图的名字，会自动附在文末。请将这张图放在`extra`文件夹里；
- `description`：对这部剧的描述。

可参照本项目中的表格进行修改。



## 开源

以MIT协议开源。这是个烂活，欢迎随意使用。
