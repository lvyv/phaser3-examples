# 二维可视化动画例程库

所有代码改编自[Phaser3](https://labs.phaser.io)。

## 快速开始

### 需要环境

```
下载并安装nodeJs 14.21.3。
```

### 安装和运行

按如下命令下载源码并安装运行:

```
git clone https://github.com/lvyv/phaser3-examples.git
npm install
npm run start
```

### 客户端访问
http://127.0.0.1:8080/

示例说明

| 示例 | 描述 |
|---------|-------------|
| [MAPF可视化](http://127.0.0.1:8080/edit.html?src=src\tilemap\grid%20movement.js) | 用于对PIBT算法求出的可行解进行动画绘制。<br/>地图是PIBT提供的pibt2\map\arena.map文件修改而来。|

地图格式说明：PIBT算法提供的地图是“T”和“.”符号的图块地图，T表障碍，.表示空白。在前端为了支持可视化绘制，图元（文件位置在assets/tilemaps/tiles/drawtiles-spaced.png）为0，1，2三个图块，所以对应的地图文件csv，用“2”替换“T”，用“0”或“1”替换“.”，并且每行中各字符之间用“,”分割。


### 许可协议

本仓库代码按 MIT 许可协议发行。