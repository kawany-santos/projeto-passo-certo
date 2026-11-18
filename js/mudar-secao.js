// Seleciona o botão e a seção pelo ID
const todosBtn = document.getElementById('todosBtn');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const secao1 = document.getElementById('div-cards1');
const secao2 = document.getElementById('div-cards2');
const secao3 = document.getElementById('div-cards3');
const secao4 = document.getElementById('div-cards4');
const secao5 = document.getElementById('div-cards5');
const secao6 = document.getElementById('div-cards6');
const secao7 = document.getElementById('div-cards7');
const secao8 = document.getElementById('div-cards8');
const secao9 = document.getElementById('div-cards9');
const secao10 = document.getElementById('div-cards10');
const secao11 = document.getElementById('div-cards11');
const pesqLocal = document.getElementById('pesq-local');

// Adiciona um evento de clique ao botão
btn1.addEventListener('click', function() {


    pesqLocal.innerHTML = `<p>Encontramos 5 locais na Zona Norte.</p>`
  // Altera o conteúdo HTML da seção
  secao1.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Casa Verde/Cachoeirinha
                    </h4>
                    <p>
                        Avenida Ordem e Progresso, 1001 – Jardim das Laranjeiras
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small> 
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/6nA0CNkpHsLvEHbgI'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Jaçanã
                    </h4>
                    <p>
                        Avenida Luís Stamatis, 300 – Vila Constança
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/gTeQpV3XM7jnukheu'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Pirituba
                    </h4>
                    <p>
                        Rua Paula Ferreira, 1708 – Vila Pirituba
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/RkdN5QpNMMzt0diwh'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao2.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Santana/Tucuruvi
                    </h4>
                    <p>
                        Avenida Tucuruvi, 808 – Tucuruvi
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/oSge6Sw3CnhUpRyRP'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Vila Maria/Vila Guilherme
                    </h4>
                    <p>
                        Rua General Mendes, 111 – Vila Maria Alta
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/7nAEbujmXnasgQ1Tg'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local card-local-mais">
                    <img src="/images/icones/icone_global.png" class="icone-global">
                    <h4>Não mora em São Paulo?</h4>
                    <p>
                        Procure a prefeitura da sua cidade ou o CRAS mais perto de você 
                        e pergunte onde há ajuda presencial.
                    </p>
                    <small>
                        Dúvidas sobre São Paulo: ligue 156.
                    </small>
                </div>
  `;
      secao3.innerHTML = `
`;
        secao4.innerHTML = `

  `;
        secao5.innerHTML = `

  `;
        secao6.innerHTML = `

  `;
        secao7.innerHTML = `

  `;
        secao8.innerHTML = `

  `;
        secao9.innerHTML = `

  `;
        secao10.innerHTML = `

  `;
        secao11.innerHTML = `

  `;

  // Adiciona ou remove uma classe CSS para mudar o estilo
    secao1.classList.toggle('destaque');
    secao2.classList.toggle('destaque');
    secao3.classList.toggle('destaque');
    secao4.classList.toggle('destaque');
    secao5.classList.toggle('destaque');
    secao6.classList.toggle('destaque');
    secao7.classList.toggle('destaque');
    secao8.classList.toggle('destaque');
    secao9.classList.toggle('destaque');
    secao10.classList.toggle('destaque');
    secao11.classList.toggle('destaque');
    pesqLocal.classList.toggle('destaque');

});

btn2.addEventListener('click', function() {
    pesqLocal.innerHTML = `<p>Encontramos 9 locais na Zona Sul.</p>`
  // Altera o conteúdo HTML da seção
  secao1.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Campo Limpo
                    </h4>
                    <p>
                        Avenida Giovanni Gronchi, 7143 – Vila Andrade
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/cqYnCrIFzt14exvMd'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/"">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Capela do Socorro
                    </h4>
                    <p>
                        Rua Cassiano dos Santos, 499 – Jardim Clipper
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/gZnspzubchCWI1DU2'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Cidade Ademar
                    </h4>
                    <p>
                        Avenida Yervant Kissajikian, 416 – Vila Constância
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/1r8jgAUmPtaOmTqYL'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao2.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Ipiranga
                    </h4>
                    <p>
                        Rua Breno Ferraz do Amaral, 425 – Ipiranga
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/9Si4FwXL5OwEL9Jjz'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Jabaquara
                    </h4>
                    <p>
                        Avenida Eng. Armando de Arruda Pereira, 2314 – Jabaquara
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/XdHtsA7ZjvtLW1azB'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP M'Boi Mirim
                    </h4>
                    <p>
                        Avenida Guarapiranga, 1695 – Vila Socorro
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/OcKMQleRXZriKWJUN'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao3.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Parelheiros
                    </h4>
                    <p>
                        Estrada Ecoturística de Parelheiros, 5252 – Jardim dos Álamos
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/RsVVJL0MrbS4oLxC7'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Santo Amaro
                    </h4>
                    <p>
                        Praça Floriano Peixoto, 54 – Santo Amaro
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/YX6yGHhwcCDuFfyYM'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Vila Mariana
                    </h4>
                    <p>
                        Rua José de Magalhães, 500 – Vila Clementino
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/ROhKomuLH2gQecWSz'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao4.innerHTML = `

  `;
          secao5.innerHTML = `

  `;
        secao6.innerHTML = `

  `;
        secao7.innerHTML = `

  `;
        secao8.innerHTML = `

  `;
        secao9.innerHTML = `

  `;
        secao10.innerHTML = `

  `;
        secao11.innerHTML = `

  `;
  
  // Adiciona ou remove uma classe CSS para mudar o estilo
    secao1.classList.toggle('destaque');
    secao2.classList.toggle('destaque');
    secao3.classList.toggle('destaque');
    secao4.classList.toggle('destaque');
    secao5.classList.toggle('destaque');
    secao6.classList.toggle('destaque');
    secao7.classList.toggle('destaque');
    secao8.classList.toggle('destaque');
    secao9.classList.toggle('destaque');
    secao10.classList.toggle('destaque');
    secao11.classList.toggle('destaque');
    pesqLocal.classList.toggle('destaque');

});

btn3.addEventListener('click', function() {
    pesqLocal.innerHTML = `<p>Encontramos 12 locais na Zona Leste.</p>`
  // Altera o conteúdo HTML da seção
  secao1.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Aricanduva
                    </h4>
                    <p>
                        Avenida Aricanduva, 5777 – Aricanduva
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/S0lja44ENyjgnJEub'>
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Cidade Tiradentes
                    </h4>
                    <p>
                        Avenida Ragueb Chohfi, 7001 – Jardim Marilu
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/JhBCzp6KO9kRAt3oF'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Ermelino Matarazzo
                    </h4>
                    <p>
                        Rua Boturussu, 1180 – Parque Boturussu
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/aITO3B35qjHTTcoX0'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao2.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Guaianases
                    </h4>
                    <p>
                        Rua Copenhague, 92 – Guaianases
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/F2VJItfDNEidWMRyn'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Itaim Paulista
                    </h4>
                    <p>
                        Avenida Marechal Tito, 3012 – São Miguel Paulista
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/sQryo12OkOsyuugmG'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Itaquera
                    </h4>
                    <p>
                        Avenida Itaquera, 6735 – Cidade Líde
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/Mm1XtA3YxZujZ1QgF'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao3.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Mooca
                    </h4>
                    <p>
                        Rua Hipódromo, 1552 – Mooca
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/VC76sNyooVuYMIQH8'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Penha
                    </h4>
                    <p>
                        Rua Candapuí, 49 – Vila Marieta
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/NLIRiTFPjCAzDsOQu'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP São Mateus
                    </h4>
                    <p>
                        Avenida Ragueb Chohfi, 1400 – Jardim Três Maria
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/NW7I9c2nR0aGpZ52T'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
      secao4.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP São Miguel Paulista
                    </h4>
                    <p>
                        Rua Dona Ana Flora de Sousa, 76 – Vila Jacuí
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/BuKGfUPiwZ6s9PaPl'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Sapopemba
                    </h4>
                    <p>
                        Avenida Sapopemba, 9064 – Jardim Adutora
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/Pg35cVRdGdURfZQ3n'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Vila Prudente
                    </h4>
                    <p>
                        Avenida do Oratório, 172 – Jardim Independência.
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/3PoUHKzOrTvvafD81'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
          secao5.innerHTML = `

  `;
        secao6.innerHTML = `

  `;
        secao7.innerHTML = `

  `;
        secao8.innerHTML = `

  `;
        secao9.innerHTML = `

  `;
        secao10.innerHTML = `

  `;
        secao11.innerHTML = `

  `;
  // Adiciona ou remove uma classe CSS para mudar o estilo
    secao1.classList.toggle('destaque');
    secao2.classList.toggle('destaque');
    secao3.classList.toggle('destaque');
    secao4.classList.toggle('destaque');
    secao5.classList.toggle('destaque');
    secao6.classList.toggle('destaque');
    secao7.classList.toggle('destaque');
    secao8.classList.toggle('destaque');
    secao9.classList.toggle('destaque');
    secao10.classList.toggle('destaque');
    secao11.classList.toggle('destaque');
    pesqLocal.classList.toggle('destaque');

});

btn4.addEventListener('click', function() {
        pesqLocal.innerHTML = `<p>Encontramos 4 locais na Zona Oeste.</p>`
  // Altera o conteúdo HTML da seção
  secao1.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Butantã
                    </h4>
                    <p>
                        Rua Dr. Ulpiano da Costa Manso, 201 – Jardim Peri Peri
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/1CxE4YJu8OH0Df2Yv'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Freguesia do Ó/Brasilândia
                    </h4>
                    <p>
                        Avenida João Marcelino Branco, 95 – Vila dos Andrades
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/6aHJameWBftnANbwD'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Lapa
                    </h4>
                    <p>
                        Rua Guaicurus, 1000 – Vila Romana
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/9undgQkZ5k4jlztxl'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
  `;
    secao2.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Pinheiros
                    </h4>
                    <p>
                        Avenida Dra. Ruth Cardoso, 7123 – Pinheiro
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/cRCQVuGT0tXKJNffO'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local card-local-mais">
                    <img src="/images/icones/icone_global.png" class="icone-global">
                    <h4>Não mora em São Paulo?</h4>
                    <p>
                        Procure a prefeitura da sua cidade ou o CRAS mais perto de você 
                        e pergunte onde há ajuda presencial.
                    </p>
                    <small>
                        Dúvidas sobre São Paulo: ligue 156.
                    </small>
                </div>
  `;
      secao3.innerHTML = `

  `;
        secao4.innerHTML = `

  `;
          secao5.innerHTML = `

  `;
        secao6.innerHTML = `

  `;
        secao7.innerHTML = `

  `;
        secao8.innerHTML = `

  `;
        secao9.innerHTML = `

  `;
        secao10.innerHTML = `

  `;
        secao11.innerHTML = `

  `;
  // Adiciona ou remove uma classe CSS para mudar o estilo
    secao1.classList.toggle('destaque');
    secao2.classList.toggle('destaque');
    secao3.classList.toggle('destaque');
    secao4.classList.toggle('destaque');
    secao5.classList.toggle('destaque');
    secao6.classList.toggle('destaque');
    secao7.classList.toggle('destaque');
    secao8.classList.toggle('destaque');
    secao9.classList.toggle('destaque');
    secao10.classList.toggle('destaque');
    secao11.classList.toggle('destaque');
    pesqLocal.classList.toggle('destaque');

});

btn5.addEventListener('click', function() {
        pesqLocal.innerHTML = `<p>Encontramos 2 locais no Centro.</p>`

  // Altera o conteúdo HTML da seção
  secao1.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP 24 horas
                    </h4>
                    <p>
                        Rua Quinze de Novembro, 268 – Centro Histórico
                    </p>
                    <small>
                        Todos os dias, durante 24h, exceto em feriados e Pontos Facultativos.
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/M8p1nroH8lyFPa2aF'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Sé
                    </h4>
                    <p>
                        Rua Álvares Penteado, 49 – Centro Histórico
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa" onclick="window.location.href='https://share.google/FkmUgAnp6Sd5pqfc0'">
                        Ver no mapa
                    </button>
                    <a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/">Como agendar</a>
                </div>
                <div class="cards-local card-local-mais">
                    <img src="/images/icones/icone_global.png" class="icone-global">
                    <h4>Não mora em São Paulo?</h4>
                    <p>
                        Procure a prefeitura da sua cidade ou o CRAS mais perto de você 
                        e pergunte onde há ajuda presencial.
                    </p>
                    <small>
                        Dúvidas sobre São Paulo: ligue 156.
                    </small>
                </div>
  `;
    secao2.innerHTML = `
  `;
      secao3.innerHTML = `

  `;
        secao4.innerHTML = `

  `;
          secao5.innerHTML = `

  `;
        secao6.innerHTML = `

  `;
        secao7.innerHTML = `

  `;
        secao8.innerHTML = `

  `;
        secao9.innerHTML = `

  `;
        secao10.innerHTML = `

  `;
        secao11.innerHTML = `

  `;
  // Adiciona ou remove uma classe CSS para mudar o estilo
    secao1.classList.toggle('destaque');
    secao2.classList.toggle('destaque');
    secao3.classList.toggle('destaque');
    secao4.classList.toggle('destaque');
    secao5.classList.toggle('destaque');
    secao6.classList.toggle('destaque');
    secao7.classList.toggle('destaque');
    secao8.classList.toggle('destaque');
    secao9.classList.toggle('destaque');
    secao10.classList.toggle('destaque');
    secao11.classList.toggle('destaque');
    pesqLocal.classList.toggle('destaque');

});

