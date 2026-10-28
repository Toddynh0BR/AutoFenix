# AutoFênix Proteção Veicular — site institucional

Landing page em React + Vite, com localizador de consultores, busca de endereços e mapa interativo.

## Requisitos
- Node.js 20.19+ (ou versão compatível atual do Vite)
- npm

## Instalação e execução
```bash
npm install
npm run dev
```

## Build e testes
```bash
npm test
npm run build
npm run preview
```

## Configuração antes da publicação

1. **Consultores:** edite `src/data/consultores.js` e adicione apenas pessoas reais autorizadas a divulgar nome, telefone e coordenadas. O telefone deve conter apenas dígitos no formato internacional, incluindo `55` e DDD. Registros sem dados válidos são ignorados. Sem consultores, o localizador informa a situação e encaminha para o Instagram oficial.
2. **Canais oficiais:** edite `src/data/siteConfig.js`. O Instagram e o perfil Google fornecidos estão configurados. O WhatsApp geral e o atendimento exclusivo a associados permanecem vazios até confirmação.
3. **Benefícios e FAQ:** `src/data/siteConfig.js` contém textos institucionais neutros. Revise com a equipe e com a documentação vigente antes de publicar condições comerciais ou contratuais.
4. **Marca:** as variações de logo recebidas estão em `src/assets/logos/`. A marca gráfica da fênix e o wordmark são usados no site. O selo que contém a frase “registrada na SUSEP” foi mantido como referência no diretório de assets, mas não é exibido no site sem validação documental.
5. **Favicon:** adicione `public/favicon.png` com uma versão apropriada do símbolo oficial. Até lá, o navegador pode mostrar favicon ausente.

## Busca de endereços e mapa
- O autocomplete e a geocodificação reversa usam o Photon (dados OpenStreetMap).
- O mapa usa Leaflet e tiles do OpenStreetMap, com atribuição visível.
- O Photon é um serviço comunitário e sua disponibilidade/limites podem mudar. O debounce de busca é de 850 ms; antes de uma operação de produção com tráfego significativo, avalie um provedor com SLA ou uma instância própria, respeitando os termos do provedor. Não faça requisições em massa.
- Nenhuma chave secreta é necessária nesta implementação. Se migrar para provedor que exija chave, não coloque uma chave privada no bundle do navegador; use chave pública restrita por domínio ou um backend/proxy conforme a política do serviço.
- O navegador normalmente exige HTTPS (ou localhost) para disponibilizar geolocalização. A permissão só é solicitada depois do clique do visitante.

## Privacidade
O nome e a localização ficam no estado React e não são gravados em banco de dados ou `localStorage`. A busca de endereços e os tiles do mapa fazem solicitações a terceiros, que recebem as consultas de localização e dados técnicos necessários à requisição. Revise a política e as obrigações aplicáveis (incluindo LGPD) antes de publicar. Não há analytics ou cookies de analytics configurados nesta versão.

## Pendências para produção
- Cadastrar consultores reais e validar os números WhatsApp.
- Confirmar canal geral e canal para associados.
- Validar institucionalmente os textos de benefícios, FAQ e privacidade.
- Confirmar qualquer alegação regulatória com documentação oficial antes de divulgá-la.
- Adicionar favicon e imagem social de compartilhamento aprovados.
- Testar em ambiente hospedado real, HTTPS, celulares e navegadores suportados.
