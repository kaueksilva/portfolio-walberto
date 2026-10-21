# Portfólio — Walberto Ferreira de Souza

Site pessoal de **Walberto Ferreira de Souza**, Analista de Sistemas Sênior com mais de 12 anos em Dados, Business Intelligence e Automação Microsoft.

**Acesse:** https://kaueksilva.github.io/portfolio-walberto/

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `server.js` | Servidor Node.js (sem dependências) que entrega o site |
| `package.json` | Scripts `npm start` e `npm run dev` |
| `public/index.html` | Página única com todas as seções |
| `public/style.css` | Visual escuro e animações (vermelho e azul) |
| `public/script.js` | Menu, animações e **contatos** |
| `public/walberto.jpeg` | Foto de perfil |
| `.github/workflows/pages.yml` | Publicação automática no GitHub Pages |

O servidor usa apenas módulos nativos do Node.js: não há `npm install` nem build.

## Rodar com Node.js

Requer Node.js 18 ou superior.

```bash
npm start          # http://localhost:3000
npm run dev        # reinicia sozinho ao salvar o server.js
PORT=8080 npm start  # outra porta
```

Rotas úteis: `/` (site) e `/healthz` (verificação de saúde para hospedagens).

## Editar os contatos

No início do `public/script.js`. Os campos vazios ficam ocultos.

```js
const CONTATOS = {
  linkedin: 'https://www.linkedin.com/in/walberto-ferreira-de-souza-tec',
  email: 'walberto.ferreira@gmail.com',
  whatsapp: '5581997562445', // DDI + DDD + número
};
```

## Publicar

### GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Pronto: o workflow `pages.yml` publica a pasta `public/` a cada push na `main`.

O site fica em https://kaueksilva.github.io/portfolio-walberto/.

### Hospedagem Node.js (Hostinger, Render, VPS)

- Comando de inicialização: `npm start`
- Porta: definida pela variável `PORT` (o servidor já lê)
- Health check: `/healthz`

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
