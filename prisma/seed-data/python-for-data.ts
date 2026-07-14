import type { CourseContentSeed } from "./types";

const content: CourseContentSeed = {
  courseSlug: "python-for-data",
  courseTitle: "Python for Data Analysis",
  courseDescription:
    "A complete, hands-on path from core Python data structures to real-world exploratory data analysis with pandas — covering data cleaning, grouping, merging, reshaping, time series, and visualization.",
  modules: [
    {
      title: "Python Foundations for Data Analysis",
      lessons: [
        {
          slug: "jupyter-notebook-workflow",
          title: "The Jupyter Notebook Workflow for Data Analysis",
          estimatedMinutes: 8,
          content: `# The Jupyter Notebook Workflow for Data Analysis

Most real-world Python data analysis doesn't happen in a single script run start-to-finish — it happens in a **Jupyter notebook**, an interactive environment where you run one small chunk of code at a time and see its output immediately. Before writing a single line of pandas, it's worth understanding why this workflow dominates data analysis and how to use it well.

## Cells: code and markdown

A notebook is a sequence of **cells**. A code cell runs Python and shows its output directly beneath it; a markdown cell holds formatted text — headings, bullet points, explanations — interleaved with your code.

\`\`\`python
# A code cell
import pandas as pd
df = pd.read_csv("sales.csv")
df.head()
\`\`\`

Running that cell (Shift+Enter) immediately displays the first five rows as a rendered table, right there in the notebook — no \`print()\` needed for the last expression in a cell.

## Why notebooks fit exploratory analysis

Exploration is inherently iterative: load some data, look at it, form a hypothesis, test it, discover something odd, go back and re-check an earlier step. A notebook lets you keep the loaded DataFrame in memory across many small runs, instead of re-running an entire script from scratch every time you want to check one more thing.

\`\`\`python
df.shape          # run this alone, see the answer, decide what to check next
df["amount"].describe()   # then this, informed by what you just saw
\`\`\`

## Useful IPython "magic" commands

Jupyter is built on IPython, which adds special commands (prefixed with \`%\`) that plain Python scripts don't have.

\`\`\`python
%timeit df["amount"].sum()      # benchmark how long a line takes to run
%matplotlib inline              # show matplotlib charts directly in the notebook
%who                            # list variables currently defined in this session
\`\`\`

\`%timeit\` in particular is worth knowing early — you'll reach for it constantly once performance and vectorization become a concern later in this course.

## Cell execution order is not the same as top-to-bottom order

Because you can re-run any individual cell at any time and in any order, the notebook's *visible* order and its *execution* order can drift apart — a cell near the top might actually hold a value computed by a cell you ran later. This is a famous source of "it works on my machine but not when I restart" bugs.

## Mental model

Treat a notebook as a lab notebook, not a finished program: it's where you think out loud, in code, one small step at a time. Once your analysis has stabilized, the reusable parts (a cleaning function, a plotting helper) belong in a plain \`.py\` file you import from, while the notebook stays focused on the specific investigation at hand.

## Common mistake

Before trusting a notebook's results — and always before sharing it with someone else — use "Restart Kernel and Run All" to execute every cell in a fresh session, top to bottom. If anything breaks or produces a different answer than what you saw while developing it, some earlier cell was run out of order, and the notebook was quietly depending on state that a fresh read-through won't have.`,
        },
        {
          slug: "python-data-structures-for-data-work",
          title: "Lists, Tuples, and Dictionaries for Data Work",
          estimatedMinutes: 9,
          content: `# Lists, Tuples, and Dictionaries for Data Work

Before you touch a single dataset, it pays to be fluent in the three built-in Python containers that quietly underpin almost everything pandas does: **lists**, **tuples**, and **dictionaries**. A DataFrame is, conceptually, a dictionary of columns where each column is a list-like sequence of values. Understanding the containers first makes the pandas layer far less mysterious.

## Lists: ordered and mutable

A \`list\` holds an ordered, changeable sequence of values. Lists are the natural way to represent a single column of data, or a single row, before it becomes part of a bigger structure.

\`\`\`python
scores = [92, 88, 95, 71]
scores.append(84)
scores[0] = 90          # lists are mutable — you can change items in place
print(scores)           # [90, 88, 95, 71, 84]
print(sum(scores) / len(scores))  # a quick manual "mean"
\`\`\`

## Tuples: ordered and immutable

A \`tuple\` looks similar but cannot be modified after creation. That immutability makes tuples a good fit for things that represent a fixed record, like a single row of coordinates or a (name, value) pair.

\`\`\`python
point = (40.7128, -74.0060)   # latitude, longitude — this shouldn't change
name, score = ("Ada", 92)     # tuple unpacking
\`\`\`

## Dictionaries: labeled data

A \`dict\` maps keys to values. This is the closest built-in structure to a single "record" — and it's exactly the shape pandas expects when you build a DataFrame from Python data.

\`\`\`python
student = {"name": "Ada", "score": 92, "passed": True}
print(student["score"])          # 92
student["score"] = 95            # update a value
student["attempts"] = 2          # add a new key

# A list of dicts is a very common way to represent a small dataset —
# each dict is one row, and the keys become column names.
roster = [
    {"name": "Ada", "score": 92},
    {"name": "Grace", "score": 88},
    {"name": "Alan", "score": 95},
]
\`\`\`

That \`roster\` variable is not a coincidence — in the next module you'll hand a structure exactly like this to \`pd.DataFrame()\` and watch it become a real table.

## Mental model

Think of it this way: a **list** is a column, a **dict** is a row (or a lookup table), and a **list of dicts** is a whole dataset before it has been organized into rows and columns. pandas' job is to take that raw, loosely-structured Python data and give it an index, column labels, and fast vectorized operations.

## Common mistake

A frequent bug is trying to mutate a tuple, e.g. \`point[0] = 41.0\`, which raises \`TypeError: 'tuple' object does not support item assignment\`. If you find yourself needing to change a "tuple" after creation, it should probably have been a list or a dict in the first place.`,
        },
        {
          slug: "loops-comprehensions-functions",
          title: "Loops, Comprehensions, and Functions Refresher",
          estimatedMinutes: 10,
          content: `# Loops, Comprehensions, and Functions Refresher

Data analysis code is full of "do this to every item" logic. Python gives you a spectrum of tools for that, from explicit \`for\` loops to compact **comprehensions**. Knowing when to reach for each one will make the pandas code you write later much easier to read.

## The classic for loop

\`\`\`python
scores = [92, 88, 95, 71, 84]
passed = []
for s in scores:
    if s >= 80:
        passed.append(s)
print(passed)   # [92, 88, 95, 84]
\`\`\`

This works, but it takes four lines to express a simple filter. Python's list comprehension expresses the same idea in one readable line.

## List comprehensions

\`\`\`python
passed = [s for s in scores if s >= 80]
squared = [s ** 2 for s in scores]
labels = ["pass" if s >= 80 else "fail" for s in scores]
\`\`\`

The pattern is always \`[expression for item in iterable if condition]\`. Once this reads naturally, pandas' vectorized equivalents (like boolean filtering, covered in Module 4) will feel like a natural extension rather than new syntax to memorize.

## Dictionary comprehensions

The same idea works for dictionaries — useful for building lookup tables from two related lists.

\`\`\`python
names = ["Ada", "Grace", "Alan"]
scores = [92, 88, 95]
score_by_name = {name: score for name, score in zip(names, scores)}
# {"Ada": 92, "Grace": 88, "Alan": 95}
\`\`\`

## Functions: packaging up logic

Any transformation you plan to reuse — across columns, across files, across projects — belongs in a function.

\`\`\`python
def grade_letter(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    return "F"

letters = [grade_letter(s) for s in scores]
\`\`\`

Later, you'll pass functions exactly like \`grade_letter\` straight into pandas methods such as \`.apply()\` and \`.map()\` — pandas doesn't require special syntax, just a plain Python function that takes one value and returns one value.

## Try it yourself

Write a function \`is_outlier(value, mean, std)\` that returns \`True\` if a value is more than 2 standard deviations from the mean. Then use a list comprehension to build a list of booleans flagging outliers in \`[10, 12, 11, 90, 13, 9]\`. This exact pattern — a small predicate function plus a comprehension (or later, a vectorized pandas condition) — shows up constantly in real data cleaning work.`,
        },
        {
          slug: "numpy-arrays-foundation",
          title: "NumPy Arrays: The Foundation of pandas",
          estimatedMinutes: 10,
          content: `# NumPy Arrays: The Foundation of pandas

Every pandas Series and every column of a DataFrame is backed by a **NumPy array** under the hood. Before diving into pandas itself, it's worth seeing why NumPy exists and what it gives you that plain Python lists don't: speed and vectorized operations.

## Creating arrays

\`\`\`python
import numpy as np

scores = np.array([92, 88, 95, 71, 84])
print(scores.dtype)   # int64 — every element shares one data type
print(scores.shape)   # (5,)
\`\`\`

Unlike a Python list, a NumPy array requires all elements to share a single data type (\`dtype\`). That constraint is exactly what allows NumPy — and by extension pandas — to store data compactly and operate on it quickly.

## Vectorized operations

With a plain list, adding 5 to every score requires a loop or a comprehension. With a NumPy array, you just write the math directly, and it applies element-wise automatically.

\`\`\`python
curved = scores + 5          # array([97, 93, 100, 76, 89])
passed = scores >= 80        # array([True, True, True, False, True])
average = scores.mean()      # 86.0
top = scores.max()           # 95
\`\`\`

This is called **vectorization**: the loop still happens, but it happens in fast, compiled C code instead of the Python interpreter. This is precisely why pandas operations on a whole column are dramatically faster than looping over rows in Python — pandas is delegating the heavy lifting to NumPy (or NumPy-like backends).

## Boolean masks

The \`passed\` array above is a **boolean mask** — an array of \`True\`/\`False\` values the same length as the original. You can use it to filter directly:

\`\`\`python
print(scores[passed])   # array([92, 88, 95, 84]) — only the passing scores
\`\`\`

This exact mechanic — build a boolean condition, then use it to select — is the foundation of filtering pandas DataFrames in Module 4, so it's worth being comfortable with it now in its simplest form.

## Mental model

Think of a NumPy array as "a list that got serious about performance and math." It gives up some flexibility (mixed types, easy insertion/removal) in exchange for speed and the ability to write math expressions that operate on entire collections at once, with no explicit loop in your own code. pandas builds directly on top of that trade-off — a DataFrame is essentially a labeled collection of NumPy arrays plus a lot of convenience on top.`,
        },
      ],
    },
    {
      title: "Getting Started with pandas",
      lessons: [
        {
          slug: "intro-to-pandas-series",
          title: "Intro to pandas Series",
          estimatedMinutes: 8,
          content: `# Intro to pandas Series

A **Series** is pandas' one-dimensional labeled array — think of it as a single column of data, but smarter than a plain list because every value comes with an explicit label called an **index**.

## Creating a Series

\`\`\`python
import pandas as pd

scores = pd.Series([92, 88, 95, 71], index=["Ada", "Grace", "Alan", "Rosa"])
print(scores)
\`\`\`

\`\`\`
Ada      92
Grace    88
Alan     95
Rosa     71
dtype: int64
\`\`\`

If you don't supply an index, pandas assigns a default positional one: \`0, 1, 2, 3, ...\`. But a Series really shines once you give it meaningful labels, because you can then look values up by name instead of by position.

\`\`\`python
print(scores["Alan"])        # 95
print(scores[["Ada", "Rosa"]])  # a Series with just those two rows
\`\`\`

## Series behave like both a dict and a NumPy array

You can index into a Series by label like a dictionary, and you can also perform vectorized math on it like a NumPy array — the two mental models blend seamlessly.

\`\`\`python
curved = scores + 5           # element-wise addition, labels preserved
passing = scores[scores >= 80]  # boolean filtering, exactly like NumPy
average = scores.mean()
\`\`\`

Notice that \`curved\` and \`passing\` keep the original index labels — pandas never loses track of which value belongs to which row, even after a transformation.

## Where Series fit in

You will rarely build a Series by hand in real analysis work. Instead, every single **column** of a DataFrame — the subject of the next lesson — is a Series. When you write \`df["score"]\`, what comes back is a Series with the DataFrame's row index attached. Understanding Series in isolation first makes DataFrame column operations far less confusing later.

## Common mistake

New users sometimes expect \`scores[0]\` to always mean "the first row." If the index is made of strings (like names) rather than integers, positional access like that can raise an error or behave unexpectedly in newer pandas versions. Use \`.iloc[0]\` when you specifically want "the first row by position," and plain label indexing (\`scores["Ada"]\`) when you want "the row labeled Ada." This distinction becomes even more important in Module 4.`,
        },
        {
          slug: "the-pandas-dataframe",
          title: "The pandas DataFrame",
          estimatedMinutes: 10,
          content: `# The pandas DataFrame

**pandas** is the standard Python library for working with tabular data — think spreadsheets, but programmable. The core object in pandas is the \`DataFrame\`: a table with labeled rows and columns, where every column is really a Series sharing the same index.

## Building a DataFrame

The most common way to build one from scratch is a dictionary of equal-length lists — exactly the "list of dicts" shape you saw in Module 1, or its column-oriented mirror image.

\`\`\`python
import pandas as pd

data = {
    "name": ["Ada", "Grace", "Alan"],
    "score": [92, 88, 95],
}
df = pd.DataFrame(data)
print(df)
\`\`\`

\`\`\`
    name  score
0    Ada     92
1  Grace     88
2   Alan     95
\`\`\`

Each column (\`name\`, \`score\`) is a Series. The leftmost, unlabeled column is the **index** — by default a range of integers starting at 0, though you can set any column as the index instead.

## Why it beats plain lists

With a DataFrame you can filter, sort, group, and aggregate with one-line expressions instead of writing manual loops.

\`\`\`python
df["passed"] = df["score"] >= 90       # add a new column from a condition
top_scorers = df[df["score"] >= 90]    # filter rows
df_sorted = df.sort_values("score", ascending=False)  # sort rows
average = df["score"].mean()           # aggregate a column
\`\`\`

None of that required a \`for\` loop — every operation applies to the whole column (or the whole table) at once, using the same vectorization principle you saw with NumPy arrays.

## Rows and columns both have labels

You can select a column with \`df["score"]\` (returns a Series) or a row with \`df.loc[0]\` (also returns a Series, but running across columns instead of down a column). Both directions are first-class citizens in pandas — this dual nature is what makes a DataFrame more powerful than a nested list.

## Mental model

Picture a DataFrame as a dictionary of columns glued together by a shared index. Operations you do "column-wise" (like \`df["score"] * 2\`) are usually fast and idiomatic. Operations you do "row-wise" by writing a Python loop are usually a sign you're fighting the library instead of working with it — there's almost always a vectorized alternative, which you'll build fluency with throughout this course.`,
        },
        {
          slug: "reading-data-from-csv",
          title: "Reading Data from CSV Files",
          estimatedMinutes: 9,
          content: `# Reading Data from CSV Files

Real analysis rarely starts by typing data into a dictionary — it starts by loading a file. CSV (comma-separated values) is the most common interchange format for tabular data, and pandas' \`read_csv\` is the single most-used function in the entire library.

## The basics

\`\`\`python
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.head())
\`\`\`

\`read_csv\` infers column names from the first row, infers a data type for each column by sniffing the values, and gives you back a fully-formed DataFrame in one call.

## Common parameters you'll actually use

\`\`\`python
df = pd.read_csv(
    "sales.csv",
    sep=",",                 # delimiter — use "\\t" for tab-separated files
    header=0,                # row number to use as column names
    index_col="order_id",    # use an existing column as the row index
    usecols=["order_id", "amount", "region"],  # only load these columns
    dtype={"region": "category"},              # force a specific dtype
    parse_dates=["order_date"],                # parse straight into datetimes
    na_values=["N/A", "unknown", "-"],         # extra strings to treat as missing
)
\`\`\`

Loading only the columns you need with \`usecols\`, and setting dtypes up front, both matter a lot once files get into the hundreds of thousands of rows — they reduce memory use and avoid a second cleanup pass later.

## Writing data back out

The mirror-image method is \`to_csv\`, used constantly to save intermediate or final results.

\`\`\`python
df.to_csv("cleaned_sales.csv", index=False)  # index=False avoids an extra unnamed column
\`\`\`

## Other formats, same pattern

Once you know \`read_csv\`, the rest of pandas' I/O functions feel familiar because they follow the same naming convention: \`read_excel\`, \`read_json\`, \`read_sql\`, \`read_parquet\`, each paired with a matching \`to_*\` method.

## Common mistake

Forgetting \`index=False\` when writing to CSV is one of the most common early mistakes — without it, pandas writes the DataFrame's index as an extra unnamed first column, which then shows up as an unwanted "Unnamed: 0" column the next time you read the file back in. Get in the habit of asking, every time you call \`to_csv\`, whether the index actually carries meaningful information worth saving.`,
        },
        {
          slug: "inspecting-exploring-dataframes",
          title: "Inspecting and Exploring a DataFrame",
          estimatedMinutes: 8,
          content: `# Inspecting and Exploring a DataFrame

The very first thing to do with any new dataset — before writing a single line of analysis — is to look at it. pandas gives you a small toolkit of methods for exactly this, and using them habitually will save you from building analysis on top of data you misunderstood.

## The essential five

\`\`\`python
import pandas as pd

df = pd.read_csv("sales.csv")

df.head()      # first 5 rows — sanity-check the columns and values
df.tail(3)     # last 3 rows — useful for spotting trailing junk rows
df.shape       # (n_rows, n_columns) — how big is this dataset?
df.columns     # Index(['order_id', 'amount', 'region', ...])
df.dtypes      # the inferred data type of every column
\`\`\`

## Summarizing structure with info()

\`\`\`python
df.info()
\`\`\`

\`\`\`
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5000 entries, 0 to 4999
Data columns (total 4 columns):
 #   Column       Non-Null Count  Dtype
---  ------       --------------  -----
 0   order_id     5000 non-null   int64
 1   amount       4988 non-null   float64
 2   region       5000 non-null   object
 3   order_date   5000 non-null   object
dtypes: float64(1), int64(1), object(2)
\`\`\`

That "Non-Null Count" column is often the first sign of a data quality issue — here, \`amount\` has 12 missing values that will need attention in Module 5. Also note \`order_date\` shows as \`object\` (plain text) rather than a real datetime — a very common thing to fix right after loading.

## Summarizing numbers with describe()

\`\`\`python
df.describe()
\`\`\`

This produces count, mean, standard deviation, min, max, and quartiles for every numeric column in one call — a fast way to spot implausible values (a negative \`amount\`, an \`age\` of 300) before they contaminate downstream analysis.

## Try it yourself

Load any CSV you have on hand (or reuse \`sales.csv\` above) and answer three questions using only \`.shape\`, \`.dtypes\`, and \`.describe()\`: How many rows and columns are there? Which columns are numeric versus text? Is there any numeric column whose minimum or maximum looks obviously wrong? Building this "first five minutes" habit is one of the highest-leverage skills in this entire course.`,
        },
      ],
    },
    {
      title: "Getting Data from More Sources",
      lessons: [
        {
          slug: "reading-excel-files",
          title: "Reading and Writing Excel Files",
          estimatedMinutes: 8,
          content: `# Reading and Writing Excel Files

CSV is common, but an enormous amount of real-world business data still lives in Excel workbooks — often with multiple sheets, header rows that don't start at row 1, and formatting that needs to be handled deliberately. pandas' \`read_excel\` and \`to_excel\` extend the same mental model you already know from \`read_csv\`.

## Reading a single sheet

\`\`\`python
import pandas as pd

df = pd.read_excel("quarterly_sales.xlsx", sheet_name="Q1")
df.head()
\`\`\`

Just like \`read_csv\`, \`read_excel\` accepts \`usecols\`, \`dtype\`, \`parse_dates\`, and \`na_values\` — the file format changes, but the cleanup vocabulary you already learned carries over directly.

## Reading multiple sheets at once

\`\`\`python
sheets = pd.read_excel("quarterly_sales.xlsx", sheet_name=None)   # sheet_name=None reads every sheet
print(sheets.keys())              # dict_keys(['Q1', 'Q2', 'Q3', 'Q4'])
q2 = sheets["Q2"]                 # each value is its own DataFrame
\`\`\`

Passing \`sheet_name=None\` returns a dictionary mapping sheet names to DataFrames — a convenient pattern when you need to combine several sheets with \`pd.concat(sheets.values(), keys=sheets.keys())\` from Module 9.

## Skipping header rows and picking a range

Real spreadsheets frequently have a title or logo above the actual header row.

\`\`\`python
df = pd.read_excel("report.xlsx", sheet_name="Summary", skiprows=3, usecols="B:F")
\`\`\`

\`skiprows\` skips leading rows before the header, and \`usecols\` accepts spreadsheet-style column letters in addition to column names or positions.

## Writing to Excel

\`\`\`python
df.to_excel("cleaned_report.xlsx", sheet_name="Cleaned", index=False)

with pd.ExcelWriter("full_report.xlsx") as writer:
    q1.to_excel(writer, sheet_name="Q1", index=False)
    q2.to_excel(writer, sheet_name="Q2", index=False)
\`\`\`

\`pd.ExcelWriter\` is the tool for writing several DataFrames to separate sheets of the *same* workbook — calling \`.to_excel()\` on each DataFrame independently would otherwise overwrite the file each time.

## Common mistake

Reading an Excel file requires an engine library installed (\`openpyxl\` for modern \`.xlsx\` files), and a missing engine produces an \`ImportError\` that can look unrelated to Excel at first glance. If \`read_excel\` fails immediately with an import error, check that \`openpyxl\` is installed before assuming anything is wrong with the file itself or your pandas code.`,
        },
        {
          slug: "json-data-and-apis",
          title: "Working with JSON Data and REST APIs",
          estimatedMinutes: 9,
          content: `# Working with JSON Data and REST APIs

A huge share of the data an analyst pulls in today doesn't arrive as a tidy CSV — it comes from a web API as **JSON** (JavaScript Object Notation), a nested, dictionary-and-list based text format. Getting comfortable turning JSON into a flat DataFrame is an essential, practical skill.

## Reading JSON directly

\`\`\`python
import pandas as pd

df = pd.read_json("orders.json")
df.head()
\`\`\`

\`pd.read_json\` works well when the file is already a flat list of records — but real API responses are frequently nested, and that's where \`read_json\` alone isn't enough.

## Fetching data from an API

The \`requests\` library is the standard way to call a REST API from Python; the response body is usually JSON, decoded into native Python dicts and lists.

\`\`\`python
import requests
import pandas as pd

response = requests.get("https://api.example.com/orders", params={"limit": 100})
response.raise_for_status()     # raise an exception on a non-2xx status code
data = response.json()          # a list of dicts, or a dict wrapping a list

df = pd.DataFrame(data)
\`\`\`

\`raise_for_status()\` is worth calling by habit — without it, a failed request (bad URL, expired API key, rate limit) can silently hand you an error message disguised as data, rather than stopping your script where the problem actually occurred.

## Flattening nested JSON

API responses often nest one record's details inside another, e.g. a \`customer\` dict inside each order. \`pd.json_normalize\` flattens that into ordinary flat columns.

\`\`\`python
raw = [
    {"order_id": 1, "amount": 50, "customer": {"name": "Ada", "region": "West"}},
    {"order_id": 2, "amount": 30, "customer": {"name": "Grace", "region": "East"}},
]
df = pd.json_normalize(raw)
print(df.columns)
# Index(['order_id', 'amount', 'customer.name', 'customer.region'], dtype='object')
\`\`\`

Nested keys are flattened into dotted column names (\`customer.name\`, \`customer.region\`) automatically — exactly the shape a DataFrame needs, without writing manual loops to dig into each dict.

## Writing JSON back out

\`\`\`python
df.to_json("cleaned_orders.json", orient="records", indent=2)
\`\`\`

\`orient="records"\` produces the same "list of flat dicts" shape most APIs expect as input, which makes it the most broadly compatible choice when the JSON needs to be consumed by another system.

## Common mistake

Passing a deeply nested API response straight to \`pd.DataFrame()\` instead of \`pd.json_normalize()\` often "works" without an error, but leaves entire nested dicts sitting inside a single object-dtype column instead of becoming real columns of their own — a mistake that's easy to miss until you try to filter or aggregate on a field that's technically there, just buried a level too deep. When a column's values look like \`{...}\` in \`.head()\` output, that's the signal to reach for \`json_normalize\`.`,
        },
        {
          slug: "querying-sql-databases",
          title: "Querying SQL Databases with pandas",
          estimatedMinutes: 9,
          content: `# Querying SQL Databases with pandas

Much of the data analysts work with every day doesn't start as a file at all — it lives in a relational database. pandas' \`read_sql\` lets you run a SQL query and get the results back as a DataFrame directly, without a separate step to export to CSV first.

## Connecting and reading

\`\`\`python
import pandas as pd
import sqlite3

conn = sqlite3.connect("shop.db")   # a local SQLite file, used here for a runnable example
df = pd.read_sql("SELECT * FROM orders WHERE amount > 20", conn)
conn.close()
\`\`\`

For production databases (PostgreSQL, MySQL, SQL Server), the connection object usually comes from **SQLAlchemy** instead of a format-specific library like \`sqlite3\`, but the \`pd.read_sql(query, connection)\` call itself looks identical either way.

\`\`\`python
from sqlalchemy import create_engine

engine = create_engine("postgresql://user:password@localhost:5432/shop")
df = pd.read_sql("SELECT * FROM orders", engine)
\`\`\`

## Pushing filtering work to the database

A common beginner habit is to \`SELECT *\` and then filter with pandas afterward. For any dataset larger than "comfortably fits in memory," it's far more efficient to let the database do the filtering, sorting, and even aggregation, and only pull back the rows you actually need.

\`\`\`python
query = """
    SELECT region, SUM(amount) AS total_amount
    FROM orders
    WHERE order_date >= '2026-01-01'
    GROUP BY region
"""
by_region = pd.read_sql(query, engine)
\`\`\`

## Parameterized queries

Never build a query string with plain Python string formatting when a value comes from user input or another variable — pass parameters separately so the database driver escapes them safely.

\`\`\`python
customer_id = 42
df = pd.read_sql(
    "SELECT * FROM orders WHERE customer_id = %(cid)s",
    engine,
    params={"cid": customer_id},
)
\`\`\`

## Writing a DataFrame back to a table

\`\`\`python
df.to_sql("cleaned_orders", engine, if_exists="replace", index=False)
\`\`\`

\`if_exists\` controls what happens if the table already exists: \`"replace"\` drops and recreates it, \`"append"\` adds new rows, and \`"fail"\` (the default) raises an error rather than risk overwriting something by accident.

## Common mistake

Building SQL query strings with an f-string or \`.format()\` using a raw user-supplied value (e.g. \`f"...WHERE name = '{name}'"\`) is a classic SQL-injection risk, and it also breaks silently on values containing a stray apostrophe. Always use the \`params=\` argument shown above instead of manually interpolating values into the query text.`,
        },
        {
          slug: "web-scraping-basics",
          title: "Web Scraping Basics for Data Collection",
          estimatedMinutes: 8,
          content: `# Web Scraping Basics for Data Collection

Sometimes the data you need has no API and no downloadable file — it only exists rendered on a web page. **Web scraping** is the practice of programmatically extracting that data, and pandas has a surprisingly capable built-in tool for the simplest case: HTML tables.

## The easy case: read_html for tables already on the page

\`\`\`python
import pandas as pd

tables = pd.read_html("https://example.com/rankings")   # returns a LIST of DataFrames
print(len(tables))
rankings = tables[0]     # pick out the one you actually want
\`\`\`

\`pd.read_html\` scans a page for every \`<table>\` element and returns each one as a separate DataFrame in a list — extremely convenient when the data you want is already in a plain HTML table, with no scripting or interaction required to reveal it.

## When there's no plain HTML table: requests + BeautifulSoup

For data that isn't already sitting in a \`<table>\` tag, the standard combination is \`requests\` to fetch the raw page and \`BeautifulSoup\` to parse and search it.

\`\`\`python
import requests
from bs4 import BeautifulSoup
import pandas as pd

response = requests.get("https://example.com/products")
response.raise_for_status()
soup = BeautifulSoup(response.text, "html.parser")

rows = []
for card in soup.select(".product-card"):
    rows.append({
        "name": card.select_one(".product-name").get_text(strip=True),
        "price": card.select_one(".price").get_text(strip=True),
    })

df = pd.DataFrame(rows)
\`\`\`

The pattern is always the same: find the repeating element that represents "one row" (here, \`.product-card\`), pull the specific pieces of text out of it, and collect the results into the list-of-dicts shape from Module 1 — which then becomes a DataFrame in one call, exactly as before.

## Being a responsible scraper

Before scraping any site, check its \`robots.txt\` file and terms of service, add a delay between requests so you don't hammer the server, and prefer an official API if one exists — it's almost always more stable and more explicitly permitted than scraping the rendered page.

\`\`\`python
import time

for url in urls:
    response = requests.get(url)
    # ... process response ...
    time.sleep(1)   # be polite: pace requests instead of firing them all at once
\`\`\`

## Mental model

Reach for \`pd.read_html\` first — it solves a large fraction of real scraping needs in one line with zero HTML knowledge required. Reach for \`requests\` + \`BeautifulSoup\` only when the data isn't already in a table element, and treat scraped data with extra skepticism: verify a handful of rows against the live page before trusting the result, since a site's layout changing can silently break a scraper without raising any error at all.

## Common mistake

Scraping the same page repeatedly while developing a scraper — every time you re-run the script — can get your IP rate-limited or blocked, and it's needlessly hard on the site's servers. Save the raw fetched HTML to a local file during development, and iterate on your parsing logic against that saved copy instead of re-fetching from the network every single run.`,
        },
      ],
    },
    {
      title: "Indexing, Selection, and Filtering",
      lessons: [
        {
          slug: "selecting-with-loc-iloc",
          title: "Selecting Rows and Columns with loc and iloc",
          estimatedMinutes: 10,
          content: `# Selecting Rows and Columns with loc and iloc

pandas gives you two complementary tools for pulling out exactly the rows and columns you want: \`.loc\` for **label-based** selection, and \`.iloc\` for **position-based** selection. Mixing them up is one of the most common sources of confusion for people new to pandas, so it's worth building a precise mental model early.

## .loc: select by label

\`\`\`python
import pandas as pd

df = pd.DataFrame(
    {"name": ["Ada", "Grace", "Alan", "Rosa"], "score": [92, 88, 95, 71]},
    index=["s1", "s2", "s3", "s4"],
)

df.loc["s1"]                     # the row labeled "s1" (returns a Series)
df.loc["s1", "score"]            # 92 — a single value by row label + column name
df.loc[["s1", "s3"], "score"]    # scores for s1 and s3 only
df.loc[:, "name"]                # every row, just the "name" column
\`\`\`

\`.loc\` always uses the labels you see in the index and column headers — whatever they are, strings, dates, or integers.

## .iloc: select by position

\`\`\`python
df.iloc[0]           # the first row, regardless of what its label is
df.iloc[0, 1]         # row 0, column 1 ("score") by pure position
df.iloc[0:2]          # the first two rows (position-based slicing)
df.iloc[:, 0]         # every row, the first column
\`\`\`

\`.iloc\` never looks at labels at all — it counts positions starting from zero, exactly like indexing into a plain Python list.

## Selecting columns without .loc

For the common case of grabbing one or more whole columns, plain bracket syntax is idiomatic and used constantly:

\`\`\`python
df["score"]              # a single column as a Series
df[["name", "score"]]    # multiple columns as a DataFrame
\`\`\`

## Mental model

Read \`.loc\` as "look this up by name" and \`.iloc\` as "look this up by index number." If your DataFrame's index happens to be plain integers 0, 1, 2, ..., the two can look confusingly similar — but the moment you set a meaningful index (like an order ID or a date), the difference becomes obvious and \`.loc\` becomes indispensable.

## Common mistake

\`.loc\` slices are **inclusive of the end label** (\`df.loc["s1":"s3"]\` includes \`s3\`), while \`.iloc\` slices behave like standard Python slicing and **exclude the end position** (\`df.iloc[0:2]\` stops before position 2). This asymmetry trips up almost everyone at least once — when in doubt, print the result and check.`,
        },
        {
          slug: "boolean-filtering",
          title: "Boolean Filtering and Conditional Selection",
          estimatedMinutes: 10,
          content: `# Boolean Filtering and Conditional Selection

Filtering rows by a condition is probably the single most-used operation in day-to-day pandas work. It builds directly on the boolean masks you saw with NumPy arrays back in Module 1.

## The basic pattern

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan", "Rosa"],
    "score": [92, 88, 95, 71],
    "region": ["West", "East", "West", "East"],
})

mask = df["score"] >= 90     # a Series of True/False, one per row
print(mask)
top_scorers = df[mask]       # keep only rows where mask is True

# Written in one line, as it usually is in practice:
top_scorers = df[df["score"] >= 90]
\`\`\`

## Combining multiple conditions

Use \`&\` (and), \`|\` (or), and \`~\` (not) instead of Python's \`and\`/\`or\`/\`not\` — and always wrap each condition in parentheses, because of how Python evaluates operator precedence.

\`\`\`python
west_top = df[(df["region"] == "West") & (df["score"] >= 90)]
east_or_top = df[(df["region"] == "East") | (df["score"] >= 90)]
not_west = df[~(df["region"] == "West")]
\`\`\`

## Filtering with isin() and between()

For checking membership in a set of values, or a numeric range, dedicated methods read more cleanly than chained \`|\` conditions:

\`\`\`python
df[df["region"].isin(["West", "North"])]
df[df["score"].between(80, 95)]
\`\`\`

## Filtering with query()

For complex conditions, \`.query()\` lets you write a condition as a plain string, which some people find more readable:

\`\`\`python
df.query("region == 'West' and score >= 90")
\`\`\`

## Common mistake

Writing \`df[df["region"] == "West" & df["score"] >= 90]\` without parentheses around each comparison raises a confusing error, because \`&\` binds more tightly than \`==\` in Python. Always parenthesize each individual condition: \`(df["region"] == "West") & (df["score"] >= 90)\`. Also remember to use \`&\`/\`|\`, never the plain keywords \`and\`/\`or\`, when combining boolean Series — Python's keywords don't know how to evaluate element-wise across a whole column.`,
        },
        {
          slug: "sorting-and-ranking",
          title: "Sorting and Ranking Data",
          estimatedMinutes: 7,
          content: `# Sorting and Ranking Data

Once you can select and filter, the next natural step is ordering: which rows come first, and how do individual values compare to the rest of the column? pandas gives you \`sort_values\`, \`sort_index\`, and \`rank\` for exactly this.

## Sorting by column values

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan", "Rosa"],
    "score": [92, 88, 95, 71],
})

df.sort_values("score")                       # ascending by default
df.sort_values("score", ascending=False)      # highest score first
df.sort_values(["score", "name"], ascending=[False, True])  # multi-column sort
\`\`\`

Multi-column sorting is useful whenever ties need a tiebreaker — here, rows with equal scores would then be ordered alphabetically by name.

## Sorting by the index

\`\`\`python
df_by_score = df.sort_values("score")
df_by_score.sort_index()   # restore the original row order
\`\`\`

This is the standard way to "undo" a sort and get back to the original row order, since \`sort_index()\` orders rows by their index label rather than any column's values.

## Ranking values

\`.rank()\` assigns a rank to each value in a column without reordering the rows — useful when you want to keep the original row order but still know, say, each student's percentile position.

\`\`\`python
df["rank"] = df["score"].rank(ascending=False)   # 1 = highest score
df["pct_rank"] = df["score"].rank(pct=True)       # rank expressed as a 0–1 percentile
\`\`\`

By default, tied values get the average of the ranks they would have occupied — pass \`method="min"\`, \`"max"\`, \`"first"\`, or \`"dense"\` to \`rank()\` to change how ties are broken.

## Finding top and bottom rows directly

For the common "top N" or "bottom N" case, \`nlargest\` and \`nsmallest\` are more direct than sorting and slicing:

\`\`\`python
df.nlargest(2, "score")    # the 2 rows with the highest score
df.nsmallest(2, "score")   # the 2 rows with the lowest score
\`\`\`

## Common mistake

\`sort_values()\` returns a **new** DataFrame by default — it does not sort in place. Writing \`df.sort_values("score")\` on its own line and then continuing to use \`df\` is a frequent bug; you either need to assign the result back (\`df = df.sort_values("score")\`) or pass \`inplace=True\`.`,
        },
      ],
      quiz: {
        title: "Tier 1 Checkpoint: Python & pandas Basics",
        questions: [
          {
            text: "Which built-in Python container is immutable, making it a good fit for representing a fixed record that shouldn't change?",
            optionA: "list",
            optionB: "dict",
            optionC: "tuple",
            optionD: "set of lists",
            correctOption: "C",
          },
          {
            text: "What does the list comprehension `[s for s in scores if s >= 80]` produce?",
            optionA: "A single boolean indicating whether all scores are at least 80",
            optionB: "A new list containing only the scores that are 80 or higher",
            optionC: "The count of scores that are 80 or higher",
            optionD: "A dictionary mapping each score to True or False",
            correctOption: "B",
          },
          {
            text: "Why are NumPy array operations like `scores + 5` typically much faster than looping over a Python list to add 5 to each element?",
            optionA: "NumPy arrays store data in the cloud so computation happens on a remote server",
            optionB: "NumPy skips elements that are duplicates",
            optionC: "The operation is vectorized and runs in compiled code instead of the Python interpreter looping element by element",
            optionD: "NumPy arrays are always shorter than equivalent Python lists",
            correctOption: "C",
          },
          {
            text: "In pandas, what is a Series?",
            optionA: "A one-dimensional labeled array, similar to a single column of a table",
            optionB: "A two-dimensional table with labeled rows and columns",
            optionC: "A file format for storing tabular data",
            optionD: "A function used only for reading CSV files",
            correctOption: "A",
          },
          {
            text: "When you run `df['score']` on a DataFrame `df`, what type of object is returned?",
            optionA: "A plain Python list",
            optionB: "A pandas Series",
            optionC: "A NumPy matrix",
            optionD: "A new DataFrame with one column",
            correctOption: "B",
          },
          {
            text: "Which parameter of `pd.read_csv()` lets you parse a column directly into datetime values as the file is loaded?",
            optionA: "dtype",
            optionB: "usecols",
            optionC: "parse_dates",
            optionD: "na_values",
            correctOption: "C",
          },
          {
            text: "After loading a DataFrame, which method gives you the count of non-null values and the inferred dtype for every column in one call?",
            optionA: "df.describe()",
            optionB: "df.info()",
            optionC: "df.head()",
            optionD: "df.sort_values()",
            correctOption: "B",
          },
          {
            text: "What is the key difference between `.loc` and `.iloc` when selecting rows from a DataFrame?",
            optionA: "`.loc` selects by label, `.iloc` selects by integer position",
            optionB: "`.loc` only works on columns, `.iloc` only works on rows",
            optionC: "`.loc` is faster but less accurate than `.iloc`",
            optionD: "They are interchangeable in every situation",
            correctOption: "A",
          },
          {
            text: "Why does `df[df['region'] == 'West' & df['score'] >= 90]` raise an error in pandas?",
            optionA: "pandas does not support filtering with more than one condition",
            optionB: "`&` binds more tightly than `==`/`>=`, so each comparison needs its own parentheses",
            optionC: "The column names must be sorted alphabetically before filtering",
            optionD: "Boolean filtering requires `.loc` instead of plain brackets",
            correctOption: "B",
          },
          {
            text: "By default, does `df.sort_values('score')` sort the DataFrame in place or return a new sorted DataFrame?",
            optionA: "It sorts in place and returns None",
            optionB: "It returns a new sorted DataFrame, leaving the original unchanged unless you reassign it or pass inplace=True",
            optionC: "It raises an error unless inplace=True is passed",
            optionD: "It only works on the index, never on column values",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Data Cleaning Essentials",
      lessons: [
        {
          slug: "handling-missing-data",
          title: "Handling Missing Data",
          estimatedMinutes: 10,
          content: `# Handling Missing Data

Real-world datasets almost never arrive complete. pandas represents missing values with \`NaN\` (Not a Number) for numeric data, \`NaT\` (Not a Time) for datetimes, and \`None\` or \`pd.NA\` in some other contexts — and gives you a focused toolkit for finding, removing, or filling them in.

## Finding missing values

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan", "Rosa"],
    "score": [92, np.nan, 95, np.nan],
    "region": ["West", "East", None, "East"],
})

df.isna()                  # DataFrame of True/False, one per cell
df.isna().sum()            # count of missing values per column
df.isna().sum().sum()      # total missing values in the whole DataFrame
df[df["score"].isna()]     # just the rows where score is missing
\`\`\`

\`.notna()\` is the exact opposite of \`.isna()\`, and is handy for filtering to only the complete rows for a given column.

## Dropping missing data

\`\`\`python
df.dropna()                       # drop any row with at least one NaN
df.dropna(subset=["score"])       # drop rows only if "score" is missing
df.dropna(axis=1)                 # drop columns instead of rows
df.dropna(thresh=2)               # keep rows with at least 2 non-null values
\`\`\`

Dropping is simple, but it throws away data — sometimes an entire row is lost just because one column was blank. That's often not the right trade-off.

## Filling missing data

\`\`\`python
df["score"].fillna(0)                       # fill with a constant
df["score"].fillna(df["score"].mean())      # fill with the column mean
df["region"].fillna("Unknown")              # fill categorical/text data with a label
df["score"].ffill()                         # forward-fill from the previous row
df["score"].interpolate()                   # fill numerically between neighboring values
\`\`\`

Which strategy is "correct" depends entirely on context: filling a missing sensor reading with the previous value (\`ffill\`) makes sense for time series, while filling a missing survey score with the column mean might quietly bias your averages. There is no universally safe default — always ask why the value is missing before deciding how to handle it.

## Mental model

Treat missing data as information, not just an inconvenience to paper over. Before dropping or filling anything, run \`df.isna().sum()\` and ask: is this missing at random, or does its absence itself mean something (e.g., a survey question that was skipped because it didn't apply)? That answer should drive whether you drop, fill, or flag the missingness with its own indicator column.

## Common mistake

Calling \`df["score"].fillna(0)\` without reassigning it (\`df["score"] = df["score"].fillna(0)\`) doesn't change \`df\` at all — like \`sort_values\`, most pandas cleaning methods return a new object rather than modifying in place unless you pass \`inplace=True\` or reassign the result.`,
        },
        {
          slug: "finding-removing-duplicates",
          title: "Finding and Removing Duplicates",
          estimatedMinutes: 7,
          content: `# Finding and Removing Duplicates

Duplicate rows creep into datasets constantly — a form submitted twice, a join that unintentionally multiplied rows, or a log file that recorded the same event more than once. Left unnoticed, duplicates silently inflate counts and skew aggregates.

## Detecting duplicates

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "order_id": [1, 2, 2, 3, 4],
    "customer": ["Ada", "Grace", "Grace", "Alan", "Ada"],
    "amount": [50, 30, 30, 75, 50],
})

df.duplicated()               # boolean Series — True where a row repeats an earlier one
df.duplicated().sum()         # total count of duplicate rows
df[df.duplicated()]           # show just the duplicate rows
\`\`\`

By default, \`.duplicated()\` marks a row as a duplicate only if **every column** matches an earlier row exactly, and it keeps the *first* occurrence as not-a-duplicate.

## Checking duplicates on specific columns

Often you care about duplicates in terms of a business key, not every column.

\`\`\`python
df.duplicated(subset=["order_id"])                 # duplicate order IDs only
df.duplicated(subset=["customer"], keep=False)      # flag ALL occurrences, not just repeats
\`\`\`

\`keep=False\` is particularly useful during investigation — it shows you every row involved in a duplicate group, not just the second-and-later copies.

## Removing duplicates

\`\`\`python
df.drop_duplicates()                          # drop exact duplicate rows
df.drop_duplicates(subset=["order_id"])       # keep only the first row per order_id
df.drop_duplicates(subset=["order_id"], keep="last")  # keep the last row instead
\`\`\`

## Common mistake

Deduplicating on the wrong subset of columns is an easy trap. \`drop_duplicates(subset=["customer"])\` on the example above would keep only one row per customer — silently deleting Ada's second, legitimately distinct order. Always ask "what combination of columns uniquely identifies a real-world row here?" before choosing a subset, and lean toward checking with \`keep=False\` first so you can see what would be removed before you commit to it.`,
        },
        {
          slug: "data-type-conversion",
          title: "Data Type Conversion",
          estimatedMinutes: 8,
          content: `# Data Type Conversion

Data loaded from CSV files, APIs, or user input frequently ends up with the wrong dtype — numbers stored as text, dates stored as plain strings, categories stored as generic objects. Converting types correctly early on prevents subtle bugs (like "990" and "99.0" not comparing equal) later in your analysis.

## Checking current types

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "price": ["19.99", "25.50", "8.00"],
    "quantity": ["3", "1", "5"],
    "category": ["A", "B", "A"],
})
df.dtypes   # all three columns show up as "object" (generic Python strings)
\`\`\`

## Converting with astype()

\`\`\`python
df["price"] = df["price"].astype(float)
df["quantity"] = df["quantity"].astype(int)
df["category"] = df["category"].astype("category")   # memory-efficient for repeated labels
\`\`\`

\`astype("category")\` is worth calling out specifically: for a column with a small number of repeated string values (like region names or status codes), it can cut memory usage dramatically and speed up groupby operations, compared to storing the same string repeatedly as a generic object.

## Handling conversion errors gracefully

\`astype()\` fails loudly the moment it hits a value it can't convert. \`pd.to_numeric\` and \`pd.to_datetime\` offer an \`errors\` parameter that's often more practical for messy real-world data.

\`\`\`python
messy = pd.Series(["19.99", "25.50", "N/A", "8.00"])
pd.to_numeric(messy, errors="coerce")   # "N/A" becomes NaN instead of raising an error
\`\`\`

\`errors="coerce"\` turns anything unparseable into \`NaN\` (or \`NaT\` for dates) rather than crashing the whole conversion — letting you convert first, then use the missing-data techniques from the previous lesson to deal with the fallout.

## Verifying the result

\`\`\`python
df.dtypes                # confirm the new types took effect
df["price"].sum()        # now a real numeric sum, not string concatenation
\`\`\`

## Common mistake

A classic silent bug: forgetting to convert a numeric-looking column before summing it. \`"3" + "1"\` in Python produces the string \`"31"\`, not the number \`4\` — and pandas will happily sum an object-dtype column of number-like strings by concatenating them if you're not paying attention, or raise a confusing error if the values aren't uniformly numeric-looking. Always check \`df.dtypes\` right after loading data, before doing any arithmetic.`,
        },
        {
          slug: "working-with-categorical-data",
          title: "Working with Categorical Data",
          estimatedMinutes: 8,
          content: `# Working with Categorical Data

You met the \`category\` dtype briefly in the previous lesson as a memory optimization. It deserves its own lesson because categorical data isn't just about saving memory — it also lets you express something plain text can't: a fixed, sometimes *ordered*, set of possible values.

## Creating a categorical column

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "size": ["M", "S", "L", "M", "S"],
})
df["size"] = df["size"].astype("category")
df["size"].dtype   # CategoricalDtype(categories=['L', 'M', 'S'], ordered=False)
\`\`\`

By default, pandas infers the set of categories from the values present and treats them as **unordered** — useful for something like \`region\`, where "West" isn't greater or less than "East."

## Ordered categories

Some categorical data has a real, meaningful order — like a size or a satisfaction rating — and pandas lets you say so explicitly.

\`\`\`python
sizes = pd.Categorical(
    df["size"],
    categories=["S", "M", "L"],
    ordered=True,
)
df["size"] = sizes

df["size"] < "L"          # now a meaningful comparison, not just alphabetical
df.sort_values("size")    # sorts S, M, L — the logical order, not alphabetical L, M, S
\`\`\`

Without \`ordered=True\`, sorting or comparing a text column falls back to alphabetical order, which is wrong for something like sizes or survey ratings ("Low", "Medium", "High").

## The .cat accessor

Just as \`.str\` exposes string operations and \`.dt\` exposes datetime operations, \`.cat\` exposes categorical-specific operations.

\`\`\`python
df["size"].cat.categories             # Index(['S', 'M', 'L'], dtype='object')
df["size"].cat.codes                  # the underlying integer code for each row
df["size"] = df["size"].cat.add_categories(["XL"])   # add a category with no rows yet
df["size"] = df["size"].cat.remove_unused_categories()
\`\`\`

\`.cat.codes\` reveals what's happening under the hood: pandas stores each value as a small integer, plus one small lookup table of the category labels — the source of the memory savings you saw in the previous lesson.

## Why this matters for groupby and memory

\`\`\`python
df.groupby("size", observed=True)["size"].count()   # groupby is faster on category dtype
df["size"].memory_usage(deep=True)     # compare against the same column as plain object dtype
\`\`\`

For a column with many repeated values (regions, product categories, status codes) across millions of rows, converting to \`category\` can cut memory usage by an order of magnitude and noticeably speed up \`groupby\`, because pandas groups on the small integer codes instead of repeatedly comparing full strings.

## Common mistake

Passing \`observed=False\` (the historical default in older pandas versions) to \`groupby\` on a categorical column produces a row for **every** category, including ones with zero matching rows in your actual data — which can silently inflate a "number of groups" count or introduce unexpected \`NaN\`/zero rows into a downstream chart. Pass \`observed=True\` explicitly when you only want groups that actually appear in the data.`,
        },
        {
          slug: "cleaning-text-columns",
          title: "Cleaning Text Columns with the .str Accessor",
          estimatedMinutes: 8,
          content: `# Cleaning Text Columns with the .str Accessor

Text columns are notoriously messy — inconsistent capitalization, stray whitespace, and free-form entries that should really be a fixed set of categories. pandas exposes Python's string methods across an entire column at once through the \`.str\` accessor, so you never need to write a manual loop over rows.

## The .str accessor

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "region": [" West ", "east", "WEST", "North "],
})

df["region"].str.strip()          # remove leading/trailing whitespace
df["region"].str.lower()          # lowercase everything
df["region"].str.strip().str.lower()   # chain them together
\`\`\`

Because \`.str\` methods return a Series, you can chain them one after another exactly like the example above — a very common pattern for standardizing messy categorical text in one line.

## Common cleaning operations

\`\`\`python
clean = df["region"].str.strip().str.lower()

clean.str.contains("west")          # boolean mask — does the value contain "west"?
clean.str.replace("north", "N", regex=False)   # substring replacement
clean.str.startswith("w")           # boolean mask on prefix
clean.str.len()                     # length of each string
clean.str.split("-")                # split into lists, e.g. for "US-West" style codes
\`\`\`

## Standardizing categories with a mapping

Once text is cleaned, it's common to map many raw variants onto a small fixed set of categories.

\`\`\`python
mapping = {"west": "West", "east": "East", "north": "North", "south": "South"}
df["region_clean"] = df["region"].str.strip().str.lower().map(mapping)
\`\`\`

Any value not found in the mapping becomes \`NaN\` — which is useful, because it surfaces unexpected or misspelled categories as missing data you can investigate with the techniques from earlier in this module, rather than silently keeping a typo as its own category.

## Common mistake

Comparing or grouping by a text column before cleaning it is a frequent source of "duplicate" categories that are really the same value with different capitalization or whitespace — \`"West"\`, \`" west "\`, and \`"WEST"\` will all be treated as three distinct groups in a \`groupby\` unless you normalize them first. Always inspect \`df["column"].unique()\` on a text column before using it to filter or group, so inconsistencies like this are caught early.`,
        },
      ],
    },
    {
      title: "Text Data and Regular Expressions",
      lessons: [
        {
          slug: "regex-fundamentals-for-text-cleaning",
          title: "Regular Expressions Fundamentals for Data Cleaning",
          estimatedMinutes: 9,
          content: `# Regular Expressions Fundamentals for Data Cleaning

The \`.str\` methods from Module 5 (strip, lower, contains) handle a lot of text cleaning, but real messy data often needs pattern matching — finding "anything that looks like a phone number" or "a code that starts with three letters followed by digits." That's what **regular expressions** (regex) are for, and pandas' \`.str\` methods accept them directly.

## The building blocks

A regular expression is a tiny pattern language for describing shapes of text.

\`\`\`python
import re

pattern = r"\d{3}-\d{4}"        # exactly 3 digits, a hyphen, exactly 4 digits
re.search(pattern, "call 555-1234 now")   # a Match object, or None if no match
\`\`\`

A few symbols cover most everyday data-cleaning needs: \`\d\` (a digit), \`\w\` (a word character), \`\s\` (whitespace), \`+\` (one or more), \`*\` (zero or more), \`{n}\` (exactly n times), and \`.\` (any character). Prefixing the pattern string with \`r\` (a "raw string") avoids Python treating backslashes as escape characters.

## Using regex with pandas' .str methods

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "contact": ["Ada: 555-1234", "Grace: 555-9999", "no phone here"],
})

df["contact"].str.contains(r"\d{3}-\d{4}")        # boolean mask — does it contain a phone number?
df["contact"].str.replace(r"\d{3}-\d{4}", "[REDACTED]", regex=True)
\`\`\`

By default in recent pandas versions, \`str.contains\` and \`str.replace\` treat the pattern as a regular expression unless you pass \`regex=False\` — worth confirming explicitly in code you plan to keep, since a literal string containing regex special characters (like a period in a version number) can otherwise match more than you intended.

## Extracting parts of a match

The real power of regex for data cleaning is pulling a specific *piece* out of messy text, using parentheses to mark a "capture group."

\`\`\`python
codes = pd.Series(["ORD-2026-001", "ORD-2026-002", "INV-2025-014"])
codes.str.extract(r"(?P<type>[A-Z]+)-(?P<year>\d{4})-(?P<num>\d+)")
\`\`\`

\`\`\`
  type  year  num
0  ORD  2026  001
1  ORD  2026  002
2  INV  2025  014
\`\`\`

\`str.extract\` turns one messy text column into several clean, structured columns in a single call — named groups (\`(?P<name>...)\`) make the resulting column names self-documenting instead of a generic \`0\`, \`1\`, \`2\`.

## Mental model

Think of a regex as a template you're matching text *against*: literal characters must match exactly, while special symbols like \`\d\` and \`+\` describe "any digit" or "one or more of the previous thing." Building a regex is usually an iterative process — start simple, test it against a few real example strings, and tighten the pattern until it matches what you want and nothing else.

## Common mistake

An overly loose pattern silently matches more than intended — \`str.contains(r"\d+")\` matches *any* string with at least one digit anywhere in it, which is rarely what you actually meant if you were hoping to find "values that are entirely numeric." Anchor your pattern with \`^\` (start) and \`$\` (end) — e.g. \`r"^\d+$"\` — whenever you mean "the whole string," not just "somewhere in the string."`,
        },
        {
          slug: "advanced-str-methods-extract-findall",
          title: "More .str Methods: findall, split, and Cleanup Pipelines",
          estimatedMinutes: 8,
          content: `# More .str Methods: findall, split, and Cleanup Pipelines

Building on regex fundamentals, this lesson rounds out the \`.str\` toolkit with methods for pulling out *multiple* matches per value, splitting structured text into columns, and chaining several cleaning steps into one readable pipeline.

## findall: every match, not just the first

\`str.extract\` (previous lesson) captures the *first* match per value. When a single string can contain several matches — like multiple hashtags in a post — \`str.findall\` returns all of them as a list.

\`\`\`python
import pandas as pd

posts = pd.Series(["loving #python and #pandas", "just #python today", "no tags here"])
posts.str.findall(r"#(\w+)")
\`\`\`

\`\`\`
0    [python, pandas]
1             [python]
2                   []
dtype: object
\`\`\`

Each result is a Python list — a common next step is \`.explode()\` (turning each list element into its own row) if you want to count or group by individual tags rather than by the original post.

## split: turning delimited text into columns

\`\`\`python
codes = pd.Series(["US-West-001", "US-East-014", "CA-North-007"])
codes.str.split("-", expand=True)
\`\`\`

\`\`\`
    0      1    2
0  US   West  001
1  US   East  014
2  CA  North  007
\`\`\`

\`expand=True\` is the key argument here — without it, \`.str.split\` returns a Series of lists (like \`findall\` above); with it, you get a proper DataFrame you can immediately rename and attach as new columns.

\`\`\`python
parts = codes.str.split("-", expand=True)
parts.columns = ["country", "region", "code"]
\`\`\`

## Chaining into a cleanup pipeline

Real text cleaning is rarely one method — it's several, chained together, exactly like the \`.strip().lower()\` pattern from Module 5.

\`\`\`python
raw = pd.Series([" US-West-001 ", "us-east-014", "CA-NORTH-007 "])
cleaned = (
    raw.str.strip()
       .str.upper()
       .str.split("-", expand=True)
)
cleaned.columns = ["country", "region", "code"]
\`\`\`

Writing the chain across multiple indented lines (wrapped in parentheses) is a common style choice once a pipeline gets to three or more steps — it keeps each transformation on its own line, in the order it actually runs.

## Mental model

\`.extract()\` answers "give me the first match, broken into named pieces." \`.findall()\` answers "give me every match, as a list." \`.split(expand=True)\` answers "this text is already delimited — break it into columns directly." Picking the right one up front avoids writing a manual loop to reshape the output of the wrong method into the shape you actually needed.

## Try it yourself

Given a Series of log lines like \`"2026-03-01 ERROR: disk full"\` and \`"2026-03-02 INFO: backup complete"\`, use \`str.extract\` with named groups to pull out \`date\`, \`level\`, and \`message\` as three separate columns in one call. This exact pattern — unstructured log or free-text data in, tidy structured columns out — is one of the most common real-world uses of regex in a data analyst's day-to-day work.`,
        },
      ],
    },
    {
      title: "Grouping and Aggregation",
      lessons: [
        {
          slug: "introduction-to-groupby",
          title: "Introduction to groupby",
          estimatedMinutes: 10,
          content: `# Introduction to groupby

\`groupby\` is arguably the single most powerful operation in pandas — it implements the classic **split-apply-combine** pattern: split the data into groups based on some key, apply a computation to each group independently, then combine the results back into one structure.

## A first groupby

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "region": ["West", "East", "West", "East", "West"],
    "amount": [50, 30, 75, 45, 20],
})

grouped = df.groupby("region")
grouped["amount"].sum()
\`\`\`

\`\`\`
region
East     75
West    145
Name: amount, dtype: int64
\`\`\`

Nothing is computed until you call an aggregation method like \`.sum()\`, \`.mean()\`, or \`.count()\` on the grouped object — \`df.groupby("region")\` on its own just describes *how* to split the data, deferring the actual computation.

## Grouping by multiple columns

\`\`\`python
df2 = pd.DataFrame({
    "region": ["West", "East", "West", "East"],
    "product": ["A", "A", "B", "B"],
    "amount": [50, 30, 75, 45],
})
df2.groupby(["region", "product"])["amount"].sum()
\`\`\`

This produces a result with a **MultiIndex** — one level per grouping column — which you'll work with directly in Module 10 when reshaping data.

## Common aggregations

\`\`\`python
df.groupby("region")["amount"].mean()      # average per group
df.groupby("region")["amount"].count()     # number of rows per group
df.groupby("region")["amount"].min()       # smallest value per group
df.groupby("region")["amount"].max()       # largest value per group
df.groupby("region").size()                # row count per group, including all columns
\`\`\`

Note the subtle difference between \`.count()\` (counts non-null values in a specific column) and \`.size()\` (counts rows in the group regardless of missing values) — mixing these up is a common source of off-by-a-few discrepancies when a column has missing data.

## Iterating over groups

For debugging or one-off inspection, you can loop over the groups directly, though this is rarely how you'd write production analysis code:

\`\`\`python
for region, group_df in df.groupby("region"):
    print(region, len(group_df))
\`\`\`

## Mental model

Picture \`groupby\` as physically dealing the rows of your DataFrame into separate piles, one pile per unique value of the grouping column(s). Whatever aggregation you call next runs independently on each pile, and pandas glues the per-pile results back together, labeled by the group key. Once this picture clicks, the next two lessons — richer aggregations and custom functions — are just variations on "what do you do to each pile."`,
        },
        {
          slug: "aggregating-with-agg",
          title: "Aggregating with Multiple Functions",
          estimatedMinutes: 9,
          content: `# Aggregating with Multiple Functions

A single \`.mean()\` or \`.sum()\` per group is often not enough — real analysis usually wants several statistics side by side, sometimes different statistics for different columns. The \`.agg()\` method is the tool built for exactly this.

## Multiple functions on one column

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "region": ["West", "East", "West", "East", "West"],
    "amount": [50, 30, 75, 45, 20],
})

df.groupby("region")["amount"].agg(["sum", "mean", "count", "max"])
\`\`\`

\`\`\`
        sum       mean  count  max
region
East     75  37.500000      2   45
West    145  48.333333      3   75
\`\`\`

## Different functions for different columns

\`\`\`python
df2 = pd.DataFrame({
    "region": ["West", "East", "West", "East"],
    "amount": [50, 30, 75, 45],
    "quantity": [2, 1, 3, 2],
})

df2.groupby("region").agg({
    "amount": ["sum", "mean"],
    "quantity": "sum",
})
\`\`\`

Passing a dictionary lets each column get its own aggregation, or list of aggregations — useful whenever, say, you want total revenue and total units sold, but only the average (not the sum) of a price column.

## Named aggregation for clean output columns

The multi-level column names produced above can be awkward to work with afterward. **Named aggregation** lets you specify exactly the output column names you want, flattened into a single level.

\`\`\`python
summary = df2.groupby("region").agg(
    total_amount=("amount", "sum"),
    avg_amount=("amount", "mean"),
    total_quantity=("quantity", "sum"),
)
print(summary)
\`\`\`

\`\`\`
        total_amount  avg_amount  total_quantity
region
East              75        37.5               1
West             125        62.5               5
\`\`\`

This is the pattern most real analysis code settles on, because the resulting DataFrame is immediately ready to plot, export, or merge with other results — no follow-up step to flatten a MultiIndex column header.

## Common mistake

Forgetting that \`.agg()\` on a single column (\`df.groupby("region")["amount"].agg(...)\`) returns a Series or a flat-columned DataFrame, while \`.agg()\` on the whole grouped DataFrame with a dict of lists (as in the second example) returns a DataFrame with a *MultiIndex* of columns. Printing intermediate results as you build up a groupby chain is the fastest way to catch this before it causes confusing errors two steps later.`,
        },
        {
          slug: "apply-and-transform",
          title: "Applying Custom Functions with apply and transform",
          estimatedMinutes: 9,
          content: `# Applying Custom Functions with apply and transform

Built-in aggregations like \`sum\` and \`mean\` cover most cases, but sometimes you need custom logic — your own function, run per group or per value. pandas gives you three related tools: \`.apply()\`, \`.transform()\`, and plain Series \`.map()\`, each with a different shape of output.

## map(): value-by-value replacement on a Series

\`\`\`python
import pandas as pd

df = pd.DataFrame({"score": [92, 88, 95, 71]})

def grade_letter(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    return "F"

df["grade"] = df["score"].map(grade_letter)
\`\`\`

\`.map()\` runs your function on every individual value in a Series and returns a same-length Series of results — a direct, vectorized-feeling replacement for the list comprehension pattern from Module 1.

## apply(): custom logic per group, output can shrink

\`\`\`python
df2 = pd.DataFrame({
    "region": ["West", "East", "West", "East"],
    "amount": [50, 30, 75, 45],
})

def amount_range(group):
    return group["amount"].max() - group["amount"].min()

df2.groupby("region").apply(amount_range, include_groups=False)
\`\`\`

\`.apply()\` on a grouped object hands your function an entire group's DataFrame at a time, and your function can return a single value, a Series, or even a DataFrame — pandas figures out how to combine the results. This flexibility makes \`.apply()\` powerful but also the slowest option, since it can't always be vectorized internally.

## transform(): output is always the same shape as the input

\`\`\`python
df2["region_avg"] = df2.groupby("region")["amount"].transform("mean")
print(df2)
\`\`\`

\`\`\`
  region  amount  region_avg
0   West      50        62.5
1   East      30        37.5
2   West      75        62.5
3   East      45        37.5
\`\`\`

Unlike \`.apply()\`, \`.transform()\` always returns a result with the **same number of rows** as the input, broadcasting each group's summary value back across every row in that group. This is exactly the tool for adding a "how does this row compare to its group's average" column, without a separate merge step.

## Choosing between them

- Need a per-value transformation on a plain Series? Use **\`.map()\`**.
- Need a per-group summary broadcast back onto every original row? Use **\`.transform()\`**.
- Need arbitrary custom logic per group, and you're comfortable with a shape that might change? Use **\`.apply()\`**, but reach for it last — it's usually the slowest option, and many things that look like they need \`.apply()\` can be done faster with \`.agg()\` or \`.transform()\`.

## Common mistake

Using \`.apply()\` for something \`.transform()\` or a built-in aggregation could do is a very common performance mistake in real codebases — \`.apply()\` often can't be vectorized internally, so on a large DataFrame it can be dramatically slower than the equivalent \`.transform()\` or \`.agg()\` call. Reach for the more specific tool first.`,
        },
      ],
    },
    {
      title: "NumPy Deep Dive and Performance",
      lessons: [
        {
          slug: "numpy-broadcasting-and-vectorized-math",
          title: "NumPy Broadcasting and Vectorized Math",
          estimatedMinutes: 9,
          content: `# NumPy Broadcasting and Vectorized Math

Module 1 introduced NumPy arrays and simple vectorized operations like \`scores + 5\`. This lesson goes one level deeper into *why* those operations work between arrays of different shapes, and into the two-dimensional array operations that come up constantly once you're working with numeric data directly.

## Broadcasting: operating on arrays of different shapes

**Broadcasting** is the rule set NumPy uses to apply an operation between arrays that aren't the same shape, by "stretching" the smaller one — without actually copying any data.

\`\`\`python
import numpy as np

prices = np.array([19.99, 25.50, 8.00])
tax_multiplier = 1.08                      # a single scalar "broadcasts" against every element
with_tax = prices * tax_multiplier
print(with_tax)   # array([21.5892, 27.54  ,  8.64  ])
\`\`\`

That single-number case is broadcasting in its simplest form — you've already been using it without the name. It generalizes to two-dimensional arrays too:

\`\`\`python
matrix = np.array([
    [10, 20, 30],
    [40, 50, 60],
])
row_adjust = np.array([1, 0, -1])    # shape (3,) — one value per column
adjusted = matrix + row_adjust        # row_adjust is broadcast across every row
\`\`\`

\`\`\`
[[11 20 29]
 [41 50 59]]
\`\`\`

The rule is: dimensions are compared from the right, and a size-1 (or missing) dimension is stretched to match — here, \`row_adjust\`'s shape \`(3,)\` matches \`matrix\`'s last dimension, so it's applied to every row.

## 2D arrays: shape, axes, and aggregation direction

\`\`\`python
matrix.shape        # (2, 3) — 2 rows, 3 columns
matrix.sum()         # 210 — sum of every element
matrix.sum(axis=0)   # array([50, 70, 90]) — sum DOWN each column
matrix.sum(axis=1)   # array([60, 150])     — sum ACROSS each row
\`\`\`

\`axis=0\` and \`axis=1\` show up throughout pandas too (e.g. \`df.mean(axis=1)\` for a per-row average) — the convention is identical: axis 0 moves down rows, axis 1 moves across columns.

## Element-wise vs matrix operations

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a * b            # array([4, 10, 18]) — element-wise multiplication
np.dot(a, b)     # 32 — the dot product, a single number
a @ b            # 32 — @ is shorthand for np.dot on 1D arrays
\`\`\`

It's easy to assume \`*\` between two arrays means matrix multiplication if you've seen linear algebra notation before — in NumPy, \`*\` is always element-wise, and \`@\` (or \`np.dot\`) is the matrix/dot product operator.

## Mental model

Broadcasting exists so you almost never need to manually replicate a smaller array to match a bigger one's shape — NumPy (and pandas underneath it) handles the stretching implicitly, following one consistent rule. Whenever an operation between two arrays or a DataFrame and a Series behaves in a way you didn't expect, check the shapes involved first; a shape mismatch that broadcasting *can't* resolve is one of the most common NumPy error messages you'll encounter.

## Common mistake

Confusing \`*\` (element-wise) with matrix multiplication is a frequent bug for anyone coming from a linear-algebra background — \`a * b\` on two same-shaped arrays multiplies corresponding elements, it does *not* compute a dot product or matrix product. Reach for \`@\` or \`np.dot()\` specifically whenever you mean true matrix multiplication.`,
        },
        {
          slug: "numpy-reshaping-random-linear-algebra",
          title: "Reshaping Arrays, Random Sampling, and Basic Linear Algebra",
          estimatedMinutes: 8,
          content: `# Reshaping Arrays, Random Sampling, and Basic Linear Algebra

Rounding out the NumPy toolkit: reshaping data between different array shapes, generating random data for testing and simulation, and the handful of linear algebra operations that show up most often in everyday data work.

## Reshaping arrays

\`\`\`python
import numpy as np

flat = np.arange(12)                # array([0, 1, 2, ..., 11])
grid = flat.reshape(3, 4)           # 3 rows, 4 columns
print(grid)
\`\`\`

\`\`\`
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
\`\`\`

\`.reshape()\` requires the new shape to hold the exact same total number of elements as the original — \`reshape(3, 4)\` works for 12 elements, but \`reshape(3, 5)\` would raise a \`ValueError\`. Passing \`-1\` for one dimension tells NumPy to figure that dimension out automatically:

\`\`\`python
grid.reshape(4, -1)    # 4 rows, and however many columns makes that work (3)
grid.flatten()         # back to a single 1D array
grid.T                 # transpose — rows and columns swapped
\`\`\`

## Generating random data

NumPy's \`random\` module is the standard way to generate synthetic data for testing a pipeline, simulating a distribution, or sampling rows.

\`\`\`python
rng = np.random.default_rng(seed=42)   # a seeded generator — reproducible results

rng.random(5)                    # 5 floats uniformly between 0 and 1
rng.integers(low=0, high=100, size=5)   # 5 random integers in [0, 100)
rng.normal(loc=50, scale=10, size=1000) # 1000 values from a normal distribution, mean 50, std 10
\`\`\`

Always seed the generator (\`seed=42\` above) when you need reproducible results — an unseeded generator produces different values every run, which makes debugging or sharing a reliable example far harder.

## Basic linear algebra

\`\`\`python
prices = np.array([19.99, 8.00, 25.50])
quantities = np.array([3, 5, 1])

total_revenue = prices @ quantities     # dot product: 19.99*3 + 8*5 + 25.5*1 = 145.47
print(total_revenue)
\`\`\`

A dot product like this is exactly "price times quantity, summed across every item" — the same computation you'd otherwise write as \`(prices * quantities).sum()\`, just expressed as a single linear-algebra operation. For anything beyond this — matrix inversion, eigenvalues, solving systems of equations — NumPy's \`np.linalg\` module (\`np.linalg.inv\`, \`np.linalg.solve\`) covers the essentials, though most day-to-day data analysis rarely needs to go further than the dot product shown here.

## Where this connects back to pandas

\`\`\`python
import pandas as pd

df = pd.DataFrame({"price": prices, "quantity": quantities})
df["revenue"] = df["price"] * df["quantity"]   # the DataFrame equivalent of element-wise *
df["revenue"].sum()                             # equivalent to the dot product above
\`\`\`

Every one of these NumPy operations has a pandas equivalent, because a DataFrame column *is* a NumPy array underneath — reaching for raw NumPy directly makes the most sense when you're working with numbers that don't have a natural row/column label (like a matrix of pairwise distances), rather than with tabular business data.

## Try it yourself

Use \`rng.normal(loc=100, scale=15, size=500)\` to simulate 500 "test scores," reshape the flat result into a \`(50, 10)\` grid representing 50 classes of 10 students each, and use \`.mean(axis=1)\` to compute each class's average score in one line.`,
        },
        {
          slug: "vectorization-vs-apply-performance",
          title: "Vectorization vs apply(): Writing Fast pandas Code",
          estimatedMinutes: 9,
          content: `# Vectorization vs apply(): Writing Fast pandas Code

You've used \`.apply()\` since Module 7 for custom per-group or per-row logic. As datasets grow from thousands to millions of rows, the difference between a vectorized operation and a row-by-row \`.apply()\` stops being academic — it's the difference between code that runs in milliseconds and code that takes minutes.

## Why vectorization wins

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({"amount": np.random.default_rng(0).uniform(0, 100, size=200_000)})

# Slow: apply() calls a Python function once per row
%timeit df["amount"].apply(lambda x: x * 1.08)

# Fast: vectorized multiplication runs in compiled code, once for the whole column
%timeit df["amount"] * 1.08
\`\`\`

On a column of 200,000 rows, the vectorized version is typically 20-50x faster. \`.apply()\` still has to invoke a Python function 200,000 separate times, with all the interpreter overhead that implies — the vectorized version delegates the entire loop to NumPy's compiled code, exactly as you saw back in Module 1.

## Common apply() patterns that have a faster vectorized equivalent

\`\`\`python
# Instead of:
df["tier"] = df["amount"].apply(lambda x: "high" if x > 75 else "low")

# Use np.where — vectorized if/else:
df["tier"] = np.where(df["amount"] > 75, "high", "low")

# Instead of:
df["discounted"] = df.apply(lambda row: row["amount"] * 0.9 if row["amount"] > 50 else row["amount"], axis=1)

# Use a boolean mask directly on the column:
df["discounted"] = df["amount"].where(df["amount"] <= 50, df["amount"] * 0.9)
\`\`\`

Row-wise apply (\`axis=1\`) is usually the slowest pattern in all of pandas, because it reconstructs an entire Series for every single row. It's almost always worth spending a minute looking for a vectorized alternative before accepting an \`axis=1\` apply as the final answer.

## When apply() is genuinely the right tool

Not everything vectorizes cleanly — logic involving external calls, complex conditional branching that doesn't map to \`np.where\`/\`np.select\`, or genuinely one-off custom aggregations are all reasonable uses of \`.apply()\`. The goal isn't to ban it, but to reach for it deliberately, after checking whether a vectorized option exists.

\`\`\`python
# np.select handles more than two branches, still vectorized:
conditions = [df["amount"] > 75, df["amount"] > 25]
choices = ["high", "medium"]
df["tier"] = np.select(conditions, choices, default="low")
\`\`\`

## Memory optimization alongside speed

Performance isn't only about CPU time — the dtype of each column affects how much memory a DataFrame uses, which matters once a dataset is large enough that it strains available RAM.

\`\`\`python
df.memory_usage(deep=True)                       # memory used per column, in bytes

df["amount_f32"] = df["amount"].astype("float32")   # half the memory of float64, less precision
df["small_int"] = pd.Series([1, 2, 3]).astype("int8")  # smallest int type that fits the value range
\`\`\`

Downcasting numeric types (\`float64\` to \`float32\`, or \`int64\` to a smaller int type) and converting repeated-value text columns to \`category\` (covered in Module 5) are the two highest-leverage, lowest-effort memory optimizations available in pandas.

## Mental model

Before reaching for \`.apply()\`, ask: "is there a \`+\`, \`*\`, comparison, \`np.where\`, \`np.select\`, \`.map()\`, or built-in \`.agg()\` that expresses this same logic?" Vectorized code is usually shorter *and* faster — the two rarely trade off against each other in pandas, which is why it's worth the extra thirty seconds of thought before defaulting to a custom function.

## Common mistake

Reaching for \`.apply(axis=1)\` as a first instinct for any row-based logic, without checking a vectorized alternative first, is the single most common performance mistake in real pandas codebases. On a small dataset the difference is invisible; the same code silently becomes a bottleneck the day the dataset grows 100x, often long after the original author has moved on.`,
        },
      ],
    },
    {
      title: "Combining and Summarizing Data",
      lessons: [
        {
          slug: "merging-and-joining",
          title: "Merging and Joining DataFrames",
          estimatedMinutes: 11,
          content: `# Merging and Joining DataFrames

Real analysis almost always involves more than one table — customers in one file, orders in another, products in a third. \`pd.merge()\` combines DataFrames based on shared key columns, exactly like a SQL \`JOIN\`.

## A basic inner merge

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["Ada", "Grace", "Alan"],
})
orders = pd.DataFrame({
    "order_id": [101, 102, 103, 104],
    "customer_id": [1, 2, 2, 4],
    "amount": [50, 30, 75, 20],
})

result = pd.merge(customers, orders, on="customer_id")
print(result)
\`\`\`

\`\`\`
   customer_id   name  order_id  amount
0            1    Ada       101      50
1            2  Grace       102      30
2            2  Grace       103      75
\`\`\`

Notice customer 3 (Alan, no orders) and order 104 (customer 4, not in \`customers\`) both disappeared. That's the default \`how="inner"\` behavior: keep only keys present in **both** DataFrames.

## The four join types

\`\`\`python
pd.merge(customers, orders, on="customer_id", how="inner")   # only matching keys (default)
pd.merge(customers, orders, on="customer_id", how="left")    # all of customers, matched orders or NaN
pd.merge(customers, orders, on="customer_id", how="right")   # all of orders, matched customers or NaN
pd.merge(customers, orders, on="customer_id", how="outer")   # everything from both, unmatched rows filled with NaN
\`\`\`

\`how="left"\` is extremely common in practice: "keep every customer, and attach their order details if they have any" — customer 3 would appear with \`NaN\` for order-related columns instead of vanishing.

## Merging on differently-named columns

\`\`\`python
pd.merge(customers, orders, left_on="customer_id", right_on="customer_id")
# or, if the columns had different names, e.g. "id" vs "customer_id":
# pd.merge(customers, orders, left_on="id", right_on="customer_id")
\`\`\`

## Checking merge results

\`\`\`python
merged = pd.merge(customers, orders, on="customer_id", how="left", indicator=True)
merged["_merge"].value_counts()   # how many rows matched, were left-only, or right-only
\`\`\`

\`indicator=True\` adds a \`_merge\` column labeling each row \`"both"\`, \`"left_only"\`, or \`"right_only"\` — an invaluable sanity check any time you're not certain the join behaved the way you expected.

## Common mistake

The most common merge bug is an unexpected **row multiplication**: if the "key" column isn't actually unique in one of the two tables, matching rows get duplicated for every combination on each side (this is exactly what happened with Grace's two orders above — entirely correct, but easy to mistake for a bug if you expected one row per customer). Always check \`len(result)\` against your expectations, and consider \`df["key"].is_unique\` on each side before merging if row counts matter.`,
        },
        {
          slug: "concatenating-dataframes",
          title: "Concatenating and Appending Data",
          estimatedMinutes: 7,
          content: `# Concatenating and Appending Data

Merging combines tables *sideways*, matching on keys. **Concatenation** combines tables by simply stacking them — usually rows on top of rows, like appending one month's data to the next — using \`pd.concat()\`.

## Stacking rows (the common case)

\`\`\`python
import pandas as pd

jan = pd.DataFrame({"month": ["Jan"] * 2, "amount": [50, 30]})
feb = pd.DataFrame({"month": ["Feb"] * 2, "amount": [75, 45]})

combined = pd.concat([jan, feb])
print(combined)
\`\`\`

\`\`\`
  month  amount
0   Jan      50
1   Jan      30
0   Feb      75
1   Feb      45
\`\`\`

Notice the index repeats (0, 1, 0, 1) — \`concat\` preserves each original DataFrame's index by default. Pass \`ignore_index=True\` to get a fresh, continuous 0..n-1 index instead:

\`\`\`python
combined = pd.concat([jan, feb], ignore_index=True)
\`\`\`

## Stacking columns instead of rows

\`\`\`python
left = pd.DataFrame({"a": [1, 2]})
right = pd.DataFrame({"b": [3, 4]})
pd.concat([left, right], axis=1)   # side-by-side, aligned by index
\`\`\`

\`axis=1\` glues DataFrames side by side instead of stacking them, aligning rows by their shared index — this is a much less common use case than stacking rows, but useful when you have several DataFrames that already share the same row index.

## Handling mismatched columns

\`\`\`python
q1 = pd.DataFrame({"month": ["Jan"], "amount": [50]})
q2 = pd.DataFrame({"month": ["Apr"], "amount": [60], "region": ["West"]})

pd.concat([q1, q2], ignore_index=True)
\`\`\`

When column sets don't match exactly, \`concat\` still works — it aligns by column name and fills any column missing from one of the inputs with \`NaN\` for those rows, rather than raising an error.

## A note on the old .append() method

Older pandas tutorials sometimes show \`df.append(other_df)\`. That method was removed in pandas 2.0 — \`pd.concat([df, other_df])\` is the modern, only supported way to append one DataFrame's rows to another.

## Common mistake

Concatenating many small DataFrames one at a time inside a loop (calling \`pd.concat\` repeatedly, reassigning a growing DataFrame each iteration) is slow and is a common anti-pattern. Instead, collect all the pieces into a Python list first, and call \`pd.concat()\` **once** on the whole list — exactly like the \`jan\`/\`feb\` example above.`,
        },
        {
          slug: "descriptive-statistics-correlation",
          title: "Descriptive Statistics and Correlation",
          estimatedMinutes: 9,
          content: `# Descriptive Statistics and Correlation

Before building models or dashboards, every analyst leans on a small set of descriptive statistics to understand a dataset's center, spread, and relationships between variables. pandas makes all of these one-line operations.

## Central tendency and spread

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "price": [19.99, 25.50, 8.00, 42.00, 15.75],
    "quantity": [3, 1, 5, 2, 4],
})

df["price"].mean()      # average
df["price"].median()    # middle value — less sensitive to outliers than the mean
df["price"].std()       # standard deviation — typical spread around the mean
df["price"].var()       # variance (std squared)
df["price"].min()
df["price"].max()
df["price"].quantile(0.25)   # the value below which 25% of data falls
\`\`\`

## The full summary in one call

\`\`\`python
df.describe()
\`\`\`

\`\`\`
           price  quantity
count   5.000000  5.000000
mean   22.248000  3.000000
std    12.769813  1.581139
min     8.000000  1.000000
25%    15.750000  2.000000
50%    19.990000  3.000000
75%    25.500000  4.000000
max    42.000000  5.000000
\`\`\`

\`.describe()\` covers count, mean, std, min, the three quartiles, and max — usually the fastest way to get oriented in a new numeric column, and one you already saw briefly back in Module 2.

## Correlation between columns

\`\`\`python
df["revenue"] = df["price"] * df["quantity"]
df[["price", "quantity", "revenue"]].corr()
\`\`\`

\`.corr()\` computes the pairwise Pearson correlation coefficient between every pair of numeric columns, ranging from -1 (perfectly inverse) to +1 (perfectly aligned), with 0 meaning no linear relationship. This is often the very first check analysts run when they suspect two variables might be related.

## Grouped descriptive statistics

Descriptive statistics become far more informative once combined with the \`groupby\` skills from the previous module:

\`\`\`python
sales = pd.DataFrame({
    "region": ["West", "East", "West", "East"],
    "amount": [50, 30, 75, 45],
})
sales.groupby("region")["amount"].describe()
\`\`\`

This gives you count, mean, std, min/max, and quartiles **per region** in a single call — exactly the kind of "compare groups" question descriptive statistics exist to answer.

## Common mistake

Correlation measures a **linear** relationship only — a correlation near 0 does not mean two variables are unrelated, only that they aren't related in a straight-line way. Always pair \`.corr()\` with a quick scatter plot (covered in Module 14) before concluding two variables have no relationship at all; a strong curved or cyclical pattern can hide with a correlation coefficient close to zero.`,
        },
      ],
      quiz: {
        title: "Tier 2 Checkpoint: Cleaning, Grouping & Combining Data",
        questions: [
          {
            text: "What does `df['score'].isna().sum()` calculate?",
            optionA: "The sum of all non-missing scores",
            optionB: "The number of missing (NaN) values in the score column",
            optionC: "The average score, ignoring missing values",
            optionD: "The total number of rows in the DataFrame",
            correctOption: "B",
          },
          {
            text: "Why might filling missing values with the column mean be a questionable default strategy?",
            optionA: "pandas does not allow filling missing values with a computed statistic",
            optionB: "It can quietly bias aggregates if the missingness isn't random or actually carries meaning",
            optionC: "The mean can only be computed on text columns",
            optionD: "fillna() only accepts the value 0",
            correctOption: "B",
          },
          {
            text: "By default, what counts as a 'duplicate' row when calling `df.duplicated()` with no arguments?",
            optionA: "Any row where at least one column matches another row",
            optionB: "Any row where every column's value exactly matches an earlier row",
            optionC: "Any row with a missing value",
            optionD: "Rows are compared only by their index label, not their contents",
            correctOption: "B",
          },
          {
            text: "What is the risk of running `df.drop_duplicates(subset=['customer'])` when a customer can legitimately place more than one order?",
            optionA: "It will raise an error because subset must include all columns",
            optionB: "It silently keeps only one row per customer, deleting other legitimate orders",
            optionC: "It converts the customer column to a category dtype",
            optionD: "It has no effect unless keep=False is also passed",
            correctOption: "B",
          },
          {
            text: "What does `pd.to_numeric(series, errors='coerce')` do with a value it cannot convert, such as the string 'N/A'?",
            optionA: "It raises an exception immediately and stops the conversion",
            optionB: "It leaves the original string value unchanged in the result",
            optionC: "It converts the unparseable value to NaN instead of raising an error",
            optionD: "It deletes the row containing that value",
            correctOption: "C",
          },
          {
            text: "What does `df.groupby('region')['amount'].sum()` compute?",
            optionA: "The overall sum of the amount column, ignoring region entirely",
            optionB: "The sum of the amount column, split out separately for each unique region",
            optionC: "The number of rows for each region",
            optionD: "A new DataFrame with one row per original row, unchanged",
            correctOption: "B",
          },
          {
            text: "What is the key difference between `.groupby(...).apply()` and `.groupby(...).transform()`?",
            optionA: "transform() always returns a result with the same number of rows as the input; apply() output shape can vary",
            optionB: "apply() can only be used with the sum function",
            optionC: "transform() cannot be used on grouped data at all",
            optionD: "They are exactly the same in every case",
            correctOption: "A",
          },
          {
            text: "In `pd.merge(customers, orders, on='customer_id', how='left')`, what happens to a customer who has placed no orders?",
            optionA: "The customer row is dropped from the result entirely",
            optionB: "The merge raises an error because there is no matching order",
            optionC: "The customer still appears in the result, with NaN in the order-related columns",
            optionD: "pandas automatically creates a placeholder order for that customer",
            correctOption: "C",
          },
          {
            text: "Which function is the modern, correct way to stack the rows of two DataFrames with the same columns in current pandas (pandas 2.0+)?",
            optionA: "df1.append(df2)",
            optionB: "pd.concat([df1, df2])",
            optionC: "pd.merge(df1, df2)",
            optionD: "df1.join(df2)",
            correctOption: "B",
          },
          {
            text: "What does a correlation coefficient near 0 between two numeric columns tell you?",
            optionA: "The two columns are completely unrelated in every possible way",
            optionB: "There is no linear relationship, but a strong non-linear (e.g. curved) relationship could still exist",
            optionC: "One of the two columns must contain only missing values",
            optionD: "The two columns are certainly duplicates of each other",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Reshaping Data",
      lessons: [
        {
          slug: "pivot-tables",
          title: "Pivot Tables",
          estimatedMinutes: 10,
          content: `# Pivot Tables

If you've used a spreadsheet, you've likely built a pivot table by hand: rows become categories, columns become other categories, and cells hold an aggregated value. pandas' \`pivot_table()\` does exactly that, and it's often the cleanest way to present a \`groupby\` result.

## From groupby to pivot_table

\`\`\`python
import pandas as pd

sales = pd.DataFrame({
    "region": ["West", "East", "West", "East", "West", "East"],
    "product": ["A", "A", "B", "B", "A", "B"],
    "amount": [50, 30, 75, 45, 20, 60],
})

sales.pivot_table(index="region", columns="product", values="amount", aggfunc="sum")
\`\`\`

\`\`\`
product     A     B
region
East       30   105
West       70    75
\`\`\`

Compare this to \`sales.groupby(["region", "product"])["amount"].sum()\`, which computes the identical numbers but returns them stacked in a MultiIndex Series rather than laid out as a grid. \`pivot_table\` is, under the hood, a groupby followed by a reshape — useful whenever the "wide" grid layout is more readable than the "long" stacked one.

## Multiple aggregations and margins

\`\`\`python
sales.pivot_table(
    index="region",
    columns="product",
    values="amount",
    aggfunc=["sum", "mean"],
    margins=True,          # add row/column totals labeled "All"
    fill_value=0,          # replace NaN (no data for that combo) with 0
)
\`\`\`

\`margins=True\` appends a grand-total row and column — the pivot-table equivalent of a spreadsheet's "Total" row, extremely useful in a summary report.

## Pivoting without aggregation

If your data already has exactly one row per (index, column) combination, plain \`pivot()\` (no \`_table\`, no \`aggfunc\`) reshapes it without summarizing:

\`\`\`python
wide = sales.drop_duplicates(subset=["region", "product"]).pivot(
    index="region", columns="product", values="amount"
)
\`\`\`

Use \`pivot()\` when there's no aggregation needed and you're certain the combination is unique; use \`pivot_table()\` whenever duplicates are possible, since it will raise an error if you try \`pivot()\` on non-unique combinations.

## Common mistake

Calling \`.pivot()\` (not \`.pivot_table()\`) on data that has more than one row per index/column combination raises a \`ValueError\` about duplicate entries — this is pandas telling you it doesn't know how to combine multiple values into one cell. If you see that error, switch to \`.pivot_table()\` and choose an \`aggfunc\` (sum, mean, count, etc.) to resolve the ambiguity.`,
        },
        {
          slug: "melting-wide-to-long",
          title: "Melting and Wide-to-Long Reshaping",
          estimatedMinutes: 8,
          content: `# Melting and Wide-to-Long Reshaping

Some datasets arrive "wide" — one column per month, per year, or per survey question — when most pandas operations (grouping, plotting, merging) work far more naturally on "long" data, where each row is a single observation. \`pd.melt()\` converts wide to long.

## A wide dataset

\`\`\`python
import pandas as pd

wide = pd.DataFrame({
    "name": ["Ada", "Grace"],
    "jan_sales": [100, 150],
    "feb_sales": [120, 130],
    "mar_sales": [90, 160],
})
print(wide)
\`\`\`

\`\`\`
    name  jan_sales  feb_sales  mar_sales
0    Ada        100        120         90
1  Grace        150        130        160
\`\`\`

This layout is intuitive to read, but hard to analyze: you can't easily group by month, because "month" isn't a column value — it's smeared across three separate column names.

## Melting to long format

\`\`\`python
long = wide.melt(
    id_vars="name",                                  # column(s) to keep as-is
    value_vars=["jan_sales", "feb_sales", "mar_sales"],  # columns to unpivot
    var_name="month",                                # name for the new "which column" column
    value_name="sales",                              # name for the new "value" column
)
print(long)
\`\`\`

\`\`\`
    name       month  sales
0    Ada   jan_sales    100
1  Grace   jan_sales    150
2    Ada   feb_sales    120
3  Grace   feb_sales    130
4    Ada   mar_sales     90
5  Grace   mar_sales    160
\`\`\`

Now "month" is a real column, and \`long.groupby("month")["sales"].sum()\` or a monthly line plot both become one-liners, exactly the operations that were awkward in the wide layout.

## Going back: long to wide with pivot

Because \`melt\` and \`pivot\` are inverses of each other, you can round-trip between the two layouts freely:

\`\`\`python
back_to_wide = long.pivot(index="name", columns="month", values="sales")
\`\`\`

## Mental model

"Wide" format is optimized for **human reading** — a monthly report someone glances at. "Long" (also called "tidy") format is optimized for **computation** — grouping, merging, filtering, and plotting all expect one row per observation. A huge fraction of real-world data cleaning is simply converting between these two shapes to match the tool you're about to use.

## Common mistake

Forgetting \`id_vars\` and melting every column, including ones that should have stayed as identifying labels (like \`name\`), scrambles the dataset — each identifying column gets treated as just another value to unpivot. Always list explicitly which columns identify a row (\`id_vars\`) versus which columns hold the actual measurements you want stacked (\`value_vars\`).`,
        },
        {
          slug: "stack-unstack-multiindex",
          title: "Stack, Unstack, and MultiIndex",
          estimatedMinutes: 9,
          content: `# Stack, Unstack, and MultiIndex

You've already met a **MultiIndex** without necessarily naming it — every time you grouped by more than one column, the result came back indexed by a combination of values. This lesson makes that structure explicit, and introduces \`.stack()\` and \`.unstack()\`, the reshaping tools built specifically for it.

## Where a MultiIndex comes from

\`\`\`python
import pandas as pd

sales = pd.DataFrame({
    "region": ["West", "East", "West", "East"],
    "product": ["A", "A", "B", "B"],
    "amount": [50, 30, 75, 45],
})

grouped = sales.groupby(["region", "product"])["amount"].sum()
print(grouped)
\`\`\`

\`\`\`
region  product
East    A          30
        B          45
West    A          50
        B          75
Name: amount, dtype: int64
\`\`\`

\`grouped\` has a two-level index: \`region\` and \`product\` together. You can select from it with a tuple: \`grouped[("West", "A")]\`, or select an entire outer level: \`grouped.loc["West"]\`.

## unstack(): move an index level into columns

\`\`\`python
grouped.unstack()
\`\`\`

\`\`\`
product     A   B
region
East       30  45
West       50  75
\`\`\`

\`.unstack()\` takes the innermost index level (by default) and pivots it out into columns — producing exactly the same wide grid you'd get from \`pivot_table\`. This is often a faster path to a wide summary when you already have a grouped Series in hand.

## stack(): the inverse — columns back into an index level

\`\`\`python
wide = grouped.unstack()
wide.stack()   # back to the original two-level-indexed Series
\`\`\`

\`.stack()\` reverses the operation, taking column labels and folding them back down into an inner index level — useful whenever you've received wide data but want to feed it into something (like a groupby or a merge) that expects a long, indexed shape.

## Choosing a level to unstack

\`\`\`python
grouped.unstack(level="region")   # pivot "region" into columns instead of "product"
grouped.unstack(level=0)          # equivalently, by position — 0 is the outermost level
\`\`\`

## Mental model

Think of \`.stack()\`/\`.unstack()\` as \`melt\`/\`pivot\`'s lower-level cousins: instead of naming source and destination columns explicitly, they operate on whatever MultiIndex level is already there. They're the natural tool right after a multi-column \`groupby\`, while \`melt\`/\`pivot_table\` are more natural when you're starting from a flat DataFrame with plain columns.`,
        },
        {
          slug: "multiindex-creation-and-cross-sections",
          title: "Creating and Selecting with a MultiIndex Directly",
          estimatedMinutes: 8,
          content: `# Creating and Selecting with a MultiIndex Directly

The previous lesson showed a MultiIndex arriving as the natural output of a multi-column \`groupby\`. This lesson shows how to build one directly, and introduces \`.xs()\` and a few other tools for slicing hierarchical data cleanly, without falling back on \`.loc\` tuples for everything.

## Building a MultiIndex directly

\`\`\`python
import pandas as pd

index = pd.MultiIndex.from_product(
    [["West", "East"], ["A", "B"]],
    names=["region", "product"],
)
df = pd.DataFrame({"amount": [50, 75, 30, 45]}, index=index)
print(df)
\`\`\`

\`\`\`
                  amount
region product
West   A              50
       B              75
East   A              30
       B              45
\`\`\`

\`from_product\` is the most common constructor — it builds every combination of the given lists, which is exactly the shape you'd want for, say, a pre-filled grid of region-by-product totals before you've aggregated any real data into it. \`pd.MultiIndex.from_arrays\` and \`.from_tuples\` build one from explicit paired values instead, when the combinations aren't a full cross-product.

## Selecting with tuples

\`\`\`python
df.loc[("West", "A")]              # a single row, selected by the full tuple of labels
df.loc["West"]                     # every row where region == "West" (outer level only)
df.loc[(["West", "East"], "A")]    # product A, in both regions
\`\`\`

## xs(): cross-sections without dropping into tuple syntax

\`.xs()\` ("cross-section") is often more readable than a tuple, especially when you want to select on an *inner* level while keeping every value of the outer level.

\`\`\`python
df.xs("A", level="product")     # every region's "A" product row
df.xs("West", level="region")   # equivalent to df.loc["West"] above
\`\`\`

Selecting by an inner level using plain \`.loc\` tuples requires slightly awkward syntax (\`df.loc[(slice(None), "A"), :]\`); \`.xs(..., level=...)\` expresses the same intent far more directly.

## Reordering and sorting levels

\`\`\`python
df.swaplevel("region", "product")     # flip which level is outer vs inner
df.sort_index(level="product")        # sort by the inner level instead of the outer one
\`\`\`

Many MultiIndex operations (slicing with a partial tuple, in particular) require the index to be sorted — \`df.sort_index()\` on a MultiIndex is worth doing as a matter of habit right after building or reordering one, exactly as you learned for a plain DatetimeIndex in Module 11.

## Mental model

A MultiIndex is a tuple-of-labels index rather than a single-label index — everything you already know about \`.loc\` still applies, just with tuples instead of single values. \`.xs()\` exists specifically for the common case of "give me a slice at one particular level, regardless of the other levels," which a raw tuple makes needlessly fiddly to express.

## Common mistake

Trying to select an inner level directly with \`df.loc["A"]\` (expecting "every row where product is A") instead fails or returns nothing useful, because plain \`.loc\` matches against the *outermost* level first unless you either supply a full tuple or use \`.xs(..., level=...)\`. When a MultiIndex selection returns something unexpected, double-check which level you're actually matching against.`,
        },
      ],
    },
    {
      title: "Time Series with pandas",
      lessons: [
        {
          slug: "working-with-dates-and-times",
          title: "Working with Dates and Times",
          estimatedMinutes: 9,
          content: `# Working with Dates and Times

Dates loaded from a file are, by default, just text — pandas has no idea \`"2026-03-15"\` means anything special until you tell it. \`pd.to_datetime()\` is the entry point into pandas' entire time series toolkit.

## Converting text to real datetimes

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "order_date": ["2026-01-05", "2026-01-07", "2026-02-01"],
    "amount": [50, 30, 75],
})
df.dtypes   # order_date shows as "object" — just text so far

df["order_date"] = pd.to_datetime(df["order_date"])
df.dtypes   # now datetime64[ns] — a real datetime type
\`\`\`

As you saw in Module 2, you can also do this at load time with \`pd.read_csv(..., parse_dates=["order_date"])\`, which is the more common approach in practice.

## Extracting components with .dt

Once a column is a real datetime dtype, the \`.dt\` accessor exposes its components — directly parallel to how \`.str\` exposes string operations.

\`\`\`python
df["year"] = df["order_date"].dt.year
df["month"] = df["order_date"].dt.month
df["day_name"] = df["order_date"].dt.day_name()     # "Monday", "Tuesday", ...
df["is_weekend"] = df["order_date"].dt.dayofweek >= 5
\`\`\`

## Individual Timestamp objects and durations

A single datetime value is a \`pd.Timestamp\`, and the difference between two of them is a \`pd.Timedelta\`.

\`\`\`python
today = pd.Timestamp("2026-07-14")
df["days_since_order"] = (today - df["order_date"]).dt.days

one_week_later = df["order_date"] + pd.Timedelta(days=7)
\`\`\`

## Building dates from components

\`\`\`python
pd.Timestamp(year=2026, month=3, day=15)
pd.to_datetime({"year": [2026], "month": [3], "day": [15]})
\`\`\`

## Common mistake

A frequent source of quiet bugs is ambiguous date formats — is \`"03/04/2026"\` March 4th or April 3rd? \`pd.to_datetime\` defaults to a month-first interpretation for ambiguous strings, which can silently misparse day-first data from many non-US sources. When you know the format, pass it explicitly with \`format="%d/%m/%Y"\` (or whatever matches your data) rather than relying on inference — it's both faster and unambiguous.`,
        },
        {
          slug: "time-series-indexing",
          title: "Time Series Indexing and Slicing",
          estimatedMinutes: 8,
          content: `# Time Series Indexing and Slicing

Once dates are stored as a real datetime dtype, pandas lets you use them as the DataFrame's **index** — unlocking convenient, natural-language-like slicing that plain integer or string indexes don't support.

## Setting a DatetimeIndex

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "order_date": pd.to_datetime(["2026-01-05", "2026-01-20", "2026-02-10", "2026-03-01"]),
    "amount": [50, 30, 75, 45],
})
df = df.set_index("order_date")
print(df.index)   # DatetimeIndex(['2026-01-05', '2026-01-20', ...], dtype='datetime64[ns]')
\`\`\`

## Partial-string indexing

With a \`DatetimeIndex\` in place, you can slice using just a partial date string, and pandas understands you mean the entire period.

\`\`\`python
df.loc["2026-01"]              # every row in January 2026
df.loc["2026"]                 # every row in the year 2026
df.loc["2026-01-05":"2026-02-15"]  # an explicit date range (inclusive of both ends)
\`\`\`

This is dramatically more convenient than the equivalent boolean filter (\`df[(df.index >= "2026-01-01") & (df.index < "2026-02-01")]\`), and it's one of the main reasons to set a datetime column as the index at all for time series work.

## Useful datetime index attributes

\`\`\`python
df.index.year
df.index.month
df.index.day_name()
\`\`\`

These mirror the \`.dt\` accessor from the previous lesson, but operate directly on the index rather than a column.

## Checking for gaps and sorting

Real time series data is not always recorded in perfect order or without gaps.

\`\`\`python
df = df.sort_index()             # ensure chronological order — many time series ops assume this
df.index.is_monotonic_increasing  # True if the index is properly sorted
\`\`\`

## Common mistake

Slicing or resampling (next lesson) a time series **before** sorting its index chronologically can produce wrong or confusing results — a partial-string slice like \`df.loc["2026-01"]\` still works regardless of order, but operations like \`.rolling()\` and \`.resample()\` implicitly assume increasing time order. Get in the habit of calling \`.sort_index()\` right after setting a datetime index, before doing anything else with it.`,
        },
        {
          slug: "resampling-time-series",
          title: "Resampling Time Series Data",
          estimatedMinutes: 9,
          content: `# Resampling Time Series Data

**Resampling** changes the frequency of a time series — turning daily data into monthly summaries, or hourly readings into daily averages. It's conceptually a groupby where the "group" is a fixed time interval instead of a category column.

## Downsampling: higher frequency to lower

\`\`\`python
import pandas as pd

dates = pd.date_range("2026-01-01", periods=10, freq="D")
df = pd.DataFrame({"amount": [10, 12, 8, 15, 9, 11, 14, 7, 13, 10]}, index=dates)

df.resample("3D").sum()     # total every 3 days
df.resample("W").mean()     # weekly average
df.resample("ME").sum()     # monthly total ("ME" = month end)
\`\`\`

Just like \`groupby\`, \`.resample()\` requires an aggregation call afterward (\`.sum()\`, \`.mean()\`, \`.count()\`, etc.) — \`df.resample("W")\` on its own just describes the grouping, deferring the actual computation exactly like \`df.groupby(...)\` does.

## Upsampling: lower frequency to higher

Going the other direction — say, from monthly to daily — creates new time slots that need to be filled in somehow, since there's no new data to aggregate.

\`\`\`python
monthly = df.resample("ME").sum()
monthly.resample("D").ffill()    # forward-fill each month's value across its days
monthly.resample("D").interpolate()   # or smoothly interpolate between points
\`\`\`

## asfreq() vs resample()

\`.asfreq()\` is a simpler cousin of \`.resample()\` — it just reindexes onto the new frequency, taking whatever value already exists at each new timestamp (or \`NaN\` if none exists), without any aggregation.

\`\`\`python
df.asfreq("D")   # reindex onto a daily frequency, no aggregation, gaps become NaN
\`\`\`

Use \`.resample()\` when you need to aggregate multiple original observations into each new bucket; use \`.asfreq()\` when you just need to change the regularity of the index without combining values.

## Common frequency strings

\`"D"\` (day), \`"W"\` (week), \`"ME"\` (month end), \`"QE"\` (quarter end), \`"YE"\` (year end), and \`"h"\` (hour) cover the vast majority of real-world resampling needs.

## Common mistake

Resampling assumes your index is a proper, sorted \`DatetimeIndex\` — resampling a DataFrame whose date column hasn't been converted with \`pd.to_datetime\` and set as the index (still plain text, or still a regular integer index) will raise an error or silently produce nonsense. Always confirm \`df.index\` is a \`DatetimeIndex\` and sorted (from the previous lesson) before resampling.`,
        },
        {
          slug: "rolling-windows-and-shifting",
          title: "Rolling Windows and Shifting",
          estimatedMinutes: 8,
          content: `# Rolling Windows and Shifting

Two more time series building blocks round out this module: **rolling windows**, for smoothing noisy data with a moving average, and **shifting**, for comparing a value to an earlier (or later) point in the same series.

## Rolling windows

\`\`\`python
import pandas as pd

dates = pd.date_range("2026-01-01", periods=10, freq="D")
df = pd.DataFrame({"amount": [10, 12, 8, 15, 9, 11, 14, 7, 13, 10]}, index=dates)

df["rolling_3d_avg"] = df["amount"].rolling(window=3).mean()
print(df)
\`\`\`

Each value in \`rolling_3d_avg\` is the mean of that row and the two rows before it — a classic **moving average** used to smooth out day-to-day noise and reveal an underlying trend. Notice the first two rows are \`NaN\`, because a full 3-row window isn't available yet at the start of the series.

\`\`\`python
df["amount"].rolling(window=3).sum()     # rolling sum instead of mean
df["amount"].rolling(window=3, min_periods=1).mean()  # allow partial windows at the start
\`\`\`

\`min_periods=1\` is useful whenever you'd rather get a (less stable) average from fewer points than lose the first several rows to \`NaN\` entirely.

## Shifting values

\`.shift()\` moves values forward or backward along the index, which is the key building block for period-over-period comparisons.

\`\`\`python
df["amount_yesterday"] = df["amount"].shift(1)     # shift forward — "what was it 1 row ago"
df["amount_next_day"] = df["amount"].shift(-1)     # shift backward — "what will it be 1 row ahead"
df["day_over_day_change"] = df["amount"] - df["amount"].shift(1)
\`\`\`

## diff() and pct_change(): shift's common shortcuts

Because "current value minus previous value" is so common, pandas provides dedicated shortcuts rather than requiring you to write \`.shift()\` and subtract manually every time.

\`\`\`python
df["amount"].diff()          # equivalent to: df["amount"] - df["amount"].shift(1)
df["amount"].pct_change()    # percentage change from the previous row
\`\`\`

## Mental model

Rolling windows answer "what does the recent trend look like, smoothed out?" — useful for charts and for reducing noise. Shifting and its shortcuts answer "how does this point compare to an earlier one?" — useful for growth rates and period-over-period metrics. Both patterns show up constantly together in real dashboards: a smoothed trend line, plus a day-over-day or year-over-year percentage change metric next to it.

## Common mistake

Both \`.rolling()\` and \`.shift()\` introduce \`NaN\` values at the start (or end, for a negative shift) of the resulting Series — forgetting this and immediately summing or averaging a rolling/shifted column without handling those \`NaN\`s can silently skew a downstream calculation. Check \`.isna().sum()\` on any new rolling or shifted column before using it further, exactly as you learned to do with missing data in Module 5.`,
        },
        {
          slug: "expanding-and-ewm-windows",
          title: "Expanding and Exponentially Weighted Windows",
          estimatedMinutes: 8,
          content: `# Expanding and Exponentially Weighted Windows

The previous lesson's rolling window always looks at a *fixed* number of recent rows. Two close relatives round out pandas' window-function toolkit: an **expanding** window, which grows to include everything from the start of the series, and an **exponentially weighted** window, which weights recent observations more heavily than older ones instead of treating every row in the window equally.

## Expanding windows: running totals and running averages

\`\`\`python
import pandas as pd

dates = pd.date_range("2026-01-01", periods=6, freq="D")
df = pd.DataFrame({"amount": [10, 12, 8, 15, 9, 11]}, index=dates)

df["running_total"] = df["amount"].expanding().sum()
df["running_avg"] = df["amount"].expanding().mean()
print(df)
\`\`\`

Unlike \`.rolling(window=3)\`, which always looks at exactly 3 rows, \`.expanding()\` looks at *every* row seen so far — row 5's \`running_avg\` is the mean of all 5 rows up to that point, not just the last 3. This is exactly the computation behind a "year-to-date total" or "cumulative average" metric in a dashboard.

\`\`\`python
df["amount"].cumsum()    # equivalent to expanding().sum() for the plain running total case
\`\`\`

\`.cumsum()\` is a direct shortcut for the single most common expanding calculation; reach for \`.expanding()\` itself when you need a statistic other than a simple running sum, like a running standard deviation or running minimum.

## Exponentially weighted (EWM) windows

A simple moving average weights every row in its window equally, and a row falls out of the window abruptly once it's \`window\` rows old. An **exponentially weighted moving average (EWMA)** instead lets every past observation still tug on the current average — the most recent points influence it more, older points influence it less, and there's no hard cutoff.

\`\`\`python
df["ewma"] = df["amount"].ewm(span=3).mean()
print(df[["amount", "running_avg", "ewma"]])
\`\`\`

\`span\` controls how quickly old observations "decay" in influence — a smaller \`span\` weights recent data more heavily and reacts faster to a real change, while a larger \`span\` smooths more aggressively and reacts more slowly, similar to choosing a wider vs. narrower rolling window.

## Choosing between the three

- **\`.rolling(window=n)\`** — "what's the average of exactly the last n periods?" Sharp cutoff, equal weight within the window.
- **\`.expanding()\`** — "what's the running total/average of everything so far?" No cutoff, grows every row.
- **\`.ewm(span=n)\`** — "what's a smoothed average that reacts to recent changes faster than an equally-weighted window would?" No hard cutoff, but recent points matter more.

## Mental model

Reach for \`.expanding()\` whenever the business question is naturally cumulative — total revenue so far this year, total signups since launch. Reach for \`.ewm()\` when you want a moving average that responds a bit faster to recent changes than a plain rolling average would, without a rolling window's abrupt drop of old data — this is exactly why EWMA is a standard choice for smoothing volatile financial or sensor data.

## Common mistake

Assuming \`.expanding()\` and \`.rolling()\` produce similar-looking output and are interchangeable — they answer genuinely different questions. A \`.rolling(window=3).mean()\` chart resets its "memory" every 3 rows, while an \`.expanding().mean()\` chart gets progressively smoother and less reactive to new data as the series gets longer, because each new point is increasingly diluted by an ever-growing history. Pick the one that matches the actual question before reading meaning into the shape of the resulting chart.`,
        },
      ],
    },
    {
      title: "Statistical Analysis Fundamentals",
      lessons: [
        {
          slug: "distributions-and-standardization",
          title: "Understanding Distributions and Standardization (Z-Scores)",
          estimatedMinutes: 9,
          content: `# Understanding Distributions and Standardization (Z-Scores)

Module 9 introduced \`.describe()\` and \`.corr()\` as first-pass summary tools. This lesson goes a step further into the shape of a numeric column's distribution, and introduces the **z-score**, the standard way to compare values that are measured on completely different scales.

## Visualizing and describing a distribution's shape

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "amount": [12, 15, 14, 13, 90, 16, 11, 14, 15, 13],
})

df["amount"].hist(bins=10)
df["amount"].skew()      # a positive number here — a long right tail from that 90
df["amount"].kurt()      # "tailedness" relative to a normal distribution
\`\`\`

**Skewness** measures asymmetry — a large positive skew (like this example, dragged up by the value 90) means a long tail toward high values, and it's often the first numeric clue that a mean will be a misleading "typical value" compared to the median.

\`\`\`python
df["amount"].mean()      # pulled upward by the 90
df["amount"].median()    # much more representative of most of the data here
\`\`\`

## Standardizing with z-scores

A **z-score** rescales a value to "how many standard deviations away from the mean is this?" — it makes values from completely different columns (or different units) directly comparable.

\`\`\`python
df["amount_z"] = (df["amount"] - df["amount"].mean()) / df["amount"].std()
print(df[["amount", "amount_z"]])
\`\`\`

A z-score of 0 means "exactly average"; a z-score of +2 or beyond is often used as a rough rule-of-thumb threshold for flagging an outlier, since roughly 95% of values in a normal distribution fall within 2 standard deviations of the mean.

\`\`\`python
outliers = df[df["amount_z"].abs() > 2]
\`\`\`

## Standardizing multiple columns at once

Z-scoring is especially useful before comparing or combining columns measured in different units — like combining a "price in dollars" column with a "rating out of 5" column into one blended score.

\`\`\`python
scores = pd.DataFrame({"price": [19.99, 8.00, 42.00], "rating": [4.2, 3.8, 4.9]})
z_scores = (scores - scores.mean()) / scores.std()
z_scores["blended_score"] = z_scores["rating"] - z_scores["price"]   # higher rating, lower price wins
\`\`\`

Without standardizing first, a raw \`price - rating\` calculation would be meaningless — the two columns aren't on comparable scales, so the dollar values would completely dominate the result.

## Mental model

A distribution's shape — not just its mean — tells you whether summary statistics like the mean can be trusted at face value. Skew and a quick histogram are the fastest way to catch a distribution where the mean is being dragged around by a handful of extreme values, which is exactly the situation where the median (Module 9) or a z-score-based outlier check is more informative than the mean alone.

## Common mistake

Applying a fixed z-score cutoff (like "greater than 2 is an outlier") without first checking the shape of the distribution can misfire badly on a skewed or non-normal distribution, where the usual "roughly 95% within 2 standard deviations" rule of thumb doesn't hold. Always look at a histogram before trusting a z-score-based outlier rule on data that might not be roughly bell-shaped.`,
        },
        {
          slug: "hypothesis-testing-basics-scipy",
          title: "Basic Hypothesis Testing with SciPy",
          estimatedMinutes: 9,
          content: `# Basic Hypothesis Testing with SciPy

Descriptive statistics and z-scores describe *what* the data looks like. **Hypothesis testing** answers a different, more specific question: is a difference you're seeing between two groups likely to be real, or could it plausibly be due to random chance? \`scipy.stats\` is the standard library for these tests, and it plugs directly into pandas Series.

## The core idea: the p-value

A hypothesis test starts from a **null hypothesis** — usually "there is no real difference" — and computes a **p-value**: roughly, the probability of seeing a difference at least this large if the null hypothesis were actually true. A small p-value (conventionally below 0.05) is treated as evidence against the null hypothesis.

## Comparing two group means: the t-test

\`\`\`python
import pandas as pd
from scipy import stats

df = pd.DataFrame({
    "group": ["A"] * 5 + ["B"] * 5,
    "score": [82, 85, 79, 88, 84, 91, 95, 89, 93, 90],
})

group_a = df.loc[df["group"] == "A", "score"]
group_b = df.loc[df["group"] == "B", "score"]

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
\`\`\`

\`ttest_ind\` (an independent-samples t-test) checks whether two groups' means are far enough apart, relative to their spread, to be unlikely under "no real difference." A p-value below 0.05 here would suggest group B's scores are genuinely higher, not just higher in this particular sample by chance.

## Comparing categorical proportions: the chi-square test

For categorical data — like whether conversion rate differs between two marketing campaigns — the chi-square test is the equivalent tool.

\`\`\`python
observed = pd.DataFrame(
    [[120, 80], [90, 110]],
    index=["Campaign A", "Campaign B"],
    columns=["Converted", "Not Converted"],
)
chi2, p_value, dof, expected = stats.chi2_contingency(observed)
print(f"chi2 = {chi2:.3f}, p = {p_value:.4f}")
\`\`\`

\`chi2_contingency\` takes a table of counts (rows = groups, columns = categories) and tests whether the categorical outcome is independent of group membership — a small p-value here suggests conversion really does differ by campaign.

## Correlation significance

Module 9's \`.corr()\` gives you a correlation coefficient, but not whether that correlation is statistically meaningful versus just sample noise. \`scipy.stats.pearsonr\` gives you both at once.

\`\`\`python
corr, p_value = stats.pearsonr(df["score"], df.index.to_numpy())
\`\`\`

## Mental model

Descriptive statistics (mean, median, correlation) describe the sample you actually have. Hypothesis tests ask a more careful question: would you expect to see a pattern this strong even if nothing real were going on? A small p-value doesn't prove a real-world cause — it's evidence against pure chance being the explanation, nothing more, and it says nothing about *practical* significance (a tiny, real difference can still produce a small p-value on a large enough sample).

## Common mistake

Treating a p-value just above or below 0.05 as a hard, meaningful line ("p = 0.049 means real, p = 0.051 means not") over-interprets a somewhat arbitrary conventional threshold. Report the actual p-value and effect size together, and be especially cautious interpreting a single test run on a small sample — the t-test and chi-square examples above use tiny illustrative datasets, and real analysis needs a large enough sample for these tests to be meaningful at all.`,
        },
      ],
    },
    {
      title: "Exporting Results and Reporting",
      lessons: [
        {
          slug: "exporting-data-multiple-formats",
          title: "Exporting Data to Excel, JSON, and Other Formats",
          estimatedMinutes: 8,
          content: `# Exporting Data to Excel, JSON, and Other Formats

Module 2 covered \`to_csv\` as the default way to save results. Real deliverables, though, often need a different format — a multi-sheet Excel workbook for a business stakeholder, JSON for another system to consume, or a compact binary format for a pipeline that will re-read the same data in pandas later. This lesson rounds out the export side of everything you've read so far.

## Multi-sheet Excel exports

\`\`\`python
import pandas as pd

summary = pd.DataFrame({"region": ["West", "East"], "total": [145, 75]})
detail = pd.DataFrame({"order_id": [1, 2, 3], "amount": [50, 30, 75]})

with pd.ExcelWriter("report.xlsx") as writer:
    summary.to_excel(writer, sheet_name="Summary", index=False)
    detail.to_excel(writer, sheet_name="Detail", index=False)
\`\`\`

This is the same \`ExcelWriter\` pattern from the "Reading and Writing Excel Files" lesson, used here for writing a finished, multi-tab report rather than reading one in.

## JSON exports

\`\`\`python
detail.to_json("orders.json", orient="records", indent=2)
\`\`\`

As covered earlier, \`orient="records"\` produces a flat list of objects — the most broadly compatible shape for another program (or API) to consume.

## Efficient binary formats: Parquet

CSV and Excel are readable by humans, but they're slow to read/write and don't preserve dtypes exactly (everything round-trips through text). **Parquet** is a compact, column-oriented binary format built for exactly this: fast, dtype-preserving storage for data that will be read back into pandas (or another tool) later.

\`\`\`python
detail.to_parquet("orders.parquet")
reloaded = pd.read_parquet("orders.parquet")
reloaded.dtypes    # dtypes come back exactly as they were, unlike a round-trip through CSV
\`\`\`

For any dataset you'll be reading and writing repeatedly within a Python/pandas pipeline — rather than handing off to a non-technical stakeholder — Parquet is usually a better default than CSV: smaller on disk, faster to read, and it doesn't require re-inferring dtypes (and re-fixing date columns) every time you load it.

## Choosing a format

- **CSV** — universal, human-readable, good for small-to-medium handoffs to anyone or anything.
- **Excel** — when the audience is a stakeholder who will open it directly, especially with multiple related sheets.
- **JSON** — when the consumer is another program or API expecting nested or record-oriented data.
- **Parquet** — when the consumer is another pandas/Python (or Spark, or similar) process, and speed/size/dtype fidelity matter more than human readability.

## Common mistake

Round-tripping data through CSV repeatedly within a pipeline (write, then read back into a later step) silently loses dtype information every single time — a datetime column becomes text again, an integer column with any missing values becomes a float — forcing you to redo \`parse_dates\` and \`astype\` at every step. If a file only ever needs to move between pandas steps and never needs to be opened by a human, Parquet avoids this entire class of repeated cleanup.`,
        },
        {
          slug: "styling-dataframes-and-reports",
          title: "Styling DataFrames and Building Simple Reports",
          estimatedMinutes: 8,
          content: `# Styling DataFrames and Building Simple Reports

The final piece of turning analysis into something someone else can act on is presentation: a plain, unformatted table of numbers is harder to scan than one where the biggest values, the worst-performing rows, or an out-of-range figure are visually highlighted.

## The .style accessor

\`\`\`python
import pandas as pd

summary = pd.DataFrame({
    "region": ["West", "East", "North", "South"],
    "total_amount": [14500, 7600, 9200, 3100],
    "growth_pct": [0.06, -0.02, 0.01, -0.08],
})

summary.style.background_gradient(subset=["total_amount"], cmap="Greens")
\`\`\`

In a Jupyter notebook (Module 1), \`.style\` renders the DataFrame as a formatted HTML table with the requested visual treatment applied directly in the output cell — a \`background_gradient\` shades cells from light to dark based on their value, making the biggest numbers jump out immediately.

## Conditional formatting

\`\`\`python
def highlight_negative(val):
    color = "red" if val < 0 else "black"
    return f"color: {color}"

summary.style.applymap(highlight_negative, subset=["growth_pct"])
\`\`\`

\`\`\`python
summary.style.format({"total_amount": "\${:,.0f}", "growth_pct": "{:.1%}"})
\`\`\`

\`.format()\` controls how values are *displayed* (currency symbols, thousands separators, percentages) without changing the underlying numeric values used in any further calculation — display formatting and the real data are kept cleanly separate.

## Exporting a styled table

\`\`\`python
styled = summary.style.background_gradient(subset=["total_amount"], cmap="Greens")
styled.to_html("report.html")
\`\`\`

\`.to_html()\` on a \`Styler\` object preserves the visual formatting in the output file, unlike \`df.to_html()\` on a plain DataFrame, which produces an unstyled table.

## Building a simple text report

For a quick automated summary — an email body, a Slack message, a log entry — combining an f-string with a groupby result is often all that's needed, no special library required.

\`\`\`python
by_region = summary.set_index("region")["total_amount"]
top_region = by_region.idxmax()

report = f"""
Weekly Sales Summary
---------------------
Total across all regions: \${summary['total_amount'].sum():,.0f}
Top performing region: {top_region} (\${by_region.max():,.0f})
Regions with negative growth: {', '.join(summary.loc[summary['growth_pct'] < 0, 'region'])}
"""
print(report)
\`\`\`

This is the same "code, then a plain-English conclusion" habit from the course's closing capstone lesson — a report is just that habit, automated and made repeatable.

## Mental model

Aggregation (Module 7) tells you *what* the numbers are; styling and reporting decide how quickly someone else can act on them. A stakeholder scanning a styled, highlighted summary table (or reading three sentences of plain-English summary) will find the important finding in seconds — the same person facing a wall of unformatted numbers has to do that analysis work themselves, which mostly means it doesn't get done.

## Common mistake

Baking display formatting (like rounding or adding a \`$\` sign) directly into the underlying data — for example, converting a numeric column to a string like \`"$14,500"\` — makes it look right once, but breaks every future sort, filter, or aggregation on that column, since it's no longer numeric. Always keep formatting in the \`.style\`/\`.format()\` layer (or apply it only at the very last step before display), and keep the underlying DataFrame's dtypes numeric for as long as possible.`,
        },
      ],
    },
    {
      title: "Visualization and the EDA Workflow",
      lessons: [
        {
          slug: "visualization-fundamentals",
          title: "Data Visualization Fundamentals with Matplotlib",
          estimatedMinutes: 10,
          content: `# Data Visualization Fundamentals with Matplotlib

Numbers in a table only go so far — a chart often reveals a trend, an outlier, or a relationship instantly that would take paragraphs of statistics to describe. **Matplotlib** is the foundational Python plotting library, and pandas' own plotting (next lesson) is built directly on top of it.

## Figure and Axes: the two core objects

\`\`\`python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot([1, 2, 3, 4], [10, 15, 13, 18])
ax.set_title("Weekly Sales")
ax.set_xlabel("Week")
ax.set_ylabel("Amount")
plt.show()
\`\`\`

A **Figure** is the whole image; an **Axes** is one set of plotted data with its own x/y coordinates (a figure can hold several Axes, e.g. for a grid of subplots). Learning this \`fig, ax = plt.subplots()\` pattern first, rather than matplotlib's older shortcut functions, pays off the moment you need more than one chart on the page.

## The core chart types

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

axes[0, 0].plot([1, 2, 3, 4], [10, 15, 13, 18])           # line — trend over an ordered axis
axes[0, 1].bar(["A", "B", "C"], [30, 45, 20])             # bar — compare categories
axes[1, 0].hist([1, 2, 2, 3, 3, 3, 4, 4, 5], bins=5)       # histogram — distribution of one variable
axes[1, 1].scatter([1, 2, 3, 4], [10, 13, 9, 17])          # scatter — relationship between two variables

plt.tight_layout()
plt.show()
\`\`\`

Each chart type answers a different question: **line** charts show change over an ordered axis (usually time), **bar** charts compare discrete categories, **histograms** show the distribution/shape of a single numeric variable, and **scatter** plots reveal the relationship between two numeric variables — often the natural next step after computing a correlation in Module 9.

## Labeling and saving

\`\`\`python
ax.set_title("Weekly Sales")
ax.legend(["Region West"])
fig.savefig("weekly_sales.png", dpi=150, bbox_inches="tight")
\`\`\`

An unlabeled chart is close to useless to anyone but the person who made it five minutes ago — always set a title and axis labels before sharing a plot with someone else.

## Common mistake

Picking the wrong chart type for the question is more common than any coding error — using a line chart for unordered categories (implying a trend that doesn't exist), or a bar chart to compare so many categories it becomes unreadable, are both frequent. Before writing any plotting code, first say out loud what question the chart should answer ("how did sales change over time?" → line; "which region sold the most?" → bar) and let that pick the chart type.`,
        },
        {
          slug: "plotting-with-pandas",
          title: "Plotting Directly from pandas",
          estimatedMinutes: 8,
          content: `# Plotting Directly from pandas

Because pandas is built on matplotlib, every Series and DataFrame has a built-in \`.plot()\` method — a fast shortcut for exploratory charts, without writing matplotlib boilerplate for every quick look at your data.

## The .plot() method

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr"],
    "west": [50, 65, 60, 75],
    "east": [30, 35, 45, 40],
}).set_index("month")

df.plot(kind="line", title="Sales by Region")
df.plot(kind="bar", title="Sales by Region")
df["west"].plot(kind="hist", title="Distribution of West Sales")
\`\`\`

\`kind\` accepts \`"line"\` (the default), \`"bar"\`, \`"barh"\`, \`"hist"\`, \`"box"\`, \`"scatter"\`, and more — covering the vast majority of exploratory charts without ever importing matplotlib directly, though matplotlib is doing the work underneath.

## Plotting straight from a groupby result

This is where pandas plotting really shines for fast exploratory analysis — no separate data-shaping step required.

\`\`\`python
sales = pd.DataFrame({
    "region": ["West", "East", "West", "East", "West"],
    "amount": [50, 30, 75, 45, 60],
})
sales.groupby("region")["amount"].sum().plot(kind="bar", title="Total Sales by Region")
\`\`\`

## Scatter plots need explicit x and y

Unlike line and bar charts, a scatter plot needs to be told which column is which axis, since there's no natural "one column per line" structure to fall back on.

\`\`\`python
df2 = pd.DataFrame({"price": [10, 20, 15, 30], "quantity": [5, 3, 4, 1]})
df2.plot(kind="scatter", x="price", y="quantity", title="Price vs Quantity")
\`\`\`

## Combining pandas' shortcut with matplotlib control

\`.plot()\` returns a matplotlib \`Axes\` object, so you can keep customizing it with the fundamentals from the previous lesson.

\`\`\`python
ax = df.plot(kind="line", title="Sales by Region")
ax.set_ylabel("Amount ($)")
ax.legend(loc="upper left")
\`\`\`

## Mental model

Reach for pandas' \`.plot()\` during exploration — when you want to see a trend, distribution, or comparison in one line, right after a groupby or a filter. Reach for matplotlib directly (Figure/Axes) when you're building a polished, multi-panel chart meant for a report or a presentation. Most real analysis workflows use both: dozens of quick \`.plot()\` calls while exploring, and a handful of carefully-built matplotlib figures for the final output.

## Common mistake

Calling \`.plot()\` on a DataFrame with many numeric columns of very different scales (e.g., \`"amount"\` in the thousands next to \`"discount_pct"\` between 0 and 1) plots them on the same y-axis by default, squashing the smaller series into an invisible flat line. Either plot such columns separately, or use \`secondary_y\` to give one of them its own axis.`,
        },
        {
          slug: "capstone-end-to-end-eda",
          title: "Capstone: End-to-End Exploratory Data Analysis",
          estimatedMinutes: 12,
          content: `# Capstone: End-to-End Exploratory Data Analysis

This final lesson doesn't introduce new pandas methods — it strings together everything from the entire course into the workflow you'll actually repeat on every new dataset you're handed. **Exploratory Data Analysis (EDA)** is the disciplined process of getting to know a dataset before drawing conclusions from it.

## The workflow, step by step

**1. Load and get oriented (Module 2)**

\`\`\`python
import pandas as pd

df = pd.read_csv("orders.csv", parse_dates=["order_date"])
df.shape
df.head()
df.info()
df.describe()
\`\`\`

Before anything else: how big is this dataset, what are the columns, what types did pandas infer, and does anything in \`.describe()\` already look implausible (negative amounts, impossible dates)?

**2. Clean (Module 5)**

\`\`\`python
df.isna().sum()                          # where is data missing, and how much?
df = df.dropna(subset=["customer_id"])   # drop rows missing something essential
df["amount"] = df["amount"].fillna(df["amount"].median())  # fill less-critical gaps
df = df.drop_duplicates(subset=["order_id"])
df["region"] = df["region"].str.strip().str.title()
\`\`\`

Every cleaning decision here should be deliberate and, ideally, written down as a comment — six months from now, you or a teammate will want to know *why* rows were dropped instead of filled.

**3. Explore relationships (Modules 7 and 9)**

\`\`\`python
by_region = df.groupby("region").agg(
    total_amount=("amount", "sum"),
    avg_amount=("amount", "mean"),
    order_count=("order_id", "count"),
)
df[["amount", "quantity"]].corr()
\`\`\`

**4. Reshape for the question you're asking (Module 10)**

\`\`\`python
monthly_by_region = df.pivot_table(
    index=df["order_date"].dt.to_period("M"),
    columns="region",
    values="amount",
    aggfunc="sum",
)
\`\`\`

**5. Bring in the time dimension (Module 11)**

\`\`\`python
ts = df.set_index("order_date").sort_index()
monthly_total = ts["amount"].resample("ME").sum()
monthly_total.rolling(3).mean()   # a smoothed 3-month trend
\`\`\`

**6. Visualize and summarize (Module 14)**

\`\`\`python
monthly_total.plot(kind="line", title="Monthly Revenue Trend")
by_region["total_amount"].plot(kind="bar", title="Revenue by Region")
\`\`\`

**7. Write down what you found**

The workflow isn't complete until the numbers become a sentence: *"West accounts for 58% of revenue and is growing roughly 6% month-over-month, while East has been flat since March — worth investigating whether that's a seasonal pattern or a genuine slowdown."* A pile of correct pandas output that nobody can act on isn't yet an analysis.

## Mental model

EDA is a loop, not a straight line: exploring often reveals a new cleaning issue (an outlier you didn't catch at first), which sends you back a step. Expect to cycle through load → clean → explore → reshape/visualize several times on any real dataset, refining your understanding — and your code — each pass.

## Try it yourself

Pick any CSV dataset you have access to (or search for a small public one) and run it through all seven steps above end to end: get oriented, clean it, compute at least one grouped aggregation, reshape it once with \`pivot_table\` or \`melt\`, and produce one chart. Then write two or three sentences summarizing the single most interesting thing you found. That habit — code, then a plain-English conclusion — is the actual deliverable of data analysis work, and it's the skill this entire course has been building toward.`,
        },
      ],
      quiz: {
        title: "Tier 3 Checkpoint: Reshaping, Time Series & Visualization",
        questions: [
          {
            text: "What is the key difference between `df.pivot()` and `df.pivot_table()`?",
            optionA: "pivot() can aggregate duplicate index/column combinations; pivot_table() cannot",
            optionB: "pivot_table() can aggregate duplicate index/column combinations with a function like sum or mean; plain pivot() raises an error if combinations aren't unique",
            optionC: "They are entirely unrelated methods with no overlap in purpose",
            optionD: "pivot() only works on numeric columns",
            correctOption: "B",
          },
          {
            text: "In `pd.melt(wide, id_vars='name', value_vars=['jan_sales', 'feb_sales'])`, what is the purpose of `id_vars`?",
            optionA: "It lists the columns that should be unpivoted into rows",
            optionB: "It lists the column(s) that identify a row and should be kept as-is rather than unpivoted",
            optionC: "It sets the name of the new value column",
            optionD: "It removes duplicate rows before melting",
            correctOption: "B",
          },
          {
            text: "After `grouped = df.groupby(['region', 'product'])['amount'].sum()`, what does `grouped.unstack()` do?",
            optionA: "It deletes the region and product columns entirely",
            optionB: "It takes the innermost index level (by default) and pivots it out into columns, producing a wide grid",
            optionC: "It converts the Series back into the original ungrouped DataFrame",
            optionD: "It sorts the Series by value instead of by index",
            correctOption: "B",
          },
          {
            text: "Why is `pd.to_datetime()` an important step before doing time series analysis on a date column loaded from CSV?",
            optionA: "CSV files cannot contain dates at all without this conversion",
            optionB: "Without conversion, the column is just plain text (object dtype), so pandas can't use it for date-based indexing, arithmetic, or the .dt accessor",
            optionC: "It automatically removes duplicate rows",
            optionD: "It is only needed if the dates are stored in a non-English language",
            correctOption: "B",
          },
          {
            text: "With a DatetimeIndex in place, what does `df.loc['2026-01']` select?",
            optionA: "Only the single row dated exactly January 1st, 2026",
            optionB: "Every row from the year 2026 only, ignoring the month",
            optionC: "Every row falling within January 2026, using pandas' partial-string indexing",
            optionD: "It raises an error, since partial date strings aren't supported by .loc",
            correctOption: "C",
          },
          {
            text: "What is the fundamental difference between `.resample()` and a plain `groupby()`?",
            optionA: "resample() groups rows into fixed time intervals rather than by a categorical column's values",
            optionB: "resample() can only be used on numeric columns, never on a DatetimeIndex",
            optionC: "groupby() requires a sorted index, but resample() does not",
            optionD: "There is no meaningful difference; they are aliases of each other",
            correctOption: "A",
          },
          {
            text: "After `df['amount'].rolling(window=3).mean()`, why do the first two values in the result come back as NaN?",
            optionA: "Because rolling() only works on integer columns",
            optionB: "Because a full 3-row window isn't available yet until the third row",
            optionC: "Because the original amount column had missing values",
            optionD: "Because rolling() requires the DataFrame to be sorted in descending order",
            correctOption: "B",
          },
          {
            text: "Which chart type is most appropriate for showing how a single numeric variable, like order amounts, is distributed across its range of values?",
            optionA: "A line chart",
            optionB: "A histogram",
            optionC: "A scatter plot",
            optionD: "A pie chart of row counts",
            correctOption: "B",
          },
          {
            text: "When calling `.plot(kind='scatter', ...)` on a pandas DataFrame, what must you specify that line and bar plots don't strictly require?",
            optionA: "A title, since scatter plots cannot have one",
            optionB: "Explicit x and y column names, since there's no default 'one column per line' structure to fall back on",
            optionC: "A DatetimeIndex, since scatter plots only work on time series",
            optionD: "Nothing extra; scatter plots use the exact same defaults as line plots",
            correctOption: "B",
          },
          {
            text: "In a full exploratory data analysis (EDA) workflow, why is EDA usually described as an iterative loop rather than a single straight-line process?",
            optionA: "Because pandas requires every step to be repeated exactly three times",
            optionB: "Because exploring the data often surfaces new cleaning issues (like outliers), which sends you back to an earlier step to address them",
            optionC: "Because visualization must always come before any cleaning step",
            optionD: "Because groupby operations cannot be run more than once on the same DataFrame",
            correctOption: "B",
          },
        ],
      },
    },
  ],
};

export default content;
