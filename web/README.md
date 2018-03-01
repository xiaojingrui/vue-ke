#websocket人工接口文档
  http://xxx.github.io/EliteCRM/webchat-websocket-guide.html
#机器人接口文档
  http://xxx.xxx.com/pages/viewpage.action?pageId=13110290

> plan
#借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
  cnpm install babel-plugin-component --save-dev
  .babelrc添加配置：
  ["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]
#npm run build --report
查看打包后的文件大小
#解压文件
unzip online.zip
## Build Setup
npm install cnpm -g --registry=https://registry.npm.taobao.org
--------------------or --------------
开发环境绑定hosts 172.16.14.32 cnpm.ppxxxdaixxxcorp.com
npm install cnpm -g --register=http://cnpm.xxx.com
# install dependencies
cnpm install
cnpm install gulp -g
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

#服务器部署步骤：

项目代码地址：

      git@git.xxx.com:mobi-web/xxx.git

      路径： customer/server

     测试时test分支 预发和线上是master分支

服务端搭建需安装node环境：

  安装nvm:

     wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

   执行：nvm install v6.10.2 (安装nodejs)

   进入 customer/server 目录下执行 ：

       npm install cnpm -g --registry=https://registry.npm.taobao.org

       cnpm install

  执行 cnpm install pm2 -g

   启动项目命令： pm2 start crmServer.js

   端口号：8888
