import type { Drill } from "./types";

export const drills: Drill[] = [
  {
    id: "stream-filter-map",
    title: "Names of employees earning 50_000",
    prompt: "From a list of employees, print names whose salary is exactly 50000.",
    hint: "filter then map then collect. Compare with equals on a number carefully — salary is better as BigDecimal in real code.",
    code: `List<String> names = employees.stream()
    .filter(e -> e.getSalary() == 50_000)
    .map(Employee::getName)
    .collect(Collectors.toList());
names.forEach(System.out::println);`,
  },
  {
    id: "fifth-max",
    title: "5th highest salary",
    prompt: "Print the employee with the 5th maximum salary. This is a classic interview question.",
    hint: "Sort descending, skip 4, findFirst. The original cheat sheet used skip(1) and called it 5th — that is 2nd. Also handle ties if the interviewer cares (distinct salaries vs 5th row).",
    code: `Optional<Employee> fifth = employees.stream()
    .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
    .skip(4)
    .findFirst();
fifth.ifPresent(e -> System.out.println("5th max: " + e));

// Distinct salary ranks:
Optional<Double> fifthSalary = employees.stream()
    .map(Employee::getSalary)
    .distinct()
    .sorted(Comparator.reverseOrder())
    .skip(4)
    .findFirst();`,
    note: "Always ask: ties? 5th row or 5th distinct salary?",
  },
  {
    id: "max-min-salary",
    title: "Max and min salary",
    prompt: "From a collection of engineers, print max and min salary holders.",
    hint: "Stream.max / min with Comparator.comparing.",
    code: `Optional<Employee> max = employees.stream()
    .max(Comparator.comparing(Employee::getSalary));
Optional<Employee> min = employees.stream()
    .min(Comparator.comparing(Employee::getSalary));`,
  },
  {
    id: "count-by-dept",
    title: "Headcount by department",
    prompt: "Print how many employees work in each department.",
    hint: "groupingBy + counting.",
    code: `Map<String, Long> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDept, Collectors.counting()));
byDept.forEach((k, v) -> System.out.println(k + " " + v));`,
  },
  {
    id: "avg-age-country",
    title: "Average age by country",
    prompt: "Group users by country, then average age per country.",
    hint: "groupingBy + averagingDouble in one collect, or groupingBy then a second pass.",
    code: `Map<String, Double> avg = users.stream()
    .collect(Collectors.groupingBy(
        User::getCountry,
        Collectors.averagingDouble(User::getAge)));
avg.forEach((country, age) -> System.out.println(country + ": " + age));`,
  },
  {
    id: "longest-word",
    title: "Longest word",
    prompt: "From a list of strings, print the longest. Ties: max is the first maximum in encounter order for this comparator.",
    hint: "max(Comparator.comparingInt(String::length)).",
    code: `String longest = words.stream()
    .max(Comparator.comparingInt(String::length))
    .orElse("");`,
  },
  {
    id: "most-common-word",
    title: "Most common word, ignore case",
    prompt: "Find the mode of a list of words, case-insensitive.",
    hint: "groupingBy toLowerCase + counting, then max on the entry set.",
    code: `String mode = words.stream()
    .collect(Collectors.groupingBy(String::toLowerCase, Collectors.counting()))
    .entrySet().stream()
    .max(Map.Entry.comparingByValue())
    .map(Map.Entry::getKey)
    .orElse("");`,
  },
  {
    id: "sql-dept-avg",
    title: "Average salary per department",
    prompt: "SQL equivalent of the grouping collector.",
    hint: "GROUP BY.",
    code: `SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;`,
  },
  {
    id: "sql-top-n",
    title: "Top 5 salaries",
    prompt: "Highest 5 paid employees.",
    hint: "ORDER BY salary DESC LIMIT 5. In SQL Server use TOP or FETCH.",
    code: `SELECT * FROM employees
ORDER BY salary DESC
LIMIT 5;`,
  },
  {
    id: "sql-window",
    title: "Rank inside a department",
    prompt: "Assign a salary rank per department.",
    hint: "ROW_NUMBER vs RANK vs DENSE_RANK — know the tie behaviour.",
    code: `SELECT employee_id, name, salary, department,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM employees;`,
  },
  {
    id: "sql-exists",
    title: "Customers who ordered",
    prompt: "Customers with at least one order — EXISTS often beats a DISTINCT JOIN.",
    hint: "Correlated EXISTS.",
    code: `SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);`,
  },
];
