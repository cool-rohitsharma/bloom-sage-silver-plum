import type { Topic } from "./types";

export const exceptionTopics: Topic[] = [
  {
    id: "exception-hierarchy",
    chapterId: "exceptions",
    title: "Throwable, Error, Exception",
    blurb: "Throwable is the root. Error is the JVM on fire. Exception is your problem. Do not catch Throwable.",
    keywords: ["Throwable", "Error", "checked", "unchecked"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "Object → Throwable → Error | Exception. Exception → RuntimeException (unchecked) and everything else checked. Checked: compiler forces catch or throws (IOException, SQLException). Unchecked: RuntimeException and subclasses (NPE, IAE, ISE)." },
      {
        kind: "table",
        headers: ["Error", "Exception"],
        rows: [
          ["Environment / JVM", "Application"],
          ["OutOfMemoryError, StackOverflowError", "IOException, NPE"],
          ["Usually do not catch", "Handle or declare"],
        ],
      },
      { kind: "trap", text: "catch (Throwable t) also swallows Errors. catch (Exception e) is already too wide for most methods. Catch the most specific type, log once, keep the cause when you wrap." },
    ],
  },
  {
    id: "try-catch-finally",
    chapterId: "exceptions",
    title: "try, catch, finally, throw vs throws",
    blurb: "finally always runs (except JVM death / infinite loop). try-with-resources beats manual finally for AutoCloseable.",
    keywords: ["finally", "try-with-resources", "throw", "throws"],
    source: "cheatcode",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["throw", "throws"],
        rows: [
          ["Throws an instance", "Declares a type on the method"],
          ["Inside the body", "On the signature"],
          ["throw new IOException(\"x\")", "void m() throws IOException"],
        ],
      },
      {
        kind: "table",
        caption: "final / finally / finalize",
        headers: ["final", "finally", "finalize"],
        rows: [
          ["Keyword: freeze class/method/field", "Block: always after try/catch", "Method: deprecated GC hook"],
        ],
      },
      { kind: "bullets", title: "Overriding vs exceptions", items: ["If parent declares nothing, child cannot add checked exceptions. Unchecked is fine.", "If parent declares checked E, child may declare E, a subclass of E, or nothing.", "Child cannot declare a sibling/supertype checked exception."] },
      { kind: "why", text: "try-with-resources calls close() in reverse order and suppresses secondary exceptions on the primary. Use it for streams, JDBC, HTTP clients." },
    ],
  },
  {
    id: "spring-errors",
    chapterId: "exceptions",
    title: "API errors in Spring",
    blurb: "Never leak stack traces. @ControllerAdvice + @ExceptionHandler → a stable JSON shape.",
    keywords: ["ControllerAdvice", "Problem JSON", "validation"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "idea", text: "Map domain errors to HTTP. Include timestamp, status, code, message, path, field errors. MethodArgumentNotValidException for @Valid bodies." },
      { kind: "trap", text: "Do not return e.getMessage() from unknown exceptions — it can contain SQL or PII. Log internally, return a generic 500 with a correlation id." },
    ],
  },
];

