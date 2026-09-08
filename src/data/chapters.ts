import type { Chapter } from "./types";

export const chapters: Chapter[] = [
  { id: "oop", roman: "I", title: "OOP & Core Java", subtitle: "The language, not the framework." },
  { id: "java8", roman: "II", title: "Java 8+", subtitle: "Lambdas, streams, Optional, dates." },
  { id: "modern", roman: "III", title: "Java 17 & 21", subtitle: "Records, sealed types, virtual threads." },
  { id: "strings", roman: "IV", title: "Strings & Copying", subtitle: "Immutability, intern, clone." },
  { id: "collections", roman: "V", title: "Collections", subtitle: "HashMap internals and choosing structures." },
  { id: "concurrency", roman: "VI", title: "Concurrency", subtitle: "Threads, locks, executors, JMM." },
  { id: "jvm", roman: "VII", title: "JVM & Memory", subtitle: "GC, metaspace, tuning with evidence." },
  { id: "exceptions", roman: "VIII", title: "Exceptions", subtitle: "Checked, unchecked, Spring mapping." },
  { id: "patterns", roman: "IX", title: "Patterns & SOLID", subtitle: "What problem each one actually solves." },
  { id: "spring", roman: "X", title: "Spring Core & Boot", subtitle: "IoC, beans, auto-config, AOP." },
  { id: "rest", roman: "XI", title: "REST & Validation", subtitle: "HTTP semantics, DTOs, OpenAPI." },
  { id: "jpa", roman: "XII", title: "JPA & Hibernate", subtitle: "Transactions, N+1, locking." },
  { id: "security", roman: "XIII", title: "Spring Security", subtitle: "Authn vs authz, JWT, filters." },
  { id: "micro", roman: "XIV", title: "Microservices", subtitle: "Boundaries, resilience, consistency." },
  { id: "kafka", roman: "XV", title: "Kafka", subtitle: "Partitions, offsets, delivery." },
  { id: "testing", roman: "XVI", title: "Testing", subtitle: "JUnit 5, Mockito, Spring slices." },
  { id: "sql", roman: "XVII", title: "SQL & PostgreSQL", subtitle: "Joins, indexes, MVCC, JSONB." },
  { id: "data", roman: "XVIII", title: "NoSQL & Cache", subtitle: "Redis, Mongo, cache-aside." },
  { id: "cloud", roman: "XIX", title: "AWS & Platform", subtitle: "EC2, S3, Lambda, load balancers." },
  { id: "adjacent", roman: "XX", title: "Feign, gRPC, GraphQL", subtitle: "Clients, contracts, Quarkus." },
];
