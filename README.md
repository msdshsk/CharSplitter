# CharSplitter - 文字分割ツール

Photoshop UXP プラグイン。入力したテキストを一文字ずつ個別のテキストレイヤーとして配置します。

## 用途

テロップに一文字ずつ座布団（背景シェイプ）を設定したい場合などに便利です。

例：「期待の星」→「期」「待」「の」「星」を個別レイヤーとして等間隔に配置

## 動作環境

- Adobe Photoshop 2022 (v23.3.0) 以降
- UXP対応バージョン

## インストール方法

### 開発版（UXP Developer Tool使用）

1. [UXP Developer Tool](https://developer.adobe.com/photoshop/uxp/devtool/) をインストール
2. UXP Developer Tool を起動
3. 「Add Plugin」→ このフォルダの `manifest.json` を選択
4. 「Load」をクリック
5. Photoshop の「プラグイン」メニューから「文字分割」を開く

### パッケージ版（.ccx）

1. UXP Developer Tool でプラグインをパッケージ化（...メニュー → Package）
2. 生成された `.ccx` ファイルをダブルクリック
3. Creative Cloud 経由で自動インストール

## 使い方

1. Photoshop でドキュメントを開く（または新規作成）
2. 「文字分割」パネルを開く
3. テキスト入力欄に文字を入力（例：期待の星）
4. 必要に応じてオプションを調整：
   - **フォントサイズ**: 文字の大きさ（px）
   - **文字間隔**: 各文字間の距離（px）
   - **開始X座標**: 最初の文字のX位置
   - **Y座標**: 全文字のY位置
5. 「分割配置」ボタンをクリック
6. 各文字が個別のテキストレイヤーとして配置される

## ライセンス

MIT License
