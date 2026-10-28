# AutoFênix Proteção Veicular — site institucional

Landing page em React + Vite, com localizador de consultores, busca de endereços e mapa interativo.

O arquivo `vite.config.js` ativa o plugin oficial do React, necessário para transformar o JSX dos componentes. Se a página ficar em branco, veja a seção **Diagnóstico de erros** abaixo.

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

## Diagnóstico de erros

1. Execute `npm run dev` no terminal e abra exatamente o endereço local mostrado pelo Vite.
2. Se a página mostrar uma mensagem de erro, copie o erro técnico exibido e consulte também o console do navegador (F12 → Console).
3. Confirme que `npm install` terminou sem erros. Se necessário, execute `npm install` novamente e reinicie o servidor com `npm run dev`.
4. O `src/main.jsx` envolve a aplicação em um Error Boundary para evitar que erros de renderização resultem apenas em uma tela totalmente branca.

## Organização do código

- `src/App.jsx`: composição e conteúdo das seções da página.
- `src/components/`: componentes de interface, incluindo formulário, mapa e tratamento de erros.
- `src/data/siteConfig.js`: links oficiais, textos de benefícios, FAQ e catálogo editável de planos por categoria de veículo.
- `src/data/consultores.js`: lista de consultores reais; não use dados fictícios.
- `src/services/geocoding.js`: integração com o serviço de busca de endereços.
- `src/utils/distance.js`: cálculo de distância e geração do link de WhatsApp.
- `src/styles/variables.css`: cores, tipografia e variáveis globais.
- `src/styles/global.css`: estilos e responsividade.

## Planos e contatos

- Os planos exibidos no site foram transcritos das imagens comerciais fornecidas pela equipe, com as categorias motocicletas, veículos até 2.500 kg e veículos acima de 2.500 kg.
- Os dados dos planos estão no array `vehiclePlans` em `src/data/siteConfig.js`, para facilitar correções manuais. O material fornecido não contém preços.
- O WhatsApp geral está configurado como `https://wa.me/5581997839132` e o link de localização usa o compartilhamento do Google informado pela equipe.
- Sede informada: Pão de Açúcar, Taquaritinga do Norte - PE, CEP 55790-000. Escritórios: segunda a sexta, das 8h às 18h; fechados aos sábados e domingos. A equipe informou atendimento pelo WhatsApp 24 horas de segunda a sexta, sem atendimento aos fins de semana.
- Dados cadastrais informados pela equipe: Associação Clube Planos de Benefício - Proteção Veicular, CNPJ `34.998.493/0001-12`. Os dados foram fornecidos pela equipe e devem ser conferidos com comprovante cadastral oficial antes da publicação definitiva.
- Antes de publicar, confirme com a equipe os limites, as regras de acionamento, as exclusões e a versão vigente do material comercial.

## Configuração antes da publicação

1. **Consultores:** edite `src/data/consultores.js` e adicione apenas pessoas reais autorizadas a divulgar nome, telefone e coordenadas. O telefone deve conter apenas dígitos no formato internacional, incluindo `55` e DDD. Registros sem dados válidos são ignorados. Sem consultores, o localizador informa a situação e encaminha para o Instagram oficial.
2. **Canais oficiais:** edite `src/data/siteConfig.js`. O Instagram, o link do Google Maps e o WhatsApp geral `(81) 99783-9132` estão configurados. O mesmo WhatsApp é apresentado como canal geral também para associados; não é anunciado como central exclusiva ou assistência 24 horas.
3. **Benefícios e FAQ:** `src/data/siteConfig.js` contém textos institucionais neutros. Revise com a equipe e com a documentação vigente antes de publicar condições comerciais ou contratuais.
4. **Marca:** as variações de logo recebidas estão em `src/assets/logos/`. A marca gráfica da fênix e o wordmark são usados no site. O selo que contém a frase “registrada na SUSEP” foi mantido como referência no diretório de assets, mas não é exibido no site sem validação documental.
5. **Favicon:** adicione `public/favicon.png` com uma versão apropriada do símbolo oficial. Até lá, o navegador pode mostrar favicon ausente.

## Busca de endereços e mapa
- A busca rápida de endereços e a geocodificação reversa usam o Photon (dados OpenStreetMap).
- Se o Photon falhar, o formulário oferece uma busca alternativa por clique usando o Nominatim. Essa alternativa é uma pesquisa pontual iniciada pelo visitante, não autocomplete; não a transforme em busca automática por tecla e respeite a política de uso do Nominatim.
- O mapa usa Leaflet e tiles do OpenStreetMap, com atribuição visível.
- O Photon é um serviço comunitário e sua disponibilidade/limites podem mudar. O debounce de busca é de 850 ms; antes de uma operação de produção com tráfego significativo, avalie um provedor com SLA ou uma instância própria, respeitando os termos do provedor. Não faça requisições em massa.
- Nenhuma chave secreta é necessária nesta implementação. Se migrar para provedor que exija chave, não coloque uma chave privada no bundle do navegador; use chave pública restrita por domínio ou um backend/proxy conforme a política do serviço.
- O navegador normalmente exige HTTPS (ou localhost) para disponibilizar geolocalização. A permissão só é solicitada depois do clique do visitante.

## Privacidade
O nome e a localização ficam no estado React e não são gravados em banco de dados ou `localStorage`. A busca de endereços pode consultar Photon e, se acionado manualmente como alternativa, Nominatim; os tiles do mapa são carregados do OpenStreetMap. Esses serviços recebem as consultas de localização e os dados técnicos necessários à requisição. Revise a política e as obrigações aplicáveis (incluindo LGPD) antes de publicar. Não há analytics ou cookies de analytics configurados nesta versão.

## Pendências para produção
- Cadastrar consultores reais e validar os números WhatsApp.
- Confirmar canal geral e canal para associados.
- Validar institucionalmente os textos de benefícios, FAQ e privacidade.
- Confirmar qualquer alegação regulatória com documentação oficial antes de divulgá-la.
- Validar se os planos transcritos das imagens de 17/09/2026 continuam vigentes e se a descrição de cada limite corresponde ao regulamento contratual.
- Adicionar favicon e imagem social de compartilhamento aprovados.
- Testar em ambiente hospedado real, HTTPS, celulares e navegadores suportados.
