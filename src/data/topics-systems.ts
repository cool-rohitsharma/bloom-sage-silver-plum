import type { Topic } from "./types";

export const microTopics: Topic[] = [
  {
    id: "micro-basics",
    chapterId: "micro",
    title: "What a microservice is",
    blurb: "Independently deployable, aligned to a business boundary. Not a table with a REST wrapper. The cost is distributed everything.",
    keywords: ["boundary", "DDD", "independent deploy", "database per service"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "why", text: "Independent scale, deploy, and failure domains. A payments outage should not take down catalog browse." },
      { kind: "tradeoff", text: "Network, eventual consistency, versioning, observability, distributed transactions you no longer have. If the team is small, a modular monolith is often the honest choice." },
      { kind: "bullets", title: "Platform pieces", items: ["API gateway — auth, routing, rate limit.", "Service discovery / DNS.", "Central config.", "CI/CD per service.", "Logs, metrics, traces.", "Resilience: timeout, retry, circuit breaker, bulkhead."] },
      { kind: "trap", text: "Splitting by table (UserService, AddressService) creates a distributed monolith. Split by capability (Checkout, Catalog, Identity)." },
    ],
  },
  {
    id: "resilience",
    chapterId: "micro",
    title: "Timeouts, retries, circuit breakers",
    blurb: "Retry only what is transient and idempotent. A circuit without a timeout is a thread leak with extra steps.",
    keywords: ["timeout", "backoff", "jitter", "circuit breaker", "bulkhead"],
    source: "merged",
    level: "trap",
    blocks: [
      { kind: "idea", text: "Timeout is the budget. Retry with exponential backoff + jitter, only for GET or idempotent PUT with an idempotency key. Circuit breaker: Closed → Open (fail fast) → Half-open (probe). Bulkhead: isolate thread/connection pools so one dependency cannot take the process down." },
      { kind: "trap", text: "Retrying a non-idempotent POST doubles charges. Missing timeouts make retries stack. Fallbacks must be safe (cached, default, degrade) — not a silent 'success'." },
      { kind: "project", text: "Resilience4j around OpenFeign. Always pair with metrics on open-state and retry count." },
    ],
  },
  {
    id: "consistency",
    chapterId: "micro",
    title: "CAP, saga, outbox",
    blurb: "Filled gap. You cannot have a two-phase commit across happy little services. You choreograph or orchestrate, and you make writes recoverable.",
    keywords: ["CAP", "saga", "outbox", "idempotency", "CQRS"],
    source: "filled",
    level: "deep",
    blocks: [
      { kind: "idea", text: "CAP: under partition, you pick consistency or availability. PACELC reminds you that even without partition you still pick latency vs consistency. Eventual consistency is a product decision, not a slogan." },
      { kind: "bullets", items: ["Saga — each local txn + a compensating action. Orchestrator (one conductor) vs choreography (events).", "Transactional outbox — write business row and 'event to publish' in the same DB txn; a relay publishes to Kafka. Avoids 'DB committed, broker down'.", "Idempotency keys — clients send a key; you persist it so retries do not double-apply.", "CQRS — separate write model from read model. Event sourcing — the log is the source of truth. Use when the domain earns the complexity."] },
    ],
  },
  {
    id: "observability",
    chapterId: "micro",
    title: "Logs, metrics, traces",
    blurb: "Filled gap. Three pillars. A correlation id on every hop. Without this, microservices are unoperable.",
    keywords: ["correlation id", "Prometheus", "trace", "structured log"],
    source: "filled",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["Logs — structured JSON, level, no secrets. ELK / Loki.", "Metrics — RED (rate, errors, duration) + USE. Prometheus + Grafana.", "Traces — one tree per request (Micrometer Tracing / OpenTelemetry).", "Pass W3C traceparent or B3 headers through Feign/Kafka."] },
    ],
  },
];

