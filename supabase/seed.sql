-- =====================================================
-- FLORIR - Seed Data
-- Execute DEPOIS de schema.sql
-- =====================================================

-- =====================================================
-- CATEGORIAS DE HABITOS
-- =====================================================
INSERT INTO public.habit_categories (name, description, icon, color) VALUES
  ('Cuidados Fisicos', 'Movimente seu corpo e sinta-se mais forte', 'Heart', '#f43f5e'),
  ('Saude Mental', 'Cuide da sua mente e encontre paz interior', 'Brain', '#a855f7'),
  ('Conexoes Sociais', 'Fortaleca seus lacos e relacoes', 'Users', '#3b82f6'),
  ('Autocuidado', 'Dedique tempo para voce mesma', 'Sparkles', '#ec4899'),
  ('Crescimento Pessoal', 'Aprenda, evolua e se surpreenda', 'TrendingUp', '#22c55e'),
  ('Alimentacao', 'Nutra seu corpo com carinho', 'Apple', '#f97316')
ON CONFLICT DO NOTHING;

-- =====================================================
-- TEMPLATES DE HABITOS
-- =====================================================

-- Cuidados Fisicos
INSERT INTO public.habit_templates (category_id, name, description, scientific_benefit, recommended_duration_minutes, recommended_frequency_per_week, best_time_of_day, best_time_reason, icon, difficulty, esteem_impact) VALUES
  ((SELECT id FROM public.habit_categories WHERE name = 'Cuidados Fisicos'),
   'Caminhada ao ar livre',
   'Uma caminhada de 20-30 minutos pode transformar seu dia',
   'Estudos publicados no Journal of Positive Psychology mostram que caminhar ao ar livre por 20 minutos aumenta significativamente o bem-estar e a autoestima. A exposicao a luz natural regula o cortisol e aumenta a serotonina.',
   30, 5, '07:00',
   'O periodo da manha e ideal pois a luz natural matinal sincroniza o relogio biologico e potencializa a producao de vitamina D.',
   'Footprints', 'easy', 'high'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Cuidados Fisicos'),
   'Treino na academia',
   'Exercicios de forca que empoderam e fortalecem',
   'Pesquisas da Harvard Medical School demonstram que exercicios de resistencia aumentam a autoestima em ate 20% apos 12 semanas, alem de liberar endorfinas e melhorar a imagem corporal.',
   60, 4, '06:30',
   'Treinar pela manha aumenta o metabolismo ao longo do dia e melhora o foco. Os niveis de testosterona e cortisol estao otimos para ganho de forca.',
   'Dumbbell', 'medium', 'high'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Cuidados Fisicos'),
   'Yoga',
   'Conecte corpo e mente atraves do movimento consciente',
   'Meta-analise publicada no International Journal of Yoga mostra que a pratica regular reduz ansiedade em 30% e melhora significativamente a percepcao corporal positiva.',
   30, 4, '06:00',
   'A pratica matinal aproveita o corpo descansado e a mente tranquila. O cortisol naturalmente mais alto pela manha ajuda na flexibilidade.',
   'Flower2', 'easy', 'high'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Cuidados Fisicos'),
   'Dancas',
   'Danca como se ninguem estivesse olhando',
   'Estudo do Journal of Applied Sport Psychology comprova que a danca melhora a imagem corporal e reduz a autocritica em mulheres, alem de ser uma forma prazerosa de exercicio.',
   30, 3, '18:00',
   'No fim da tarde o corpo esta mais aquecido e flexivel. E tambem um otimo momento para liberar o estresse acumulado do dia.',
   'Music', 'easy', 'medium'),

-- Saude Mental
  ((SELECT id FROM public.habit_categories WHERE name = 'Saude Mental'),
   'Meditacao',
   'Encontre calma e clareza no silencio',
   'Pesquisa da Universidade de Stanford demonstra que 10 minutos diarios de meditacao reduzem a autocritica e aumentam a autocompaixao, pilares fundamentais da autoestima saudavel.',
   10, 7, '06:30',
   'A meditacao matinal estabelece um tom positivo para o dia. O cerebro esta mais receptivo logo apos acordar, em estado alfa.',
   'Leaf', 'easy', 'high'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Saude Mental'),
   'Diario de gratidao',
   'Anote 3 coisas pelas quais voce e grata hoje',
   'Estudo publicado no Journal of Personality and Social Psychology mostra que escrever sobre gratidao por 3 semanas aumenta a satisfacao com a vida em 25% e reduz pensamentos negativos.',
   10, 7, '22:00',
   'Escrever antes de dormir ajuda a processar o dia positivamente e melhora a qualidade do sono, criando um ciclo virtuoso de bem-estar.',
   'BookHeart', 'easy', 'high'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Saude Mental'),
   'Leitura',
   'Alimente sua mente com conhecimento e historias',
   'Pesquisa da Universidade de Sussex comprova que ler por 6 minutos reduz o estresse em 68%. A leitura regular tambem aumenta a empatia e a inteligencia emocional.',
   20, 5, '21:30',
   'Ler antes de dormir substitui telas, melhora o sono e permite ao cerebro processar novas informacoes durante o descanso.',
   'BookOpen', 'easy', 'medium'),

