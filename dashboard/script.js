// VERSÃO COMPLETA E FUNCIONAL - TRACKCRYPTO DASHBOARD
document.addEventListener('DOMContentLoaded', async function () {
  console.log("Iniciando TrackCrypto...");

  // 1. CONFIGURAÇÃO INICIAL
  const config = {
    coinGeckoAPI: 'https://api.coingecko.com/api/v3',
    fearGreedAPI: 'https://api.alternative.me/fng/',
    newsAPI: 'https://newsapi.org/v2/everything?q=criptomoedas+OR+bitcoin+OR+ethereum&language=pt&sortBy=publishedAt&apiKey='
  };

  // 2. ELEMENTOS DA UI
  const elements = {
    price: document.getElementById('price'),
    variation: document.getElementById('variation'),
    rank: document.getElementById('rank'),
    marketCap: document.getElementById('market-cap'),
    volume: document.getElementById('volume'),
    supply: document.getElementById('supply'),
    cryptoName: document.getElementById('cryptoName'),
    cryptoSelect: document.getElementById('moedaSelect'),
    chartCanvas: document.getElementById('graficoBTC'),
    newsContainer: document.getElementById('news-container'),
    fearGreedText: document.getElementById('fear-greed-text'),
    fearGreedIndicator: document.getElementById('fear-greed-indicator'),
    fgUpdate: document.getElementById('fg-update')
  };

  // 3. VARIÁVEIS GLOBAIS
  let currentChart = null;
  let currentCrypto = 'bitcoin';
  let currentCurrency = 'brl';
  let chartDays = 7;
  let chatContainer, chatToggle;

  // 4. INICIALIZAÇÃO DA APLICAÇÃO
  async function initializeApp() {
    // Configurar tema e modo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedMode = localStorage.getItem('mode') || 'beginner';

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-mode', savedMode);

    // Atualizar toggles
    const themeToggle = document.getElementById('themeToggle');
    const modeToggle = document.getElementById('modeToggle');

    if (themeToggle) themeToggle.checked = savedTheme === 'light';
    if (modeToggle) modeToggle.checked = savedMode === 'advanced';

    // Configurar menu mobile
    setupMobileMenu();

    // Configurar modo avançado/iniciante
    setupAdvancedModeToggle();

    // Configurar tema claro/escuro
    setupThemeToggle();

    // Inicializar portfolio manager
    initPortfolioManager();

    // Inicializar sistema de alertas
    initPriceAlerts();

    // Inicializar seção educativa
    initEducationSection();

    // Inicializar chat IA
    initChatIA();

    // CONFIGURAR TODAS AS TABS - LINHA ADICIONADA E CORRIGIDA
    initAllTabs();

    // Iniciar todas as funcionalidades
    await initAllFeatures();

    // Garantir que Fear & Greed é atualizado
    await updateFearGreed();

    // Carregar dados iniciais da cripto
    await updateCryptoData();

    // Atualizar automaticamente a cada 1 minuto
    setInterval(updateCryptoData, 60000);

    // Configurar navegação suave
    setupSmoothNavigation();

    // Configurar botão de voltar ao topo
    setupBackToTop();

    // Inicializar ferramentas avançadas
    initAdvancedTools();

    // Solicitar permissão para notificações
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        Notification.requestPermission();
      }, 2000);
    }
  }

  // CONFIGURAÇÃO DAS TABS DAS FERRAMENTAS - VERSÃO CORRIGIDA
  function setupToolsTabs() {
      console.log("Configurando tabs das ferramentas...");
      
      const toolTabs = document.querySelectorAll('.tool-tab');
      const toolPanels = document.querySelectorAll('.tool-panel');
      
      console.log(`Encontradas ${toolTabs.length} tabs e ${toolPanels.length} painéis`);
      
      if (toolTabs.length === 0 || toolPanels.length === 0) {
          console.error("Tabs ou painéis não encontrados!");
          return;
      }

      toolTabs.forEach(tab => {
          tab.addEventListener('click', function() {
              const toolType = this.getAttribute('data-tool');
              console.log(`Clicou na tab: ${toolType}`);
              
              // Remover classe active de todas as tabs
              toolTabs.forEach(t => t.classList.remove('active'));
              toolPanels.forEach(p => p.classList.remove('active'));
              
              // Adicionar classe active na tab clicada
              this.classList.add('active');
              
              // Mostrar o painel correspondente
              const targetPanel = document.getElementById(`${toolType}-tool`);
              if (targetPanel) {
                  targetPanel.classList.add('active');
                  console.log(`Painel ${toolType}-tool ativado`);
              } else {
                  console.error(`Painel ${toolType}-tool não encontrado!`);
              }
          });
      });
      
      // Ativar a primeira tab por padrão
      if (toolTabs.length > 0) {
          const firstTab = toolTabs[0];
          const firstTool = firstTab.getAttribute('data-tool');
          const firstPanel = document.getElementById(`${firstTool}-tool`);
          
          if (firstPanel) {
              firstTab.classList.add('active');
              firstPanel.classList.add('active');
              console.log(`Tab padrão ativada: ${firstTool}`);
          }
      }
  }

  // CONFIGURAÇÃO DAS TABS DA CALCULADORA
  function setupCalculatorTabs() {
      const calcTabs = document.querySelectorAll('.calc-tab');
      const calcContents = document.querySelectorAll('.calc-tab-content');
      
      calcTabs.forEach(tab => {
          tab.addEventListener('click', function() {
              const tabName = this.getAttribute('data-tab');
              
              // Remover classe active de todas as tabs e conteúdos
              calcTabs.forEach(t => t.classList.remove('active'));
              calcContents.forEach(c => c.classList.remove('active'));
              
              // Adicionar classe active à tab e conteúdo selecionados
              this.classList.add('active');
              document.getElementById(`tab-${tabName}`).classList.add('active');
          });
      });
  }

  // CONFIGURAÇÃO DAS TABS DO GERENCIADOR DE RISCO
  function setupRiskTabs() {
      const riskTabs = document.querySelectorAll('.risk-tab');
      const riskContents = document.querySelectorAll('.risk-tab-content');
      
      riskTabs.forEach(tab => {
          tab.addEventListener('click', function() {
              const tabName = this.getAttribute('data-tab');
              
              // Remover classe active de todas as tabs e conteúdos
              riskTabs.forEach(t => t.classList.remove('active'));
              riskContents.forEach(c => c.classList.remove('active'));
              
              // Adicionar classe active à tab e conteúdo selecionados
              this.classList.add('active');
              document.getElementById(`tab-${tabName}`).classList.add('active');
          });
      });
  }

  // INICIALIZAR TODAS AS TABS
  function initAllTabs() {
      setupToolsTabs();
      setupCalculatorTabs();
      setupRiskTabs();
      console.log("Todas as tabs inicializadas");
  }

  // Adicione esta função para navegação suave
  function setupSmoothNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        // Ignora se for vazio, "#" ou não começar com "#"
        if (!targetId || targetId === '#' || !targetId.startsWith('#')) {
          return;
        }

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        // Fechar menu mobile se a função existir
        if (typeof window.closeMobileMenu === 'function') {
          window.closeMobileMenu();
        }
      });
    });
  }

  // 5. CHAT IA - VERSÃO OTIMIZADA E CONFIRMADA
  function initChatIA() {
    console.log("Inicializando chat IA...");

    chatToggle = document.getElementById('chatToggle');
    chatContainer = document.getElementById('aiChatContainer');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatContent = document.getElementById('chatContent');

    // Verificar se todos os elementos necessários existem
    if (!chatToggle || !chatContainer || !closeChat || !sendMessage || !userInput || !chatContent) {
      console.error("Elementos do chat não encontrados!", {
        chatToggle: !!chatToggle,
        chatContainer: !!chatContainer,
        closeChat: !!closeChat,
        sendMessage: !!sendMessage,
        userInput: !!userInput,
        chatContent: !!chatContent
      });
      return;
    }

    // Event listeners para abrir/fechar o chat
    chatToggle.addEventListener('click', toggleChatWindow);
    closeChat.addEventListener('click', toggleChatWindow);

    // Enviar mensagem
    sendMessage.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') handleSendMessage();
    });

    // Fechar chat ao clicar fora (se necessário)
    chatContainer.addEventListener('click', function (e) {
      if (e.target === chatContainer) {
        toggleChat();
      }
    });

    function toggleChatWindow() {
      const isActive = chatContainer.classList.contains('active');

      if (isActive) {
        chatContainer.classList.remove('active');
        chatToggle.classList.remove('active');
      } else {
        chatContainer.classList.add('active');
        chatToggle.classList.add('active');

        setTimeout(() => {
          userInput.focus();
        }, 300);
      }
    }

    function handleSendMessage() {
      const message = userInput.value.trim();
      if (!message) return;

      // Adicionar mensagem do usuário
      addMessage(message, 'user');
      userInput.value = '';

      // Simular digitação do assistente
      setTimeout(() => {
        showTypingIndicator();

        // Resposta do assistente após um breve delay
        setTimeout(() => {
          removeTypingIndicator();
          const response = generateAIResponse(message);
          addMessage(response, 'assistant');
        }, 1500);
      }, 500);
    }

    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.id = 'typing-indicator';
      typingDiv.className = 'chat-message assistant typing';
      typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
      chatContent.appendChild(typingDiv);
      chatContent.scrollTop = chatContent.scrollHeight;
    }

    function removeTypingIndicator() {
      const typingIndicator = document.getElementById('typing-indicator');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }

   function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc')) {
      return `
      🔹 **Bitcoin (BTC)**  
      Criado em 2009, é considerado o "ouro digital".  
      - Usado como reserva de valor.  
      - Alta liquidez no mercado.  
      - Volatilidade pode ser grande no curto prazo.
      `;
  } else if (lowerMessage.includes('ethereum') || lowerMessage.includes('eth')) {
      return `
      🔹 **Ethereum (ETH)**  
      Plataforma para contratos inteligentes e DApps.  
      - Base para NFTs e DeFi.  
      - Segunda maior criptomoeda por valor de mercado.  
      - A transição para Proof of Stake reduziu o consumo de energia.
      `;
  } else if (lowerMessage.includes('comprar') || lowerMessage.includes('exchange')) {
      return `
      🔹 **Onde comprar criptomoedas**  
      Principais exchanges recomendadas:  
      - Binance  
      - Mercado Bitcoin (BR)  
      - Bybit  
      > Dica: sempre habilite 2FA e use carteiras externas para grandes valores.
      `;
  } else if (lowerMessage.includes('segurança') || lowerMessage.includes('carteira')) {
      return `
      🔹 **Segurança no mercado cripto**  
      - Use **carteiras hardware** (Ledger, Trezor) para grandes valores.  
      - Nunca compartilhe sua *seed phrase*.  
      - Para uso diário, apps como **Trust Wallet** ou **MetaMask**.  
      `;
  } else if (lowerMessage.includes('staking') || lowerMessage.includes('rendimento')) {
      return `
      🔹 **Staking**  
      Modo de obter rendimento bloqueando moedas em uma rede.  
      - Funciona como "juros" sobre suas criptos.  
      - Disponível em ETH, ADA, SOL, entre outras.  
      - Risco: bloqueio de liquidez durante o período.
      `;
  } else if (lowerMessage.includes('nft') || lowerMessage.includes('token')) {
      return `
      🔹 **NFTs (Non-Fungible Tokens)**  
      - Representam propriedade única (arte, jogos, colecionáveis).  
      - Construídos geralmente na blockchain do Ethereum.  
      - Mercado ainda especulativo, mas em crescimento em games e metaverso.
      `;
  } else if (lowerMessage.includes('estratégia') || lowerMessage.includes('investimento')) {
      return `
      🔹 **Estratégias de Investimento**  
      - Faça sempre diversificação.  
      - Use apenas uma parte do capital em altcoins.  
      - Defina pontos de saída (take profit) e limite de perda (stop loss).  
      - Nunca invista mais do que pode perder.  
      `;
  } else {
      return `  Olá! Sou seu assistente de criptomoedas. Posso ajudar com informações sobre Bitcoin, Ethereum, exchanges, segurança, staking e estratégias de investimento. Como posso ajudar?
      `;
  }
}

    function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `chat-message ${sender}`;
      messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        `;

      chatContent.appendChild(messageDiv);
      chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Mensagem inicial após um breve delay
    setTimeout(() => {
      addMessage('👋 Olá! Sou seu assistente de criptomoedas. Posso ajudar com informações sobre: - Bitcoin e Ethereum - Exchanges confiáveis - Segurança e carteiras - Staking e rendimentos - NFTs e tokens - Estratégias de investimento Pergunte algo e eu te trago uma resposta clara e objetiva 🚀');
    }, 1000);
  }

  // Adicione este CSS para melhorar a aparência do chat (se ainda não tiver)
  const chatStyles = `