export const kafkaTopics: Topic[] = [
  {
    id: "kafka-core",
    chapterId: "kafka",
    title: "Kafka building blocks",
    blurb: "Distributed commit log. Topic → partitions → offsets. Ordering is per partition. Consumer groups share work.",
    keywords: ["topic", "partition", "offset", "consumer group", "broker"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "A cluster is brokers. A topic is a named stream, split into partitions (the unit of parallelism and ordering). Each record in a partition has a monotonic offset. Producers append. Consumers read and remember offsets (usually in __consumer_offsets)." },
      { kind: "bullets", items: ["Key → partition (hash). Same key, same partition, so order is preserved for that key.", "A group cannot usefully have more active consumers than partitions.", "Replication: leader + followers. acks=all + min.insync.replicas is the durability knob.", "Retention by time/size. Compaction keeps the latest value per key."] },
      { kind: "project", text: "Spring: KafkaTemplate to produce, @KafkaListener to consume. Design keys, poison-pill handling, and schema evolution (Schema Registry) before go-live." },
    ],
  },
  {
    id: "kafka-delivery",
    chapterId: "kafka",
    title: "Delivery, lag, rebalance",
    blurb: "At-least-once is the default story. Exactly-once is a specific setup, not a vibe. Consumers must tolerate duplicates.",
    keywords: ["at-least-once", "idempotent producer", "lag", "rebalance", "DLT"],
    source: "merged",
    level: "trap",
    blocks: [
      { kind: "idea", text: "A crash after processing but before committing the offset → redelivery. Make handlers idempotent. Idempotent producers (enable.idempotence) stop duplicate writes from producer retries. Transactions can give read-process-write EOS in Kafka Streams / consume-transform-produce." },
      { kind: "bullets", items: ["Lag = end offset − committed offset. Alert on it.", "Rebalance: a consumer joins/leaves, partitions move. Keep processing fast; avoid heavy init in the listener without pausing.", "Retries + DLT (dead letter topic) for poison messages.", "Do not use Kafka as a DB. Do not log payloads with PII at info."] },
    ],
  },
];

export const testingTopics: Topic[] = [
  {
    id: "junit-mockito",
    chapterId: "testing",
    title: "JUnit 5 and Mockito",
    blurb: "Test the behaviour at the boundary. Mock collaborators, not every internal. assertThrows for exceptions.",
    keywords: ["@Test", "@Mock", "@InjectMocks", "verify"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["@Test, @BeforeEach, @AfterEach, @BeforeAll, @AfterAll.", "Parameterized tests for tables of input.", "@Mock collaborator. @InjectMocks unit under test.", "when(...).thenReturn / thenThrow. verify(mock).method().", "ArgumentCaptor when you need to assert the outbound DTO."] },
      { kind: "trap", text: "Mocking the class under test is a smell. Mocking JPA entities is a smell. Prefer an in-memory or Testcontainers DB for repositories." },
    ],
  },
  {
    id: "spring-tests",
    chapterId: "testing",
    title: "Spring Boot test slices",
    blurb: "@SpringBootTest is the whole context. Slices are faster and stricter. MockMvc for MVC. Testcontainers for the real broker/DB.",
    keywords: ["WebMvcTest", "DataJpaTest", "MockMvc", "Testcontainers"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["@WebMvcTest — controllers + MVC, mock the service.", "@DataJpaTest — repositories + embedded/real DB.", "@RestClientTest — client slice.", "@SpringBootTest — almost e2e, slow.", "Testcontainers: Postgres, Kafka, in CI."] },
    ],
  },
];