-- Autocuidado
  ((SELECT id FROM public.habit_categories WHERE name = 'Autocuidado'),
   'Skincare',
   'Cuide da sua pele com carinho e intencionalidade',
   'Estudos de psicologia dermatologica mostram que rotinas de cuidado com a pele funcionam como rituais de autocompaixao, reduzindo ansiedade e fortalecendo a relacao positiva com o proprio corpo.',
   15, 7, '07:00',
   'A rotina matinal de skincare serve como momento de autocuidado que prepara voce emocionalmente para o dia. A pele tambem absorve melhor os produtos pela manha.',
   'Sparkles', 'easy', 'medium'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Autocuidado'),
   'Afirmacoes positivas',
   'Repita palavras de forca e amor proprio',
   'Pesquisa publicada na Social Cognitive and Affective Neuroscience demonstrou por ressonancia magnetica que afirmacoes positivas ativam areas cerebrais de recompensa e autoprocessamento, fortalecendo a autoimagem.',
   5, 7, '07:00',
   'Logo ao acordar, o cerebro esta em estado mais sugestionavel (ondas theta para alfa), tornando as afirmacoes mais efetivas na reprogramacao de padroes mentais.',
   'Star', 'easy', 'high'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Autocuidado'),
   'Dormir no horario',
   'Respeite seu corpo com uma rotina de sono consistente',
   'Estudo publicado no Sleep journal mostra que manter horarios regulares de sono melhora o humor em ate 35% e reduz significativamente a irritabilidade e a autocritica.',
   0, 7, '22:30',
   'Dormir entre 22h e 23h permite que o corpo passe por todos os ciclos de sono essenciais para a restauracao hormonal e emocional.',
   'Moon', 'medium', 'high'),

-- Conexoes Sociais
  ((SELECT id FROM public.habit_categories WHERE name = 'Conexoes Sociais'),
   'Ligar para alguem querido',
   'Conecte-se com alguem que faz voce se sentir bem',
   'Estudo da Universidade de Michigan mostra que conexoes sociais significativas aumentam a ocitocina, hormonio que fortalece o senso de pertencimento e valor pessoal.',
   15, 3, '19:00',
   'Apos o expediente e um momento natural para reconexao social. O contato humano no final do dia reduz o cortisol acumulado.',
   'Phone', 'easy', 'medium'),

-- Crescimento Pessoal
  ((SELECT id FROM public.habit_categories WHERE name = 'Crescimento Pessoal'),
   'Aprender algo novo',
   'Dedique tempo para desenvolver uma nova habilidade',
   'Pesquisa da Universidade de Cambridge demonstra que aprender novas habilidades aumenta a autoeficacia, um componente central da autoestima, e cria novas conexoes neurais que fortalecem a confianca.',
   30, 3, '10:00',
   'O meio da manha e quando a funcao cognitiva esta no pico. A memoria de trabalho e a atencao estao otimizadas entre 9h e 11h.',
   'Lightbulb', 'medium', 'high'),

-- Alimentacao
  ((SELECT id FROM public.habit_categories WHERE name = 'Alimentacao'),
   'Tomar 2L de agua',
   'Hidrate-se e sinta a diferenca no seu corpo e mente',
   'Estudo do Journal of Nutrition mostra que mesmo desidratacao leve (1-2%) prejudica o humor e a funcao cognitiva em mulheres. Manter-se hidratada melhora a energia e a disposicao.',
   0, 7, '08:00',
   'Comecar a hidratacao logo cedo compensa a perda de agua durante o sono e ativa o metabolismo. Distribua ao longo do dia.',
   'Droplets', 'easy', 'medium'),

  ((SELECT id FROM public.habit_categories WHERE name = 'Alimentacao'),
   'Refeicao consciente',
   'Coma com atencao plena, saboreando cada momento',
   'Pesquisas de mindful eating mostram que comer conscientemente melhora a relacao com a comida, reduz compulsao alimentar e aumenta a satisfacao corporal.',
   30, 5, '12:00',
   'O almoco e a refeicao mais acessivel para praticar mindful eating. Sem a pressa da manha ou o cansaco da noite.',
   'Salad', 'easy', 'medium')
