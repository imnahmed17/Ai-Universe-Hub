const loadAiCards = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiCards(data.data.tools);
}

const displayAiCards = (aiCards) => {
    // console.log(aiCards);
    // display all ai cards
    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent = '';
    aiCards.forEach(aiCard => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${aiCard.image}" class="card-img-top" alt="..." style="height: 50%;">
            <div class="card-body h-25">
                <h5 class="card-title fw-bold">Features</h5>
                <p>${aiCard.features.map(feature => `<li type="1" class="text-dark-emphasis">${feature}</li>`).join('')}</p>
            </div>
            
        </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
}



loadAiCards();