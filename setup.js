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
    
        // Create elements for the content
        const wordText = document.createElement("div");
        wordText.classList.add("word-text");
        wordText.textContent = `${rep.target} -> ${rep.replacement}`;
    
        const removeButton = document.createElement("button");
        removeButton.dataset.index = index;
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
    
        // Append the content elements to the listItem
        listItem.appendChild(wordText);
        listItem.appendChild(removeButton);
    
        // Add a click event listener to the removeButton
        initializeRemoveButton(listItem, index);
    
        // Append the listItem to the replacementList
        replacementList.appendChild(listItem);
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
            { target: "Li Qing yao", replacement: "Dahlia" },
            { target: "Zhang Cuihua", replacement: "Florence Franklin" },
            { target: "Tan Hong", replacement: "Julie Amberson" },
            { target: "Lu Chen", replacement: "Dustin Rhys" },
            { target: "Lu Changge", replacement: "Logan Rhys" },
            { target: "Cao Xuan", replacement: "Natasha Harmon" },
            { target: "Cao Xuanfei", replacement: "Natasha Harmon" },
            { target: "Cao Anan", replacement: "Ruth Harmon" },
            { target: "Cao Guan", replacement: "Hector Harmon" },
            { target: "Xiao Hongye", replacement: "Azalea" },
            { target: "Hong Niu", replacement: "Nelson" },
            { target: "Lao Zhang", replacement: "Cornelius" },
            { target: "Lei Wanju", replacement: "Ronald Reeds" },
            { target: "Jiang Baihe", replacement: "Gavin Killian" },
            { target: "Jiang Chengde", replacement: "Charless Killian" },
            { target: "Huang Yin Yin", replacement: "Abigail" },
            { target: "Zhou", replacement: "Derek Lester" },
            { target: "Bao'er", replacement: "Hailey" },
            { target: "Hong Qingxia", replacement: "Nikki Horst" },
            { target: "Venerable Ziyang", replacement: "Terry Doyle’s Master" },
            { target: "Bai Xiu", replacement: "Edith" },
            { target: "Dong Tianbao", replacement: "Terry Doyle" },
            { target: "Jiangnan", replacement: "Balerno" },
            { target: "Lei", replacement: "Ronald Reeds" },
            { target: "Su Hongtu", replacement: "Conrad" },
            { target: "Tianbang", replacement: "Heavenly Ranking" },
            { target: "Huangfu", replacement: "Hill" },
            { target: "Huangfu Longteng", replacement: "Paul Hill" },
            { target: "Huangfu Chun", replacement: "Spring Hill" },
            { target: "Huangfu Xia", replacement: "Summer Hill" },
            { target: "Huangfu Qiu", replacement: "Autumn Hill" },
            { target: "Huangfu Dong", replacement: "Winter Hill" },
            { target: "Huangfu Jie", replacement: "Patrick Hill" },
            { target: "Huangfu Xiong", replacement: "Torben Hill" },
            { target: "Huangfu Qingtian", replacement: "Jonas Hill" },
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
  