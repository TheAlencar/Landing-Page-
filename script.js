document.querySelector('.btn').addEventListener('click', () => {
    window.scrollTo({
        // Corrigido para rolar até a galeria de jogos, que é o destino de 'JOGUE AGORA!'
        top: document.querySelector('#galeria').offsetTop, 
        behavior: 'smooth'
    });
});

// Seleciona todos os itens da lista de benefícios
const itensBeneficio = document.querySelectorAll('.beneficio-item');

// Percorre a lista de itens e adiciona um "ouvinte de evento" de clique a cada um
itensBeneficio.forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('ativo');
    });
});

// ===================================
// LÓGICA DO PLAYER DE VÍDEO E LISTA
// ===================================

// Seletores do Modal
const jogoCards = document.querySelectorAll('.jogo-card');
const modal = document.getElementById('videoModal');
const fecharBtn = document.querySelector('.close-btn');
const videoPlayer = document.getElementById('videoPlayer');
const videoListContainer = document.getElementById('videoList');
const videoListTitle = document.getElementById('videoListTitle');
const ctaButtons = document.querySelectorAll('.card-cta'); // NOVO: Seleciona todos os CTAs

// Dados dos vídeos (mantido do seu código)
const VIDEOS_DO_JOGO = {
    "Valorant": [
        { title: "20 Minutes of Satisfying Valorant Clips", channel: "Rawzu", id: "mfBoy9PyqR8", url: "http://www.youtube.com/watch?v=mfBoy9PyqR8" },
        { title: "VALORANT pros fall for the oldest trick in the book", channel: "VALORANT", id: "CIUJdaLjSCI", url: "http://www.youtube.com/watch?v=CIUJdaLjSCI" },
        { title: "10 Minutes of Satisfying Gameplay", channel: "Narwax", id: "GCWkjdE8TQw", url: "https://www.youtube.com/watch?v=GCWkjdE8TQw" }
    ],
    "League of Legends": [
        { title: "Faker's CLEANEST AHRI Play of ALL TIME! #leagueoflegends", channel: "skillcapped", id: "2v3C7y5xu84", url: "https://www.youtube.com/shorts/2v3C7y5xu84" },
        { title: "When LOL Players Have MASSIVE Brains... 200 IQ PLAYS MONTAGE (League of Legends)", channel: "Protatomonster", id: "0m3O1TYzJE0", url: "https://www.youtube.com/watch?v=0m3O1TYzJE0" },
        { title: "50 ULTRA SATISFYING MOMENTS IN LEAGUE OF LEGENDS", channel: "Protatomonster", id: "_JWJgS00hfk", url: "https://www.youtube.com/watch?v=_JWJgS00hfk" }
    ],
    "Counter-Strike 2": [
        { title: "CS2 INSANE PRO MOMENTS 2025🤯 (Highlights)", channel: "LikeARoss", id: "MFU6AGjVFWs", url: "https://www.youtube.com/watch?v=MFU6AGjVFWs" },
        { title: "1 in a Million CS2 Moments", channel: "Virre CS2", id: "4qEdIXLdxMo", url: "http://www.youtube.com/watch?v=T6b4lD4qP3o" },
        { title: "Decidi voltar a jogar de AWP na MIRAGE e esse foi o resultado...", channel: "fallenInsider", id: "IcBUgSor6k0", url: "https://www.youtube.com/watch?v=IcBUgSor6k0" }
    ]
};

// Função para fechar o modal (e parar o vídeo)
function fecharModal() {
    videoPlayer.src = ''; 
    modal.style.display = 'none';
}

// Eventos de Fechar Modal
fecharBtn.addEventListener('click', fecharModal);
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        fecharModal();
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        fecharModal();
    }
});

// Função principal para carregar o player
function loadVideo(videoId) {
    const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoPlayer.src = videoURL;
}

// Função para gerar a lista de vídeos
function generateVideoList(gameName) {
    // ... Seu código de geração de lista aqui ... (sem alterações)
    const videos = VIDEOS_DO_JOGO[gameName];
    if (!videos || videos.length === 0) {
        videoListContainer.innerHTML = "<p style='color:#ccc; margin-top:10px;'>Nenhum vídeo encontrado.</p>";
        return;
    }

    let listHTML = '';
    videos.forEach((video, index) => {
        const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/default.jpg`;

        listHTML += `
            <div class="video-list-item" data-video-id="${video.id}">
                <img src="${thumbnailUrl}" alt="${video.title}" style="width: 60px; height: 45px; margin-right: 15px; border-radius: 3px;">
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>Canal: ${video.channel}</p>
                </div>
            </div>
        `;
    });

    videoListContainer.innerHTML = listHTML;
    
    // Adiciona evento de clique a cada item da nova lista
    document.querySelectorAll('.video-list-item').forEach(item => {
        item.addEventListener('click', function() {
            const newVideoId = this.getAttribute('data-video-id');
            loadVideo(newVideoId);
        });
    });
}


// ===================================
// LÓGICA DE ABERTURA DO MODAL (CARD PRINCIPAL)
// ===================================
jogoCards.forEach(card => {
    card.addEventListener('click', function() {
        // Pega o nome do jogo do <p> dentro do card
        const gameName = this.querySelector('p').textContent;
        
        // 1. Carrega o primeiro vídeo da lista no player principal
        const firstVideo = VIDEOS_DO_JOGO[gameName][0];
        loadVideo(firstVideo.id);

        // 2. Gera e exibe a lista de vídeos
        videoListTitle.textContent = `Lista de Vídeos: ${gameName}`;
        generateVideoList(gameName);
        
        // 3. Exibe o modal
        modal.style.display = 'block';
    });
});


// ===================================
// LÓGICA DE CADASTRO (NOVO CTA)
// ===================================
ctaButtons.forEach(cta => {
    cta.addEventListener('click', function(event) {
        // MUITO IMPORTANTE: Impede que o clique suba para o card principal
        // e abra o modal de vídeo.
        event.stopPropagation();

        // Pega o elemento pai (.jogo-card)
        const parentCard = this.closest('.jogo-card');
        
        // Pega a URL do atributo 'data-registration-url' do elemento pai
        const url = parentCard.getAttribute('data-registration-url');
        
        if (url) {
            // Redireciona para a página de cadastro em uma nova aba
            window.open(url, '_blank');
        }
    });
});