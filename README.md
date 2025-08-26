# Sistema de Suporte Automatizado com RAG - QueryWise

## Contexto do Negócio
A empresa de tecnologia possui um canal de suporte ao cliente via WhatsApp, atendido por operadores humanos e também por respostas automáticas. Para agilizar o atendimento, o sistema deve identificar se a dúvida de um cliente já foi registrada anteriormente (via RAG – Retrieval-Augmented Generation) e, caso não exista, um operador irá atender.

## O sistema deve:
    - [ ] Registrar mensagens e respostas de clientes.
    - [ ] Permitir consultas semânticas de problemas resolvidos.
    - [ ] Integrar com um modelo de geração de respostas (Ollama ou mock).
    - [ ] Ser escalável, seguro e observável, com logs e rastreamento.
    - [ ] Este desafio exige Node.js com TypeScript, boas práticas de arquitetura e integração com ferramentas modernas (Docker, filas, cache, etc.).

## Requisitos Funcionais
    - Endpoints principais

        - Autenticação e Autorização
            - [ ] POST /auth/login → retorna JWT para operadores/admins.
            - [ ] POST /auth/register → cadastrar operadores/admins (opcional).

        - Mensagens de Clientes
            - [ ] POST /messages → registrar nova mensagem de cliente (texto, id_cliente, timestamp).
            - [ ] GET /messages/:clientId → listar histórico de mensagens de um cliente.

        - RAG / Base de Conhecimento
            - [ ] POST /knowledge → adicionar um problema e sua solução na base de conhecimento (texto + embeddings).
            - [ ] GET /knowledge/search?query=... → retornar problemas similares a uma pergunta usando busca semântica.
            - [ ] POST /responses → endpoint que recebe mensagem de cliente, consulta a base RAG e decide:
            Se existir problema semelhante → retorna a resposta da base.
            Caso contrário → Avisa um atendente ou não faz nenhuma ação

        - Admin / Estatísticas
            - [ ] GET /stats → total de mensagens atendidas, respostas automáticas vs manuais, tempo médio de resposta.

## Requisitos não funcionais
    - [ ] Segurança
    - [ ] JWT para autenticação.
    - [ ] Validação de dados via schemas (ex.: zod ou Joi).
    - [ ] Logging
    - [ ] Registre todas as requisições, respostas e erros (ex.: pino ou winston).
    - [ ] Versionamento de API
    - [ ] Estruture endpoints para suportar /v1/... e futuras versões.
    - [ ] Testes automatizados
    - [ ] Testes unitários e integração (jest ou vitest).
    - [ ] Cobertura mínima de 80% nos endpoints críticos.
    - [ ] Clean Code e Arquitetura
    - [ ] Separação de camadas: controllers, services, repositories, utils.
    - [ ] Tipagem consistente e tratamento de erros centralizado.

## Desafios extras
    - [ ] Cache: implemente caching de resultados da busca semântica (Redis ou in-memory).
    - [ ] Fila de mensagens: use RabbitMQ/Kafka para processamento assíncrono de mensagens recebidas.
    - [ ] Rastreamento distribuído: implemente logs e rastreamento de requisições (OpenTelemetry ou Jaeger).
    - [ ] Docker: crie Dockerfile e docker-compose para rodar:
    - [ ] API Node.js
    - [ ] Banco de dados
    - [ ] Cache/fila (opcional)
    - [ ] Modelo Ollama (simulado se necessário)