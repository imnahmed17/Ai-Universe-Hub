const loadAiCards = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiCards(data.data.tools, dataLimit);
}

const displayAiCards = (aiCards, dataLimit) => {
    // console.log(aiCards);
    // display all ai cards
    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent = '';
    aiCards.forEach(aiCard => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${aiCard.image}" class="card-img-top rounded-3" alt="..." style="height: 50%;">
            <div class="card-body h-25">
                <h5 class="card-title fw-bold">Features</h5>
                <p>${aiCard.features.map(feature => `<li type="1" class="text-dark-emphasis">${feature}</li>`).join('')}</p>
            </div>
            <div class="card-body h-25">
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title fw-bold">${aiCard.name}</h5>
                        <p><i class="bi bi-calendar4-week"></i>&nbsp; ${aiCard.published_in}</p>
                    </div>
                    <div>
                        <button  href="#" class="border-0 rounded-circle px-2 py-1 bg-danger bg-opacity-10" data-bs-toggle="modal" data-bs-target="#aiCardDetailModal"><i class="bi bi-arrow-right text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
}



loadAiCards();