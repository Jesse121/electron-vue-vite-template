### electron项目模板

用于快速构建桌面客户端项目，包含基础功能如下：

1. 可开启多个窗口
2. 可使用vue devtools方便调试
3. 能生成本地运行日志文件
4. 包含托盘和托盘菜单
5. 一键打包成exe
6. 支持全量更新和增量更新
7. 本地化 sqlite 存储

主要目录结构如下：
``` 
|-- electron
|   |-- main 
|   |   |-- index.ts
|   |   |-- modules // 功能模块
|   |   |   |-- createTray.ts 
|   |   |   `-- maxMinClose.ts
|   |   |-- utils // 相关工具
|   |   |   |-- devtools.ts   
|   |   |   |-- icon.ts       
|   |   |   |-- ipcMain.ts    
|   |   |   |-- log.ts
|   |   |   `-- sqlite.ts
|   |   `-- windows // 创建窗口文件
|   |       |-- mainWin.ts
|   |       `-- updateWin.ts
|   `-- preload  // 预加载脚本文件
|       |-- index.ts
|       `-- renderer.d.ts
|-- electron-builder.json // electron-builder打包配置
|-- installer.nsh // nisi脚本用于修改默认安装路径
|-- resources // 项目图片资源
|-- src //web项目文件夹
```

启动项目 
yarn dev

打包项目
yarn build




详细构建过程可查看
* [如何用Electron+vue+vite构建桌面端应用(一)](https://jesse121.github.io/blog/articles/2022/07/20.html)
* [如何用Electron+vue+vite构建桌面端应用(二)](https://jesse121.github.io/blog/articles/2022/08/04.html)
* [如何用Electron+vue+vite构建桌面端应用(三)](https://jesse121.github.io/blog/articles/2022/08/05.html)

