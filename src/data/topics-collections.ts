import type { Topic } from "./types";

export const collectionTopics: Topic[] = [
  {
    id: "collections-overview",
    chapterId: "collections",
    title: "Collections map — pick by access pattern",
    blurb: "List keeps order and duplicates. Set keeps uniqueness. Queue is about processing order. Map is key to value. Generics always. Synchronize only when you must.",
    keywords: ["List", "Set", "Queue", "Map", "Big-O"],
    source: "merged",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["List", "Set", "Map"],
        rows: [
          ["Duplicates ok, ordered", "Unique elements", "Key-value, unique keys"],
          ["ArrayList, LinkedList", "HashSet, LinkedHashSet, TreeSet", "HashMap, LinkedHashMap, TreeMap"],
        ],
      },
      { kind: "bullets", title: "Cost instincts", items: ["ArrayList — random get O(1); insert/remove in the middle O(n) because of shifting. Default capacity 10, grows ~1.5×.", "LinkedList — O(1) insert if you already hold the node; finding the index is O(n). Also a Deque.", "HashSet — unique via HashMap under the hood (dummy values).", "TreeSet / TreeMap — red-black tree, sorted, O(log n).", "LinkedHashMap — insertion (or access) order. LRU cache via accessOrder=true + removeEldestEntry."] },
      { kind: "when", text: "Need index and scan? ArrayList. Need unique + sort? TreeSet. Need unique + insert order? LinkedHashSet. Need queue? ArrayDeque beats Stack and LinkedList for most cases." },
    ],
  },
  {
    id: "arraylist-linkedlist",
    chapterId: "collections",
    title: "ArrayList vs LinkedList",
    blurb: "Almost always ArrayList. LinkedList wins only when you already have the node and you insert/remove a lot at the ends or middle.",
    keywords: ["contiguous", "node", "cache locality"],
    source: "cheatcode",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["ArrayList", "LinkedList"],
        rows: [
          ["Contiguous array, cache-friendly", "Nodes, pointer chasing"],
          ["Fast get/set by index", "Slow get by index"],
          ["Shift on middle insert", "Pointer rewrite if node is known"],
          ["List", "List + Deque"],
        ],
      },
      { kind: "trap", text: "People pick LinkedList for 'lots of inserts' and then insert by index, which is still O(n) to walk there. Measure. ArrayDeque for stack/queue." },
    ],
  },
  {
    id: "comparable-comparator",
    chapterId: "collections",
    title: "Comparable vs Comparator",
    blurb: "Comparable is the type's natural order. Comparator is an external strategy. You can have many comparators; you only get one compareTo.",
    keywords: ["compareTo", "compare", "natural order"],
    source: "cheatcode",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["Comparable", "Comparator"],
        rows: [
          ["java.lang, compareTo", "java.util, compare"],
          ["Inside the class", "Outside; original class stays clean"],
          ["One natural sequence", "Many sequences (name, salary, date)"],
        ],
      },
      { kind: "code", caption: "Comparator, not Comparable — the cheatcode sample mixed the names", code: `Comparator<Country> byName = (c1, c2) -> c1.name.compareTo(c2.name);
Comparator<Country> byPop = Comparator.comparingInt(c -> c.population);
list.sort(byName.thenComparing(byPop));` },
    ],
  },
  {
    id: "hashmap-internals",
    chapterId: "collections",
    title: "HashMap internals",
    blurb: "Array of buckets. hashCode finds a likely bin, equals confirms the key. Load factor 0.75, capacity 16. Java 8 treeifies long collision chains.",
    keywords: ["bucket", "0.75", "treeify 8", "UNTREEIFY 6", "resize"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "idea", text: "A HashMap is an array of bins. Each node holds hash, key, value, next. Index is a mix of the key's hash and table length (power of two, so hash & (n-1)). put inserts or replaces. When size > capacity × loadFactor, the table doubles and entries are redistributed." },
      { kind: "bullets", title: "Collision story", items: ["Pre-Java 8: linked list in the bin. Worst get is O(n).", "Java 8+: if a bin's list is long (≥ 8) and the table is large enough (≥ 64), the bin becomes a red-black tree. Lookup trends toward O(log n).", "If the table is still small, HashMap resizes instead of treeifying.", "If a tree shrinks (≤ 6), it may untreeify back to a list."] },
      { kind: "why", text: "Average get/put is O(1) if hashes spread. That is why you write hashCode carefully and why String/boxed keys work well." },
      { kind: "trap", text: "The number 8 is the treeify threshold, not the whole story. A tiny table with collisions resizes first. One null key is allowed; many null values. HashMap is not thread-safe — a concurrent resize can infinite-loop on old JDKs and lose updates on new ones. Structural change during fail-fast iteration → ConcurrentModificationException." },
      { kind: "project", text: "Request-scoped maps, caches that are not shared, grouping collectors. Shared mutable maps in a service go to ConcurrentHashMap or an explicit lock." },
    ],
  },
  {
    id: "concurrenthashmap",
    chapterId: "collections",
    title: "ConcurrentHashMap",
    blurb: "The concurrent map. Java 8 uses CAS + bin locking, not the old segment table. No nulls. Iterators are weakly consistent.",
    keywords: ["CAS", "bin lock", "no null", "computeIfAbsent"],
    source: "ultimate",
    level: "deep",
    blocks: [
      { kind: "idea", text: "CHM is built for many threads. Reads are highly concurrent. Writes lock at bin granularity (and use CAS for uncontended inserts). Java 7 segments are exam trivia, not how modern CHM works." },
      { kind: "why", text: "You need a shared map without locking the entire table. computeIfAbsent, compute, merge are the atomic 'do this if absent' tools — they close the check-then-act race you get with get + put." },
      { kind: "trap", text: "No null keys or values — null would be ambiguous under concurrency (missing vs present-null). Iterators do not throw CME just because another thread writes; they may show some updates and miss others. That is weakly consistent, not 'fail-safe'." },
    ],
  },
  {
    id: "hashtable-hashset",
    chapterId: "collections",
    title: "Hashtable, HashSet, LinkedHashMap, TreeMap",
    blurb: "Hashtable is the synchronized relic. HashSet is a HashMap with dummy values. Know order vs sort vs sync.",
    keywords: ["Hashtable", "HashSet", "LinkedHashMap", "TreeMap"],
    source: "cheatcode",
    level: "core",
    blocks: [
      {
        kind: "table",
        headers: ["Hashtable", "HashMap"],
        rows: [
          ["Synchronized, whole table", "Not synchronized"],
          ["No null key or value", "One null key, many null values"],
          ["Legacy", "Default map"],
        ],
      },
      { kind: "bullets", items: ["HashSet stores keys of a HashMap. Uniqueness is equals/hashCode.", "LinkedHashSet / LinkedHashMap keep insertion order.", "TreeMap / TreeSet keep sorted order via Comparable/Comparator. Keys must be mutually comparable and consistent with equals if you also use them in hash structures.", "IdentityHashMap uses ==. EnumMap is an array indexed by ordinal — use it for enum keys."] },
    ],
  },
  {
    id: "fail-fast",
    chapterId: "collections",
    title: "Fail-fast vs snapshot vs weakly consistent",
    blurb: "'Fail-safe' is interview slang, not a JDK contract. Say the real words.",
    keywords: ["ConcurrentModificationException", "modCount", "snapshot", "weakly consistent"],
    source: "merged",
    level: "trap",
    blocks: [
      {
        kind: "table",
        headers: ["Style", "Behaviour", "Examples"],
        rows: [
          ["Fail-fast", "modCount changes → CME", "ArrayList, HashMap iterators"],
          ["Snapshot", "Iterator reads a frozen copy; later writes invisible", "CopyOnWriteArrayList"],
          ["Weakly consistent", "No CME; may see some concurrent writes", "ConcurrentHashMap"],
        ],
      },
      { kind: "trap", text: "CopyOnWriteArrayList is great for rare writes / many reads (listener lists). Each write copies the array — do not use it as a general List." },
    ],
  },
  {
    id: "queues",
    chapterId: "collections",
    title: "Queue, Deque, Stack, BlockingQueue",
    blurb: "FIFO, double-ended, LIFO. BlockingQueue is the concurrency workhorse for producers and consumers.",
    keywords: ["FIFO", "LIFO", "ArrayDeque", "BlockingQueue"],
    source: "merged",
    level: "core",
    blocks: [
      { kind: "bullets", items: ["Queue — FIFO. Offer/poll vs add/remove (exceptions).", "Deque — both ends. ArrayDeque is the default.", "Stack — LIFO. Prefer Deque over java.util.Stack (which extends Vector).", "PriorityQueue — heap, not FIFO. Ordering via Comparator. Not thread-safe.", "BlockingQueue — put/take can wait. ArrayBlockingQueue, LinkedBlockingQueue, DelayQueue, SynchronousQueue."] },
      { kind: "project", text: "A worker pool: producers put jobs on a LinkedBlockingQueue, consumers take. Bounded queues + a rejection policy beat an unbounded queue that OOMs." },
    ],
  },
];
