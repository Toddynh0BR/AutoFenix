export const siteConfig = {
  name: 'AutoFênix Proteção Veicular',
  legalName: 'Associação Clube Planos de Benefício - Proteção Veicular',
  cnpj: '34.998.493/0001-12',
  headquarters: 'Pão de Açúcar, Taquaritinga do Norte - PE, 55790-000',
  officeHours: 'Segunda a sexta, das 8h às 18h',
  whatsappHours: 'Atendimento pelo WhatsApp 24 horas de segunda a sexta-feira. Não há atendimento aos sábados e domingos.',
  instagram: 'https://www.instagram.com/autofenixprotecao/',
  googleProfile: 'https://share.google/DGFJ1FJiqqMQZO59Z',
  // Canais oficiais informados pela equipe da AutoFênix.
  generalWhatsApp: 'https://wa.me/5581997839132',
  memberSupportUrl: 'https://wa.me/5581997839132',
  privacyContact: '',
};

// Estrutura pronta para receber benefícios aprovados pela equipe.
// Não publique coberturas, valores ou condições sem validação comercial/contratual.
export const benefits = [
  { icon: 'messages', title: 'Orientação próxima', text: 'Converse com um consultor para entender a proposta associativa e tirar suas dúvidas.' },
  { icon: 'file-check', title: 'Informação transparente', text: 'Conheça as regras, condições e documentos antes de tomar sua decisão.' },
  { icon: 'users', title: 'Modelo associativo', text: 'Uma proposta baseada na cooperação entre afiliados, conforme as regras da associação.' },
];

export const faqs = [
  { q: 'O que é a AutoFênix Proteção Veicular?', a: 'A AutoFênix é apresentada como uma associação de socorro mútuo que pratica o rateio de despesas atípicas ocorridas entre seus afiliados. Para conhecer as regras aplicáveis, converse com a equipe e consulte os documentos vigentes da associação.' },
  { q: 'Proteção veicular associativa é a mesma coisa que seguro?', a: 'Não é adequado tratar os dois modelos como se fossem idênticos. A proposta aqui descrita é associativa e seu funcionamento depende do estatuto e dos regulamentos aplicáveis. Peça à equipe os documentos e esclarecimentos necessários antes de decidir.' },
  { q: 'Quais benefícios e coberturas estão disponíveis?', a: 'A disponibilidade, as condições, as limitações e os procedimentos devem ser confirmados diretamente com a AutoFênix e nos documentos vigentes. Este site não lista coberturas específicas sem validação.' },
  { q: 'Como posso conhecer as condições para me associar?', a: 'Você pode falar com a equipe pelo WhatsApp oficial (81) 99783-9132. Os escritórios funcionam de segunda a sexta, das 8h às 18h. O endereço informado para a sede é Pão de Açúcar, Taquaritinga do Norte - PE, CEP 55790-000.' },
  { q: 'Qual é o horário de atendimento?', a: 'Os escritórios funcionam de segunda a sexta-feira, das 8h às 18h, e permanecem fechados aos sábados e domingos. O atendimento pelo WhatsApp funciona 24 horas de segunda a sexta-feira; não há atendimento aos fins de semana.' },
  { q: 'Já sou associado. Como consigo atendimento?', a: 'Entre em contato pelo WhatsApp oficial (81) 99783-9132 durante os dias de atendimento e informe à equipe que você já é associado para receber orientação sobre o canal adequado à sua solicitação. O WhatsApp não oferece atendimento aos sábados e domingos.' },
  { q: 'O site salva meu nome ou minha localização?', a: 'Nesta versão, o formulário mantém os dados apenas no estado temporário da página. A busca de endereço pode enviar o texto digitado ao serviço de geocodificação e o mapa carrega dados de um provedor externo. Os dados não são gravados em um banco de dados pelo site.' },
];


/**
 * Planos transcritos do material comercial recebido em 17/09/2026.
 * Revise valores, regras, limites, elegibilidade e condições com a equipe
 * antes de publicar alterações ou utilizar o conteúdo em campanhas.
 */
