'use strict'

import { app, protocol, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron'
import { createApplicationMenu, createEmptyMenu } from '@/electron/application-menu'
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require("path")
const fs = require('fs');
const os = require('os');

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win: BrowserWindow | null
let getWindoSize: Array<number>

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // 创建浏览器窗口

  win = new BrowserWindow({
    width: 1200,
    height: 132,
    x: parseInt((screen.getAllDisplays()[0].workAreaSize.width - 1200) / 2),
    y: 150,
    // resizable: false, // 静止resize
    // transparent: true, // 透明
    frame: false, // 无边框窗口
    maximizable: false,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false, //取消跨域限制
    },
    icon: path.join(__dirname, '../public/app.ico') //图标生效于运行APP的窗口
  })

  getWindoSize = win.getSize()

  // 取消视觉闪烁
  win.once('ready-to-show', () => {
    if (win) win.show()
  })
  win.webContents.closeDevTools()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }

  // 在开发环境和生产环境均可通过快捷键打开devTools
  globalShortcut.register('CommandOrControl+F12', () => {
    if (win) {
      win.webContents.isDevToolsOpened() ? win.webContents.closeDevTools() : win.webContents.openDevTools()
    }
  })
  createEmptyMenu()
  createWindow()
})
if (process.platform === 'win32') {

}

ipcMain.on('showMenu', (event, arg) => {
  console.log(arg)
  arg === 0 ? createEmptyMenu() : createApplicationMenu()
})
ipcMain.on("setMainWindow", (event, data) => {
  win.setSize(getWindoSize[0], getWindoSize[1] + data.width);

  console.log(data.pathName)

  // var pathName = "C:/";
  // fs.readdir(pathName,(err, files)=>{
  //     var dirs = [];
  //     console.log(files)
  //     fs.stat(path.join(pathName, files[0]), (err, data)=>{     
  //       if(data.isFile()){               
  //           dirs.push(files[0]);
  //         }
  //      });
  // });

  function findSync(startPath) {
    let result = [];
    function finder(pathName) {
      let files = fs.readdirSync(pathName);
      console.log(files)
      files.forEach((val, isndex) => {
        console.log(pathName, val)
        let fPath = path.join(pathName, val);
        let stats = fs.statSync(fPath);
        
fs.exists(fPath, function(exists) {
	console.log(exists ? "创建成功" : "创建失败");
}
        // try {
        //   fs.accessSync(fPath, fs.constants.R_OK | fs.constants.W_OK);
        //   console.log('可以读写');
        // } catch (err) {
        //   console.error('无权访问');
        // }
        // if (stats.isDirectory()) finder(fPath);
        // if (stats.isFile()) result.push(fPath);
      });

    }
    finder(startPath);
    return result;
  }
  let fileNames = findSync('C:/');
  console.log(fileNames)
})
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

/**
 * 刷新
 *
 * */
// try {
//   require('electron-reloader')(module);
// } catch (_) {}