const { app, Menu } = require('electron');


export  const createApplicationMenu = () => {

  const template: Array<object> = [
    {
      label: '文件',
      submenu: [
        {
          label: '退出',
          accelerator: 'CommandOrControl+W',
          role: 'close'
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          accelerator: 'CommandOrControl+Z',
          role: 'undo',
        },
        {
          label: '恢复',
          accelerator: 'Shift+CommandOrControl+Z',
          role: 'redo',
        },
        { type: 'separator' },
        {
          label: '剪切',
          accelerator: 'CommandOrControl+X',
          role: 'cut',
        },
        {
          label: '拷贝',
          accelerator: 'CommandOrControl+C',
          role: 'copy',
        },
        {
          label: '粘贴',
          accelerator: 'CommandOrControl+V',
          role: 'paste',
        }
      ],
    },
    {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'CommandOrControl+M',
          role: 'minimize',
        },
        {
          label: '关闭',
          accelerator: 'CommandOrControl+W',
          role: 'close',
        },
      ],
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: 'Visit Website',
          click() { /* To be implemented */ }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    const name = 'Firesale';
    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          role: 'about',
        },
        { type: 'separator' },
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        { type: 'separator' },
        {
          label: `Hide ${name}`,
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        { type: 'separator' },
        {
          label: `Quit ${name}`,
          accelerator: 'Command+Q',
          click() { app.quit(); }, // A
        },
      ],
    });

    const windowMenu:any = template.find((item:any) => {item.label === '窗口'}) 
    windowMenu.submenu.push(
      { type: 'separator',label:""},
      {
        label: 'Bring All to Front',
        role: 'front',
      }
    );
  }

  return Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
export  const createEmptyMenu = () => {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'App Demo',
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }]
      }]
    let menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}

// try {
//   require('electron-reloader')(module);
// } catch (_) {}