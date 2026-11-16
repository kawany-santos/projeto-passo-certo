# Passo Certo

Plataforma web que ensina pessoas idosas a usar serviços públicos digitais, com trilhas curtas e um simulador onde errar não tem consequência.

Projeto da Global Solution FIAP 2026, tema CitizenTech.

## Problema

Parte das pessoas idosas não aprendeu a usar com segurança os serviços públicos que passaram a ser digitais. Elas dependem de familiares, desistem do serviço ou ficam expostas a golpes.

## Solução

- **Trilhas de aprendizado:** lições curtas, com texto simples e leitura em voz alta.
- **Simulador:** a pessoa pratica um agendamento num ambiente de treino, sem nenhum risco.
- **Ajuda presencial:** a página indica unidades onde atendentes ajudam a usar serviços pela internet.

## Interações em JavaScript

| Interação | Problema de experiência que resolve |
| --- | --- |
| Aumentar e diminuir a letra, com 4 tamanhos salvos no aparelho | Dificuldade de leitura, sem precisar reconfigurar a cada visita |
| Alto contraste | Baixa visão e telas com pouco brilho |
| Leitura da página em voz alta, em português | Baixa visão, pouca familiaridade com leitura e cansaço visual |
| Menu e painel de ajustes no celular, com foco preso e fechamento pela tecla Esc | Navegação clara por toque e por teclado |
| Cabeçalho que se adapta quando a letra grande não cabe | Evita que o menu fique quebrado com a letra maior |

## Acessibilidade

- HTML semântico (header, nav, main, footer e títulos em ordem)
- Texto alternativo nas imagens
- Contraste adequado e modo de alto contraste
- Navegação por teclado com foco visível, inclusive nos elementos criados com JavaScript
- Mensagens de cada ajuste anunciadas ao leitor de tela
- Linguagem simples e direta

## Tecnologias

HTML, CSS e JavaScript puro. Publicado com GitHub Pages.

## Estrutura

```
index.html      Página inicial
css/style.css   Estilos, versões desktop e celular e modo alto contraste
js/main.js      Ajustes de leitura, leitura em voz alta, menu e painel de ajustes
img/            Fotos e ilustrações
```

## Como rodar no computador

Abra o arquivo `index.html` no navegador. Não é preciso instalar nada.