todosBtn.addEventListener('click', function() {
        pesqLocal.innerHTML = `<p>Encontramos 32 locais em SP.</p>`

  // Altera o conteúdo HTML da seção
  secao1.innerHTML = `
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Casa Verde/Cachoeirinha
                    </h4>
                    <p>
                        Avenida Ordem e Progresso, 1001 – Jardim das Laranjeiras
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Jaçanã
                    </h4>
                    <p>
                        Avenida Luís Stamatis, 300 – Vila Constança
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Pirituba
                    </h4>
                    <p>
                        Rua Paula Ferreira, 1708 – Vila Pirituba
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
    secao2.innerHTML = `
                    <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Santana/Tucuruvi
                    </h4>
                    <p>
                        Avenida Tucuruvi, 808 – Tucuruvi
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Vila Maria/Vila Guilherme
                    </h4>
                    <p>
                        Rua General Mendes, 111 – Vila Maria Alta
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Campo Limpo
                    </h4>
                    <p>
                        Avenida Giovanni Gronchi, 7143 – Vila Andrade
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
      secao3.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Capela do Socorro
                    </h4>
                    <p>
                        Rua Cassiano dos Santos, 499 – Jardim Clipper
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Cidade Ademar
                    </h4>
                    <p>
                        Avenida Yervant Kissajikian, 416 – Vila Constância
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Ipiranga
                    </h4>
                    <p>
                        Rua Breno Ferraz do Amaral, 425 – Ipiranga
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
        secao4.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Jabaquara
                    </h4>
                    <p>
                        Avenida Eng. Armando de Arruda Pereira, 2314 – Jabaquara
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP M'Boi Mirim
                    </h4>
                    <p>
                        Avenida Guarapiranga, 1695 – Vila Socorro
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Parelheiros
                    </h4>
                    <p>
                        Estrada Ecoturística de Parelheiros, 5252 – Jardim dos Álamos
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
          secao5.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Santo Amaro
                    </h4>
                    <p>
                        Praça Floriano Peixoto, 54 – Santo Amaro
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Vila Mariana
                    </h4>
                    <p>
                        Rua José de Magalhães, 500 – Vila Clementino
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Aricanduva
                    </h4>
                    <p>
                        Avenida Aricanduva, 5777 – Aricanduva
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
            secao6.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Cidade Tiradentes
                    </h4>
                    <p>
                        Avenida Ragueb Chohfi, 7001 – Jardim Marilu
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Ermelino Matarazzo
                    </h4>
                    <p>
                        Rua Boturussu, 1180 – Parque Boturussu
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Guaianases
                    </h4>
                    <p>
                        Rua Copenhague, 92 – Guaianases
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
            secao7.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Itaim Paulista
                    </h4>
                    <p>
                        Avenida Marechal Tito, 3012 – São Miguel Paulista
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Itaquera
                    </h4>
                    <p>
                        Avenida Itaquera, 6735 – Cidade Líde
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Mooca
                    </h4>
                    <p>
                        Rua Hipódromo, 1552 – Mooca
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
            secao8.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Penha
                    </h4>
                    <p>
                        Rua Candapuí, 49 – Vila Marieta
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP São Mateus
                    </h4>
                    <p>
                        Avenida Ragueb Chohfi, 1400 – Jardim Três Maria
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP São Miguel Paulista
                    </h4>
                    <p>
                        Rua Dona Ana Flora de Sousa, 76 – Vila Jacuí
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
            secao9.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Sapopemba
                    </h4>
                    <p>
                        Avenida Sapopemba, 9064 – Jardim Adutora
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Vila Prudente
                    </h4>
                    <p>
                        Avenida do Oratório, 172 – Jardim Independência.
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                 <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Butantã
                    </h4>
                    <p>
                        Rua Dr. Ulpiano da Costa Manso, 201 – Jardim Peri Peri
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
            secao10.innerHTML = `

                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Freguesia do Ó/Brasilândia
                    </h4>
                    <p>
                        Avenida João Marcelino Branco, 95 – Vila dos Andrades
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Lapa
                    </h4>
                    <p>
                        Rua Guaicurus, 1000 – Vila Romana
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Pinheiros
                    </h4>
                    <p>
                        Avenida Dra. Ruth Cardoso, 7123 – Pinheiro
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
  `;
            secao11.innerHTML = `

                                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP 24 horas
                    </h4>
                    <p>
                        Rua Quinze de Novembro, 268 – Centro Histórico
                    </p>
                    <small>
                        Todos os dias, durante 24h, exceto em feriados e Pontos Facultativos.
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                <div class="cards-local">
                    <img src="/images/icones/icone_local.png" class="icone-local">
                    <h4>
                        Descomplica SP Sé
                    </h4>
                    <p>
                        Rua Álvares Penteado, 49 – Centro Histórico
                    </p>
                    <small>
                        Seg. a sex., 8h às 17h
                    </small>
                    <button class="btn-mapa">
                        Ver no mapa
                    </button>
                    <a href="#">Como agendar</a>
                </div>
                                <div class="cards-local card-local-mais">
                    <img src="/images/icones/icone_global.png" class="icone-global">
                    <h4>Não mora em São Paulo?</h4>
                    <p>
                        Procure a prefeitura da sua cidade ou o CRAS mais perto de você 
                        e pergunte onde há ajuda presencial.
                    </p>
                    <small>
                        Dúvidas sobre São Paulo: ligue 156.
                    </small>
                </div>
  `;
  // Adiciona ou remove uma classe CSS para mudar o estilo
    secao1.classList.toggle('destaque');
    secao2.classList.toggle('destaque');
    secao3.classList.toggle('destaque');
    secao4.classList.toggle('destaque');
    secao5.classList.toggle('destaque');
    secao6.classList.toggle('destaque');
    secao7.classList.toggle('destaque');
    secao8.classList.toggle('destaque');
    secao9.classList.toggle('destaque');
    secao10.classList.toggle('destaque');
    secao11.classList.toggle('destaque');
    pesqLocal.classList.toggle('destaque');
});