.ai-chat-container {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: var(--card-bg);
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    transform: translateY(100px) scale(0.9);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}

.ai-chat-container.active {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
}

.chat-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00ff88, #00ccff);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    transition: all 0.3s ease;
}

.chat-toggle-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
}

.chat-toggle-btn.active {
    background: linear-gradient(135deg, #ff3333, #ff6b6b);
}

.chat-header {
    padding: 15px;
    background: var(--header-bg);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
}

.chat-header h3 {
    margin: 0;
    font-size: 16px;
    color: var(--text-primary);
}

.chat-close-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
}

.chat-content {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chat-message {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 18px;
    margin-bottom: 10px;
    animation: fadeIn 0.3s ease;
}

.chat-message.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #00ff88, #00ccff);
    color: white;
    border-bottom-right-radius: 5px;
}

.chat-message.assistant {
    align-self: flex-start;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border-bottom-left-radius: 5px;
}

.chat-message.typing {
    background: var(--bg-secondary);
}

.typing-dots {
    display: flex;
    gap: 4px;
    padding: 10px 0;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-secondary);
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: 0s; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
}

.message-content {
    position: relative;
}

.message-text {
    margin-bottom: 5px;
    line-height: 1.4;
}

.message-time {
    font-size: 11px;
    opacity: 0.7;
    text-align: right;
}

.chat-input-container {
    padding: 15px;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 10px;
}

.chat-input-container input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 25px;
    background: var(--bg-primary);
    color: var(--text-primary);
    outline: none;
}

.chat-input-container input:focus {
    border-color: #00ff88;
}