export const sqlTopics: Topic[] = [
  {
    id: "sql-core",
    chapterId: "sql",
    title: "SQL you must write on a whiteboard",
    blurb: "SELECT, JOIN, GROUP BY, subquery, window functions, NULL. Know DDL vs DML vs DQL.",
    keywords: ["JOIN", "GROUP BY", "window", "NULL", "ACID"],
    source: "merged",
    level: "core",
    drillId: "sql-dept-avg",
    blocks: [
      { kind: "bullets", items: ["ACID — atomic, consistent, isolated, durable.", "PK / FK / unique / check / not null.", "INNER JOIN vs LEFT JOIN. Self-join for manager/employee.", "GROUP BY + HAVING vs WHERE.", "Indexes: B-tree default. They speed lookup and can slow write. EXPLAIN ANALYZE is the truth.", "Normalize to 3NF, denormalize when a measured read path needs it."] },
      { kind: "code", caption: "Patterns", code: `SELECT department, AVG(salary) AS avg_salary
FROM employees GROUP BY department;

SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

SELECT employee_id, salary, department,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
FROM employees;` },
      { kind: "trap", text: "NULL is not = and not <> . Use IS NULL. COUNT(*) counts rows; COUNT(col) skips nulls. OFFSET pagination gets slower as you go deeper — prefer keyset/cursor." },
    ],
  },
  {
    id: "postgres",
    chapterId: "sql",
    title: "PostgreSQL — MVCC, JSONB, pooling",
    blurb: "Readers don't block writers. Vacuum is not optional. JSONB + GIN is a real index, not a toy.",
    keywords: ["MVCC", "VACUUM", "JSONB", "GIN", "HikariCP"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "idea", text: "MVCC: updates make a new row version. Old versions stay until VACUUM. That is how readers see a snapshot. Ignore vacuum and the table bloats, then query plans rot." },
      { kind: "bullets", items: ["JSONB — binary JSON, index with GIN.", "GiST / SP-GiST — geo, full text, ranges.", "HikariCP — pool size ≈ ((core_count * 2) + spindle) as a starting heuristic, then measure. Pool + DB max_connections must fit together.", "Flyway/Liquibase for migrations. Parameterized queries always."] },
    ],
  },
];

export const dataTopics: Topic[] = [
  {
    id: "nosql",
    chapterId: "data",
    title: "NoSQL map",
    blurb: "Pick for access pattern, not for fashion. You trade joins and rigid schema for scale and flexibility.",
    keywords: ["MongoDB", "Redis", "Cassandra", "Neo4j"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["Document — MongoDB. JSON docs, rich queries, beware unbounded arrays.", "Key-value — Redis. Cache, lock, session, rate limit, sorted sets.", "Wide-column — Cassandra. Partition key design is the whole game.", "Graph — Neo4j. Relationships first."] },
      { kind: "when", text: "Need multi-row ACID and joins? Postgres. Need sub-ms cache? Redis. Need write-heavy time series across DC? Cassandra, with open eyes." },
    ],
  },
  {
    id: "cache",
    chapterId: "data",
    title: "Caching and Redis",
    blurb: "Filled gap. Cache-aside is the usual Spring @Cacheable story. Know stampede, TTL, and what not to cache.",
    keywords: ["cache-aside", "write-through", "TTL", "stampede"],
    source: "filled",
    level: "deep",
    blocks: [
      { kind: "idea", text: "Cache-aside: miss → DB → put. Write-through: write DB and cache together. Write-behind: queue the DB write (danger). TTL + jitter to avoid stampedes. For hot keys, lock or computeIfAbsent-style single flight." },
      { kind: "trap", text: "Caching a user object without a version is how you serve stale permissions. Cache authorization decisions carefully. Redis SETNX / Redisson for a lock — always expire the lock." },
    ],
  },
];

