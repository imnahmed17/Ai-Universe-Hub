const loadAiCards = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiCards(data.data.tools);
}

const displayAiCards = (aiCards) => {
    console.log(aiCards);
}



loadAiCards();