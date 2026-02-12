# Autoestima Atraves de Habitos

## Proposito

Acreditamos que pequenos habitos diarios, construidos com carinho e consistencia, sao a chave para transformar a autoestima. Este projeto nasceu do desejo de criar uma ferramenta gratuita, acolhedora e cientificamente embasada para mulheres que querem se sentir mais confiantes, mais fortes e mais conectadas consigo mesmas.

Criado por Sophia e seu parceiro, este app e um convite para que cada mulher descubra, no seu proprio ritmo, o poder transformador dos habitos.

## Prompt Original / Funcionalidades Principais

### 1. Autenticacao
- Login com cadastro por email do Gmail ou cadastro simples com login, senha, nome e foto.

### 2. Onboarding Moderno
- Onboarding mais moderno possivel, explicando toda a aplicacao passo a passo como aqueles apps mais modernos para garantir que o usuario entenda como usar.

### 3. Configuracao de Agenda
- No onboarding, antes de acessar o dashboard inicial, a pessoa deve adicionar, em telas simples e com UI e UX impecaveis e modernas, usando os melhores e cutting edge UI e UX components, os horarios que acorda, que trabalha, e seus compromissos fixos durante a semana.

### 4. Gestao de Habitos Cientifica
- Com toda agenda completa da pessoa, teremos os espacos onde ela pode fazer a gestao de habitos que podem aumentar a autoestima comprovadamente cientificamente e daremos dicas, ao incluir um novo habito e fazer a gestao, com mensagens que informam quais sao, cientificamente, os melhores horarios para adicionar habitos.

### 5. Adicionar Habitos
- Ao adicionar os habitos, ela deve escolher um habito novo ou de uma lista personalizada por nos e recomendada com tempo, dias na semana e beneficios cientificos para aquele habito.
- Pensando que a pessoa ira utilizar mais pelo celular, a UI e UX deve ser otima e perfeita para celular e componentes lindos, modernos e com usabilidade maxima no celular.

### 6. Calendario e Tracking
- Para cada dia (mostrar calendarios e os habitos listados), permita que ela marque o habito concluido ou parcialmente concluido.
- E assim ela podera fazer a gestao dos habitos.

### 7. Mensagens Motivacionais
- Sempre que nao cumprir um dia de habitos, mande mensagens motivadoras e nao pessimistas e mostre atraves de frases de motivacao e tambem relatos cientificos que comprovam que habitos levam tempo e tudo bem nao cumpri-los.

### 8. Sistema de Doacoes e Badges
- Crie uma funcionalidade de doar para nosso projeto, pois ele tem o proposito de ser gratuito e qualquer doacao e bem vinda.
- O admin do app ira adicionar os custos e ele podera fazer doacoes para melhorar o projeto.
- Adicionarei o custo e uma barra sera mostrada com o custo total e a quantidade doada mostrando quanto do custo foi coberto com as doacoes.
- Quem doar, se torna patrocinadora do aplicativo e ganhara um badge de patrocinadora.
- Todas as pessoas que se cadastrarem serao co-fundadoras (badge).
- Implementacao bem elaborada e tabelas no banco de dados pois pretendo criar mais badges para as pessoas que conseguirem ir cumprindo os habitos ou percentual ou por dias consecutivos e assim motivar os usuarios.

### 9. Feed Social Interno
- A aplicacao nao sera uma rede social, mas os usuarios poderao comentar e compartilhar suas conquistas em um "twitter" interno e interagir com outras pessoas que poderao ver seu perfil.
- Ela podera optar por mostrar ou nao seus habitos e quanto foi concluido de cada um no periodo.

### 10. Desafios
- Teremos tambem desafios que serao lancados pelos criadores (admin).
- Exemplo: 10 dias dormindo no mesmo horario, 4 semanas sem pular indo para a academia.
- Tudo deve estar bem modelado para os desafios que serao configurados no dashboard do admin.

### 11. Linguagem e Tom
- Como e um app focado em publico feminino, deve ter uma linguagem leve e empoderadora, focada em aumentar autoestima, que e nosso proposito.

### 12. Pagina de Proposito
- Deve conter uma pagina mostrando o nosso proposito e como acreditamos que cumpriremos ele.

### 13. Dashboard do Admin
- No dashboard do admin, posso configurar o que for necessario e ver o historico do que aconteceu, para assim incentivar as pessoas a participar.

## Stack Tecnologica

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **UI Components**: Radix UI + Tailwind (shadcn/ui inspired)
- **Icons**: Lucide React
- **Animacoes**: Framer Motion
- **Deploy**: Vercel (recomendado)

## Estrutura do Projeto

```
src/
  app/                    # Next.js App Router pages
    (auth)/               # Auth pages (login, register)
    (app)/                # App pages (dashboard, habits, etc)
    (admin)/              # Admin pages
    api/                  # API routes
  components/             # Reusable components
    ui/                   # Base UI components
    layout/               # Layout components
    habits/               # Habit-specific components
    onboarding/           # Onboarding components
    social/               # Social feed components
    challenges/           # Challenge components
  lib/                    # Utilities and helpers
    supabase/             # Supabase client and helpers
    constants/            # App constants
    hooks/                # Custom React hooks
  types/                  # TypeScript type definitions
```

## Principios de Design

1. **Mobile-First**: Todo design começa pelo celular
2. **Acolhedor**: Cores suaves, linguagem empoderadora
3. **Cientifico**: Embasamento cientifico em todas as recomendacoes
4. **Simples**: Simplicidade na experiencia, complexidade no backend
5. **Acessivel**: Seguir padroes WCAG de acessibilidade
