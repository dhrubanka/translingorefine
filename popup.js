document.addEventListener("DOMContentLoaded", function () {
    const addReplacementButton = document.getElementById("addReplacementButton");
    const newTargetWord = document.getElementById("newTargetWord");
    const newReplacementWord = document.getElementById("newReplacementWord");
    const replacementList = document.getElementById("replacementList");
  
    addReplacementButton.addEventListener("click", function () {
      const targetWord = newTargetWord.value.trim();
      const replacementWord = newReplacementWord.value.trim();
  
      if (targetWord && replacementWord) {
        browser.storage.local.get("wordReplacements").then(function (result) {
          const wordReplacements = result.wordReplacements || [];
          wordReplacements.push({ target: targetWord, replacement: replacementWord });
          browser.storage.local.set({ wordReplacements });
          newTargetWord.value = "";
          newReplacementWord.value = "";
          displayWordReplacements(wordReplacements);
        });
      }
    });
  
    function displayWordReplacements(replacements) {
      replacementList.innerHTML = "";
      replacements.forEach(function (rep) {
        const listItem = document.createElement("li");
        listItem.textContent = `${rep.target} -> ${rep.replacement}`;
        replacementList.appendChild(listItem);
      });
    }
  
    browser.storage.local.get("wordReplacements").then(function (result) {
      const wordReplacements = result.wordReplacements || [];
      displayWordReplacements(wordReplacements);
    });
  });
  