export const cloudTopics: Topic[] = [
  {
    id: "aws-compute",
    chapterId: "cloud",
    title: "Lambda, EC2, EKS",
    blurb: "Serverless vs VM vs managed Kubernetes. Cold starts, IAM, and health checks matter more than logos.",
    keywords: ["Lambda", "EC2", "EKS", "IAM"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["Lambda — event in, pay per use. Cold start, 15 min cap, no sticky SSH, watch connection reuse.", "EC2 — you patch, scale, and alarm it. IAM role, VPC, EBS, ASG, CloudWatch.", "EKS — control plane managed. You still own deployments, probes, RBAC, cost.", "EFS — shared NFS-style volume when instances must share files."] },
      { kind: "idea", text: "Horizontal scale = more instances. Vertical = bigger instance. Prefer horizontal for stateless APIs." },
    ],
  },
  {
    id: "aws-net-storage",
    chapterId: "cloud",
    title: "Load balancers, S3, Parameter Store",
    blurb: "ALB is L7 HTTP. NLB is L4. S3 is object storage. Secrets do not live in git.",
    keywords: ["ALB", "NLB", "S3", "SSM"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["ALB — path/host routing, HTTP features.", "NLB — extreme throughput, TCP/TLS, static IP.", "GWLB — appliances.", "S3 — buckets, encryption, versioning, lifecycle, block public access, presigned URLs.", "SSM Parameter Store / Secrets Manager — config and secrets, encrypted."] },
      { kind: "trap", text: "A public S3 bucket is a CV of infamy. Lambda + RDS without a pooler will exhaust connections on a spike." },
    ],
  },
];

export const adjacentTopics: Topic[] = [
  {
    id: "feign",
    chapterId: "adjacent",
    title: "OpenFeign",
    blurb: "Declarative HTTP. An interface plus annotations. Still needs timeouts, metrics, and a fallback that tells the truth.",
    keywords: ["FeignClient", "EnableFeignClients", "decoder"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "code", code: `@FeignClient(name = "payment-service")
public interface PaymentClient {
    @GetMapping("/payments/{id}")
    PaymentResponse find(@PathVariable("id") Long id);
}` },
      { kind: "idea", text: "For highly reactive or streaming clients, WebClient may fit better. Feign is the comfortable Spring Cloud default for request/response." },
    ],
  },
  {
    id: "grpc",
    chapterId: "adjacent",
    title: "gRPC and Protobuf",
    blurb: "Contract-first RPC on HTTP/2. Unary and streaming. Field numbers are compatibility.",
    keywords: ["protobuf", "unary", "streaming", "deadline"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "idea", text: "Four shapes: unary, server stream, client stream, bidi. Generated stubs. Deadlines, cancellation, TLS, status codes, health. Never reuse a protobuf field number for a new meaning." },
      { kind: "when", text: "Internal service-to-service, low latency, typed contracts, streaming. REST still wins for public browser APIs." },
    ],
  },
  {
    id: "graphql",
    chapterId: "adjacent",
    title: "GraphQL",
    blurb: "Clients ask for fields. Over-fetching shrinks; N+1 in resolvers grows if you are careless.",
    keywords: ["schema", "resolver", "dataloader", "complexity"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "idea", text: "Types, queries, mutations, subscriptions. Resolvers load fields. DataLoader batches to kill N+1. Depth/complexity limits, field-level auth, pagination, traces. Spring for GraphQL or Quarkus extensions." },
      { kind: "trap", text: "GraphQL is not a performance silver bullet. A nested query can be more expensive than the REST it replaced." },
    ],
  },
  {
    id: "quarkus",
    chapterId: "adjacent",
    title: "Quarkus",
    blurb: "Build-time metadata, fast start, native via GraalVM. Compare with Spring on team skill and ecosystem, not a tweeted benchmark.",
    keywords: ["GraalVM", "build-time", "native", "dev mode"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "idea", text: "Shifts DI and reflection work to build. Dev mode live-reloads. Native images need extra config for reflection, resources, proxies. Kubernetes-native story is the point." },
    ],
  },
  {
    id: "lombok-guava",
    chapterId: "adjacent",
    title: "Lombok and Guava",
    blurb: "@Data on a JPA entity is a footgun. Guava is optional once the JDK caught up.",
    keywords: ["@Getter", "@Builder", "@Data", "Guava"],
    source: "ultimate",
    level: "trap",
    blocks: [
      { kind: "idea", text: "Lombok: @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor are the safe daily set. @Data generates equals/hashCode/toString that can touch lazy fields and recurse. Guava: immutable collections, caches, preconditions — use when the JDK equivalent is worse, not by default." },
    ],
  },
];
