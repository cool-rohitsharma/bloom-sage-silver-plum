import type { Topic } from "./types";

export const javaFeatureTopics: Topic[] = [
  {
    id: "java8-features",
    chapterId: "java8",
    title: "Java 8 — what actually changed",
    blurb: "Lambdas, streams, Optional, default/static on interfaces, functional interfaces, method references. Less boilerplate, more declarative data work, a path to parallel.",
    keywords: ["lambda", "stream", "Optional", "default method", "functional interface"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "bullets", title: "The set you should recite", items: ["Lambda expressions", "Stream API", "Default and static methods on interfaces", "Functional interfaces + @FunctionalInterface", "Optional", "Method references", "New Date/Time (JSR-310)"] },
      { kind: "why", text: "Compact code, easier unit tests around pure functions, and a standard way to pipeline collections. Parallel is a bonus, not the default." },
      { kind: "trap", text: "parallelStream() is not a performance free lunch. Measure. Shared mutable state inside a lambda is a race." },
    ],
  },
  {
    id: "lambda",
    chapterId: "java8",
    title: "Lambda expressions",
    blurb: "An anonymous function: parameters, arrow, body. It implements the single abstract method of a functional interface.",
    keywords: ["arrow", "SAM", "capture", "effectively final"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "idea", text: "A lambda is a value. It needs a target type — a functional interface. You do not re-declare the method; you provide the body." },
      { kind: "code", caption: "From a named method to a lambda", code: `BiConsumer<Integer, Integer> add = (a, b) -> System.out.println(a + b);
add.accept(5, 8);

Predicate<Integer> gt5 = x -> x > 5;` },
      { kind: "bullets", title: "Built-in functional types", items: ["Predicate<T> — T → boolean, used in filter", "Function<T,R> — T → R, used in map", "Consumer<T> — T → void", "Supplier<T> — () → T", "BiConsumer / BiFunction / UnaryOperator / BinaryOperator"] },
      { kind: "trap", text: "Lambdas capture local variables only if they are final or effectively final. You cannot mutate a captured int count++. Use AtomicInteger or a stream reduction instead." },
    ],
  },
  {
    id: "functional-interface",
    chapterId: "java8",
    title: "Functional interfaces",
    blurb: "Exactly one abstract method. Default and static methods do not count against that. The lambda is the implementation.",
    keywords: ["SAM", "@FunctionalInterface", "Runnable", "Comparator"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "idea", text: "Functional interface = one abstract method. Runnable, Callable, Comparator, Comparable all qualify. @FunctionalInterface asks the compiler to enforce it." },
      { kind: "code", caption: "Roll your own", code: `@FunctionalInterface
public interface MyFunction {
    void myMethod(String input);
}

MyFunction fn = input -> System.out.println("Input: " + input);
fn.myMethod("Hello, Lambda!");` },
      { kind: "why", text: "Without a SAM type there is nowhere to hang the lambda. That is the whole relationship." },
    ],
  },
  {
    id: "method-reference",
    chapterId: "java8",
    title: "Method references",
    blurb: "When a lambda only forwards to an existing method, write Class::method. Four shapes: static, instance-on-type, instance-on-object, constructor.",
    keywords: ["::", "bound", "unbound", "constructor ref"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "idea", text: "names.forEach(System.out::println) is names.forEach(s -> System.out.println(s)). Use it when the method already exists — do not invent a wrapper." },
      { kind: "bullets", items: ["Static — String::valueOf", "Instance on an object — System.out::println", "Instance on a type — String::toLowerCase", "Constructor — ArrayList::new"] },
    ],
  },
  {
    id: "streams",
    chapterId: "java8",
    title: "Stream API",
    blurb: "A pipeline over a source. Intermediate ops are lazy. A terminal op pulls the data. The source collection is not mutated.",
    keywords: ["lazy", "intermediate", "terminal", "pipeline", "spliterator"],
    source: "merged",
    level: "core",
    drillId: "stream-filter-map",
    blocks: [
      { kind: "idea", text: "A stream is not a data structure. It describes a computation: source → zero or more intermediate ops → one terminal op. Intermediate ops (map, filter, sorted, flatMap, distinct, peek) build a recipe. Terminal ops (collect, forEach, reduce, count, findFirst, min, max) run it." },
      { kind: "code", caption: "map / filter / sorted / collect", code: `List<Integer> squares = numbers.stream()
    .map(x -> x * x)
    .collect(Collectors.toList());

List<String> sNames = names.stream()
    .filter(s -> s.startsWith("S"))
    .sorted()
    .collect(Collectors.toList());` },
      { kind: "code", caption: "reduce — even sum", code: `int evenSum = numbers.stream()
    .filter(x -> x % 2 == 0)
    .reduce(0, (acc, i) -> acc + i);` },
      { kind: "trap", text: "You cannot reuse a stream after a terminal op. peek is for debugging, not business logic. Don't use parallelStream on a tiny list or a blocking I/O body." },
    ],
  },
  {
    id: "map-flatmap",
    chapterId: "java8",
    title: "map vs flatMap",
    blurb: "map is one-to-one. flatMap is one-to-many and then flattens. Nested lists, Optional, and Stream-of-Stream are the usual reasons.",
    keywords: ["one-to-one", "one-to-many", "flatten"],
    source: "cheatcode",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["", "map", "flatMap"],
        rows: [
          ["Shape", "T → R", "T → Stream<R> (then flatten)"],
          ["Result", "Stream<R>", "Stream<R> not Stream<Stream<R>>"],
          ["Use", "transform each element", "explode nested structures"],
        ],
      },
      { kind: "code", caption: "flatten a character", code: `fruits.stream()
    .flatMap(str -> Stream.of(str.charAt(2)))
    .forEach(System.out::println);` },
      { kind: "project", text: "orders.stream().flatMap(o -> o.getLines().stream()) to get every line item. Optional.flatMap when a lookup returns Optional." },
    ],
  },
  {
    id: "optional",
    chapterId: "java8",
    title: "Optional",
    blurb: "A box that may be empty. Return it from methods that might miss. Do not use it as a field, a parameter, or a serialized DTO.",
    keywords: ["isPresent", "orElse", "orElseGet", "orElseThrow"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "Optional is a container for a possibly missing value so you stop returning null from finders. Prefer map/flatMap/filter chaining over isPresent()+get()." },
      { kind: "bullets", title: "Method instincts", items: ["orElse(x) — x is always evaluated.", "orElseGet(supplier) — lazy fallback. Use this when fallback is expensive.", "orElseThrow — the honest miss.", "ifPresent / ifPresentOrElse — side effects.", "empty / of / ofNullable — of(null) throws."] },
      { kind: "trap", text: "Optional.get() without a guard is just a louder NPE. Optional in entity fields breaks JPA and JSON. Optional.of(null) is a bug; ofNullable exists." },
    ],
  },
  {
    id: "default-methods",
    chapterId: "java8",
    title: "Default and static methods on interfaces",
    blurb: "Default methods let an interface evolve without breaking implementors. Static methods on interfaces are namespaced utilities — they are not inherited as overridable instance methods.",
    keywords: ["default", "static interface", "diamond", "backward compatible"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "code", caption: "default method", code: `default void methodName() {
    // fallback body
}` },
      { kind: "why", text: "Java 8 needed to add forEach/stream to Collection without rewriting every ArrayList in the world. Default methods are that evolution hatch." },
      { kind: "idea", text: "Diamond problem: two interfaces, same default signature. The class must override and pick, often via InterfaceName.super.method(). Static interface methods are called as Interface.method() — implementing classes cannot override them." },
      { kind: "project", text: "A repository interface can carry a default findActive() that delegates to findAll + filter if you truly want it — but prefer a real query method." },
    ],
  },
  {
    id: "datetime",
    chapterId: "java8",
    title: "Date and Time API",
    blurb: "java.time is immutable and thread-safe. Stop using Date and Calendar in new code.",
    keywords: ["LocalDate", "Instant", "ZonedDateTime", "Duration", "Period"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["LocalDate / LocalTime / LocalDateTime — no zone.", "ZonedDateTime / OffsetDateTime — with zone or offset.", "Instant — a point on the timeline (UTC).", "Duration — time-based amount. Period — date-based amount.", "DateTimeFormatter — not SimpleDateFormat (which is not thread-safe)."] },
      { kind: "trap", text: "LocalDateTime.now() without a zone is a bug in distributed systems. Store Instant in the DB, present ZonedDateTime to humans." },
    ],
  },
  {
    id: "records",
    chapterId: "modern",
    title: "Records",
    blurb: "Concise immutable data carriers. Generated constructor, accessors, equals, hashCode, toString. Great DTOs. Nested mutability still leaks.",
    keywords: ["record", "accessor", "canonical constructor"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "code", code: `public record UserDto(Long id, String name) {}` },
      { kind: "idea", text: "Components are final. You can compact-construct to validate. You can add methods. You cannot add extra instance fields. Records can implement interfaces; they cannot extend a class." },
      { kind: "trap", text: "A record of a mutable List is a shallow freeze. Callers can still mutate the list. Copy it in the constructor if you need real immutability." },
    ],
  },
  {
    id: "sealed",
    chapterId: "modern",
    title: "Sealed classes",
    blurb: "Close the type hierarchy. Permitted subtypes must be final, sealed, or non-sealed. Pairs beautifully with pattern matching.",
    keywords: ["sealed", "permits", "non-sealed"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "code", code: `public sealed interface Payment permits CardPayment, CashPayment {}` },
      { kind: "why", text: "Domain events, payment kinds, result types — you want the compiler to know the full set so switch is exhaustive." },
    ],
  },
  {
    id: "pattern-matching",
    chapterId: "modern",
    title: "Pattern matching & sequenced collections",
    blurb: "instanceof and switch can bind. Java 21 finalizes record patterns and adds SequencedCollection.",
    keywords: ["instanceof", "switch", "record pattern", "getFirst"],
    source: "ultimate",
    level: "core",
    blocks: [
      { kind: "idea", text: "if (obj instanceof String s) uses s without a cast. switch on type + record deconstruction is the Java 21 shape. SequencedCollection / SequencedSet / SequencedMap add getFirst, getLast, addFirst, addLast, reversed." },
      { kind: "margin", text: "var is for locals when the type is obvious. Not for public APIs." },
    ],
  },
  {
    id: "virtual-threads",
    chapterId: "modern",
    title: "Virtual threads (Java 21)",
    blurb: "JVM-scheduled lightweight threads. They make blocking thread-per-request scale. They do not make CPU-bound work faster.",
    keywords: ["virtual thread", "pinning", "carrier", "structured concurrency"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "code", code: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<String> result = executor.submit(() -> "done");
}` },
      { kind: "idea", text: "A virtual thread maps onto a carrier platform thread. Blocking on Java-level I/O unmounts it. That is the point: millions of waiting requests without millions of OS stacks." },
      { kind: "trap", text: "Do not claim virtual threads speed up CPU-bound work. Avoid pinning: long synchronized blocks and some native calls keep the carrier stuck. Connection pools still have a size — virtual threads do not invent more database connections. Always bound the pool." },
      { kind: "project", text: "A Spring Boot 3.2+ Tomcat with virtual threads is a reasonable default for I/O-heavy REST. Measure pinning with JFR." },
    ],
  },
  {
    id: "string-immutability",
    chapterId: "strings",
    title: "String, StringBuilder, intern",
    blurb: "String is immutable and interned. StringBuilder is the mutable workhorse. StringBuffer is the synchronized older sibling — rarely what you want.",
    keywords: ["immutable", "intern", "pool", "StringBuilder"],
    source: "merged",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["String", "StringBuffer", "StringBuilder"],
        rows: [
          ["Immutable", "Mutable, synchronized", "Mutable, not synchronized"],
          ["Safe to share", "Thread-safe, slower", "Fast, single-thread"],
          ["+ in a loop is a trap", "Legacy concurrent building", "Default choice for building"],
        ],
      },
      { kind: "idea", text: "Immutability: once created, the char data does not change. That makes String hashable, cacheable, and safe as a map key. Literals live in the string pool (heap, interned). new String(\"a\") makes an extra object — almost never needed." },
      { kind: "why", text: "The flyweight pool means many references can share one \"OK\" literal. Security also: a String handed to a class loader or a network library cannot be mutated under its feet." },
      { kind: "trap", text: "Use equals, never ==, for content. Repeated + inside a hot loop creates garbage; use StringBuilder. intern() on huge unique strings can bloat the pool." },
    ],
  },
  {
    id: "immutable-class",
    chapterId: "strings",
    title: "Writing an immutable class",
    blurb: "final class, private final fields, constructor init, no setters, defensive copies of mutable inputs and outputs.",
    keywords: ["final class", "defensive copy", "no setters"],
    source: "cheatcode",
    level: "core",
    blocks: [
      { kind: "code", code: `public final class ImmutableClass {
    private final int value;
    public ImmutableClass(int value) { this.value = value; }
    public int getValue() { return value; }
}` },
      { kind: "bullets", items: ["Declare the class final (or seal it).", "Fields private + final.", "If a field is a List/Date, copy on the way in and the way out.", "No setters. Methods return new instances if they 'change' anything."] },
    ],
  },
  {
    id: "shallow-deep",
    chapterId: "strings",
    title: "Shallow copy vs deep copy",
    blurb: "Shallow copies fields; nested objects stay shared. Deep copy clones the graph. Prefer explicit mapping over clone().",
    keywords: ["shallow", "deep", "clone", "shared reference"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "Shallow: new object, same inner pointers. Mutating a nested Address changes both copies. Deep: recursively new nested objects. Changes do not leak." },
      { kind: "when", text: "Shallow is fine for immutable graphs. Deep is required when you hand an entity snapshot to another thread or a cache." },
    ],
  },
];
