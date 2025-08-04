#!/usr/bin/env node

/**
 * KnotLogic Markdown to HTML Converter
 * 將 KnotLogic.md 轉換為靜態 HTML 檔案
 */

const fs = require('fs');
const path = require('path');

// 檢查是否安裝了 marked
let marked;
try {
    marked = require('marked');
} catch (e) {
    console.error('請先安裝 marked: npm install marked');
    process.exit(1);
}

function convertMarkdownToHTML() {
    try {
        // 讀取 Markdown 檔案
        const markdownPath = path.join(__dirname, 'KnotLogic.md');
        if (!fs.existsSync(markdownPath)) {
            throw new Error('找不到 KnotLogic.md 檔案');
        }
        
        console.log('正在讀取 KnotLogic.md...');
        const content = fs.readFileSync(markdownPath, 'utf8');
        
        console.log('正在處理內容...');
        // 處理圖片路徑
        let processedContent = content.replace(/!\[\]\(imgs\//g, '![](imgs/');
        
        // 處理 Jekyll/Liquid 模板語法衝突
        processedContent = processedContent.replace(/\{\{/g, '___DOUBLE_BRACE_OPEN___');
        processedContent = processedContent.replace(/\}\}/g, '___DOUBLE_BRACE_CLOSE___');
        
        console.log('正在轉換為 HTML...');
        // 轉換為 HTML
        const htmlBody = marked.parse(processedContent);
        
        // 恢復花括號
        const finalBody = htmlBody
            .replace(/___DOUBLE_BRACE_OPEN___/g, '{{')
            .replace(/___DOUBLE_BRACE_CLOSE___/g, '}}');
        
        // 創建完整的 HTML 文檔
        const fullHTML = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knot Logic</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script>
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                processEscapes: true,
                processEnvironments: true,
                formatError: (jax, err) => {
                    console.warn('MathJax error ignored:', err.message);
                    return jax;
                }
            },
            options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
            },
            startup: {
                ready: () => {
                    MathJax.startup.defaultReady();
                    // 自動渲染數學公式
                    MathJax.typesetPromise().catch(err => console.warn('Math rendering error:', err));
                }
            }
        };
    </script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        
        h1, h2, h3, h4, h5, h6 {
            margin: 30px 0 15px 0;
            color: #2c3e50;
        }
        
        h1 {
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
        }
        
        p { margin: 15px 0; }
        ul, ol { margin: 15px 0; padding-left: 30px; }
        li { margin: 8px 0; }
        
        blockquote {
            border-left: 4px solid #3498db;
            padding-left: 20px;
            margin: 20px 0;
            background: #f8f9fa;
            padding: 15px 20px;
            border-radius: 0 8px 8px 0;
        }
        
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        pre {
            background: #f8f8f8;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 20px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background: #f8f9fa;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            body { padding: 10px; }
        }
    </style>
</head>
<body>
${finalBody}
</body>
</html>`;
        
        // 寫入 HTML 檔案
        const outputPath = path.join(__dirname, 'KnotLogic.html');
        fs.writeFileSync(outputPath, fullHTML, 'utf8');
        
        console.log(`✅ 轉換完成！`);
        console.log(`📄 輸出檔案: ${outputPath}`);
        console.log(`📊 原始檔案大小: ${(content.length / 1024).toFixed(2)} KB`);
        console.log(`📊 HTML 檔案大小: ${(fullHTML.length / 1024).toFixed(2)} KB`);
        
    } catch (error) {
        console.error('❌ 轉換失敗:', error.message);
        process.exit(1);
    }
}

// 如果直接執行此腳本
if (require.main === module) {
    convertMarkdownToHTML();
}

module.exports = { convertMarkdownToHTML };
