function performReplacementsOnElement(element, wordReplacements) {
    element.childNodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const originalText = node.nodeValue;
        let modifiedText = originalText;
        
        wordReplacements.forEach(function (rep) {
          const targetWord = new RegExp("\\b" + rep.target + "\\b", "gi");
          modifiedText = modifiedText.replace(targetWord, rep.replacement);
        });
        
        if (modifiedText !== originalText) {
          node.nodeValue = modifiedText;
        }
      }
    });
  }
  
  function performReplacements(wordReplacements) {
    const elements = document.querySelectorAll("*:not(script):not(noscript):not(style)");
    
    elements.forEach(function (element) {
      performReplacementsOnElement(element, wordReplacements);
    });
  
    // Set up MutationObserver to handle dynamic content
    const observer = new MutationObserver(function (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === Node.TEXT_NODE) {
              performReplacementsOnElement(node.parentNode, wordReplacements);
            }
          });
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  browser.storage.local.get("wordReplacements").then(function (result) {
    const wordReplacements = result.wordReplacements || [];
    performReplacements(wordReplacements);
    
    // Listen for changes in storage and update replacements if needed
    browser.storage.onChanged.addListener(function (changes) {
      if (changes.wordReplacements) {
        performReplacements(changes.wordReplacements.newValue || []);
      }
    });
  });
  