ON CONFLICT DO NOTHING;

-- =====================================================
-- MENSAGENS MOTIVACIONAIS
-- =====================================================
INSERT INTO public.motivational_messages (message, category) VALUES
  -- missed_habit
  ('Tudo bem, querida. Cada novo dia e uma nova chance de recomecar. Voce ja deu o passo mais importante: ter a intencao de mudar.', 'missed_habit'),
  ('Nao se cobre tanto. Pesquisas mostram que leva em media 66 dias para formar um habito. Voce esta no caminho certo!', 'missed_habit'),
  ('Um dia sem cumprir o habito nao apaga todo o seu progresso. A ciencia mostra que a consistencia a longo prazo importa mais do que a perfeicao diaria.', 'missed_habit'),
  ('Voce sabia que perder um dia nao afeta a formacao do habito? O que importa e nao perder dois dias seguidos. Amanha voce volta com tudo!', 'missed_habit'),
  ('Ser gentil consigo mesma e parte do processo. A autocompaixao, segundo pesquisas, e mais eficaz que a autocritica para manter habitos.', 'missed_habit'),
  ('Hoje pode nao ter sido o dia, mas voce ja e incrivel por ter esse compromisso consigo mesma. Descanse e volte mais forte.', 'missed_habit'),
  ('Lembre-se: progresso nao e linear. Os melhores resultados vem de quem aprende a recomecar com gentileza.', 'missed_habit'),
  ('A neurociencia mostra que seu cerebro precisa de tempo para criar novos caminhos neurais. Cada tentativa fortalece essas conexoes, mesmo quando voce falha.', 'missed_habit'),

  -- streak
  ('Incrivel! Voce esta construindo uma versao mais forte de si mesma, um dia de cada vez!', 'streak'),
  ('Sua consistencia esta mudando seu cerebro - literalmente! A neuroplasticidade esta trabalhando a seu favor.', 'streak'),
  ('Voce esta provando para si mesma do que e capaz. Isso e o poder dos habitos!', 'streak'),
  ('Cada dia que voce cumpre seu habito, sua autoestima fica mais forte. Continue assim, voce e inspiradora!', 'streak'),

  -- general
  ('Voce e mais forte do que imagina. Cada pequeno passo conta.', 'general'),
  ('A jornada de mil passos comeca com um unico passo. E voce ja comecou!', 'general'),
  ('Cuidar de si mesma nao e egoismo, e necessidade. Voce merece esse tempo.', 'general'),
  ('Nao compare seu capitulo 1 com o capitulo 20 de outra pessoa. Sua jornada e unica e linda.', 'general'),
  ('Voce nao precisa ser perfeita para merecer se sentir bem. Voce ja e suficiente.', 'general'),
  ('Pequenos habitos, grandes transformacoes. Continue confiando no processo.', 'general')
ON CONFLICT DO NOTHING;

-- =====================================================
-- DESAFIOS INICIAIS
-- =====================================================
INSERT INTO public.challenges (title, description, scientific_benefit, start_date, end_date, duration_days, challenge_type, criteria, icon, color, is_active) VALUES
  ('7 Dias de Presenca',
   'Complete pelo menos um habito por dia durante 7 dias consecutivos',
   'Pesquisas mostram que completar micro-objetivos por 7 dias cria um ciclo de recompensa que motiva a continuidade.',
   CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 7,
   'consecutive_days',
   '{"type": "consecutive_days", "required_days": 7}',
   'Flame', '#f97316', true),

  ('21 Dias de Transformacao',
   'Complete pelo menos um habito por dia durante 21 dias consecutivos',
   'O neurologista Maxwell Maltz observou que leva pelo menos 21 dias para formar uma nova imagem mental. Este desafio marca o inicio da mudanca.',
   CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', 21,
   'consecutive_days',
   '{"type": "consecutive_days", "required_days": 21}',
   'Zap', '#a855f7', true),

  ('Semana do Autocuidado',
   'Complete todos os seus habitos planejados durante uma semana inteira',
   'Estudos de psicologia positiva demonstram que uma semana completa de autocuidado intencional pode alterar padroes de pensamento negativo.',
   CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 7,
   'weekly_frequency',
   '{"type": "weekly_frequency", "required_frequency_per_week": 7, "required_weeks": 1}',
   'Calendar', '#3b82f6', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- META DE DOACAO
-- =====================================================
INSERT INTO public.donation_goals (title, description, target_amount, current_amount, is_active) VALUES
  ('Manter o Florir gratuito',
   'Ajude a cobrir os custos de servidor e desenvolvimento para que o Florir continue sendo 100% gratuito para todas.',
   500.00, 0.00, true)
ON CONFLICT DO NOTHING;
