# テニスオフもっと Webアプリ(React版)
[テニスオフネット](https://www.tennisoff.net/)のイベント情報を便利に検索するための**私的**Webアプリ。

* 本リポジトリはフロントエンド側のソースのみ
* バックエンドのソースは非公開 
  * 処理自体はWebスクレイピングしてデータを[Algolia](https://www.algolia.com)に渡しているだけ
* サービス自体も非公開
  * 私的利用を目的にスクレイピングにより情報収集しているため非公開

# 技術スタック
* Language
  * [TypeScript](https://www.typescriptlang.org/)

* Linter and Code Formatter
  * TSLint
  * Prettier

* View
  * [React](https://reactjs.org/)
    * CLI Tool
      * craete-react-app
    * High-order Component
      * Recompose (deprecated feature)

* State Management
  * [Redux](https://0-to-1.github.io/redux/)
    * Library
      * [React Redux](https://react-redux.js.org/)
      * typescript-fsa
      * Reselect
    * Middleware
      * [redux-saga](https://github.com/redux-saga/redux-saga/blob/master/README_ja.md)
    * File Structure
      * Re-ducks

* UI Components
  * [Semantic UI React](https://react.semantic-ui.com)

* Map API
  * [Google Maps Platform](https://cloud.google.com/maps-platform)
    * [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
      * [react-google-maps](https://github.com/tomchentw/react-google-maps)

* Hosting
  * [Firebase Hosting](https://firebase.google.com/docs/hosting/?hl=ja)

* Back-End
  * [Algolia](https://www.algolia.com)

* Dev Tools
  * [React Developer Tools](https://github.com/facebook/react-devtools)
    * [Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  * [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
    * [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

# 個人開発環境

## OS
* Windows 10 Pro 64bit

## 各種ツールバージョン
* Git
  * version 2.20.1.windows.1
* Yarn
  * 1.12.3
* create-react-app
  * 2.1.2
