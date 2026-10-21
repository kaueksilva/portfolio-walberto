# Portfólio — Walberto Ferreira de Souza

Site pessoal de **Walberto Ferreira de Souza**, Analista de Sistemas Sênior com mais de 12 anos em Dados, Business Intelligence e Automação Microsoft.

**Acesse:** https://kaueksilva.github.io/portfolio-walberto/

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Página única com todas as seções |
| `style.css` | Visual escuro e animações (vermelho e azul) |
| `script.js` | Menu, animações e **contatos** |
| `walberto.jpeg` | Foto de perfil |

É um site estático: HTML, CSS e JavaScript puros, sem build e sem dependências.

## Editar os contatos

No início do `script.js`. Os campos vazios ficam ocultos.

```js
const CONTATOS = {
  linkedin: 'https://www.linkedin.com/in/walberto-ferreira-de-souza-tec',
  email: 'walberto.ferreira@gmail.com',
  whatsapp: '5581997562445', // DDI + DDD + número
};
```

## Rodar localmente

Abra o `index.html` no navegador ou, para simular o servidor:

```bash
python -m http.server 5500
```

e acesse http://localhost:5500.

## Publicar no GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Selecione a branch `main`, pasta `/ (root)`, e clique em **Save**.
4. Em 1 ou 2 minutos o site estará em https://kaueksilva.github.io/portfolio-walberto/.

Cada novo push na `main` atualiza o site automaticamente.

## Paleta

| Cor | Hex | Uso |
| --- | --- | --- |
| Fundo | `#070B14` | Base escura |
| Superfície | `#0D1424` | Cards e blocos |
| Vermelho | `#E63946` | Destaques e botão principal |
| Azul | `#4C7DFF` | Elementos técnicos e links |
| Gradiente | `#E63946 → #A24BB8 → #4C7DFF` | Nome, números e frase de efeito |

Tipografia: Inter (texto) e Montserrat (títulos).

---

Desenvolvido por [Kauê Silva Nascimento](https://www.instagram.com/kaueksilva/).
© Walberto Ferreira de Souza. Todos os direitos reservados.