export const patternTopics: Topic[] = [
  {
    id: "solid",
    chapterId: "patterns",
    title: "SOLID",
    blurb: "Five design pressures, not a religion. Recite them with a one-line example each.",
    keywords: ["SRP", "OCP", "LSP", "ISP", "DIP"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["SRP — one reason to change. A repository does not also send email.", "OCP — add a new Shape implementation without editing the renderer.", "LSP — a Square that breaks Rectangle setters is not a Rectangle.", "ISP — do not force a client to depend on a 40-method God interface.", "DIP — depend on EmailSender, not SmtpEmailSenderImpl."] },
      { kind: "project", text: "PaymentService depends on PaymentGateway. Stripe and Razorpay are plugins. That is OCP + DIP together." },
    ],
  },
  {
    id: "singleton",
    chapterId: "patterns",
    title: "Singleton",
    blurb: "One instance, global access. Easy to get wrong under concurrency. enum is the lazy-safe Java form. Spring already gives you a container singleton.",
    keywords: ["private constructor", "enum", "double-checked", "volatile"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "code", caption: "Lazy holder / classic sketch — still racy without sync", code: `public final class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) instance = new Singleton();
        return instance;
    }
}` },
      { kind: "idea", text: "Make it correct: enum Singleton { INSTANCE; } or private constructor + static final field (eager) or holder class idiom. Double-checked locking needs volatile on the field." },
      { kind: "why", text: "One DB connection factory, one meter registry. Spring @Service is already a singleton per context — do not also roll your own." },
      { kind: "tradeoff", text: "Hidden global state. Hard to test. Hidden coupling. Limits scale if the thing holds request data by mistake." },
    ],
  },
  {
    id: "factory",
    chapterId: "patterns",
    title: "Factory",
    blurb: "Callers ask for a Shape, not new Circle(). Creation is centralized so new types do not leak into every client.",
    keywords: ["create", "product", "hide new"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "code", code: `public interface Shape { void draw(); }

public class ShapeFactory {
    public Shape create(String type) {
        if ("circle".equals(type)) return new Circle();
        if ("square".equals(type)) return new Square();
        throw new IllegalArgumentException(type);
    }
}` },
      { kind: "why", text: "Clients depend on the abstraction. You can swap implementations, cache, or decorate without touching callers." },
      { kind: "tradeoff", text: "A giant switch on strings is still a maintenance dump. Prefer a registry, Spring @Component + @Qualifier, or a sealed type + switch." },
    ],
  },
  {
    id: "observer-strategy",
    chapterId: "patterns",
    title: "Observer and Strategy",
    blurb: "Observer: one-to-many events. Strategy: swap an algorithm at runtime. Composition beats another inheritance tree.",
    keywords: ["event", "algorithm", "composition"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "idea", text: "Observer — publisher holds listeners, notify on change. Watch for leaks (never unregister) and delivery guarantees (sync vs async, at-least-once)." },
      { kind: "idea", text: "Strategy — PaymentMethod, PricingRule, ValidationRule as interfaces. Select at runtime from config or the request." },
      { kind: "project", text: "Pricing: Regular, Festival, Employee strategies. Adding a new one is a new class, not an if-else in OrderService — OCP." },
    ],
  },
];

export const springTopics: Topic[] = [
  {
    id: "ioc",
    chapterId: "spring",
    title: "IoC, DI, stereotypes",
    blurb: "Spring owns construction. You declare what you need. Constructor injection is the default for required deps.",
    keywords: ["IoC", "DI", "Component", "constructor injection"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "idea", text: "Inversion of Control: the container calls you. Dependency Injection is how it supplies collaborators. Stereotypes: @Component, @Service, @Repository, @Controller — all beans, different intent (and @Repository also translates persistence exceptions)." },
      { kind: "bullets", items: ["Prefer constructors for mandatory deps. Field @Autowired is shorter and worse for tests.", "@Qualifier when several implementations exist. @Primary marks the default.", "@PostConstruct / @PreDestroy for lifecycle. DisposableBean if you must.", "Profiles: environment settings, not a place to hide business branches."] },
    ],
  },
  {
    id: "bean-scopes",
    chapterId: "spring",
    title: "Bean scopes and circular deps",
    blurb: "Default is singleton per ApplicationContext. Prototype is a new instance per lookup. A prototype inside a singleton is still one instance unless you look it up each time.",
    keywords: ["singleton", "prototype", "request", "circular"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["singleton — one per container. Stateless services.", "prototype — new every getBean / inject (but not re-injected into an already-built singleton).", "request / session — web scopes.", "Circular A↔B: constructor injection fails fast (good). Setter/field injection can paper over it with a half-built proxy — fix the design instead."] },
      { kind: "trap", text: "Prototype in a singleton field is created once. Use ObjectFactory, Provider, or lookup method if you truly need a new one per call." },
    ],
  },
  {
    id: "spring-boot",
    chapterId: "spring",
    title: "Spring Boot",
    blurb: "@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan. Starters, embedded server, Actuator, type-safe config.",
    keywords: ["auto-configuration", "starter", "Actuator", "ConfigurationProperties"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "Boot guesses beans from the classpath (a DataSource if you have a driver + url). Starters are curated dependency sets (web, data-jpa, security). Embedded Tomcat means java -jar is a server. application.yml + profiles + @ConfigurationProperties for grouped config." },
      { kind: "bullets", items: ["@RestController = @Controller + @ResponseBody.", "Actuator: health, metrics, info — lock down or hide in prod.", "Don't fight auto-config until you must; then exclude or @Bean override.", "Running as a Java application starts the embedded server."] },
    ],
  },
  {
    id: "aop",
    chapterId: "spring",
    title: "AOP and @Transactional gotchas",
    blurb: "Cross-cutting via proxies. Transactions, security, logging. Self-invocation does not hit the proxy.",
    keywords: ["proxy", "pointcut", "advice", "self-invocation"],
    source: "merged",
    level: "trap",
    blocks: [
      { kind: "idea", text: "Aspect = advice + pointcut. Join point is a candidate call. Spring AOP is typically interface JDK proxy or CGLIB subclass. @Transactional, @Async, @Cacheable all ride this." },
      { kind: "trap", text: "this.otherMethod() inside the same class bypasses the proxy — no transaction, no async. Split classes, or inject self. Also: @Transactional on private methods is ignored. Checked exceptions do not roll back by default — only RuntimeException, unless rollbackFor is set." },
      { kind: "project", text: "Keep the transaction at the service boundary, one unit of work. Do not @Transactional on a controller that then calls three services each with their own transaction unless you meant that." },
    ],
  },
  {
    id: "async-boot",
    chapterId: "spring",
    title: "@Async",
    blurb: "Not a performance spell. Bound the executor. Handle errors. Same proxy rules as transactions.",
    keywords: ["EnableAsync", "TaskExecutor", "proxy"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "idea", text: "@EnableAsync + @Async. Return CompletableFuture if you need a handle. Configure a pool size and a queue. Uncaught exceptions in void @Async methods vanish unless you set an AsyncUncaughtExceptionHandler." },
    ],
  },
];

