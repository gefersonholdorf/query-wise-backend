Sistema de Suporte Automatizado com RAG
Contexto do Negócio

Sua empresa de tecnologia possui um canal de suporte ao cliente via WhatsApp, atendido por operadores humanos e também por respostas automáticas. Para agilizar o atendimento, o sistema deve identificar se a dúvida de um cliente já foi registrada anteriormente (via RAG – Retrieval-Augmented Generation) e, caso não exista, gerar uma resposta usando um modelo de linguagem (simulado aqui pelo Ollama).

O sistema deve:

Registrar mensagens e respostas de clientes.

Permitir consultas semânticas de problemas resolvidos.

Integrar com um modelo de geração de respostas (Ollama ou mock).

Ser escalável, seguro e observável, com logs e rastreamento.

Este desafio exige Node.js com TypeScript, boas práticas de arquitetura e integração com ferramentas modernas (Docker, filas, cache, etc.).

Requisitos Funcionais
1. Endpoints principais

Autenticação e Autorização

POST /auth/login → retorna JWT para operadores/admins.

POST /auth/register → cadastrar operadores/admins (opcional).

Mensagens de Clientes

POST /messages → registrar nova mensagem de cliente (texto, id_cliente, timestamp).

GET /messages/:clientId → listar histórico de mensagens de um cliente.

RAG / Base de Conhecimento

POST /knowledge → adicionar um problema e sua solução na base de conhecimento (texto + embeddings).

GET /knowledge/search?query=... → retornar problemas similares a uma pergunta usando busca semântica.

POST /responses → endpoint que recebe mensagem de cliente, consulta a base RAG e decide:

Se existir problema semelhante → retorna a resposta da base.

Caso contrário → envia para geração via Ollama (ou mock).

Admin / Estatísticas

GET /stats → total de mensagens atendidas, respostas automáticas vs manuais, tempo médio de resposta.

2. Requisitos não funcionais

Segurança

JWT para autenticação.

Validação de dados via schemas (ex.: zod ou Joi).

Logging

Registre todas as requisições, respostas e erros (ex.: pino ou winston).

Versionamento de API

Estruture endpoints para suportar /v1/... e futuras versões.

Testes automatizados

Testes unitários e integração (jest ou vitest).

Cobertura mínima de 80% nos endpoints críticos.

Clean Code e Arquitetura

Separação de camadas: controllers, services, repositories, utils.

Tipagem consistente e tratamento de erros centralizado.

3. Desafios extras

Cache: implemente caching de resultados da busca semântica (Redis ou in-memory).

Fila de mensagens: use RabbitMQ/Kafka para processamento assíncrono de mensagens recebidas.

Rastreamento distribuído: implemente logs e rastreamento de requisições (OpenTelemetry ou Jaeger).

Docker: crie Dockerfile e docker-compose para rodar:

API Node.js

Banco de dados

Cache/fila (opcional)

Modelo Ollama (simulado se necessário)

Critérios de Avaliação

Qualidade do código

Estrutura clara, tipagem correta, tratamento de erros, modularidade.

Escalabilidade

Suporte a grandes volumes de mensagens e buscas semânticas.

Cobertura de testes

Testes automatizados cobrindo endpoints críticos e regras de negócio.

Documentação

README detalhado, instruções para rodar local e via Docker, explicação da arquitetura.

Soluções medianas vs excelentes

Mediana: funcionalidade completa, mas sem testes, cache ou filas.

Excelente: testes, logs, cache, filas, rastreamento, clean code, documentação clara e Docker completo.

Entregáveis Esperados

Código fonte do backend Node.js + TypeScript.

Scripts de criação de banco e preenchimento inicial da base de conhecimento.

Testes automatizados.

Dockerfile e docker-compose.yml.

README detalhando:

Setup local e Docker

Estrutura do projeto

Exemplos de uso da API

Opcional: scripts de ingestão de mensagens para simular clientes.