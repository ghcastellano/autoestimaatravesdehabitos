export const HABIT_CATEGORIES = [
  {
    id: "physical",
    name: "Cuidados Fisicos",
    description: "Movimente seu corpo e sinta-se mais forte",
    icon: "Heart",
    color: "#f43f5e",
  },
  {
    id: "mental",
    name: "Saude Mental",
    description: "Cuide da sua mente e encontre paz interior",
    icon: "Brain",
    color: "#a855f7",
  },
  {
    id: "social",
    name: "Conexoes Sociais",
    description: "Fortaleca seus lacos e relacoes",
    icon: "Users",
    color: "#3b82f6",
  },
  {
    id: "selfcare",
    name: "Autocuidado",
    description: "Dedique tempo para voce mesma",
    icon: "Sparkles",
    color: "#ec4899",
  },
  {
    id: "growth",
    name: "Crescimento Pessoal",
    description: "Aprenda, evolua e se surpreenda",
    icon: "TrendingUp",
    color: "#22c55e",
  },
  {
    id: "nutrition",
    name: "Alimentacao",
    description: "Nutra seu corpo com carinho",
    icon: "Apple",
    color: "#f97316",
  },
];

export const RECOMMENDED_HABITS = [
  {
    category: "physical",
    name: "Caminhada ao ar livre",
    description: "Uma caminhada de 20-30 minutos pode transformar seu dia",
    scientific_benefit:
      "Estudos publicados no Journal of Positive Psychology mostram que caminhar ao ar livre por 20 minutos aumenta significativamente o bem-estar e a autoestima. A exposicao a luz natural regula o cortisol e aumenta a serotonina.",
    recommended_duration: 30,
    recommended_frequency: 5,
    best_time: "07:00",
    best_time_reason:
      "O periodo da manha e ideal pois a luz natural matinal sincroniza o relogio biologico e potencializa a producao de vitamina D.",
    icon: "Footprints",
    difficulty: "easy" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "physical",
    name: "Treino na academia",
    description: "Exercicios de forca que empoderam e fortalecem",
    scientific_benefit:
      "Pesquisas da Harvard Medical School demonstram que exercicios de resistencia aumentam a autoestima em ate 20% apos 12 semanas, alem de liberar endorfinas e melhorar a imagem corporal.",
    recommended_duration: 60,
    recommended_frequency: 4,
    best_time: "06:30",
    best_time_reason:
      "Treinar pela manha aumenta o metabolismo ao longo do dia e melhora o foco. Os niveis de testosterona e cortisol estao otimos para ganho de forca.",
    icon: "Dumbbell",
    difficulty: "medium" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "physical",
    name: "Yoga",
    description: "Conecte corpo e mente atraves do movimento consciente",
    scientific_benefit:
      "Meta-analise publicada no International Journal of Yoga mostra que a pratica regular reduz ansiedade em 30% e melhora significativamente a percepcao corporal positiva.",
    recommended_duration: 30,
    recommended_frequency: 4,
    best_time: "06:00",
    best_time_reason:
      "A pratica matinal aproveita o corpo descansado e a mente tranquila. O cortisol naturalmente mais alto pela manha ajuda na flexibilidade.",
    icon: "Flower2",
    difficulty: "easy" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "physical",
    name: "Dancas",
    description: "Danca como se ninguem estivesse olhando",
    scientific_benefit:
      "Estudo do Journal of Applied Sport Psychology comprova que a danca melhora a imagem corporal e reduz a autocritica em mulheres, alem de ser uma forma prazerosa de exercicio.",
    recommended_duration: 30,
    recommended_frequency: 3,
    best_time: "18:00",
    best_time_reason:
      "No fim da tarde o corpo esta mais aquecido e flexivel. E tambem um otimo momento para liberar o estresse acumulado do dia.",
    icon: "Music",
    difficulty: "easy" as const,
    esteem_impact: "medium" as const,
  },
  {
    category: "mental",
    name: "Meditacao",
    description: "Encontre calma e clareza no silencio",
    scientific_benefit:
      "Pesquisa da Universidade de Stanford demonstra que 10 minutos diarios de meditacao reduzem a autocritica e aumentam a autocompaixao, pilares fundamentais da autoestima saudavel.",
    recommended_duration: 10,
    recommended_frequency: 7,
    best_time: "06:30",
    best_time_reason:
      "A meditacao matinal estabelece um tom positivo para o dia. O cerebro esta mais receptivo logo apos acordar, em estado alfa.",
    icon: "Leaf",
    difficulty: "easy" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "mental",
    name: "Diario de gratidao",
    description: "Anote 3 coisas pelas quais voce e grata hoje",
    scientific_benefit:
      "Estudo publicado no Journal of Personality and Social Psychology mostra que escrever sobre gratidao por 3 semanas aumenta a satisfacao com a vida em 25% e reduz pensamentos negativos.",
    recommended_duration: 10,
    recommended_frequency: 7,
    best_time: "22:00",
    best_time_reason:
      "Escrever antes de dormir ajuda a processar o dia positivamente e melhora a qualidade do sono, criando um ciclo virtuoso de bem-estar.",
    icon: "BookHeart",
    difficulty: "easy" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "mental",
    name: "Leitura",
    description: "Alimente sua mente com conhecimento e historias",
    scientific_benefit:
      "Pesquisa da Universidade de Sussex comprova que ler por 6 minutos reduz o estresse em 68%. A leitura regular tambem aumenta a empatia e a inteligencia emocional.",
    recommended_duration: 20,
    recommended_frequency: 5,
    best_time: "21:30",
    best_time_reason:
      "Ler antes de dormir substitui telas, melhora o sono e permite ao cerebro processar novas informacoes durante o descanso.",
    icon: "BookOpen",
    difficulty: "easy" as const,
    esteem_impact: "medium" as const,
  },
  {
    category: "selfcare",
    name: "Skincare",
    description: "Cuide da sua pele com carinho e intencionalidade",
    scientific_benefit:
      "Estudos de psicologia dermatologica mostram que rotinas de cuidado com a pele funcionam como rituais de autocompaixao, reduzindo ansiedade e fortalecendo a relacao positiva com o proprio corpo.",
    recommended_duration: 15,
    recommended_frequency: 7,
    best_time: "07:00",
    best_time_reason:
      "A rotina matinal de skincare serve como momento de autocuidado que prepara voce emocionalmente para o dia. A pele tambem absorve melhor os produtos pela manha.",
    icon: "Sparkles",
    difficulty: "easy" as const,
    esteem_impact: "medium" as const,
  },
  {
    category: "selfcare",
    name: "Afirmacoes positivas",
    description: "Repita palavras de forca e amor proprio",
    scientific_benefit:
      "Pesquisa publicada na Social Cognitive and Affective Neuroscience demonstrou por ressonancia magnetica que afirmacoes positivas ativam areas cerebrais de recompensa e autoprocessamento, fortalecendo a autoimagem.",
    recommended_duration: 5,
    recommended_frequency: 7,
    best_time: "07:00",
    best_time_reason:
      "Logo ao acordar, o cerebro esta em estado mais sugestionavel (ondas theta para alfa), tornando as afirmacoes mais efetivas na reprogramacao de padroes mentais.",
    icon: "Star",
    difficulty: "easy" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "social",
    name: "Ligar para alguem querido",
    description: "Conecte-se com alguem que faz voce se sentir bem",
    scientific_benefit:
      "Estudo da Universidade de Michigan mostra que conexoes sociais significativas aumentam a ocitocina, hormonio que fortalece o senso de pertencimento e valor pessoal.",
    recommended_duration: 15,
    recommended_frequency: 3,
    best_time: "19:00",
    best_time_reason:
      "Apos o expediente e um momento natural para reconexao social. O contato humano no final do dia reduz o cortisol acumulado.",
    icon: "Phone",
    difficulty: "easy" as const,
    esteem_impact: "medium" as const,
  },
  {
    category: "growth",
    name: "Aprender algo novo",
    description: "Dedique tempo para desenvolver uma nova habilidade",
    scientific_benefit:
      "Pesquisa da Universidade de Cambridge demonstra que aprender novas habilidades aumenta a autoeficacia, um componente central da autoestima, e cria novas conexoes neurais que fortalecem a confianca.",
    recommended_duration: 30,
    recommended_frequency: 3,
    best_time: "10:00",
    best_time_reason:
      "O meio da manha e quando a funcao cognitiva esta no pico. A memoria de trabalho e a atencao estao otimizadas entre 9h e 11h.",
    icon: "Lightbulb",
    difficulty: "medium" as const,
    esteem_impact: "high" as const,
  },
  {
    category: "nutrition",
    name: "Tomar 2L de agua",
    description: "Hidrate-se e sinta a diferenca no seu corpo e mente",
    scientific_benefit:
      "Estudo do Journal of Nutrition mostra que mesmo desidratacao leve (1-2%) prejudica o humor e a funcao cognitiva em mulheres. Manter-se hidratada melhora a energia e a disposicao.",
    recommended_duration: 0,
    recommended_frequency: 7,
    best_time: "08:00",
    best_time_reason:
      "Comecar a hidratacao logo cedo compensa a perda de agua durante o sono e ativa o metabolismo. Distribua ao longo do dia.",
    icon: "Droplets",
    difficulty: "easy" as const,
    esteem_impact: "medium" as const,
  },
  {
    category: "nutrition",
    name: "Refeicao consciente",
    description: "Coma com atencao plena, saboreando cada momento",
    scientific_benefit:
      "Pesquisas de mindful eating mostram que comer conscientemente melhora a relacao com a comida, reduz compulsao alimentar e aumenta a satisfacao corporal.",
    recommended_duration: 30,
    recommended_frequency: 5,
    best_time: "12:00",
    best_time_reason:
      "O almoco e a refeicao mais acessivel para praticar mindful eating. Sem a pressa da manha ou o cansaco da noite.",
    icon: "Salad",
    difficulty: "easy" as const,
    esteem_impact: "medium" as const,
  },
  {
    category: "selfcare",
    name: "Dormir no horario",
    description: "Respeite seu corpo com uma rotina de sono consistente",
    scientific_benefit:
      "Estudo publicado no Sleep journal mostra que manter horarios regulares de sono melhora o humor em ate 35% e reduz significativamente a irritabilidade e a autocritica.",
    recommended_duration: 0,
    recommended_frequency: 7,
    best_time: "22:30",
    best_time_reason:
      "Dormir entre 22h e 23h permite que o corpo passe por todos os ciclos de sono essenciais para a restauracao hormonal e emocional.",
    icon: "Moon",
    difficulty: "medium" as const,
    esteem_impact: "high" as const,
  },
];