export const restTopics: Topic[] = [
  {
    id: "rest-principles",
    chapterId: "rest",
    title: "REST, status codes, OpenAPI",
    blurb: "Resources, verbs, stateless, uniform interface. Design pagination, filtering, errors, and idempotency up front.",
    keywords: ["stateless", "resource", "idempotent", "OpenAPI"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "bullets", title: "HTTP methods", items: ["GET — read, safe, idempotent.", "POST — create or action, not idempotent.", "PUT — replace the resource at this URI, idempotent.", "PATCH — partial update, not guaranteed idempotent.", "DELETE — remove, idempotent in the 'already gone is fine' sense."] },
      { kind: "bullets", title: "Statuses to have on your tongue", items: ["200 OK, 201 Created, 202 Accepted, 204 No Content", "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404, 409 Conflict, 422 Unprocessable Content", "429 Too Many Requests, 500, 502, 503"] },
      { kind: "why", text: "OpenAPI/Swagger documents the contract. @Operation, @ApiResponse, @Parameter. It is not optional in a multi-team backend." },
    ],
  },
  {
    id: "put-patch-post",
    chapterId: "rest",
    title: "PUT vs PATCH vs POST",
    blurb: "PUT sends the whole document. PATCH sends a delta. POST creates (or triggers).",
    keywords: ["idempotent", "replace", "partial"],
    source: "cheatcode",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["PUT", "PATCH", "POST"],
        rows: [
          ["Full replace (or create-at-id)", "Partial change", "Create / process"],
          ["Idempotent", "Not guaranteed", "Not idempotent"],
          ["Body = full resource", "Body = fields to change", "Body = new resource"],
        ],
      },
    ],
  },
  {
    id: "spring-mvc-annotations",
    chapterId: "rest",
    title: "Spring MVC annotations you will be asked",
    blurb: "A working set, not a dump. Know where the value comes from: path, query, body, header.",
    keywords: ["GetMapping", "PathVariable", "RequestParam", "RequestBody"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["@Get/Post/Put/Patch/DeleteMapping — HTTP + path.", "@RequestMapping — the general form (method, consumes, produces).", "@PathVariable — /users/{id}.", "@RequestParam — ?page=1. Default values exist.", "@RequestBody + @Valid — JSON body.", "@RequestHeader, @CookieValue — as named.", "@RestController vs @Controller — data vs view.", "@ExceptionHandler — local or in @ControllerAdvice."] },
    ],
  },
  {
    id: "validation",
    chapterId: "rest",
    title: "Validation",
    blurb: "@NotNull, @Size, @Email, @Pattern on the DTO. @Valid on the parameter. Handle MethodArgumentNotValidException once.",
    keywords: ["Valid", "Validated", "Bean Validation"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "code", code: `@PostMapping("/users")
public ResponseEntity<Void> create(@RequestBody @Valid UserDto dto) { ... }

public class UserDto {
    @NotNull @Size(min = 3, max = 50)
    private String username;
}` },
      { kind: "idea", text: "Custom Validator for cross-field rules (password == confirm). Sanitize at the edge. Never trust the client." },
    ],
  },
];

