# Knot Logic 論文

作者：Louis H. Kauffman

原始論文：https://homepages.math.uic.edu/~kauffman/KnotLogic.pdf

## 文件說明

- `KnotLogic.md` - 原始 Markdown 論文檔案
- `KnotLogic.html` - 轉換後的 HTML 檔案（包含 MathJax 支援）
- `index.html` - 動態載入 Markdown 的閱讀器
- `convert.html` - 瀏覽器版本的轉換器
- `convert.js` - Node.js 版本的轉換腳本

## 使用方法

### 1. 直接閱讀 HTML 版本
直接開啟 `KnotLogic.html` 即可閱讀完整論文，包含數學公式渲染。

### 2. 使用動態閱讀器
開啟 `index.html` 會動態載入 `KnotLogic.md` 並渲染。

### 3. 重新轉換（如果修改了 Markdown）

#### 使用 Node.js 腳本：
```bash
npm install
npm run convert
```

#### 使用瀏覽器轉換器：
開啟 `convert.html`，點擊轉換按鈕即可。

## 特色功能

- ✅ 完整的 LaTeX 數學公式支援
- ✅ 圖片自動路徑處理
- ✅ Jekyll/Liquid 語法衝突解決
- ✅ 響應式設計
- ✅ 錯誤容忍機制
- ✅ GitHub Pages 相容

## 技術細節

- 使用 **MathJax 3.0** 渲染數學公式
- 使用 **marked.js** 解析 Markdown
- 自動處理 `{{}}` 語法衝突
- 支援多種數學分隔符：`$...$`, `$$...$$`, `\(...\)`, `\[...\]`