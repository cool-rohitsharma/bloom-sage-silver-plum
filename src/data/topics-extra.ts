import type { Topic } from "./types";

export const extraTopics: Topic[] = [
  {
    id: "maven-pom",
    chapterId: "spring",
    title: "Maven POM, logging",
    blurb: "pom.xml is the build contract. Logging is a ring buffer of truth — structured, leveled, never a substitute for metrics.",
    keywords: ["pom.xml", "SLF4J", "logback", "MDC"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "idea", text: "The POM lists coordinates, dependencies, plugins, modules. Spring Boot's parent BOM manages versions so you usually omit them. Logging: SLF4J API + Logback. Put a correlation id in MDC at the filter, include it in the pattern." },
      { kind: "trap", text: "System.out.println is not logging. Logging stack traces to the HTTP response is not logging either." },
    ],
  },
  {
    id: "pagination-idempotency",
    chapterId: "rest",
    title: "Pagination and idempotency keys",
    blurb: "Filled gap. Offset pagination is simple and slow at deep pages. Cursor/keyset pagination is stable. POSTs that charge money need an Idempotency-Key.",
    keywords: ["offset", "cursor", "Idempotency-Key"],
    source: "filled",
    level: "deep",
    blocks: [
      { kind: "idea", text: "page+size uses OFFSET. Rows shift as inserts happen, and the database still walks the offset. Keyset: WHERE (created_at, id) < (:cursor) ORDER BY created_at DESC, id DESC LIMIT n. Return nextCursor." },
      { kind: "idea", text: "Idempotency-Key header on POST /payments. Persist the key + response. Replay returns the same 201. Combine with PUT-like resource ids when you can." },
    ],
  },
  {
    id: "docker-k8s",
    chapterId: "cloud",
    title: "Containers, probes, 12-factor",
    blurb: "Filled gap. A container is a process with a filesystem. Kubernetes restarts it. Probes tell it when to.",
    keywords: ["liveness", "readiness", "startupProbe", "12-factor"],
    source: "filled",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["liveness — restart me, I am wedged. Do not point it at the DB.", "readiness — stop sending traffic, I am warming or overloaded.", "startupProbe — slow boots (JVM) should not get killed by liveness.", "12-factor: config in env, logs to stdout, disposability, backing services as attached resources."] },
      { kind: "trap", text: "A liveness check that hits Postgres will restart healthy pods during a DB blip, making the outage worse." },
    ],
  },
  {
    id: "hashmap-java8-note",
    chapterId: "collections",
    title: "equals, hashCode, and maps as keys",
    blurb: "The other HashMap interview: what makes a good key, and why custom objects surprise people.",
    keywords: ["key", "immutable", "hash spread"],
    source: "filled",
    level: "trap",
    blocks: [
      { kind: "idea", text: "A good key is immutable, with a well-distributed hashCode consistent with equals. Enums and strings are easy. Mutable beans are not. Putting an entity into a HashSet then changing its id is how rows 'disappear'." },
      { kind: "project", text: "Cache keys: a record of (tenantId, userId), not a concatenated string you have to parse later." },
    ],
  },
];
