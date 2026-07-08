// Aurora PDF 學習筆記排版系統應用程式邏輯

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM 元素 ---
  const editorTextarea = document.getElementById('editor-textarea');
  const docContent = document.getElementById('doc-content');
  const docHeader = document.getElementById('doc-header');
  const docFooter = document.getElementById('doc-footer');
  const headerTextSpan = document.querySelector('.header-text');
  const charCount = document.getElementById('char-count');
  const readTimeStats = document.getElementById('read-time-stats');
  
  // 側邊欄控制項
  const modeMd = document.getElementById('mode-md');
  const modePlain = document.getElementById('mode-plain');
  const themeCards = document.querySelectorAll('.theme-card');
  const inputFontSize = document.getElementById('input-font-size');
  const valFontSize = document.getElementById('val-font-size');
  const inputLineHeight = document.getElementById('input-line-height');
  const valLineHeight = document.getElementById('val-line-height');
  const inputParaGap = document.getElementById('input-para-gap');
  const valParaGap = document.getElementById('val-para-gap');
  const inputMargins = document.getElementById('input-margins');
  const inputPaperColor = document.getElementById('input-paper-color');
  const inputAccentColor = document.getElementById('input-accent-color');
  const toggleHeader = document.getElementById('toggle-header');
  const headerTextContainer = document.getElementById('header-text-container');
  const inputHeaderText = document.getElementById('input-header-text');
  const toggleFooter = document.getElementById('toggle-footer');
  const toggleCoverPage = document.getElementById('toggle-cover-page');
  
  // 編輯器工具列與功能按鈕
  const toolbarBtns = document.querySelectorAll('.toolbar-btn');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const btnImport = document.getElementById('btn-import');
  const btnPrint = document.getElementById('btn-print');
  const btnClear = document.getElementById('btn-clear');
  const btnLoadSample = document.getElementById('btn-load-sample');
  const paperPreview = document.getElementById('paper-preview');

  // --- 常量與設定對照表 ---
  const marginsMap = {
    narrow: '15mm',
    normal: '25mm',
    wide: '35mm'
  };

  const paperColorsMap = {
    white: { bg: '#ffffff', text: '#111111' },
    ivory: { bg: '#fbf9f5', text: '#2b2b2b' },
    'cool-gray': { bg: '#f3f4f6', text: '#1f2937' },
    bookish: { bg: '#f4ede2', text: '#372f25' }
  };

  const accentColorsMap = {
    charcoal: '#222222',
    'royal-navy': '#1d4ed8',
    emerald: '#0f766e',
    burgundy: '#881337',
    ochre: '#b45309'
  };

  // 預設高質感學習筆記範本 (Markdown)
  const sampleMarkdown = `# 記憶心理學與高效學習法
## 探討人類記憶機制與對應的學習策略

本講義旨在整理記憶機制的科學基礎，並引導學習者使用「康乃爾筆記法」與「主動回想」來大幅提升吸收效率。

### 1. 記憶的三大核心階段

學習並非單純的讀書，而是包含以下三個大腦處理階段：
1. **編碼 (Encoding)**：接收新知識並轉譯為大腦可理解的訊號。
2. **鞏固 (Consolidation)**：將短期記憶轉化為長期記憶的核心過程（通常在睡眠時進行）。
3. **檢索 (Retrieval)**：當需要時，將記憶提取到意識中。

> [!NOTE]
> 💡 核心觀念：
> 記憶的強弱取決於**檢索的難度**。主動從大腦提取記憶（例如自我測驗、寫練習題），比起重複閱讀課本，能更有效地增強突觸連結，這稱為「主動回想 (Active Recall)」。

---
## 康乃爾筆記的應用

康乃爾筆記法是公認最高效的學習架構，它將頁面垂直分割為「左側關鍵字」與「右側筆記本」。

* **左邊欄 (Cue Column)**：在複習時填入問題或關鍵詞（在此主題中，為二級標題 \`##\`）。
* **右邊欄 (Notes Column)**：課堂中或讀書時記錄的詳細內容（在此主題中，為標題底下的段落）。
* **底部欄 (Summary)**：用一兩句話總結本頁的核心觀念。

> [!WARNING]
> ⚠️ 易錯注意事項：
> 許多人習慣在筆記中「抄錄整段話」。這會降低大腦的編碼效率。請務必使用「自己的話」進行重新詮釋與縮寫！

---
## 實證學習效益對比

以下是不同學習方法在長期保存記憶（7天後複習）時的實驗成效對比：

| 學習方法分類 | 24小時後記憶保留率 | 7天後複習所需時間 | 大腦編碼深度 |
| :--- | :---: | :---: | :---: |
| 被動重讀課本 | 15% | 較長 (需要重讀) | 淺層編碼 |
| 製作字卡測驗 | 55% | 中等 | 中度編碼 |
| 主動回想 + 間隔重複 | 80% | 極短 (僅看關鍵字) | 深層編碼 |

> [!EXAMPLE]
> ✅ 精選範例：
> 假設今天你要學習「費曼學習法」：
> 1. 選擇一個你想理解的概念。
> 2. 嘗試用「教導一個八歲小孩」的直白口吻解釋它。
> 3. 找出自己卡殼、解釋不通的地方，回到課本重新理解。
> 4. 簡化你的說明，並使用生動的比喻。

---
## 知識總結與回顧

透過使用本工具的各類主題，您可以將混亂的筆記轉換為清晰的講義。

> [!SUMMARY]
> 📝 本章總結：
> 1. 拒絕被動重讀，以「主動檢索」作為主要學習手段。
> 2. 使用康乃爾筆記將「關鍵問題」與「詳細解答」分離，方便進行自我測試。
> 3. 利用寬邊距手寫留白風格列印講義，隨時用筆記下大腦的新思考。`;

  const samplePlainText = `記憶心理學與高效學習法
純文字講義筆記

本講義旨在整理記憶機制的科學基礎，並引導學習者使用「康乃爾筆記法」與「主動回想」來大幅提升吸收效率。

學習的三大核心階段：
1. 編碼 (Encoding)：接收新知識並轉譯為大腦可理解的訊號。
2. 鞏固 (Consolidation)：將短期記憶轉化為長期記憶的核心過程（通常在睡眠時進行）。
3. 檢索 (Retrieval)：當需要時，將記憶提取到意識中。

手動分頁測試：
如果您在獨立的一行中插入三個減號，就可以將前後文字分成不同的 PDF 頁面：
---
這裡是第二頁的內容。

大腦記憶的核心觀念：
記憶的強弱取決於「檢索的難度」。主動從大腦提取記憶（例如自我測驗、寫練習題），比起重複閱讀課本，能更有效地增強大腦神經元連結。

這就是主動回想（Active Recall）的科學原理。`;

  // --- 本地快取與設定載入 ---
  function saveWorkspaceState() {
    localStorage.setItem('aurora_editor_text', editorTextarea.value);
    localStorage.setItem('aurora_text_mode', document.querySelector('input[name="text-mode"]:checked').value);
    
    const activeThemeCard = document.querySelector('.theme-card.active');
    if (activeThemeCard) {
      localStorage.setItem('aurora_active_theme', activeThemeCard.dataset.theme);
    }
    
    localStorage.setItem('aurora_font_size', inputFontSize.value);
    localStorage.setItem('aurora_line_height', inputLineHeight.value);
    localStorage.setItem('aurora_para_gap', inputParaGap.value);
    localStorage.setItem('aurora_margins', inputMargins.value);
    localStorage.setItem('aurora_paper_color', inputPaperColor.value);
    localStorage.setItem('aurora_accent_color', inputAccentColor.value);
    localStorage.setItem('aurora_header_toggle', toggleHeader.checked);
    localStorage.setItem('aurora_header_text', inputHeaderText.value);
    localStorage.setItem('aurora_footer_toggle', toggleFooter.checked);
    localStorage.setItem('aurora_cover_page', toggleCoverPage.checked);
  }

  function loadWorkspaceState() {
    const savedText = localStorage.getItem('aurora_editor_text');
    const savedMode = localStorage.getItem('aurora_text_mode');
    const savedTheme = localStorage.getItem('aurora_active_theme');
    const savedFontSize = localStorage.getItem('aurora_font_size');
    const savedLineHeight = localStorage.getItem('aurora_line_height');
    const savedParaGap = localStorage.getItem('aurora_para_gap');
    const savedMargins = localStorage.getItem('aurora_margins');
    const savedPaperColor = localStorage.getItem('aurora_paper_color');
    const savedAccentColor = localStorage.getItem('aurora_accent_color');
    const savedHeaderToggle = localStorage.getItem('aurora_header_toggle');
    const savedHeaderText = localStorage.getItem('aurora_header_text');
    const savedFooterToggle = localStorage.getItem('aurora_footer_toggle');
    const savedCoverPage = localStorage.getItem('aurora_cover_page');

    if (savedText !== null) editorTextarea.value = savedText;
    else editorTextarea.value = sampleMarkdown;

    if (savedMode) {
      document.querySelectorAll('input[name="text-mode"]').forEach(radio => {
        if (radio.value === savedMode) {
          radio.checked = true;
          const parentLabel = radio.closest('.radio-option');
          document.querySelectorAll('.radio-option').forEach(el => el.classList.remove('active'));
          if (parentLabel) parentLabel.classList.add('active');
        }
      });
    }

    if (savedTheme) {
      themeCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.theme === savedTheme) {
          card.classList.add('active');
          paperPreview.className = 'paper-page';
          paperPreview.classList.add(`theme-${savedTheme}`);
        }
      });
    } else {
      // 預設為康乃爾主題
      paperPreview.className = 'paper-page theme-cornell';
    }

    if (savedFontSize) inputFontSize.value = savedFontSize;
    if (savedLineHeight) inputLineHeight.value = savedLineHeight;
    if (savedParaGap) inputParaGap.value = savedParaGap;
    if (savedMargins) inputMargins.value = savedMargins;
    if (savedPaperColor) inputPaperColor.value = savedPaperColor;
    if (savedAccentColor) inputAccentColor.value = savedAccentColor;
    if (savedHeaderToggle !== null) toggleHeader.checked = (savedHeaderToggle === 'true');
    if (savedHeaderText !== null) inputHeaderText.value = savedHeaderText;
    if (savedFooterToggle !== null) toggleFooter.checked = (savedFooterToggle === 'true');
    if (savedCoverPage !== null) toggleCoverPage.checked = (savedCoverPage === 'true');
  }

  // --- 核心解析與佈局引擎 ---

  // 將 HTML 進行康乃爾佈局重整 (將 H2 與其後的內容包裝為 Cue-Notes 欄位)
  function restructureToCornell(rawHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    const children = Array.from(doc.body.children);
    
    const container = doc.createElement('div');
    container.className = 'cornell-container';
    
    let currentRow = null;
    let currentNotes = null;
    
    children.forEach(child => {
      if (child.tagName === 'H2') {
        currentRow = doc.createElement('div');
        currentRow.className = 'cornell-row';
        
        const cue = doc.createElement('div');
        cue.className = 'cornell-cue';
        
        // 將 H2 放進左側關鍵字欄
        cue.appendChild(child.cloneNode(true));
        currentRow.appendChild(cue);
        
        currentNotes = doc.createElement('div');
        currentNotes.className = 'cornell-notes';
        currentRow.appendChild(currentNotes);
        
        container.appendChild(currentRow);
      } else {
        if (!currentRow) {
          // 在第一個 H2 出現之前的內容（例如大標題、引言），放在全寬的 row 中
          const fullRow = doc.createElement('div');
          fullRow.className = 'cornell-row full-width';
          const notes = doc.createElement('div');
          notes.className = 'cornell-notes';
          notes.appendChild(child.cloneNode(true));
          fullRow.appendChild(notes);
          container.appendChild(fullRow);
        } else {
          // 後續段落、表格、清單放入右側筆記欄
          currentNotes.appendChild(child.cloneNode(true));
        }
      }
    });
    
    return container.outerHTML;
  }

  // 解析編輯器內容並渲染為 HTML
  function parseContent() {
    const text = editorTextarea.value;
    
    // 計算字數與閱讀時間
    const charLen = text.length;
    charCount.textContent = `${charLen} 個字元`;
    const minutes = Math.ceil(charLen / 350);
    readTimeStats.innerHTML = `<i data-lucide="clock" style="width: 13px; height: 13px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>估計閱讀時間: ${charLen > 0 ? minutes : 0} 分鐘`;

    const activeMode = document.querySelector('input[name="text-mode"]:checked').value;
    const activeThemeCard = document.querySelector('.theme-card.active');
    const activeTheme = activeThemeCard ? activeThemeCard.dataset.theme : 'cornell';
    
    let htmlContent = '';

    if (activeMode === 'markdown' && window.marked) {
      // 1. Markdown 轉 HTML
      let rawHtml = window.marked.parse(text);
      
      // 2. 解析標註/提示框 (Blockquotes with [!NOTE] etc.)
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(rawHtml, 'text/html');
      const blockquotes = parsedDoc.querySelectorAll('blockquote');
      
      blockquotes.forEach(bq => {
        const firstP = bq.querySelector('p');
        if (firstP) {
          const rawText = firstP.innerHTML.trim();
          
          if (rawText.startsWith('[!NOTE]') || rawText.startsWith('[!INFO]')) {
            bq.className = 'notice-box notice-note';
            firstP.innerHTML = `<span class="notice-title"><i data-lucide="sparkles"></i> 核心觀念</span>` + rawText.replace(/^\[!(NOTE|INFO)\]\s*(<br>)?/i, '');
          } else if (rawText.startsWith('[!WARNING]') || rawText.startsWith('[!CAUTION]')) {
            bq.className = 'notice-box notice-warning';
            firstP.innerHTML = `<span class="notice-title"><i data-lucide="alert-triangle"></i> 易錯注意事項</span>` + rawText.replace(/^\[!(WARNING|CAUTION)\]\s*(<br>)?/i, '');
          } else if (rawText.startsWith('[!SUCCESS]') || rawText.startsWith('[!EXAMPLE]')) {
            bq.className = 'notice-box notice-success';
            firstP.innerHTML = `<span class="notice-title"><i data-lucide="check-circle-2"></i> 精選範例</span>` + rawText.replace(/^\[!(SUCCESS|EXAMPLE)\]\s*(<br>)?/i, '');
          } else if (rawText.startsWith('[!SUMMARY]')) {
            bq.className = 'notice-box notice-summary';
            firstP.innerHTML = `<span class="notice-title"><i data-lucide="book-open"></i> 本章學習總結</span>` + rawText.replace(/^\[!SUMMARY\]\s*(<br>)?/i, '');
          }
        }
      });
      
      // 3. 處理分頁 <hr>
      const hrs = parsedDoc.querySelectorAll('hr');
      hrs.forEach(hr => {
        const breakDiv = document.createElement('div');
        breakDiv.className = 'page-break-indicator';
        breakDiv.innerHTML = `<span class="page-break-label"><i data-lucide="scissors"></i> 此處分頁 (PDF Page Break)</span>`;
        hr.parentNode.replaceChild(breakDiv, hr);
      });
      
      rawHtml = parsedDoc.body.innerHTML;

      // 4. 如果是康乃爾主題，重構 HTML 結構
      if (activeTheme === 'cornell') {
        htmlContent = restructureToCornell(rawHtml);
      } else {
        htmlContent = rawHtml;
      }
    } else {
      // 純文字模式解析
      const escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      const sections = escapedText.split(/\n---\n/);
      const parsedSectionsHtml = sections.map((sec, secIdx) => {
        const paragraphs = sec.split(/\n\s*\n/);
        const formattedParas = paragraphs.map(p => {
          if (!p.trim()) return '';
          const lineBreaks = p.replace(/\n/g, '<br>');
          return `<p>${lineBreaks}</p>`;
        }).join('');

        if (secIdx < sections.length - 1) {
          return formattedParas + `<div class="page-break-indicator"><span class="page-break-label"><i data-lucide="scissors"></i> 此處分頁 (PDF Page Break)</span></div>`;
        }
        return formattedParas;
      }).join('');

      if (activeTheme === 'cornell') {
        htmlContent = restructureToCornell(parsedSectionsHtml);
      } else {
        htmlContent = parsedSectionsHtml;
      }
    }

    docContent.innerHTML = htmlContent;

    // 重新載入動態生成的圖標
    if (window.lucide) {
      window.lucide.createIcons();
    }
    
    // 儲存進度
    saveWorkspaceState();
  }

  // 套用側邊欄樣式設定值
  function applyStyles() {
    const fontSize = inputFontSize.value;
    const lineHeight = inputLineHeight.value;
    const paraGap = inputParaGap.value;
    const marginKey = inputMargins.value;
    const paperKey = inputPaperColor.value;
    const accentKey = inputAccentColor.value;

    valFontSize.textContent = `${fontSize}px`;
    valLineHeight.textContent = lineHeight;
    valParaGap.textContent = `${paraGap}rem`;

    paperPreview.style.setProperty('--doc-font-size', `${fontSize}px`);
    paperPreview.style.setProperty('--doc-line-height', lineHeight);
    paperPreview.style.setProperty('--doc-para-gap', `${paraGap}rem`);
    paperPreview.style.setProperty('--doc-margin', marginsMap[marginKey]);
    
    const paperStyle = paperColorsMap[paperKey];
    paperPreview.style.setProperty('--doc-paper-color', paperStyle.bg);
    paperPreview.style.setProperty('--doc-text-color', paperStyle.text);
    
    const accentColor = accentColorsMap[accentKey];
    paperPreview.style.setProperty('--doc-accent-color', accentColor);

    // 頁首頁尾
    docHeader.style.display = toggleHeader.checked ? 'flex' : 'none';
    headerTextSpan.textContent = inputHeaderText.value || ' ';
    docFooter.style.display = toggleFooter.checked ? 'block' : 'none';
    headerTextContainer.style.display = toggleHeader.checked ? 'block' : 'none';

    // 動態切換類別，讓 CSS 能夠在列印時隱藏/顯示對應的分頁保留欄位
    if (toggleHeader.checked) {
      paperPreview.classList.remove('hide-header');
    } else {
      paperPreview.classList.add('hide-header');
    }

    if (toggleFooter.checked) {
      paperPreview.classList.remove('hide-footer');
    } else {
      paperPreview.classList.add('hide-footer');
    }

    // 封面頁模式
    if (toggleCoverPage.checked) {
      paperPreview.classList.add('cover-page-layout');
      document.body.classList.add('first-page-cover');
    } else {
      paperPreview.classList.remove('cover-page-layout');
      document.body.classList.remove('first-page-cover');
    }
    
    saveWorkspaceState();
  }

  // --- 編輯器工具列與快捷功能鍵 ---
  toolbarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      const startPos = editorTextarea.selectionStart;
      const endPos = editorTextarea.selectionEnd;
      const originalText = editorTextarea.value;
      const selectedText = originalText.substring(startPos, endPos);
      
      let insertedText = '';
      let placeholder = '';

      switch(tag) {
        case 'bold':
          placeholder = '粗體文字';
          insertedText = `**${selectedText || placeholder}**`;
          break;
        case 'italic':
          placeholder = '斜體文字';
          insertedText = `*${selectedText || placeholder}*`;
          break;
        case 'h2':
          placeholder = '關鍵標題';
          insertedText = `\n## ${selectedText || placeholder}\n`;
          break;
        case 'pagebreak':
          insertedText = `\n---\n`;
          break;
        case 'note':
          placeholder = '在此輸入觀念內容...';
          insertedText = `\n> [!NOTE]\n> 💡 核心觀念：${selectedText || placeholder}\n`;
          break;
        case 'warning':
          placeholder = '在此輸入注意事項...';
          insertedText = `\n> [!WARNING]\n> ⚠️ 易錯注意事項：${selectedText || placeholder}\n`;
          break;
        case 'example':
          placeholder = '在此輸入題目或範例...';
          insertedText = `\n> [!EXAMPLE]\n> ✅ 精選範例：${selectedText || placeholder}\n`;
          break;
        case 'summary':
          placeholder = '在此輸入章節總結...';
          insertedText = `\n> [!SUMMARY]\n> 📝 本章總結：${selectedText || placeholder}\n`;
          break;
      }

      editorTextarea.focus();

      // 使用 document.execCommand 插入文字以保留瀏覽器原生的 Ctrl+Z 復原歷程
      let inserted = false;
      try {
        inserted = document.execCommand('insertText', false, insertedText);
      } catch (err) {
        inserted = false;
      }

      if (!inserted) {
        // 後備方案 (會破壞復原歷史)
        editorTextarea.value = originalText.substring(0, startPos) + insertedText + originalText.substring(endPos);
        const cursorOffset = selectedText ? insertedText.length : (placeholder ? insertedText.indexOf(placeholder) + placeholder.length : insertedText.length);
        editorTextarea.selectionStart = startPos + cursorOffset;
        editorTextarea.selectionEnd = startPos + cursorOffset;
      } else {
        // execCommand 成功後，光標預設在尾端。
        // 如果原本沒有選取文字，且有設定 placeholder，我們將 placeholder 反白選取，方便使用者直接打字覆蓋
        if (!selectedText && placeholder) {
          const index = insertedText.indexOf(placeholder);
          if (index !== -1) {
            editorTextarea.selectionStart = startPos + index;
            editorTextarea.selectionEnd = startPos + index + placeholder.length;
          }
        }
      }
      
      parseContent();
    });
  });

  // --- 拖曳匯入與檔案載入 ---
  
  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      editorTextarea.value = e.target.result;
      
      // 自動根據副檔名切換模式
      if (file.name.endsWith('.md')) {
        document.getElementById('mode-md').click();
      } else if (file.name.endsWith('.txt')) {
        document.getElementById('mode-plain').click();
      }
      
      parseContent();
    };
    reader.readAsText(file);
  }

  // 點選檔案匯入
  btnImport.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
  });

  // 拖放檔案處理
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  ['dragleave', 'dragend', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('dragover');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  // --- 其他事件監聽器 ---

  editorTextarea.addEventListener('input', parseContent);

  document.getElementsByName('text-mode').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const parentLabel = e.target.closest('.radio-option');
      document.querySelectorAll('.radio-option').forEach(el => el.classList.remove('active'));
      parentLabel.classList.add('active');
      parseContent();
    });
  });

  // 切換排版風格
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      themeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const theme = card.dataset.theme;
      paperPreview.className = 'paper-page';
      paperPreview.classList.add(`theme-${theme}`);
      
      // 套用不同主題預設的數值偏好
      if (theme === 'cornell') {
        inputFontSize.value = 16;
        inputLineHeight.value = 1.6;
        inputParaGap.value = 1.0;
        inputAccentColor.value = 'charcoal';
        inputPaperColor.value = 'ivory';
        toggleHeader.checked = true;
        toggleFooter.checked = true;
      } else if (theme === 'lecture') {
        inputFontSize.value = 15;
        inputLineHeight.value = 1.6;
        inputParaGap.value = 1.2;
        inputAccentColor.value = 'royal-navy';
        inputPaperColor.value = 'white';
        toggleHeader.checked = true;
        toggleFooter.checked = true;
      } else if (theme === 'spacious') {
        inputFontSize.value = 16;
        inputLineHeight.value = 1.7;
        inputParaGap.value = 1.4;
        inputAccentColor.value = 'emerald';
        inputPaperColor.value = 'bookish';
        toggleHeader.checked = false;
        toggleFooter.checked = true;
      } else if (theme === 'academic') {
        inputFontSize.value = 16;
        inputLineHeight.value = 1.6;
        inputParaGap.value = 0.8;
        inputAccentColor.value = 'charcoal';
        inputPaperColor.value = 'ivory';
        toggleHeader.checked = true;
        toggleFooter.checked = true;
      } else if (theme === 'minimalist') {
        inputFontSize.value = 15;
        inputLineHeight.value = 1.6;
        inputParaGap.value = 1.4;
        inputAccentColor.value = 'charcoal';
        inputPaperColor.value = 'white';
        toggleHeader.checked = false;
        toggleFooter.checked = true;
      } else if (theme === 'corporate') {
        inputFontSize.value = 14;
        inputLineHeight.value = 1.5;
        inputParaGap.value = 1.2;
        inputAccentColor.value = 'royal-navy';
        inputPaperColor.value = 'cool-gray';
        toggleHeader.checked = true;
        toggleFooter.checked = true;
      }

      applyStyles();
      parseContent(); // 重新解析以套用康乃爾重組規則
    });
  });

  // 各滑桿與選單觸發樣式更新
  [inputFontSize, inputLineHeight, inputParaGap, inputMargins, inputPaperColor, inputAccentColor, toggleHeader, inputHeaderText, toggleFooter, toggleCoverPage].forEach(input => {
    input.addEventListener('input', applyStyles);
  });

  // 功能按鈕
  btnClear.addEventListener('click', () => {
    if (confirm('確定要清空所有輸入的內容嗎？')) {
      editorTextarea.value = '';
      parseContent();
      editorTextarea.focus();
    }
  });

  btnLoadSample.addEventListener('click', () => {
    const isMd = document.querySelector('input[name="text-mode"]:checked').value === 'markdown';
    editorTextarea.value = isMd ? sampleMarkdown : samplePlainText;
    parseContent();
  });

  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // --- 系統初始化 ---
  loadWorkspaceState();
  applyStyles();
  parseContent();
});