export const vehiclePlans = [
  {
    id: 'carros-ate-2500',
    label: 'Carros até 2.500 kg',
    description: 'Automóveis leves, importados e veículos pesados de até 2.500 kg.',
    plans: [
      {
        name: 'Simples',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Assistência/reboque de até 100 km por mês',
          'Limite de um acionamento a cada 30 dias; encaminhamento para oficina mais próxima conforme o tipo de pane',
          'Pane elétrica, pane mecânica e colisão, conforme as condições do plano',
        ],
      },
      {
        name: 'Básico',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Incêndio, colisão e perda total',
          'Fenômenos da natureza: queda de árvore e chuva de granizo',
          'Assistência 24 horas',
          'Reboque de até 300 km por mês',
          'Reboque: um acionamento a cada 30 dias, sujeito às condições da pane e encaminhamento à oficina mais próxima',
          'Assistência para colisão, pane elétrica, pane mecânica, pane seca e borracharia',
        ],
      },
      {
        name: 'Top',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Incêndio, colisão e perda total',
          'Fenômenos da natureza: queda de árvore e chuva de granizo',
          'Danos a terceiros até R$ 10.000',
          'Assistência 24 horas',
          'Reboque de até 500 km por mês',
          'Assistência para colisão, pane elétrica, pane mecânica, pane seca e borracharia',
          'Desconto de 70% na troca de vidros externos, uma vez a cada 12 meses',
          'Desconto de 70% na troca de faróis',
          'Veículo reserva por 7 dias',
          'Hospedagem: R$ 100 anuais, conforme as regras do plano',
          'Chaveiro para abertura do veículo: R$ 150 anuais, conforme as regras do plano',
          'Táxi, conforme as condições do plano',
        ],
      },
    ],
  },
  {
    id: 'motocicletas',
    label: 'Motocicletas',
    description: 'Planos para motocicletas, conforme o material comercial fornecido.',
    plans: [
      {
        name: 'Simples',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
        ],
      },
      {
        name: 'Básico',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Incêndio, colisão e perda total',
          'Fenômenos da natureza: queda de árvore e chuva de granizo',
          'Assistência 24 horas',
          'Reboque para colisão de até 300 km (150 km de ida e 150 km de volta)',
          'Acionamento do reboque sujeito ao limite de um a cada 30 dias e às condições do plano',
        ],
      },
      {
        name: 'Top',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Incêndio, colisão e perda total',
          'Fenômenos da natureza: queda de árvore e chuva de granizo',
          'Danos a terceiros até R$ 10.000',
          'Assistência 24 horas',
          'Reboque de até 300 km por mês',
          'Assistência para colisão, pane elétrica, pane mecânica, pane seca e borracharia',
          'Acionamento do reboque sujeito às regras e limites do plano',
        ],
      },
    ],
  },
  {
    id: 'veiculos-acima-2500',
    label: 'Veículos acima de 2.500 kg',
    description: 'Planos para veículos com peso acima de 2.500 kg.',
    plans: [
      {
        name: 'Simples',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
        ],
      },
      {
        name: 'Básico',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Incêndio, colisão e perda total',
          'Fenômenos da natureza: queda de árvore e chuva de granizo',
          'Assistência 24 horas',
          'Reboque de até 300 km por mês',
          'Assistência para colisão, pane elétrica, pane mecânica, pane seca e borracharia',
        ],
      },
      {
        name: 'Top',
        features: [
          'Cobertura de 100% da FIPE',
          'Cobertura nacional',
          'Roubo e furto',
          'Incêndio, colisão e perda total',
          'Fenômenos da natureza: queda de árvore e chuva de granizo',
          'Danos a terceiros até R$ 10.000',
          'Assistência 24 horas',
          'Reboque de até 500 km por mês',
          'Assistência para colisão, pane elétrica, pane mecânica, pane seca e borracharia',
          'Desconto de 60% na troca de vidros externos',
          'Desconto de 50% na troca de faróis',
          'Hospedagem: R$ 100 anuais, conforme as regras do plano',
          'Chaveiro para abertura do veículo: R$ 150 anuais, conforme as regras do plano',
          'Táxi de até 50 km ida e volta, conforme as condições do plano',
        ],
      },
    ],
  },
];