export const jpaTopics: Topic[] = [
  {
    id: "jpa-basics",
    chapterId: "jpa",
    title: "Spring Data JPA",
    blurb: "JpaRepository gives CRUD and derived queries. @Transactional marks the unit of work. Entities, DTOs, and API models are not the same thing.",
    keywords: ["JpaRepository", "derived query", "EntityManager"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "idea", text: "The persistence context is a first-level cache of managed entities. Dirty checking flushes changes at commit. Repositories should stay thin; domain rules live in services." },
      { kind: "trap", text: "LazyInitializationException: the session is closed and you touched a lazy collection. Open-session-in-view hides this in web apps and then blows up in async/event threads. Prefer fetch plans." },
    ],
  },
  {
    id: "n-plus-one",
    chapterId: "jpa",
    title: "N+1 and fetch plans",
    blurb: "One query for parents, N for children. Kill it with join fetch, @EntityGraph, batch size, or a projection.",
    keywords: ["N+1", "join fetch", "EntityGraph", "projection"],
    source: "ultimate",
    level: "trap",
    blocks: [
      { kind: "idea", text: "findAll() on Order then order.getLines() in a loop is N+1. Fix: join fetch in JPQL, @EntityGraph on the repo method, @BatchSize, or a DTO query that selects only what the API needs." },
      { kind: "tradeoff", text: "join fetch of two bags can cartesian-product. Don't fetch the whole graph 'just in case'." },
    ],
  },
  {
    id: "locking-isolation",
    chapterId: "jpa",
    title: "Locking and isolation",
    blurb: "Filled gap. Optimistic (@Version) for low contention. Pessimistic lock for 'this row must not move'. Isolation levels define what anomalies you accept.",
    keywords: ["@Version", "optimistic", "pessimistic", "READ_COMMITTED"],
    source: "filled",
    level: "deep",
    blocks: [
      { kind: "bullets", items: ["Read Uncommitted — dirty reads. Rarely used.", "Read Committed — default on Postgres. No dirty reads. Non-repeatable reads possible.", "Repeatable Read — Postgres is actually snapshot-ish; phantom behaviour differs by engine.", "Serializable — highest; retries on conflict."] },
      { kind: "idea", text: "Optimistic: a version column. Concurrent update → ObjectOptimisticLockingFailureException → retry. Pessimistic: SELECT FOR UPDATE. Can deadlock; keep short." },
    ],
  },
];

export const securityTopics: Topic[] = [
  {
    id: "authn-authz",
    chapterId: "security",
    title: "Authentication vs authorization",
    blurb: "Who are you vs what may you do. Mixing them in an interview is an instant miss.",
    keywords: ["authentication", "authorization", "SecurityFilterChain"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "Authentication: credentials, session, JWT, OAuth login. Authorization: roles, authorities, method security, path matchers. Spring Security is a filter chain in front of the dispatcher." },
      { kind: "bullets", items: ["SecurityFilterChain bean configures order: CSRF, auth, headers…", "Resource server: validate JWT from a trusted issuer.", "Passwords: BCrypt (or stronger), never reversible encryption.", "HTTPS everywhere. Least privilege. Deny by default.", "Basic vs digest: Basic is base64, not encryption. Digest is challenge-response. Neither replaces TLS + modern tokens."] },
      { kind: "project", text: "API gateway checks JWT. Each service still enforces method-level rules — never trust the network inside the mesh blindly." },
    ],
  },
  {
    id: "jwt-oauth",
    chapterId: "security",
    title: "JWT, OAuth2, sessions",
    blurb: "Filled gap. JWT is a signed claim set, not a magic login system. Know the three parts and the revocation problem.",
    keywords: ["header", "payload", "signature", "refresh token", "CSRF"],
    source: "filled",
    level: "deep",
    blocks: [
      { kind: "idea", text: "JWT: header.payload.signature. Claims: sub, exp, iss, aud, roles. Signature proves integrity, not secrecy — do not put PII or secrets in the payload. Revocation is hard; keep TTLs short and use refresh tokens / denylist if you must kill access now." },
      { kind: "trap", text: "Cookie sessions need CSRF protection. Bearer tokens in Authorization headers from a SPA are a different threat model (XSS). alg=none is a famous bug. Always pin the algorithm on verify." },
    ],
  },
];
