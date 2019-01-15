# テニスオフもっと Webアプリ(React版)
開発備忘録

# リンク
* [テニスオフネット][tnet]
* [テニスオフもっと][app]
* [GitHubリポジトリ](https://github.com/shotakick/tennisoffmotto-react-app)
* [Firebaseコンソール](https://console.firebase.google.com/u/1/project/tennisoffmotto/overview)
* [Algoliaダッシュボード](https://www.algolia.com/apps/QL1PZJP0QR/dashboard)

[tnet]: https://www.tennisoff.net/
[app]: https://tennisoffmotto.firebaseapp.com/

# 技術スタック
勉強を兼ねていたのでオーバースペック気味の技術選定。

* Language
  * [TypeScript](https://www.typescriptlang.org/)

* Linter and Code Formatter
  * TSLint
  * Prettier

* View
  * [React](https://reactjs.org/)
    * CLI Tool
      * craete-react-app
    * Routing
      * [React Router](https://github.com/ReactTraining/react-router)
    * High-order Component
      * Recompose (deprecated feature)
    * Upcoming Features
      * ~~React Hooks~~

* State Management
  * [Redux](https://0-to-1.github.io/redux/)
    * Library
      * [React Redux](https://react-redux.js.org/)
      * typescript-fsa
      * Reselect
      * ~~react-router-redux~~
    * Asynchronous processing
      * ~~[ActionDispacher](https://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696)~~
    * Middleware
      * ~~redux-logger~~
      * ~~Redux Thunk~~
      * [redux-saga](https://github.com/redux-saga/redux-saga/blob/master/README_ja.md)
        * ~~[moducks](https://github.com/moducks/moducks)~~
      * ~~redux-observable~~
    * File Structure
      * ~~Redux Way~~
      * ~~Ducks~~
      * Re-ducks
  * ~~Undux~~

* UI Components
  * ~~[Material-UI](https://material-ui.com/)~~
  * [Semantic UI React](https://react.semantic-ui.com)
    * react-semantic-redux-form

* Styling
  * ~~CSS-Modules~~
  * ~~CSS in JS~~

* Library
  * ~~[axios](https://github.com/axios/axios)~~

* Map API
  * ~~[Leaflet](https://leafletjs.com/)~~
  * [Google Maps Platform](https://cloud.google.com/maps-platform)
    * [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
      * [react-google-maps](https://github.com/tomchentw/react-google-maps)

* Hosting
  * [Firebase Hosting](https://firebase.google.com/docs/hosting/?hl=ja)

* Back-End
  * ~~Firebase Cloud Functions~~
  * ~~Firebase Firestore~~
  * [Algolia](https://www.algolia.com)

* Testing
  * [Jest](https://jestjs.io/)
    * [ts-jest](https://github.com/kulshekhar/ts-jest)
  * enzyme

* Dev Tools
  * [React Developer Tools](https://github.com/facebook/react-devtools)
    * [Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  * ~~[React Performance Devtool](https://github.com/nitin42/react-perf-devtool)~~
    * ~~[Chrome extension](https://chrome.google.com/webstore/detail/react-performance-devtool/fcombecpigkkfcbfaeikoeegkmkjfbfm)~~
  * [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
    * [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)


# 個人開発環境

## OS
* Windows 10 Pro 64bit

## シェル
* PowerShell

## ブラウザ
* Google Chrome
  * バージョン: 71.0.3578.98

## パッケージマネージャ
* [Chocolatey](https://chocolatey.org/install)
```bat
$ Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

$ choco -v
  0.10.11

$ Import-Module C:\ProgramData\chocolatey\helpers\chocolateyProfile.psm1

$ choco install chocolateygui -y
```

## エディタ
* [Visual Studio Code](https://code.visualstudio.com/)
```bat
$ choco install VisualStudioCode -y
```

* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## ソース管理
* [Git](https://git-scm.com/) 
```bat
$ choco install git -y
$ git --version
  git version 2.20.1.windows.1
```

## Node.js
### Node.jsバージョン管理
* [nodist](https://github.com/nullivex/nodist)
```bat
$ choco install nodist -y
$ nodist -v
  0.8.8
```

### Node.js更新
* [[Node.js] Node.js の導入(Windows編)](https://qiita.com/ksh-fthr/items/fc8b015a066a36a40dc2)
```bat
$ nodist global 10
$ nodist + 6.11
$ nodist - 7
```

### npm更新
* [nodistでnpm6.2.0以降にアップデート出来なかった話](https://qiita.com/TalkWithWater/items/aa7b1becd8fc1344170d)

以下ファイルを修正してからコマンド実行。
* C:\Program Files (x86)\Nodist\lib\npm.js
```diff
NPMIST.downloadUrl = function(version){
-  return 'https://codeload.github.com/npm/npm/tar.gz/vVERSION'
+  return 'https://codeload.github.com/npm/cli/tar.gz/vVERSION'
    .replace('VERSION',version.replace('v',''));
};
```

```bat
$ nodist npm global match 
```

*  [npm runコマンドを実行したら警告が出るようになった](https://qiita.com/isamusuzuki/items/738a2736a746b67bd977)
```bat
$ npm config set scripts-prepend-node-path true
```

旧バージョンの```npm```はいらないので削除。
```bat
$ rm "C:\Program Files (x86)\Nodist\npmv\4.0.5"
```

### npxインストール
```bat
$ npm install npx -g
$ npx -v
  10.2.0
```

### Yarnインストール
```bat
$ npm instarll yarn -g
$ yarn -v
  1.12.3
```

## React CLIツール
* create-react-app
```bat
$ npm install create-react-app -g
$ create-react-app --version
  2.1.2
```

# Reactアプリ環境構築

## Reactアプリプロジェクトの作成
```bat
$ create-react-app tennisoffmotto-react-app --scripts-version=react-scripts-ts
$ cd tennisoffmotto-react-app
```

## 静的解析ツールおよびフォーマッタの設定
```TSLint```、```Prettier```、および連携用のツールをインストールする。
```bat
$ yarn add -D tslint prettier tslint-plugin-prettier tslint-config-prettier tslint-config-airbnb
```

* ```slint.json```
```json
{
  "rulesDirectory": ["tslint-plugin-prettier"],
  "extends": [
    // "tslint:recommended",
    "tslint-config-airbnb",
    "tslint-react",
    "tslint-config-prettier"
  ],
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  },
  "rules": {
    "prettier": [
      true,
      {"singleQuote": true}
    ],
    "ordered-imports": true,
    "object-shorthand-properties-first":false,
    "no-boolean-literal-compare": false
  }
}
```

* ```package.json```
```json
{
  …
  "scripts": {
    …
    "lint": "tslint --project . --fix"
  },
  …
}
```

## 各種ライブラリのインストール
```bat
$ cd functions
$ yarn add semantic-ui-react semantic-ui-css
$ yarn add react-redux redux-saga redux-logger typescript-fsa typescript-fsa-reducers redux-devtools-extension
$ yarn add -D @types/react-redux @types/redux-logger
$ yarn add reselect
$ yarn add recompose
$ yarn add -D @types/recompose
$ yarn add algoliasearch
$ yarn add -D @types/algoliasearch
$ yarn add react-google-maps
$ yarn add -D @types/googlemaps @types/markerclustererplus
```

# デプロイ環境構築

## Firebase用CLIツールのインストール&ログイン
```bat
$ yarn add firebase-tools -D
$ firebase login
```

## Firebase Hostingプロジェクトとして初期化
設定としては公開ディレクトリに```build```を指定し初期化した。
```bat
$ firebase init hosting
```

## デプロイ用コマンド等の準備
* ```package.json```
```json
{
  …
  "scripts": {
    …
    "deploy": "firebase deploy --only hosting"
  },
  …
}
```

# バージョン管理環境構築

## リポジトリ初期化
```bat
$ git init
```

## リモートリポジトリの追加
```bat
$ git remote add origin git@github.com:shotakick/tennisoffmotto-react-app.git
```

# その他

* ```tsconfig.json```
```diff
{
  "compilerOptions": {
-   "baseUrl": ".",
+   "baseUrl": "src",
-   "lib": ["es6", "dom"],
+   "lib": ["es2018", "dom"],
```

* ```.vscode/settings.json```
```json
{
	"tslint.autoFixOnSave": true,
	"terminal.integrated.env.windows": {
		"PATH": "${env:PATH};${workspaceRoot}\\node_modules\\.bin"
	}
}
```

# 開発～デプロイ

## ソース編集&ビルド
```bat
$ yarn run build
```

## テスト
```bat
$ yarn run start
```

## デプロイ
```bat
$ yarn run deploy
```

## バージョン管理
```bat
$ git add .
$ git commit -m "first commit"
$ git push origin master
```