export const MOTIVATIONAL_MESSAGES = {
  missed_habit: [
    "Tudo bem, querida. Cada novo dia e uma nova chance de recomecar. Voce ja deu o passo mais importante: ter a intencao de mudar.",
    "Nao se cobre tanto. Pesquisas mostram que leva em media 66 dias para formar um habito. Voce esta no caminho certo!",
    "Um dia sem cumprir o habito nao apaga todo o seu progresso. A ciencia mostra que a consistencia a longo prazo importa mais do que a perfeicao diaria.",
    "Voce sabia que perder um dia nao afeta a formacao do habito? O que importa e nao perder dois dias seguidos. Amanha voce volta com tudo!",
    "Ser gentil consigo mesma e parte do processo. A autocompaixao, segundo pesquisas, e mais eficaz que a autocritica para manter habitos.",
    "Hoje pode nao ter sido o dia, mas voce ja e incrivel por ter esse compromisso consigo mesma. Descanse e volte mais forte.",
    "Lembre-se: progresso nao e linear. Os melhores resultados vem de quem aprende a recomecar com gentileza.",
    "A neurociencia mostra que seu cerebro precisa de tempo para criar novos caminhos neurais. Cada tentativa fortalece essas conexoes, mesmo quando voce falha.",
  ],
  streak: [
    "Incrivel! Voce esta construindo uma versao mais forte de si mesma, um dia de cada vez!",
    "Sua consistencia esta mudando seu cerebro - literalmente! A neuroplasticidade esta trabalhando a seu favor.",
    "Voce esta provando para si mesma do que e capaz. Isso e o poder dos habitos!",
    "Cada dia que voce cumpre seu habito, sua autoestima fica mais forte. Continue assim, voce e inspiradora!",
  ],
  general: [
    "Voce e mais forte do que imagina. Cada pequeno passo conta.",
    "A jornada de mil passos comeca com um unico passo. E voce ja comecou!",
    "Cuidar de si mesma nao e egoismo, e necessidade. Voce merece esse tempo.",
    "Nao compare seu capitulo 1 com o capitulo 20 de outra pessoa. Sua jornada e unica e linda.",
    "Voce nao precisa ser perfeita para merecer se sentir bem. Voce ja e suficiente.",
    "Pequenos habitos, grandes transformacoes. Continue confiando no processo.",
  ],
};

export const DAYS_OF_WEEK = [
  { value: 0, label: "Dom", full: "Domingo" },
  { value: 1, label: "Seg", full: "Segunda" },
  { value: 2, label: "Ter", full: "Terca" },
  { value: 3, label: "Qua", full: "Quarta" },
  { value: 4, label: "Qui", full: "Quinta" },
  { value: 5, label: "Sex", full: "Sexta" },
  { value: 6, label: "Sab", full: "Sabado" },
];

export const TIME_SLOTS = [
  { label: "Madrugada", range: "00:00 - 06:00", emoji: "🌙" },
  { label: "Manha cedo", range: "06:00 - 09:00", emoji: "🌅" },
  { label: "Manha", range: "09:00 - 12:00", emoji: "☀️" },
  { label: "Almoco", range: "12:00 - 14:00", emoji: "🍽️" },
  { label: "Tarde", range: "14:00 - 18:00", emoji: "🌤️" },
  { label: "Noite", range: "18:00 - 21:00", emoji: "🌆" },
  { label: "Antes de dormir", range: "21:00 - 00:00", emoji: "😴" },
];
