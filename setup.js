document.addEventListener("DOMContentLoaded", async function () {
    const addReplacementButton = document.querySelector(".add-button");
    const setupForm = document.getElementById("setupForm");
    const replacementFields = document.getElementById("replacementFields");
    const replacementList = document.getElementById("replacementList");

    // Event listener for applying predefined list
    const applyPredefinedButton = document.querySelector(".apply-predefined");
    applyPredefinedButton.addEventListener("click", applyUnderstatedDominanceCharacters);

    addReplacementButton.addEventListener("click", function () {
      const newFields = document.createElement("div");
      newFields.classList.add("input-group");
      newFields.innerHTML = `
        <input type="text" placeholder="Target word" class="targetWord">
        <input type="text" placeholder="Replacement word" class="replacementWord">
        <button type="button" class="minus-button">-</button>
      `;
      setupForm.insertBefore(newFields, setupForm.lastElementChild);
      initializeMinusButton(newFields);
      initializeRemoveButton(newFields);
    });
  
    setupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const newWordReplacements = [];
      const inputGroups = document.querySelectorAll(".input-group");
  
      inputGroups.forEach(function (inputGroup) {
        const targetInput = inputGroup.querySelector(".targetWord");
        const replacementInput = inputGroup.querySelector(".replacementWord");
  
        const target = targetInput.value.trim();
        const replacement = replacementInput.value.trim();
  
        if (target && replacement) {
          newWordReplacements.push({ target, replacement });
        }
      });
  
      if (newWordReplacements.length > 0) {
        const existingWordReplacements = await browser.storage.local.get("wordReplacements");
        const mergedWordReplacements = [...(existingWordReplacements.wordReplacements || []), ...newWordReplacements];
  
        browser.storage.local.set({ wordReplacements: mergedWordReplacements });
  
        // Clear input fields after saving
        inputGroups.forEach(function (inputGroup) {
          const targetInput = inputGroup.querySelector(".targetWord");
          const replacementInput = inputGroup.querySelector(".replacementWord");
          targetInput.value = "";
          replacementInput.value = "";
        });
  
        // Update displayed word replacements
        displayWordReplacements(mergedWordReplacements);
      }
    });
  
    function displayWordReplacements(replacements) {
      replacementList.innerHTML = "";
      replacements.forEach(function (rep, index) {
        const listItem = document.createElement("div");
        listItem.classList.add("word-item");
        listItem.innerHTML = `
          <div class="word-text">${rep.target} -> ${rep.replacement}</div>
          <button data-index="${index}" class="remove-button">Remove</button>
        `;
        replacementList.appendChild(listItem);
        initializeRemoveButton(listItem, index);
      });
    }
  
    async function initializeMinusButton(inputGroup) {
      const minusButton = inputGroup.querySelector(".minus-button");
      
      minusButton.addEventListener("click", function () {
        inputGroup.remove();
      });
    }
  
    async function initializeRemoveButton(listItem, index) {
      const removeButton = listItem.querySelector(".remove-button");
      
      removeButton.addEventListener("click", async function () {
        const existingWordReplacements = await browser.storage.local.get("wordReplacements");
        existingWordReplacements.wordReplacements.splice(index, 1);
        
        await browser.storage.local.set({ wordReplacements: existingWordReplacements.wordReplacements });
        
        // Refresh the displayed word replacements
        const refreshedWordReplacements = await browser.storage.local.get("wordReplacements");
        displayWordReplacements(refreshedWordReplacements.wordReplacements || []);
      });
    }
    async function applyUnderstatedDominanceCharacters() {
        // Predefined list: The Understated Dominance Characters
        const understatedDominanceCharactersList = [
            { target: "Li Qing Yao", replacement: "Dahlia" },
            { target: "Lu Chen", replacement: "Dustin" },
            { target: "Cao Xuan", replacement: "Natasha" },
            { target: "Xiao Hongye", replacement: "Azalea" },
            { target: "Hong Niu", replacement: "Nelson" },
            { target: "Lao Zhang", replacement: "Cornelius" },
            { target: "Lei Wanju", replacement: "Ronald Reeds" },
            { target: "Jiang Baihe", replacement: "Gavin Killian" },
            { target: "Jiang Chengde", replacement: "Charless Killian" },
            { target: "Huang Fu Longten", replacement: "Paul Hill" },
            { target: "Huangfu Chun", replacement: "Spring Hill" },
            { target: "Huangfu Xiong", replacement: "Torben Hill" },
            { target: "Huang Fu Qiu", replacement: "Autumn Hill" },
            { target: "Huang Yin Yin", replacement: "Abigail" },
            { target: "Zhou", replacement: "Derek Lester" },
            { target: "Bao'er", replacement: "Hailey" }
          ];
          
          const existingWordReplacements = await browser.storage.local.get("wordReplacements");
          const mergedWordReplacements = [...(existingWordReplacements.wordReplacements || [])];
        
          // Check if each predefined character is already in the list before adding
          let allCharactersExist = true;
          understatedDominanceCharactersList.forEach(predefinedCharacter => {
            const exists = mergedWordReplacements.some(rep => rep.target === predefinedCharacter.target);
            if (!exists) {
              allCharactersExist = false;
              mergedWordReplacements.push(predefinedCharacter);
            }
          });
        
          // Update storage
          await browser.storage.local.set({ wordReplacements: mergedWordReplacements });
        
          // Update displayed word replacements
          displayWordReplacements(mergedWordReplacements);
        
          // Display alert if all predefined characters are already in the user's list
          if (allCharactersExist) {
            alert("All predefined characters are already in your list.");
          }
      }

    const existingWordReplacements = await browser.storage.local.get("wordReplacements");
    displayWordReplacements(existingWordReplacements.wordReplacements || []);
  });
  