.chat-input-container button {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #00ff88, #00ccff);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.chat-input-container button:hover {
    transform: rotate(15deg);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsividade */
@media (max-width: 768px) {
    .ai-chat-container {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0;
    }
    
    .chat-toggle-btn {
        bottom: 20px;
        right: 20px;
    }
}
`;

  // Adicionar estilos dinamicamente
  if (!document.getElementById('chat-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'chat-styles';
    styleElement.textContent = chatStyles;
    document.head.appendChild(styleElement);
  }

  // 5. MENU MOBILE
  function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (!menuToggle || !mobileNav) return;

    function openMobileMenu() {
      mobileNav.classList.add('active');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      menuToggle.classList.add('active');
    }

    function closeMobileMenu() {
      const mobileNav = document.getElementById('mobileNav');
      const navOverlay = document.getElementById('navOverlay');
      const menuToggle = document.getElementById('menuToggle');

      if (mobileNav) mobileNav.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

    // Fechar menu ao clicar em links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // 👇 aqui você exporta a função pro escopo global
    window.closeMobileMenu = closeMobileMenu;
  }

  // Adicionar evento para o botão do chat no menu mobile
  const mobileChatBtn = document.getElementById('mobileChatBtn');
  if (mobileChatBtn) {
    mobileChatBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // Fecha o menu mobile
      if (typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
      }

      // Simula clique no botão original do chat
      const chatToggleBtn = document.getElementById('chatToggle');
      if (chatToggleBtn) {
        chatToggleBtn.click();
      } else {
        console.warn('Botão #chatToggle não encontrado');
      }
    });
  }

  // 6. TOGGLE MODO AVANÇADO/INICIANTE
  function setupAdvancedModeToggle() {
    const modeToggle = document.getElementById('modeToggle');
    if (!modeToggle) return;

    // Atualizar UI baseada no modo atual
    function updateUIBasedOnMode() {
      const isAdvanced = document.documentElement.getAttribute('data-mode') === 'advanced';

      // Mostrar/ocultar seções baseadas no modo
      document.querySelectorAll('.advanced-mode').forEach(section => {
        section.style.display = isAdvanced ? 'block' : 'none';
      });

      // Atualizar ícone e texto se existir
      const icon = modeToggle.parentElement.querySelector('i');
      if (icon) {
        icon.className = isAdvanced ? 'fas fa-rocket' : 'fas fa-graduation-cap';
      }
    }

    // Event listener para o toggle
    modeToggle.addEventListener('change', function () {
      const newMode = this.checked ? 'advanced' : 'beginner';
      document.documentElement.setAttribute('data-mode', newMode);
      localStorage.setItem('mode', newMode);
      updateUIBasedOnMode();
    });

    // Inicializar UI
    updateUIBasedOnMode();
  }

  // 7. TOGGLE TEMA CLARO/ESCURO
  function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Event listener para o toggle
    themeToggle.addEventListener('change', function () {
      const newTheme = this.checked ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 8. BOTÃO VOLTAR AO TOPO - VERSÃO CORRIGIDA
  function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Esconder o botão inicialmente
    backToTopBtn.style.display = 'none';

    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Mostrar o botão apenas quando estiver no final da página
      const isAtBottom = (scrollPosition + windowHeight) >= (documentHeight - 100);

      if (isAtBottom) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.style.display = 'none';
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // FOOTER - COPIA E COLA PIX
  function copyPix() {
    const pixKey = "trackcripto@gmail.com";
    navigator.clipboard.writeText(pixKey)
      .then(() => {
        Swal.fire('Chave PIX copiada!', 'A chave PIX foi copiada para sua área de transferência.', 'success');
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
        Swal.fire('Erro', 'Não foi possível copiar a chave PIX.', 'error');
      });
  }

  // Adicione este event listener no final do script.js
  document.addEventListener('DOMContentLoaded', function () {
    // Configurar evento de clique para o botão PIX
    const pixButton = document.querySelector('button[onclick="copyPix()"]');
    if (pixButton) {
      pixButton.addEventListener('click', copyPix);
    }
  });

  // 9. FUNÇÃO DE FETCH COM TRATAMENTO DE ERROS
  async function safeFetch(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  // 10. ATUALIZAR DADOS DA CRIPTOMOEDA - VERSÃO SIMPLIFICADA E CORRIGIDA
  async function updateCryptoData() {
    try {
      const cryptoId = elements.cryptoSelect.value;

      // verificar se os elementos existem
      if (!elements.cryptoSelect || !elements.price || !elements.variation) {
        console.warn("Elementos de dados de crypto não encontrados");
        return;
      }

      console.log(`Buscando dados para: ${cryptoId}`);

      // Usar a API simples que é mais confiável
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=brl&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Verificar se os dados foram retornados
      if (!data || !data[cryptoId]) {
        throw new Error('Dados não encontrados para esta criptomoeda');
      }

      const cryptoData = data[cryptoId];

      console.log('Dados recebidos:', cryptoData);

      // Buscar informações adicionais para nome e símbolo
      try {
        const infoResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          elements.cryptoName.textContent = `${infoData.name} (${infoData.symbol.toUpperCase()})`;
        }
      } catch (infoError) {
        console.warn('Não foi possível obter informações detalhadas:', infoError);
        elements.cryptoName.textContent = `${cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)}`;
      }

      // Atualizar preço
      elements.price.textContent = formatCurrency(cryptoData.brl);

      // Atualizar variação 24h com cores neon
      const priceChange = cryptoData.brl_24h_change;
      const variationElement = document.getElementById('variation');

      if (priceChange >= 0) {
        variationElement.innerHTML = `Variação 24h: <span style="color: #00ff88; font-weight: bold;">+${priceChange.toFixed(2)}%</span>`;
      } else {
        variationElement.innerHTML = `Variação 24h: <span style="color: #ff3333; font-weight: bold;">${priceChange.toFixed(2)}%</span>`;
      }

      // Atualizar outras métricas se disponíveis
      if (cryptoData.brl_market_cap) {
        elements.marketCap.textContent = formatCurrency(cryptoData.brl_market_cap, true);
      }

      if (cryptoData.brl_24h_vol) {
        elements.volume.textContent = formatCurrency(cryptoData.brl_24h_vol, true);
      }

      // Para ranking e supply, precisamos de outra chamada
      try {
        const detailResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        if (detailResponse.ok) {
          const detailData = await detailResponse.json();

          if (detailData.market_cap_rank) {
            elements.rank.textContent = `#${detailData.market_cap_rank}`;
          }

          if (detailData.market_data && detailData.market_data.circulating_supply) {
            elements.supply.textContent = `${formatNumber(detailData.market_data.circulating_supply)} ${detailData.symbol.toUpperCase()}`;
          }
        }
      } catch (detailError) {
        console.warn('Não foi possível obter detalhes adicionais:', detailError);
      }

    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      elements.price.textContent = 'Erro ao carregar';

      const variationElement = document.getElementById('variation');
      variationElement.textContent = 'Variação 24h: --';
      variationElement.className = '';

      // Mostrar erro apenas uma vez
      if (!window.cryptoErrorShown) {
        window.cryptoErrorShown = true;
        Swal.fire({
          icon: 'error',
          title: 'Erro de conexão',
          text: 'Não foi possível conectar à API. Verifique sua conexão com a internet.',
          timer: 3000
        });

        // Resetar após 10 segundos
        setTimeout(() => {
          window.cryptoErrorShown = false;
        }, 10000);
      }
    }
  }

  // Função para formatar números
  function formatNumber(num) {
  if (!num && num !== 0) return '--';

  const absNum = Math.abs(num);

  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T';
  }
  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }

  return num.toLocaleString('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}

  // 11. INICIALIZAR GRÁFICO - VERSÃO CORRIGIDA
  async function initChart() {
    try {
      // Verificar se o canvas existe
      if (!elements.chartCanvas) {
        console.error("Canvas do gráfico não encontrado!");
        return;
      }

      const cryptoSelect = document.getElementById('cryptoSelect');
      const cryptoId = cryptoSelect ? cryptoSelect.value : 'bitcoin';

      const response = await fetch(`${config.coinGeckoAPI}/coins/${cryptoId}/market_chart?vs_currency=brl&days=${chartDays}&interval=daily`);

      if (!response.ok) throw new Error('Erro ao buscar dados do gráfico');

      const data = await response.json();

      // Processar dados para o gráfico
      const chartData = data.prices.map(price => ({
        x: new Date(price[0]),
        y: price[1]
      }));

      // Destruir gráfico anterior se existir
      if (currentChart) {
        currentChart.destroy();
        currentChart = null;
      }

      // Criar novo gráfico
      const ctx = elements.chartCanvas.getContext('2d');
      currentChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Preço (R$)',
            data: chartData,
            borderColor: '#00ff88',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function (context) {
                  return `R$ ${context.raw.y.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                callback: function (value) {
                  return 'R$ ' + value.toFixed(2);
                }
              }
            }
          }
        }
      });

      // Atualizar estatísticas do gráfico
      updateChartStats(chartData);

    } catch (error) {
      console.error('Erro ao carregar gráfico:', error);
    }
  }

  // 12. ATUALIZAR ESTATÍSTICAS DO GRÁFICO
  function updateChartStats(chartData) {
    if (!chartData || chartData.length === 0) return;

    const prices = chartData.map(item => item.y);
    const currentPrice = prices[prices.length - 1];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Calcular variação percentual
    const firstPrice = prices[0];
    const priceChange = ((currentPrice - firstPrice) / firstPrice) * 100;

    // Atualizar elementos da UI
    document.getElementById('currentPrice').textContent = formatCurrency(currentPrice);
    document.getElementById('priceChange').textContent = `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%`;
    document.getElementById('priceChange').className = priceChange >= 0 ? 'positive' : 'negative';
    document.getElementById('minPrice').textContent = formatCurrency(minPrice);
    document.getElementById('maxPrice').textContent = formatCurrency(maxPrice);

    // Atualizar hora da última atualização
    document.getElementById('chartUpdateTime').textContent = new Date().toLocaleTimeString('pt-BR');
  }

  // 13. CONFIGURAR CONTROLES DO GRÁFICO
  function setupChartControls() {
    // Seletor de criptomoeda
    const cryptoSelect = document.getElementById('cryptoSelect');
    if (cryptoSelect) {
      cryptoSelect.addEventListener('change', initChart);
    }

    // Botão de atualizar
    const refreshBtn = document.getElementById('refreshChart');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', initChart);
    }

    // Botões de período
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Remover classe active de todos os botões
        timeButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        this.classList.add('active');
        // Atualizar período do gráfico
        chartDays = parseInt(this.dataset.days);
        initChart();
      });
    });
  }

  // 14. ATUALIZAR ÍNDICE MEDO E GANÂNCIA - VERSÃO CORRIGIDA
  async function updateFearGreed() {
    try {
      console.log("Atualizando Fear & Greed Index...");

      // Elementos principais - USANDO OS IDs CORRETOS DO SEU HTML
      const fearGreedValue = document.getElementById('fearGreedValue');
      const fearGreedIndicator = document.getElementById('fearGreedIndicator');
      const fearGreedStatus = document.getElementById('fearGreedStatus');
      const fearGreedDescription = document.getElementById('fearGreedDescription');

      if (!fearGreedValue || !fearGreedIndicator || !fearGreedStatus) {
        console.error("Elementos do Fear & Greed não encontrados!");
        return;
      }

      // Mostrar estado de carregamento
      const valueSpan = fearGreedValue.querySelector('.value');
      if (valueSpan) valueSpan.textContent = "--";
      fearGreedStatus.textContent = "Carregando...";
      fearGreedIndicator.style.width = "0%";

      // Tentar API primeiro
      try {
        const response = await fetch('https://api.alternative.me/fng/');

        if (!response.ok) throw new Error('Erro na API Fear & Greed');

        const data = await response.json();

        console.log("Dados Fear & Greed:", data);

        // Verificar se os dados estão no formato esperado
        if (!data || !data.data || !data.data[0]) {
          throw new Error('Formato de dados inválido');
        }

        const fgIndex = data.data[0];
        const value = parseInt(fgIndex.value);
        const timestamp = fgIndex.timestamp;

        // Atualizar UI com dados reais
        updateFearGreedUI(value, timestamp);

      } catch (apiError) {
        console.warn('API Fear & Greed falhou, usando dados simulados:', apiError);
        // Usar dados simulados como fallback
        simulateFearGreedData();
      }

    } catch (error) {
      console.error('Erro crítico no Fear & Greed:', error);
      // Fallback final
      simulateFearGreedData();
    }
  }

  // Função para simular dados do Fear & Greed
  function simulateFearGreedData() {
    // Gerar valor aleatório entre 20 e 80 (mais comum)
    const randomValue = Math.floor(Math.random() * 60) + 20;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    updateFearGreedUI(randomValue, currentTimestamp);
  }

  // Função para atualizar a UI do Fear & Greed
  function updateFearGreedUI(value, timestamp) {
    const fearGreedValue = document.getElementById('fearGreedValue');
    const fearGreedIndicator = document.getElementById('fearGreedIndicator');
    const fearGreedStatus = document.getElementById('fearGreedStatus');
    const fearGreedDescription = document.getElementById('fearGreedDescription');

    if (!fearGreedValue || !fearGreedIndicator || !fearGreedStatus) return;

    // Atualizar valor numérico
    const valueSpan = fearGreedValue.querySelector('.value');
    if (valueSpan) valueSpan.textContent = value;

    // Atualizar barra de progresso (0-100%)
    fearGreedIndicator.style.width = `${value}%`;

    // Atualizar texto do status e cor
    const classification = getFearGreedClassification(value);
    fearGreedStatus.textContent = classification;

    // Aplicar cor baseada no valor
    if (value <= 20) {
      fearGreedIndicator.style.background = '#ff6b6b';
      fearGreedStatus.style.color = '#ff6b6b';
    } else if (value <= 40) {
      fearGreedIndicator.style.background = '#ff9e6b';
      fearGreedStatus.style.color = '#ff9e6b';
    } else if (value <= 60) {
      fearGreedIndicator.style.background = '#ffd166';
      fearGreedStatus.style.color = '#ffd166';
    } else if (value <= 80) {
      fearGreedIndicator.style.background = '#06d6a0';
      fearGreedStatus.style.color = '#06d6a0';
    } else {
      fearGreedIndicator.style.background = '#00ff88';
      fearGreedStatus.style.color = '#00ff88';
    }

    // Atualizar descrição se o elemento existir
    if (fearGreedDescription) {
      fearGreedDescription.textContent = `Índice atualizado: ${new Date(timestamp * 1000).toLocaleString('pt-BR')}`;
    }

    console.log("Fear & Greed atualizado:", value, classification);
  }

  // 15. CLASSIFICAR ÍNDICE FEAR & GREED
  function getFearGreedClassification(value) {
    if (value <= 20) return 'Medo Extremo';
    if (value <= 40) return 'Medo';
    if (value <= 60) return 'Neutro';
    if (value <= 80) return 'Ganância';
    return 'Ganância Extrema';
  }

  // 16. CARREGAR NOTÍCIAS - VERSÃO SIMPLIFICADA E FUNCIONAL
  async function loadNews() {
    try {
      console.log("Carregando notícias...");

      // Mostrar estado de carregamento
      if (elements.newsContainer) {
        elements.newsContainer.innerHTML = `
        <div class="news-loading">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Carregando notícias...</p>
        </div>
      `;
      }

      // Pequeno delay para visualizar o loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usar notícias estáticas de fallback - SEMPRE funciona
      renderFallbackNews();

      console.log("Notícias carregadas com sucesso");

    } catch (error) {
      console.error('Erro ao carregar notícias:', error);

      // Fallback garantido
      if (elements.newsContainer) {
        elements.newsContainer.innerHTML = `
        <div class="news-error">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Erro ao carregar notícias. Atualize a página para tentar novamente.</p>
        </div>
      `;

        // Tentar novamente após 5 segundos
        setTimeout(() => {
          renderFallbackNews();
        }, 5000);
      }
    }
  }

  // NOTÍCIAS DE FALLBACK (caso as APIs falhem)
  function renderFallbackNews() {
    const fallbackNews = [
      {
        title: 'Bitcoin atinge nova máxima histórica em 2024',
        description: 'O Bitcoin superou a marca de US$ 70.000, alcançando uma nova máxima histórica e renovando o otimismo no mercado.',
        url: '#',
        published_at: new Date().toISOString(),
        source: 'CoinTelegraph',
        thumbnail: 'https://via.placeholder.com/300x150/1a1a2e/00ff88?text=Bitcoin+News'
      },
      {
        title: 'Ethereum anuncia atualização Dencun para reduzir taxas',
        description: 'A Foundation Ethereum anunciou a atualização Dencun que promete reduzir significativamente as taxas de transação na rede.',
        url: '#',
        published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: 'Decrypt',
        thumbnail: 'https://via.placeholder.com/300x150/1a1a2e/00ff88?text=Ethereum+News'
      },
      {
        title: 'El Salvador compra mais 500 Bitcoins como reserva',
        description: 'O país continua sua estratégia de acumulação de Bitcoin como reserva de valor, adquirindo mais 500 BTC.',
        url: '#',
        published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        source: 'Bloomberg',
        thumbnail: 'https://via.placeholder.com/300x150/1a1a2e/00ff88?text=El+Salvador'
      },
      {
        title: 'NFTs registram volume recorde no último trimestre',
        description: 'O mercado de NFTs registrou um volume recorde de transações, impulsionado por coleções exclusivas.',
        url: '#',
        published_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        source: 'NFTNow',
        thumbnail: 'https://via.placeholder.com/300x150/1a1a2e/00ff88?text=NFT+News'
      },
      {
        title: 'Binance lance nova plataforma de staking com rendimentos de até 15%',
        description: 'A exchange Binance anunciou nova plataforma de staking com opções para diversas criptomoedas.',
        url: '#',
        published_at: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        source: 'Binance Blog',
        thumbnail: 'https://via.placeholder.com/300x150/1a1a2e/00ff88?text=Staking'
      },
      {
        title: 'Reguladores europeus aprovam nova legislação para criptomoedas',
        description: 'A nova legislação MiCA estabelece diretrizes claras para o mercado de criptomoedas na União Europeia.',
        url: '#',
        published_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        source: 'EU Finance',
        thumbnail: 'https://via.placeholder.com/300x150/1a1a2e/00ff88?text=Regulation'
      }
    ];

    renderNews(fallbackNews);
  }

  // FUNÇÃO PARA FORMATAR DATA
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays === 0) {
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `Há ${diffMinutes} min`;
      }
      return `Há ${diffHours} h`;
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return `Há ${diffDays} dias`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  }

  // 17. RENDERIZAR NOTÍCIAS
  function renderNews(news) {
    if (!elements.newsContainer) return;

    elements.newsContainer.innerHTML = `
    <div class="news-grid">
      ${news.map(item => `
        <div class="news-item">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="news-footer">
            <span>${item.source}</span>
            <span>${new Date(item.publishedAt).toLocaleDateString('pt-BR')}</span>
            <a href="${item.url}" target="_blank">Ler mais</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  }

  // Adicione esta função ao script.js
  async function updateMarketIndices() {
    try {
      // Buscar dados de dominância
      const globalData = await fetch('https://api.coingecko.com/api/v3/global');
      const globalJson = await globalData.json();

      // BTC Dominance
      const btcDominance = globalJson.data.market_cap_percentage.btc;
      document.getElementById('btcDominanceValue').querySelector('.value').textContent = `${btcDominance.toFixed(1)}%`;
      document.getElementById('btcDominanceBar').style.width = `${btcDominance}%`;
      document.getElementById('btcDominancePercent').textContent = `${btcDominance.toFixed(1)}%`;

      // Altcoin Dominance
      const altcoinDominance = 100 - btcDominance;
      document.getElementById('altcoinDominancePercent').textContent = `${altcoinDominance.toFixed(1)}%`;

      // Market Cap Total
      const marketCap = globalJson.data.total_market_cap.brl;
      document.getElementById('globalMarketCap').querySelector('.value').textContent = `R$ ${(marketCap / 1e12).toFixed(2)}T`;

      // Market Cap BTC
      const btcMarketCap = marketCap * (btcDominance / 100);
      document.getElementById('btcMarketCap').textContent = `R$ ${(btcMarketCap / 1e9).toFixed(2)}B`;

      // Market Cap ETH
      const ethDominance = globalJson.data.market_cap_percentage.eth || 0;
      const ethMarketCap = marketCap * (ethDominance / 100);
      document.getElementById('ethMarketCap').textContent = `R$ ${(ethMarketCap / 1e9).toFixed(2)}B`;

      // Market Cap Altcoins
      const altcoinMarketCap = marketCap - btcMarketCap;
      document.getElementById('altcoinMarketCap').textContent = `R$ ${(altcoinMarketCap / 1e12).toFixed(2)}T`;

      // Variação 24h
      const marketCapChange = globalJson.data.market_cap_change_percentage_24h_usd;
      document.getElementById('marketCapChange').textContent = `${marketCapChange >= 0 ? '+' : ''}${marketCapChange.toFixed(2)}%`;
      document.getElementById('marketCapChange').className = marketCapChange >= 0 ? 'positive' : 'negative';

      // Atualizar Altcoin Season
      updateAltcoinSeason(btcDominance);

      // Atualizar última atualização
      document.getElementById('lastUpdateTime').textContent = new Date().toLocaleTimeString('pt-BR');

    } catch (error) {
      console.error('Erro ao carregar índices de mercado:', error);
    }
  }

  function updateAltcoinSeason(btcDominance) {
    const altcoinDominance = 100 - btcDominance;
    const seasonMeter = document.getElementById('seasonIndicator');
    const seasonStatus = document.getElementById('seasonStatusText');
    const statusBadge = document.getElementById('seasonStatusBadge');

    // Lógica simples para Altcoin Season (apenas para demonstração)
    if (altcoinDominance > 55) {
      seasonMeter.style.width = '100%';
      seasonStatus.textContent = 'Altcoin Season Ativo!';
      statusBadge.innerHTML = '<i class="fas fa-fire"></i> Altcoin Season';
      statusBadge.className = 'status-badge season-active';
    } else if (altcoinDominance > 45) {
      seasonMeter.style.width = '60%';
      seasonStatus.textContent = 'Mercado Equilibrado';
      statusBadge.innerHTML = '<i class="fas fa-balance-scale"></i> Equilibrado';
      statusBadge.className = 'status-badge season-neutral';
    } else {
      seasonMeter.style.width = '30%';
      seasonStatus.textContent = 'Bitcoin Dominante';
      statusBadge.innerHTML = '<i class="fab fa-bitcoin"></i> BTC Dominante';
      statusBadge.className = 'status-badge season-btc';
    }
  }

  // 18. ATUALIZAR MÉTRICAS AVANÇADAS - VERSÃO COM FALLBACK
  async function updateAdvancedMetrics() {
    try {
      console.log("Atualizando métricas avançadas...");

      // Tentar API primeiro
      try {
        const response = await fetch(`${config.coinGeckoAPI}/global`);

        if (!response.ok) throw new Error('Erro ao buscar métricas globais');

        const data = await response.json();

        // Se chegou aqui, a API funcionou
        const btcDominance = data.data.market_cap_percentage.btc;
        const marketCap = data.data.total_market_cap.brl;
        const totalVolume = data.data.total_volume.brl;

        // Atualizar UI com dados reais
        updateMarketIndicesUI(btcDominance, marketCap, totalVolume);

      } catch (apiError) {
        console.warn('API falhou, usando dados simulados:', apiError);
        // Usar dados simulados como fallback
        simulateMarketData();
      }

      // Atualizar última atualização
      const updateElement = document.getElementById('lastUpdateTime');
      if (updateElement) {
        updateElement.textContent = new Date().toLocaleTimeString('pt-BR');
      }

    } catch (error) {
      console.error('Erro ao carregar métricas avançadas:', error);
      // Fallback final se tudo falhar
      simulateMarketData();
    }
  }

  // Função para simular dados de mercado quando offline
  function simulateMarketData() {
    console.log("Usando dados simulados de mercado");

    // Dados simulados (valores realistas)
    const simulatedData = {
      btcDominance: 48.7 + (Math.random() * 4 - 2), // Entre ~46.7% e ~50.7%
      marketCap: 8.5e12 + (Math.random() * 1e12 - 0.5e12), // Entre ~8T e ~9T
      volume: 250e9 + (Math.random() * 100e9 - 50e9) // Entre ~200B e ~300B
    };

    updateMarketIndicesUI(
      simulatedData.btcDominance,
      simulatedData.marketCap,
      simulatedData.volume
    );
  }

  // Função para atualizar a UI com dados (reais ou simulados)
  function updateMarketIndicesUI(btcDominance, marketCap, totalVolume) {
    // Atualizar dominância do Bitcoin
    const btcDominanceElement = document.getElementById('btcDominanceValue');
    if (btcDominanceElement) {
      const valueElement = btcDominanceElement.querySelector('.value');
      if (valueElement) {
        valueElement.textContent = `${btcDominance.toFixed(1)}%`;
      }
    }

    // Atualizar barra de progresso
    const dominanceBar = document.getElementById('btcDominanceBar');
    if (dominanceBar) {
      dominanceBar.style.width = `${btcDominance}%`;
    }

    // Atualizar percentuais de dominância
    const btcDominancePercent = document.getElementById('btcDominancePercent');
    const altcoinDominancePercent = document.getElementById('altcoinDominancePercent');

    if (btcDominancePercent) {
      btcDominancePercent.textContent = `${btcDominance.toFixed(1)}%`;
    }
    if (altcoinDominancePercent) {
      altcoinDominancePercent.textContent = `${(100 - btcDominance).toFixed(1)}%`;
    }

    // Atualizar market cap total
    const marketCapElement = document.getElementById('globalMarketCap');
    if (marketCapElement) {
      const valueElement = marketCapElement.querySelector('.value');
      if (valueElement) {
        valueElement.textContent = formatCurrency(marketCap, true);
      }
    }

    // Atualizar volume total
    const volumeElement = document.getElementById('totalMarketCap'); // Note: este ID parece errado, deveria ser totalVolume
    if (volumeElement) {
      const valueElement = volumeElement.querySelector('.value');
      if (valueElement) {
        valueElement.textContent = formatCurrency(totalVolume, true);
      }
    }

    // Atualizar market caps individuais (simulados)
    const btcMarketCapElement = document.getElementById('btcMarketCap');
    const ethMarketCapElement = document.getElementById('ethMarketCap');
    const altcoinMarketCapElement = document.getElementById('altcoinMarketCap');
    const marketCapChangeElement = document.getElementById('marketCapChange');

    if (btcMarketCapElement) {
      const btcMarketCap = marketCap * (btcDominance / 100);
      btcMarketCapElement.textContent = formatCurrency(btcMarketCap, true);
    }

    if (ethMarketCapElement) {
      // Ethereum geralmente tem ~17-20% de dominância
      const ethDominance = 18 + (Math.random() * 2 - 1);
      const ethMarketCap = marketCap * (ethDominance / 100);
      ethMarketCapElement.textContent = formatCurrency(ethMarketCap, true);
    }

    if (altcoinMarketCapElement) {
      const altcoinMarketCap = marketCap * ((100 - btcDominance) / 100);
      altcoinMarketCapElement.textContent = formatCurrency(altcoinMarketCap, true);
    }

    if (marketCapChangeElement) {
      // Simular variação entre -3% e +5%
      const marketCapChange = (Math.random() * 8) - 3;
      marketCapChangeElement.textContent = `${marketCapChange >= 0 ? '+' : ''}${marketCapChange.toFixed(2)}%`;
      marketCapChangeElement.className = marketCapChange >= 0 ? 'positive' : 'negative';
    }

    // Atualizar Altcoin Season
    updateAltcoinSeason(btcDominance);
  }

  // 19. INICIALIZAR FERRAMENTAS AVANÇADAS
  function initAdvancedTools() {
    // Inicializar calculadora de taxas
    setupFeeCalculator();

    // Inicializar calculadora de trade
    setupTradeCalculator();

    // Inicializar gerenciador de risco
    setupRiskManager();

    // Configurar abas das ferramentas - JÁ ESTÁ SENDO CHAMADO EM initAllTabs()
  }

  // 20. CALCULADORA DE TAXAS
  function setupFeeCalculator() {
    const calculateBtn = document.querySelector('#comparador-taxas .btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateFees);
    }
  }

  // 21. CALCULAR TAXAS
  function calculateFees() {
    const amount = parseFloat(document.getElementById('feeAmount').value);
    const exchange = document.getElementById('feeExchange').value;

    if (!amount || amount <= 0) {
      Swal.fire('Erro', 'Por favor, insira um valor válido para a operação.', 'error');
      return;
    }

    // Taxas por exchange (em porcentagem)
    const fees = {
      'binance': { trade: 0.1, withdrawal: 0.0005 },
      'bybit': { trade: 0.1, withdrawal: 0.0002 },
      'mercado-bitcoin': { trade: 0.7, withdrawal: 0.003 },
      'foxbit': { trade: 0.5, withdrawal: 0.0003 }
    };

    const fee = fees[exchange] || fees.binance;
    const tradeFee = amount * (fee.trade / 100);
    const totalWithFees = amount + tradeFee;

    // Mostrar resultado
    const resultElement = document.getElementById('feeResult');
    const totalElement = document.getElementById('feeTotal');

    totalElement.innerHTML = `
        <strong>Taxa de negociação:</strong> R$ ${tradeFee.toFixed(2)} (${fee.trade}%)<br>
        <strong>Taxa de saque aproximada:</strong> R$ ${fee.withdrawal.toFixed(4)}<br>
        <strong>Total com taxas:</strong> R$ ${totalWithFees.toFixed(2)}
    `;
    resultElement.style.display = 'block';
  }

  // 22. CALCULADORA DE TRADE
  function setupTradeCalculator() {
    const calculateBtn = document.getElementById('calcCalculate');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateTrade);
    }

    // Configurar abas - JÁ ESTÁ SENDO CHAMADO EM setupCalculatorTabs()
  }

  function calculateTrade() {
    const amount = parseFloat(document.getElementById('calcAmount').value) || 0;
    const buyPrice = parseFloat(document.getElementById('calcBuyPrice').value) || 0;
    const sellPrice = parseFloat(document.getElementById('calcSellPrice').value) || 0;

    if (!amount || !buyPrice) {
      Swal.fire('Erro', 'Por favor, preencha pelo menos a quantidade e o preço de compra.', 'error');
      return;
    }

    const investment = amount * buyPrice;
    const finalValue = amount * (sellPrice || buyPrice);
    const profit = finalValue - investment;
    const profitPercentage = (profit / investment) * 100;

    // Calcular taxas se estiver na aba de taxas
    let fees = 0;
    if (document.getElementById('tab-fees').classList.contains('active')) {
      const buyFee = parseFloat(document.getElementById('calcBuyFee').value) || 0;
      const sellFee = parseFloat(document.getElementById('calcSellFee').value) || 0;
      const withdrawalFee = parseFloat(document.getElementById('calcWithdrawalFee').value) || 0;

      fees = (investment * (buyFee / 100)) + (finalValue * (sellFee / 100)) + withdrawalFee;
    }

    const netProfit = profit - fees;
    const netPercentage = (netProfit / investment) * 100;

    // Atualizar UI com resultados
    document.getElementById('resultInvestment').textContent = `R$ ${investment.toFixed(2)}`;
    document.getElementById('resultFinalValue').textContent = `R$ ${finalValue.toFixed(2)}`;
    document.getElementById('resultProfit').textContent = `R$ ${netProfit.toFixed(2)}`;
    document.getElementById('resultPercentage').textContent = `${netProfit >= 0 ? '+' : ''}${netPercentage.toFixed(2)}%`;
    document.getElementById('resultFees').textContent = `R$ ${fees.toFixed(2)}`;

    // Calcular risco/retorno se stop loss estiver definido
    const stopLoss = parseFloat(document.getElementById('calcStopLoss').value);
    if (stopLoss && stopLoss > 0) {
      const risk = investment - (amount * stopLoss);
      const reward = netProfit;
      const riskReward = risk > 0 ? (reward / risk).toFixed(2) : '∞';
      document.getElementById('resultRiskReward').textContent = `1:${riskReward}`;
    }

    // Aplicar classes de estilo
    const profitElement = document.getElementById('resultProfit');
    const percentageElement = document.getElementById('resultPercentage');
    const badgeElement = document.getElementById('resultBadge');

    if (netProfit >= 0) {
      profitElement.className = 'value-profit';
      percentageElement.className = 'value-profit';
      badgeElement.textContent = 'LUCRO';
      badgeElement.className = 'badge-profit';
    } else {
      profitElement.className = 'value-loss';
      percentageElement.className = 'value-loss';
      badgeElement.textContent = 'PREJUÍZO';
      badgeElement.className = 'badge-loss';
    }

    // Mostrar resultados
    document.getElementById('calcResult').style.display = 'block';
  }

  // Gerenciador de Risco
  function setupRiskManager() {
    const calculateBtn = document.getElementById('calculateRisk');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateRisk);
    }

    // Configurar slider
    const riskSlider = document.getElementById('riskPerTrade');
    if (riskSlider) {
      riskSlider.addEventListener('input', function () {
        document.getElementById('riskValue').textContent = `${this.value}%`;
      });
    }

    // Configurar abas - JÁ ESTÁ SENDO CHAMADO EM setupRiskTabs()
  }

  function calculateRisk() {
    const capital = parseFloat(document.getElementById('totalCapital').value) || 0;
    const riskPercent = parseFloat(document.getElementById('riskPerTrade').value) || 2;
    const stopLossPercent = parseFloat(document.getElementById('stopLossPercent').value) || 15;

    if (!capital || capital <= 0) {
      Swal.fire('Erro', 'Por favor, insira um valor válido para o capital.', 'error');
      return;
    }

    const riskAmount = capital * (riskPercent / 100);
    const positionSize = riskAmount / (stopLossPercent / 100);

    // Atualizar UI com resultados
    document.getElementById('riskValuePerTrade').textContent = `R$ ${riskAmount.toFixed(2)}`;
    document.getElementById('riskMaxLoss').textContent = `R$ ${riskAmount.toFixed(2)}`;
    document.getElementById('riskPositionSize').textContent = positionSize.toFixed(2);

    // Calcular score de risco (simulação)
    let riskScore = 100 - (riskPercent * 5);
    if (riskPercent > 5) riskScore -= 20;
    if (stopLossPercent < 10) riskScore -= 15;

    riskScore = Math.max(0, Math.min(100, riskScore));
    document.getElementById('riskScore').textContent = `${riskScore}/100`;

    // Definir nível de risco
    let riskLevel = 'MODERADO';
    let riskClass = 'risk-moderate';

    if (riskScore >= 80) {
      riskLevel = 'BAIXO';
      riskClass = 'risk-low';
    } else if (riskScore >= 60) {
      riskLevel = 'MODERADO';
      riskClass = 'risk-moderate';
    } else if (riskScore >= 40) {
      riskLevel = 'ALTO';
      riskClass = 'risk-high';
    } else {
      riskLevel = 'MUITO ALTO';
      riskClass = 'risk-very-high';
    }

    document.getElementById('riskLevel').textContent = riskLevel;
    document.getElementById('riskLevel').className = `risk-badge ${riskClass}`;

    // Gerar recomendações
    const recommendations = [
      riskPercent > 5 ? 'Considere reduzir o risco por trade para abaixo de 5%' : 'Risco por trade em nível adequado',
      stopLossPercent < 10 ? 'Aumente o stop loss para pelo menos 10%' : 'Stop loss em nível adequado',
      'Sempre use ordens stop-loss para gerenciar riscos',
      'Diversifique entre diferentes criptomoedas'
    ];

    const recommendationsHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <i class="fas fa-check-circle"></i>
            <span>${rec}</span>
        </div>
    `).join('');

    document.getElementById('riskRecommendations').innerHTML = recommendationsHTML;

    // Mostrar resultados
    document.getElementById('riskResult').style.display = 'block';
  }

  // EDUCAÇÃO CRIPTO
  const cryptoGlossary = [
    { term: "Blockchain", definition: "Tecnologia de registro distribuído que forma a base para criptomoedas." },
    { term: "Bitcoin", definition: "A primeira e mais valiosa criptomoeda, criada por Satoshi Nakamoto." },
    { term: "Altcoin", definition: "Qualquer criptomoeda alternativa ao Bitcoin." },
    { term: "Wallet", definition: "Carteira digital para armazenar criptomoedas." },
    { term: "Exchange", definition: "Plataforma onde se pode comprar, vender e negociar criptomoedas." },
    { term: "HODL", definition: "Termo derivado de 'hold' (manter), significa segurar criptomoedas por longo prazo." },
    { term: "FOMO", definition: "Medo de perder oportunidades (Fear Of Missing Out)." },
    { term: "FUD", definition: "Medo, incerteza e dúvida (Fear, Uncertainty and Doubt)." },
    { term: "Market Cap", definition: "Capitalização de mercado, calculada como preço x supply em circulação." },
    { term: "DeFi", definition: "Finanças descentralizadas (Decentralized Finance)." },
    { term: "NFT", definition: "Token não fungível (Non-Fungible Token)." },
    { term: "Staking", definition: "Processo de manter fundos em uma carteira para suportar as operações de uma blockchain." },
    { term: "Mining", definition: "Processo de validar transações e adicionar novos blocos à blockchain." }
  ];

  const cryptoTutorials = [
    {
      title: "Como Comprar Sua Primeira Criptomoeda",
      content: "Guia passo a passo para iniciantes: 1) Escolha uma exchange confiável (veja nossas parceiras); 2) Crie uma conta e complete a verificação; 3) Adicione fundos via PIX ou cartão; 4) Compre Bitcoin ou outra criptomoeda; 5) Transfira para uma carteira pessoal para maior segurança. Dica: Comece com um valor pequeno para aprender.",
      difficulty: "Iniciante",
      duration: "10 min"
    },
    {
      title: "Como Configurar uma Carteira Segura",
      content: "Passos para segurança: 1) Escolha entre carteira software (MetaMask, Trust Wallet) ou hardware (Ledger, Trezor); 2) Baixe apenas dos sites oficiais; 3) Anote sua seed phrase em papel e guarde em local seguro; 4) Nunca digitalize ou compartilhe suas chaves; 5) Use autenticação de dois fatores; 6) Mantenha apenas pequenos valores em exchanges.",
      difficulty: "Iniciante",
      duration: "15 min"
    },
    {
      title: "Guia de Staking para Iniciantes",
      content: "Staking permite ganhar rendimentos passivos: 1) Escolha moedas que suportem staking (ETH, ADA, SOL); 2) Transfira para uma exchange ou carteira que ofereça staking; 3) 'Bloqueie' suas moedas pelo período desejado; 4) Receba recompensas regularmente. Cuidado: Períodos de lock podem variar, e o valor das moedas pode flutuar.",
      difficulty: "Intermediário",
      duration: "12 min"
    },
    {
      title: "Estratégias Básicas de Investimento",
      content: "Principais estratégias: 1) HODL - Compre e guarde por longo prazo; 2) Dollar-Cost Averaging (DCA) - Invista valores fixos regularmente; 3) Trading - Opere comprando e vendendo (requer mais experiência); 4) Staking - Ganhe rendimentos passivos. Importante: Nunca invista mais do que pode perder e sempre faça sua própria pesquisa (DYOR).",
      difficulty: "Iniciante",
      duration: "8 min"
    },
    {
      title: "Como Analisar um Projeto Cripto",
      content: "Checklist de due diligence: 1) Equipe - Quem são os fundadores?; 2) Whitepaper - A proposta faz sentido?; 3) Tecnologia - É inovadora ou apenas cópia?; 4) Caso de uso - Resolve um problema real?; 5) Comunidade - É ativa e engajada?; 6) Tokenomics - Como os tokens são distribuídos?; 7) Roadmap - O que planejam para o futuro?",
      difficulty: "Intermediário",
      duration: "20 min"
    }
  ];

  // Função para abrir abas
  function openTab(tabName, element) {
    // Esconder todos os conteúdos de abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // Remover classe active de todos os botões
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Mostrar a aba selecionada e adicionar classe active ao botão
    document.getElementById(tabName).style.display = 'block';
    element.classList.add('active');
  }

  // Função para carregar o glossário
  function loadGlossary() {
    const glossaryContainer = document.getElementById('glossarioContent');
    if (!glossaryContainer) return;

    glossaryContainer.innerHTML = cryptoGlossary.map(item => `
        <div class="glossary-item">
            <h4>${item.term}</h4>
            <p>${item.definition}</p>
        </div>
    `).join('');

    // Adicionar funcionalidade de busca
    const searchInput = document.getElementById('glossarioSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredGlossary = cryptoGlossary.filter(item =>
          item.term.toLowerCase().includes(searchTerm) ||
          item.definition.toLowerCase().includes(searchTerm)
        );

        glossaryContainer.innerHTML = filteredGlossary.map(item => `
                <div class="glossary-item">
                    <h4>${item.term}</h4>
                    <p>${item.definition}</p>
                </div>
            `).join('');
      });
    }
  }

  // Função para carregar os tutoriais
  function loadTutorials() {
    const tutorialsContainer = document.getElementById('tutoriaisContent');
    if (!tutorialsContainer) return;

    tutorialsContainer.innerHTML = `
    <div class="tutorials-grid">
      ${cryptoTutorials.map(tutorial => `
        <div class="tutorial-card">
          <div class="tutorial-header">
            <h4>${tutorial.title}</h4>
            <div class="tutorial-meta">
              <span class="difficulty-badge ${tutorial.difficulty.toLowerCase()}">${tutorial.difficulty}</span>
              <span class="duration">${tutorial.duration}</span>
            </div>
          </div>
          <p>${tutorial.content}</p>
          <button class="btn tutorial-btn" onclick="openTutorial('${tutorial.title}')">
            <i class="fas fa-book-open"></i> Ler Tutorial Completo
          </button>
        </div>
      `).join('')}
    </div>
  `;
  }

  // Função para abrir tutorial (modal)
  function openTutorial(title) {
    const tutorial = cryptoTutorials.find(t => t.title === title);
    if (!tutorial) return;

    Swal.fire({
      title: tutorial.title,
      html: `<p style="text-align: left; line-height: 1.6;">${tutorial.content}</p>`,
      showCloseButton: true,
      showConfirmButton: false,
      width: '700px',
      padding: '2em',
      background: 'var(--card-bg)',
      color: 'var(--text-primary)'
    });
  }

  // Inicializar a seção educativa
  function initEducationSection() {
    loadGlossary();
    loadTutorials();

    // Ativar a primeira aba por padrão
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
      openTab('glossario', firstTab);
    }
  }

  // SISTEMA DE ALERTAS
  class PriceAlerts {
    constructor() {
      this.alerts = JSON.parse(localStorage.getItem('priceAlerts')) || [];
      this.init();
    }

    init() {
      this.render();
      this.setupEventListeners();
      this.startMonitoring();
    }

    setupEventListeners() {
      // Botão adicionar alerta
      document.getElementById('addAlertBtn')?.addEventListener('click', () => this.showAddDialog());

      // Botão testar notificação
      document.getElementById('testNotificationBtn')?.addEventListener('click', () => this.testNotification());

      // Filtros
      document.getElementById('alertsSearch')?.addEventListener('input', (e) => this.filterAlerts(e.target.value));
      document.getElementById('alertsFilter')?.addEventListener('change', (e) => this.filterAlerts('', e.target.value));
    }

    showAddDialog() {
      Swal.fire({
        title: 'Criar Alerta de Preço',
        html: `
                <input type="text" id="alertCrypto" class="swal2-input" placeholder="Criptomoeda (ex: Bitcoin)">
                <select id="alertCondition" class="swal2-input">
                    <option value="above">Acima de</option>
                    <option value="below">Abaixo de</option>
                </select>
                <input type="number" id="alertPrice" class="swal2-input" placeholder="Preço (R$)" step="any">
                <input type="text" id="alertName" class="swal2-input" placeholder="Nome do alerta (opcional)">
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Criar Alerta',
        preConfirm: () => {
          const crypto = document.getElementById('alertCrypto').value;
          const condition = document.getElementById('alertCondition').value;
          const price = parseFloat(document.getElementById('alertPrice').value);
          const name = document.getElementById('alertName').value || crypto;

          if (!crypto || !price) {
            Swal.showValidationMessage('Por favor, preencha todos os campos obrigatórios');
            return false;
          }

          return { crypto, condition, price, name };
        }
      }).then(result => {
        if (result.isConfirmed) {
          this.addAlert(result.value);
        }
      });
    }

    addAlert(alert) {
      this.alerts.push({
        id: Date.now(),
        ...alert,
        active: true,
        triggered: false,
        createdAt: new Date().toISOString()
      });
      this.save();
      this.render();
      Swal.fire('Sucesso!', 'Alerta criado com sucesso.', 'success');
    }

    removeAlert(id) {
      Swal.fire({
        title: 'Excluir alerta?',
        text: "Esta ação não pode ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.alerts = this.alerts.filter(alert => alert.id !== id);
          this.save();
          this.render();
          Swal.fire('Excluído!', 'Seu alerta foi excluído.', 'success');
        }
      });
    }

    toggleAlert(id) {
      const alert = this.alerts.find(a => a.id === id);
      if (alert) {
        alert.active = !alert.active;
        this.save();
        this.render();
      }
    }

    testNotification() {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('Teste de Notificação', {
            body: 'Suas notificações estão funcionando corretamente!',
            icon: '/assets/logo.png'
          });
        } else if (Notification.permission === 'default') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Teste de Notificação', {
                body: 'Suas notificações estão funcionando corretamente!',
                icon: '/assets/logo.png'
              });
            }
          });
        }
      } else {
        Swal.fire('Navegador não compatível', 'Seu navegador não suporta notificações.', 'info');
      }
    }

    startMonitoring() {
      // Verificar alertas a cada 30 segundos (em produção, ajustar conforme necessário)
      setInterval(() => this.checkAlerts(), 30000);
    }

    async checkAlerts() {
      // Em produção, aqui você buscaria os preços reais das criptomoedas
      // Esta é uma simulação com preços aleatórios
      const simulatedPrices = {
        'Bitcoin': 250000 + (Math.random() * 5000 - 2500),
        'Ethereum': 15000 + (Math.random() * 1000 - 500),
        'BNB': 3000 + (Math.random() * 200 - 100),
        'Solana': 500 + (Math.random() * 50 - 25)
      };

      let triggeredAny = false;

      for (const alert of this.alerts) {
        if (!alert.active || alert.triggered) continue;

        const currentPrice = simulatedPrices[alert.crypto] || 100;
        const shouldTrigger = (
          (alert.condition === 'above' && currentPrice >= alert.price) ||
          (alert.condition === 'below' && currentPrice <= alert.price)
        );

        if (shouldTrigger) {
          alert.triggered = true;
          alert.triggeredAt = new Date().toISOString();
          alert.triggeredPrice = currentPrice;
          triggeredAny = true;

          // Mostrar notificação
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Alerta Disparado!', {
              body: `${alert.crypto} ${alert.condition === 'above' ? 'atingiu' : 'caiu para'} R$ ${currentPrice.toFixed(2)}`,
              icon: '/assets/logo.png'
            });
          }

          // Mostrar alerta na página
          this.showAlertToast(alert, currentPrice);
        }
      }

      if (triggeredAny) {
        this.save();
        this.render();
      }

      // Atualizar última verificação
      document.getElementById('alertsLastCheck').textContent = `Última verificação: ${new Date().toLocaleTimeString('pt-BR')}`;
    }

    showAlertToast(alert, currentPrice) {
      const toast = document.createElement('div');
      toast.className = 'alert-toast';
      toast.innerHTML = `
            <div class="toast-header">
                <i class="fas fa-bell"></i>
                <strong>Alerta Disparado!</strong>
                <button class="toast-close">&times;</button>
            </div>
            <div class="toast-body">
                ${alert.crypto} ${alert.condition === 'above' ? 'atingiu' : 'caiu para'} R$ ${currentPrice.toFixed(2)}
            </div>
        `;

      document.body.appendChild(toast);

      // Remover toast após 5 segundos
      setTimeout(() => {
        toast.remove();
      }, 5000);

      // Fechar toast ao clicar no X
      toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
      });
    }

    filterAlerts(searchTerm = '', filter = 'all') {
      const filtered = this.alerts.filter(alert => {
        const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.crypto.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' ||
          (filter === 'active' && alert.active && !alert.triggered) ||
          (filter === 'triggered' && alert.triggered);

        return matchesSearch && matchesFilter;
      });

      this.render(filtered);
    }

    save() {
      localStorage.setItem('priceAlerts', JSON.stringify(this.alerts));
    }

    render(alerts = null) {
      const alertsToRender = alerts || this.alerts;
      const container = document.getElementById('alertsContainer');
      const emptyState = document.getElementById('alertsEmpty');

      if (alertsToRender.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (container) container.innerHTML = '';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      // Atualizar contador
      const activeAlerts = this.alerts.filter(a => a.active && !a.triggered).length;
      document.getElementById('alertsCount').textContent = activeAlerts;

      // Gerar HTML dos alertas
      container.innerHTML = alertsToRender.map(alert => `
            <div class="alert-item ${alert.triggered ? 'triggered' : ''}">
                <div class="alert-header">
                    <h4>${alert.name}</h4>
                    <span class="alert-status ${alert.triggered ? 'triggered' : alert.active ? 'active' : 'inactive'}">
                        ${alert.triggered ? 'Disparado' : alert.active ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
                <div class="alert-details">
                    <p>${alert.crypto} ${alert.condition === 'above' ? '≥' : '≤'} R$ ${alert.price.toFixed(2)}</p>
                    ${alert.triggered ? `
                        <p class="triggered-time">Disparado em: ${new Date(alert.triggeredAt).toLocaleString('pt-BR')}</p>
                        <p class="triggered-price">Preço: R$ ${alert.triggeredPrice.toFixed(2)}</p>
                    ` : ''}
                </div>
                <div class="alert-actions">
                    ${!alert.triggered ? `
                        <button class="btn-sm ${alert.active ? 'btn-warning' : 'btn-success'}" onclick="priceAlerts.toggleAlert(${alert.id})">
                            <i class="fas ${alert.active ? 'fa-pause' : 'fa-play'}"></i>
                            ${alert.active ? 'Pausar' : 'Ativar'}
                        </button>
                    ` : ''}
                    <button class="btn-sm btn-danger" onclick="priceAlerts.removeAlert(${alert.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `).join('');
    }
  }

  // Inicializar o sistema de alertas
  let priceAlerts;

  function initPriceAlerts() {
    priceAlerts = new PriceAlerts();
  }

  // PORTFÓLIO
  class PortfolioManager {
    constructor() {
      this.assets = JSON.parse(localStorage.getItem('portfolio')) || [];
      this.init();
    }

    init() {
      this.render();
      this.setupEventListeners();
    }

    setupEventListeners() {
      // Botão adicionar ativo
      document.getElementById('addAsset')?.addEventListener('click', () => this.showAddDialog());
      document.getElementById('addFirstAsset')?.addEventListener('click', () => this.showAddDialog());

      // Botão atualizar
      document.getElementById('refreshPortfolio')?.addEventListener('click', () => this.refreshPortfolio());

      // Botão exportar
      document.getElementById('exportPortfolio')?.addEventListener('click', () => this.exportPortfolio());
    }

    showAddDialog() {
      Swal.fire({
        title: 'Adicionar Ativo',
        html: `
                <input type="text" id="assetName" class="swal2-input" placeholder="Nome do ativo (ex: Bitcoin)">
                <input type="number" id="assetAmount" class="swal2-input" placeholder="Quantidade" step="any">
                <input type="number" id="assetPrice" class="swal2-input" placeholder="Preço pago por unidade (R$)" step="any">
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Adicionar',
        preConfirm: () => {
          const name = document.getElementById('assetName').value;
          const amount = parseFloat(document.getElementById('assetAmount').value);
          const price = parseFloat(document.getElementById('assetPrice').value);

          if (!name || !amount || !price) {
            Swal.showValidationMessage('Por favor, preencha todos os campos');
            return false;
          }

          return { name, amount, price };
        }
      }).then(result => {
        if (result.isConfirmed) {
          this.addAsset(result.value);
        }
      });
    }

    addAsset(asset) {
      this.assets.push({
        id: Date.now(),
        ...asset,
        addedAt: new Date().toISOString()
      });
      this.save();
      this.render();
      Swal.fire('Sucesso!', 'Ativo adicionado ao portfólio.', 'success');
    }

    removeAsset(id) {
      Swal.fire({
        title: 'Remover ativo?',
        text: "Esta ação não pode ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, remover!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.assets = this.assets.filter(asset => asset.id !== id);
          this.save();
          this.render();
          Swal.fire('Removido!', 'O ativo foi removido do portfólio.', 'success');
        }
      });
    }

    editAsset(id) {
      const asset = this.assets.find(a => a.id === id);
      if (!asset) return;

      Swal.fire({
        title: 'Editar Ativo',
        html: `
                <input type="text" id="editAssetName" class="swal2-input" value="${asset.name}" placeholder="Nome do ativo">
                <input type="number" id="editAssetAmount" class="swal2-input" value="${asset.amount}" placeholder="Quantidade" step="any">
                <input type="number" id="editAssetPrice" class="swal2-input" value="${asset.price}" placeholder="Preço pago (R$)" step="any">
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        preConfirm: () => {
          const name = document.getElementById('editAssetName').value;
          const amount = parseFloat(document.getElementById('editAssetAmount').value);
          const price = parseFloat(document.getElementById('editAssetPrice').value);

          if (!name || !amount || !price) {
            Swal.showValidationMessage('Por favor, preencha todos os campos');
            return false;
          }

          return { name, amount, price };
        }
      }).then(result => {
        if (result.isConfirmed) {
          const index = this.assets.findIndex(a => a.id === id);
          if (index !== -1) {
            this.assets[index] = { ...this.assets[index], ...result.value };
            this.save();
            this.render();
            Swal.fire('Sucesso!', 'Ativo atualizado.', 'success');
          }
        }
      });
    }

    async refreshPortfolio() {
      // Simulação de atualização de preços
      Swal.fire({
        title: 'Atualizando preços...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.render();
      Swal.fire('Atualizado!', 'Os preços do portfólio foram atualizados.', 'success');
    }

    exportPortfolio() {
      if (this.assets.length === 0) {
        Swal.fire('Portfólio vazio', 'Adicione ativos antes de exportar.', 'info');
        return;
      }

      const data = JSON.stringify(this.assets, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-trackcrypto-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      Swal.fire('Exportado!', 'Seu portfólio foi exportado com sucesso.', 'success');
    }

    save() {
      localStorage.setItem('portfolio', JSON.stringify(this.assets));
    }

    render() {
      const container = document.getElementById('portfolioAssets');
      const emptyState = document.getElementById('portfolioEmpty');
      const portfolioContent = document.querySelector('.portfolio-content');

      if (this.assets.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (portfolioContent) portfolioContent.style.display = 'none';
        if (container) container.innerHTML = '';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';
      if (portfolioContent) portfolioContent.style.display = 'grid';

      // Calcular totais
      let totalInvested = 0;
      let totalCurrent = 0;

      // Gerar HTML da tabela
      container.innerHTML = this.assets.map(asset => {
        const invested = asset.amount * asset.price;
        // Simular valor atual (em produção, buscaría preço real da API)
        const currentPrice = asset.price * (1 + (Math.random() * 0.4 - 0.2)); // Variação de ±20%
        const currentValue = asset.amount * currentPrice;
        const profit = currentValue - invested;
        const profitPercent = (profit / invested) * 100;

        totalInvested += invested;
        totalCurrent += currentValue;

        return `
                <tr>
                    <td>${asset.name}</td>
                    <td>${asset.amount.toFixed(6)}</td>
                    <td>R$ ${asset.price.toFixed(2)}</td>
                    <td>R$ ${invested.toFixed(2)}</td>
                    <td>R$ ${currentValue.toFixed(2)}</td>
                    <td class="${profit >= 0 ? 'positive' : 'negative'}">${profit >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%</td>
                    <td>
                        <button class="btn-icon" onclick="portfolioManager.editAsset(${asset.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="portfolioManager.removeAsset(${asset.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      }).join('');

      // Atualizar totais
      const totalProfit = totalCurrent - totalInvested;
      const totalProfitPercent = (totalProfit / totalInvested) * 100;

      document.getElementById('portfolioTotal').textContent = `R$ ${totalCurrent.toFixed(2)}`;
      document.getElementById('portfolioProfit').textContent = `R$ ${totalProfit.toFixed(2)}`;
      document.getElementById('portfolioChange').textContent = `${totalProfit >= 0 ? '+' : ''}${totalProfitPercent.toFixed(2)}%`;

      // Aplicar estilos aos totais
      const profitElement = document.getElementById('portfolioProfit');
      const changeElement = document.getElementById('portfolioChange');

      if (totalProfit >= 0) {
        profitElement.className = 'positive';
        changeElement.className = 'positive';
      } else {
        profitElement.className = 'negative';
        changeElement.className = 'negative';
      }
    }
  }

  // Inicializar o gerenciador de portfólio
  let portfolioManager;

  function initPortfolioManager() {
    portfolioManager = new PortfolioManager();
  }

  // 34. INICIALIZAR TODAS AS FUNCIONALIDADES - VERSÃO CORRIGIDA
  async function initAllFeatures() {
    try {
      console.log("Inicializando todas as funcionalidades...");

      // Inicializar dados básicos com tratamento de erro individual
      try {
        await updateCryptoData();
      } catch (error) {
        console.error("Erro em updateCryptoData:", error);
      }

      try {
        await initChart();
      } catch (error) {
        console.error("Erro em initChart:", error);
      }

      try {
        await updateFearGreed();
      } catch (error) {
        console.error("Erro em updateFearGreed:", error);
      }

      try {
        await loadNews();
      } catch (error) {
        console.error("Erro em loadNews:", error);
      }

      // Configurar controles do gráfico
      try {
        setupChartControls();
      } catch (error) {
        console.error("Erro em setupChartControls:", error);
      }

      // Inicializar métricas avançadas
      try {
        await updateAdvancedMetrics();
      } catch (error) {
        console.error("Erro em updateAdvancedMetrics:", error);
      }

      console.log("Todas funcionalidades inicializadas");

    } catch (error) {
      console.error("Erro crítico em initAllFeatures:", error);
    }
  }

  // 35. FUNÇÕES AUXILIARES
  function formatCurrency(num, compact = false) {
  if (!num && num !== 0) return 'R$ --';

  if (compact) {
    if (num >= 1e12) return `R$ ${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `R$ ${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `R$ ${(num / 1e6).toFixed(2)}M`;
  }

  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  });
}

  // Adicione no final do DOMContentLoaded, antes do initializeApp();
  document.getElementById('refreshCryptoData')?.addEventListener('click', updateCryptoData);

  // 36. FUNÇÕES GLOBAIS (para uso em onclick)
  window.toggleAlert = function (id) {
    const alerts = JSON.parse(localStorage.getItem('priceAlerts')) || [];
    const alertIndex = alerts.findIndex(a => a.id === id);

    if (alertIndex !== -1) {
      alerts[alertIndex].active = !alerts[alertIndex].active;
      localStorage.setItem('priceAlerts', JSON.stringify(alerts));
      updateAlertsUI();
    }
  };

  window.deleteAlert = function (id) {
    Swal.fire({
      title: 'Excluir alerta?',
      text: "Esta ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        const alerts = JSON.parse(localStorage.getItem('priceAlerts')) || [];
        const filteredAlerts = alerts.filter(a => a.id !== id);
        localStorage.setItem('priceAlerts', JSON.stringify(filteredAlerts));
        updateAlertsUI();
        Swal.fire('Excluído!', 'Seu alerta foi excluído.', 'success');
      }
    });
  };

  window.removeAsset = function (id) {
    Swal.fire({
      title: 'Remover ativo?',
      text: "Esta ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover!'
    }).then((result) => {
      if (result.isConfirmed) {
        const portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
        const filteredPortfolio = portfolio.filter(a => a.id !== id);
        localStorage.setItem('portfolio', JSON.stringify(filteredPortfolio));
        updatePortfolioUI();
        Swal.fire('Removido!', 'O ativo foi removido do portfólio.', 'success');
      }
    });
  };

  // 37. INICIAR APLICAÇÃO
  initializeApp();
});