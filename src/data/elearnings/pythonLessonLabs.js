const lab = (objective, scenario, code, output, challenge, solution) => ({
  objective,
  scenario,
  code: code.trim(),
  output: output.trim(),
  challenge,
  solution: solution.trim(),
});

export const pythonLessonLabs = {
  "python-for-data-science": lab(
    "Load a small dataset, inspect its structure and calculate a trustworthy business metric.",
    "A retail analyst needs the total revenue and the highest-value order before presenting the morning update.",
    `import pandas as pd

sales = pd.DataFrame({
    "order_id": [101, 102, 103],
    "units": [2, 1, 4],
    "unit_price": [499, 1299, 250]
})
sales["revenue"] = sales["units"] * sales["unit_price"]

print(sales)
print("Total revenue:", sales["revenue"].sum())
print("Largest order:", sales.loc[sales["revenue"].idxmax(), "order_id"])`,
    `   order_id  units  unit_price  revenue
0       101      2         499      998
1       102      1        1299     1299
2       103      4         250     1000
Total revenue: 3297
Largest order: 102`,
    "Add a 10% discount column and calculate revenue after discount. Which order remains the largest?",
    `sales["net_revenue"] = sales["revenue"] * 0.90
largest = sales.loc[sales["net_revenue"].idxmax(), "order_id"]
print(sales[["order_id", "net_revenue"]])
print(largest)`
  ),
  "variables-and-data-types": lab(
    "Choose data types that preserve meaning and verify values before analysis.",
    "Customer records mix identifiers, amounts and consent flags.",
    `customer_id = "C-1042"
order_total = 1499.50
items = 3
marketing_opt_in = False

for value in (customer_id, order_total, items, marketing_opt_in):
    print(type(value).__name__)`,
    `str
float
int
bool`,
    "Create variables for an invoice number, tax rate, quantity and payment status; print each type.",
    `invoice_no = "INV-204"
tax_rate = 0.18
quantity = 5
is_paid = True
print(type(invoice_no), type(tax_rate), type(quantity), type(is_paid))`
  ),
  "operators-and-expressions": lab(
    "Translate a business rule into a readable, testable Python expression.",
    "An order receives free delivery when its value is at least ₹999 or the customer is a member.",
    `order_value = 850
is_member = True
free_delivery = order_value >= 999 or is_member
delivery_fee = 0 if free_delivery else 79
print(free_delivery, delivery_fee)`,
    `True 0`,
    "Calculate profit and profit margin for revenue of 12,500 and cost of 8,750.",
    `revenue, cost = 12_500, 8_750
profit = revenue - cost
margin = profit / revenue * 100
print(profit, round(margin, 1))  # 3750 30.0`
  ),
  "strings-and-text-handling": lab(
    "Clean inconsistent text without accidentally changing valid information.",
    "A survey export contains padded names and inconsistent city capitalization.",
    `raw_name = "  shagun mehta  "
raw_city = "gurGAON"
name = raw_name.strip().title()
city = raw_city.strip().title()
slug = f"{name}-{city}".lower().replace(" ", "-")
print(name, city, slug, sep=" | ")`,
    `Shagun Mehta | Gurgaon | shagun-mehta-gurgaon`,
    "Normalize '  DATA analyst@Example.COM ' for comparison while preserving a display version.",
    `raw = "  DATA analyst@Example.COM "
comparison_email = raw.strip().lower()
display_email = raw.strip()
print(comparison_email, display_email)`
  ),
  "lists-tuples-dictionaries-and-sets": lab(
    "Select the right collection for ordered values, fixed records, keyed lookup and uniqueness.",
    "A recruiter needs ordered skills, an immutable coordinate, candidate lookup and unique cities.",
    `skills = ["Python", "SQL", "Pandas"]
office = (28.4595, 77.0266)
candidate = {"name": "Shagun", "score": 86}
cities = {"Delhi", "Gurgaon", "Delhi"}
print(skills[0], office[1], candidate["score"], len(cities))`,
    `Python 77.0266 86 2`,
    "Deduplicate a list of skills while preserving the original order.",
    `skills = ["SQL", "Python", "SQL", "Excel"]
unique_skills = list(dict.fromkeys(skills))
print(unique_skills)`
  ),
  "conditions-and-boolean-logic": lab(
    "Build mutually exclusive decision rules and test their boundaries.",
    "A dashboard assigns readiness bands from a score.",
    `score = 78
if score >= 85:
    band = "Interview ready"
elif score >= 70:
    band = "Nearly ready"
else:
    band = "Needs a plan"
print(band)`,
    `Nearly ready`,
    "Add an 'Excellent' band for 95+, then test scores 69, 70, 84, 85 and 95.",
    `def band(score):
    if score >= 95: return "Excellent"
    if score >= 85: return "Interview ready"
    if score >= 70: return "Nearly ready"
    return "Needs a plan"
print([band(x) for x in [69, 70, 84, 85, 95]])`
  ),
  "loops": lab(
    "Use iteration when each record needs the same transformation, while preferring vectorisation for tabular data.",
    "A compact report formats several model accuracy scores.",
    `scores = {"baseline": 0.71, "tree": 0.84, "forest": 0.88}
for model, score in scores.items():
    print(f"{model.title():<10} {score:.1%}")`,
    `Baseline   71.0%
Tree       84.0%
Forest     88.0%`,
    "Print only models scoring at least 80%, ordered from best to worst.",
    `ranked = sorted(scores.items(), key=lambda item: item[1], reverse=True)
for model, score in ranked:
    if score >= 0.80:
        print(model, f"{score:.1%}")`
  ),
  "functions": lab(
    "Write a small function with a clear contract, validation and reusable output.",
    "Analysts repeatedly calculate percentage change between reporting periods.",
    `def percentage_change(old, new):
    """Return percentage change from old to new."""
    if old == 0:
        raise ValueError("old value cannot be zero")
    return (new - old) / old * 100

print(round(percentage_change(200, 250), 1))`,
    `25.0`,
    "Extend the function with a digits parameter controlling rounding.",
    `def percentage_change(old, new, digits=1):
    if old == 0:
        raise ValueError("old value cannot be zero")
    return round((new - old) / old * 100, digits)`
  ),
  "scope-and-error-handling": lab(
    "Handle expected failures precisely without hiding programming errors.",
    "A CSV value may be blank or non-numeric and must become a safe missing value.",
    `def parse_amount(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None

print([parse_amount(v) for v in ["42.5", "", None, "bad"]])`,
    `[42.5, None, None, None]`,
    "Return both the parsed value and a meaningful validation message.",
    `def parse_amount(value):
    try:
        return float(value), None
    except (TypeError, ValueError):
        return None, f"Invalid amount: {value!r}"`
  ),
  "modules-packages-and-environments": lab(
    "Create a reproducible environment and import only the functionality a project needs.",
    "A teammate must be able to run the same analysis with compatible dependencies.",
    `# Terminal
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
python -m pip install pandas==2.2.3 numpy==2.1.3
python -m pip freeze > requirements.txt

# Python
from pathlib import Path
DATA_DIR = Path("data")`,
    `A local .venv directory and a versioned requirements.txt file.`,
    "Create a fresh environment, install JupyterLab and record exact dependency versions.",
    `python -m venv .venv
source .venv/bin/activate
python -m pip install jupyterlab
python -m pip freeze > requirements.txt`
  ),
  "creating-numpy-arrays": lab(
    "Create typed NumPy arrays and inspect their shape, dimensions and memory representation.",
    "Sensor readings need efficient numerical storage.",
    `import numpy as np
temperatures = np.array([[21.5, 22.1], [20.9, 23.0]], dtype="float32")
print(temperatures.shape, temperatures.ndim, temperatures.dtype)
print(temperatures.mean(axis=0))`,
    `(2, 2) 2 float32
[21.2  22.55]`,
    "Create a 3×4 array containing integers 0–11 and calculate each row total.",
    `values = np.arange(12).reshape(3, 4)
print(values.sum(axis=1))  # [ 6 22 38]`
  ),
  "indexing-and-slicing": lab(
    "Select rows and columns predictably and understand that basic slices can be views.",
    "A matrix stores monthly sales for three products.",
    `import numpy as np
sales = np.array([[10, 12, 15], [8, 9, 11], [20, 18, 22]])
print(sales[:, -1])
print(sales[sales[:, -1] >= 15])`,
    `[15 11 22]
[[10 12 15]
 [20 18 22]]`,
    "Select the first two months for products whose final-month sales exceed 12.",
    `selected = sales[sales[:, -1] > 12, :2]
print(selected)`
  ),
  "vectorised-operations": lab(
    "Replace row-by-row arithmetic with broadcasting and vectorised expressions.",
    "Prices need category-wide tax and discount calculations.",
    `import numpy as np
prices = np.array([499, 999, 1499], dtype=float)
discount = np.array([0.00, 0.10, 0.20])
net = prices * (1 - discount) * 1.18
print(np.round(net, 2))`,
    `[ 588.82 1060.94 1415.06]`,
    "Cap the resulting values at ₹1,200 without writing a loop.",
    `capped = np.minimum(net, 1200)
print(np.round(capped, 2))`
  ),
  "aggregation-and-reshaping": lab(
    "Reshape arrays safely and aggregate along the intended axis.",
    "Twelve weekly values must be summarized as three four-week periods.",
    `import numpy as np
weekly = np.arange(100, 220, 10)
periods = weekly.reshape(3, 4)
print(periods)
print(periods.mean(axis=1))`,
    `[[100 110 120 130]
 [140 150 160 170]
 [180 190 200 210]]
[115. 155. 195.]`,
    "Return the maximum for each week position across the three periods.",
    `print(periods.max(axis=0))  # [180 190 200 210]`
  ),
  "random-numbers-and-linear-algebra": lab(
    "Generate reproducible samples and apply matrix multiplication with compatible shapes.",
    "A simulation estimates three campaign outcomes from two features.",
    `import numpy as np
rng = np.random.default_rng(42)
features = rng.integers(1, 6, size=(3, 2))
weights = np.array([0.7, 0.3])
scores = features @ weights
print(features)
print(scores)`,
    `[[1 4]
 [4 3]
 [3 5]]
[1.9 3.7 3.6]`,
    "Standardize a numeric vector using its mean and standard deviation.",
    `x = np.array([10, 12, 14, 16])
z = (x - x.mean()) / x.std()
print(np.round(z, 2))`
  ),
  "series-and-dataframes": lab(
    "Construct a DataFrame, inspect its schema and select columns without losing labels.",
    "Candidate records arrive as a list of dictionaries.",
    `import pandas as pd
records = [{"name": "Asha", "score": 82}, {"name": "Ravi", "score": 91}]
df = pd.DataFrame(records)
print(df.dtypes)
print(df.loc[df["score"] >= 90, ["name", "score"]])`,
    `name     object
score     int64
   name  score
1  Ravi     91`,
    "Add a boolean interview_ready column using a threshold of 85.",
    `df["interview_ready"] = df["score"].ge(85)
print(df)`
  ),
  "reading-and-writing-data": lab(
    "Read external data with explicit types and export a clean result without an accidental index.",
    "Order IDs contain leading zeroes and must remain text.",
    `import pandas as pd
orders = pd.read_csv("orders.csv", dtype={"order_id": "string"}, parse_dates=["ordered_at"])
print(orders.info())
orders.to_csv("orders_clean.csv", index=False)`,
    `order_id remains a string; ordered_at becomes datetime64; the export has no index column.`,
    "Read only order_id, city and amount; treat NA and unknown as missing values.",
    `orders = pd.read_csv(
    "orders.csv",
    usecols=["order_id", "city", "amount"],
    na_values=["NA", "unknown"],
    dtype={"order_id": "string"},
)`
  ),
  "selecting-and-filtering-data": lab(
    "Combine boolean filters with loc and avoid ambiguous chained selection.",
    "Find high-value completed orders from Delhi.",
    `mask = (
    orders["city"].eq("Delhi")
    & orders["status"].eq("completed")
    & orders["amount"].ge(1000)
)
result = orders.loc[mask, ["order_id", "amount"]]
print(result)`,
    `Only matching rows and the two requested columns are returned.`,
    "Filter orders placed in Gurgaon or Noida with amounts between ₹500 and ₹2,000.",
    `mask = orders["city"].isin(["Gurgaon", "Noida"]) & orders["amount"].between(500, 2000)
result = orders.loc[mask]`
  ),
  "sorting-ranking-and-duplicates": lab(
    "Sort deterministically, rank within groups and define what makes a duplicate.",
    "Keep the latest customer record for every email address.",
    `customers = customers.sort_values("updated_at")
latest = customers.drop_duplicates(subset="email", keep="last")
latest["spend_rank"] = latest["spend"].rank(method="dense", ascending=False)
print(latest[["email", "spend_rank"]])`,
    `One latest record per email, ranked from highest to lowest spend.`,
    "Keep the highest-scoring application for each candidate_id.",
    `best = (applications.sort_values("score", ascending=False)
        .drop_duplicates("candidate_id", keep="first"))`
  ),
  "column-transformations": lab(
    "Create readable derived columns with assign, map and vectorised conditions.",
    "Order rows need revenue and a human-readable value band.",
    `import numpy as np
orders = orders.assign(revenue=orders["units"] * orders["unit_price"])
orders["band"] = np.select(
    [orders["revenue"].ge(2000), orders["revenue"].ge(1000)],
    ["high", "medium"], default="low"
)`,
    `Every row receives a numeric revenue and exactly one value band.`,
    "Map status codes P, S and C to Pending, Shipped and Cancelled; flag unknown codes.",
    `labels = {"P": "Pending", "S": "Shipped", "C": "Cancelled"}
orders["status_label"] = orders["status"].map(labels).fillna("Unknown")`
  ),
  "missing-data": lab(
    "Measure missingness before choosing whether to drop, fill or investigate values.",
    "A lead table has incomplete age and city fields.",
    `missing = leads.isna().mean().mul(100).sort_values(ascending=False)
print(missing)
leads["city"] = leads["city"].fillna("Unknown")
leads["age"] = leads["age"].fillna(leads["age"].median())`,
    `Missing percentages are reported first; city and age use documented, different strategies.`,
    "Drop rows only when customer_id is missing, then confirm no such rows remain.",
    `leads = leads.dropna(subset=["customer_id"])
assert leads["customer_id"].notna().all()`
  ),
  "groupby-and-aggregation": lab(
    "Use named aggregations so grouped results remain understandable.",
    "Management needs orders, revenue and average order value by city.",
    `city_summary = (orders.groupby("city", as_index=False)
    .agg(orders=("order_id", "nunique"),
         revenue=("amount", "sum"),
         avg_order=("amount", "mean"))
    .sort_values("revenue", ascending=False))
print(city_summary)`,
    `One row per city with clearly named metrics.`,
    "Calculate monthly unique customers and median order amount.",
    `monthly = orders.groupby("month", as_index=False).agg(
    customers=("customer_id", "nunique"), median_order=("amount", "median"))`
  ),
  "merging-and-joining-data": lab(
    "Choose the correct join and validate its expected relationship.",
    "Add customer segments to orders without unexpectedly multiplying rows.",
    `enriched = orders.merge(
    customers[["customer_id", "segment"]],
    on="customer_id", how="left", validate="many_to_one", indicator=True
)
print(enriched["_merge"].value_counts())`,
    `A join audit showing matched and unmatched order rows; duplicate customer keys raise an error.`,
    "Find customer IDs present in orders but missing from the customer table.",
    `audit = orders[["customer_id"]].drop_duplicates().merge(
    customers[["customer_id"]], on="customer_id", how="left", indicator=True)
missing_ids = audit.loc[audit["_merge"].eq("left_only"), "customer_id"]`
  ),
  "pivoting-and-reshaping": lab(
    "Move safely between tidy long data and reporting-friendly wide tables.",
    "Create a city-by-quarter revenue report.",
    `report = orders.pivot_table(
    index="city", columns="quarter", values="amount",
    aggfunc="sum", fill_value=0, margins=True
)
print(report)`,
    `Rows are cities, columns are quarters, and totals are included.`,
    "Convert wide columns sales_2025 and sales_2026 into year and sales columns.",
    `long = wide.melt(id_vars="product", var_name="year", value_name="sales")
long["year"] = long["year"].str.removeprefix("sales_").astype(int)`
  ),
  "dates-and-time-series-data": lab(
    "Parse dates explicitly, handle invalid values and resample using a time index.",
    "Daily transactions need monthly revenue totals.",
    `orders["ordered_at"] = pd.to_datetime(orders["ordered_at"], errors="coerce", utc=True)
invalid_dates = orders["ordered_at"].isna().sum()
monthly = (orders.dropna(subset=["ordered_at"])
    .set_index("ordered_at")["amount"].resample("MS").sum())
print(invalid_dates)
print(monthly)`,
    `Invalid dates are counted; valid orders are summed at month-start frequency.`,
    "Calculate a seven-day rolling average of daily revenue.",
    `daily = orders.set_index("ordered_at")["amount"].resample("D").sum()
rolling_7d = daily.rolling(7, min_periods=1).mean()`
  ),
  "eda-workflow": lab(
    "Perform a reproducible first-pass audit before drawing conclusions.",
    "A new sales dataset arrives with no documentation.",
    `print(df.shape)
print(df.head())
print(df.dtypes)
print(df.isna().sum())
print(df.nunique())
print(df.describe(include="all").T)`,
    `A compact audit of size, sample values, schema, missingness, cardinality and distributions.`,
    "Add checks for duplicate rows and impossible negative revenue.",
    `print("duplicate rows:", df.duplicated().sum())
print("negative revenue:", df["revenue"].lt(0).sum())`
  ),
  "descriptive-statistics": lab(
    "Interpret centre and spread together instead of reporting a single average.",
    "Order values are skewed by a few enterprise purchases.",
    `values = orders["amount"].dropna()
summary = {
    "count": values.size,
    "mean": values.mean(),
    "median": values.median(),
    "std": values.std(),
    "p90": values.quantile(0.90),
}
print(pd.Series(summary).round(2))`,
    `A five-number business summary; compare mean with median to assess skew.`,
    "Calculate the interquartile range and coefficient of variation.",
    `iqr = values.quantile(.75) - values.quantile(.25)
cv = values.std() / values.mean()
print(iqr, cv)`
  ),
  "outliers": lab(
    "Flag unusual observations, investigate them and avoid deleting valid extremes automatically.",
    "Order values require an IQR-based review flag.",
    `q1, q3 = orders["amount"].quantile([0.25, 0.75])
iqr = q3 - q1
lower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr
orders["outlier"] = ~orders["amount"].between(lower, upper)
print(orders.loc[orders["outlier"], ["order_id", "amount"]])`,
    `A review list—not an automatic deletion list—of statistically unusual orders.`,
    "Winsorize a copy of amount at its 1st and 99th percentiles.",
    `lo, hi = orders["amount"].quantile([.01, .99])
orders["amount_capped"] = orders["amount"].clip(lo, hi)`
  ),
  "relationships-and-correlation": lab(
    "Measure association while checking shape, confounding and non-linear patterns.",
    "Explore relationships among spend, visits and tenure.",
    `numeric = customers[["spend", "visits", "tenure_months"]]
print(numeric.corr(method="pearson").round(2))
print(numeric.corr(method="spearman").round(2))`,
    `Two correlation matrices; differences can reveal sensitivity to rank or non-linearity.`,
    "Calculate correlations separately by customer segment and compare them.",
    `segment_corr = customers.groupby("segment").apply(
    lambda g: g["spend"].corr(g["visits"]), include_groups=False)
print(segment_corr)`
  ),
  "communicating-eda-findings": lab(
    "Turn analysis into a claim supported by evidence, context and a recommended action.",
    "Summarize a conversion-rate difference without overstating causality.",
    `summary = sessions.groupby("channel").agg(
    sessions=("session_id", "size"), conversions=("converted", "sum"))
summary["conversion_rate"] = summary["conversions"] / summary["sessions"]
print(summary.sort_values("conversion_rate", ascending=False))`,
    `A channel comparison containing both rates and denominators.`,
    "Write a three-sentence insight: finding, evidence with denominator, and next action.",
    `top = summary["conversion_rate"].idxmax()
row = summary.loc[top]
message = (f"{top} has the highest observed conversion rate at {row.conversion_rate:.1%}. "
           f"That result is based on {int(row.sessions):,} sessions. "
           "Validate the pattern by audience segment before reallocating budget.")`
  ),
  "matplotlib-fundamentals": lab(
    "Create a readable chart with an explicit figure, axes, labels and layout.",
    "Plot monthly revenue without relying on implicit global state.",
    `import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(monthly.index, monthly.values, marker="o", color="#087f8c")
ax.set(title="Monthly revenue", xlabel="Month", ylabel="Revenue (₹)")
ax.grid(axis="y", alpha=.2)
fig.tight_layout()
plt.show()`,
    `A labelled line chart with one axes object and unclipped labels.`,
    "Format the y-axis as ₹ values and save the figure at 160 DPI.",
    `from matplotlib.ticker import StrMethodFormatter
ax.yaxis.set_major_formatter(StrMethodFormatter("₹{x:,.0f}"))
fig.savefig("monthly_revenue.png", dpi=160, bbox_inches="tight")`
  ),
  "choosing-the-right-chart": lab(
    "Match chart type to analytical question rather than decoration.",
    "Compare category totals and show their ranking clearly.",
    `category = orders.groupby("category")["amount"].sum().sort_values()
ax = category.plot.barh(color="#1463ff", figsize=(7, 4))
ax.set(title="Revenue by category", xlabel="Revenue (₹)", ylabel="")`,
    `A sorted horizontal bar chart supporting accurate category comparison.`,
    "Use a histogram to examine order-value distribution and a line chart for daily revenue.",
    `orders["amount"].plot.hist(bins=20, title="Order-value distribution")
daily.plot.line(title="Daily revenue")`
  ),
  "seaborn-for-statistical-visualisation": lab(
    "Use Seaborn to compare distributions while preserving the underlying observations.",
    "Compare order values across customer segments.",
    `import seaborn as sns
import matplotlib.pyplot as plt
sns.set_theme(style="whitegrid")
ax = sns.boxplot(data=orders, x="segment", y="amount", color="#61d4c6")
sns.stripplot(data=orders, x="segment", y="amount", color="#07172f", alpha=.35, ax=ax)
ax.set(title="Order value by customer segment")
plt.show()`,
    `A distribution comparison combining summary boxes and visible observations.`,
    "Create a scatterplot of visits versus spend, coloured by segment, with a regression trend.",
    `sns.lmplot(data=customers, x="visits", y="spend", hue="segment", height=5)`
  ),
  "dashboard-design": lab(
    "Design a dashboard around decisions, definitions and comparison context.",
    "Prepare four validated metrics for a weekly commercial dashboard.",
    `metrics = {
    "revenue": orders["amount"].sum(),
    "orders": orders["order_id"].nunique(),
    "customers": orders["customer_id"].nunique(),
    "avg_order": orders.groupby("order_id")["amount"].sum().mean(),
}
assert metrics["revenue"] >= 0
print(pd.Series(metrics).round(2))`,
    `A validated metric layer that can feed any presentation library.`,
    "Add previous-period values and percentage change, handling a zero baseline safely.",
    `def safe_change(current, previous):
    return None if previous == 0 else (current - previous) / previous
comparison = {key: safe_change(value, previous[key]) for key, value in metrics.items()}`
  ),
  "visual-storytelling": lab(
    "Build a visual sequence that establishes context, reveals the driver and ends with action.",
    "Identify which category explains a monthly revenue decline.",
    `story = (orders.groupby(["month", "category"], as_index=False)["amount"].sum())
story["previous"] = story.groupby("category")["amount"].shift()
story["change"] = story["amount"] - story["previous"]
latest = story[story["month"].eq(story["month"].max())]
print(latest.sort_values("change").head(3))`,
    `The categories contributing most to the latest decline, ready for annotation.`,
    "Create a concise headline from the largest negative category change.",
    `driver = latest.nsmallest(1, "change").iloc[0]
headline = f"{driver.category} drove the decline, down ₹{abs(driver.change):,.0f} month over month"`
  ),
  "csv-and-excel-workflows": lab(
    "Import spreadsheet data defensively and export a review-ready workbook.",
    "Combine every monthly CSV in a controlled data directory.",
    `from pathlib import Path
import pandas as pd
files = sorted(Path("data/monthly").glob("sales_*.csv"))
frames = [pd.read_csv(file).assign(source_file=file.name) for file in files]
sales = pd.concat(frames, ignore_index=True)
assert len(sales) == sum(len(frame) for frame in frames)
sales.to_excel("sales_review.xlsx", index=False)`,
    `One combined table with source lineage and a row-count validation.`,
    "Export summary and exceptions as separate sheets in one workbook.",
    `with pd.ExcelWriter("review.xlsx") as writer:
    summary.to_excel(writer, sheet_name="Summary", index=False)
    exceptions.to_excel(writer, sheet_name="Exceptions", index=False)`
  ),
  "json-and-nested-data": lab(
    "Normalize nested JSON while retaining parent identifiers.",
    "An API returns orders with nested line items.",
    `payload = [{"order_id": 1, "items": [{"sku": "A", "qty": 2}, {"sku": "B", "qty": 1}]}]
items = pd.json_normalize(payload, record_path="items", meta="order_id")
print(items)`,
    `  sku  qty order_id
0   A    2        1
1   B    1        1`,
    "Normalize customer addresses and retain customer_id.",
    `addresses = pd.json_normalize(
    payload, record_path="addresses", meta="customer_id", errors="ignore")`
  ),
  "working-with-apis": lab(
    "Call an API with timeouts, status checks, pagination and explicit schema validation.",
    "Retrieve paginated public records without silently accepting a failed response.",
    `import requests
rows = []
url = "https://api.example.com/records"
while url:
    response = requests.get(url, timeout=15)
    response.raise_for_status()
    body = response.json()
    rows.extend(body.get("results", []))
    url = body.get("next")

df = pd.DataFrame(rows)
required = {"id", "created_at"}
assert required.issubset(df.columns)`,
    `A table containing every page, or an explicit exception when transport/schema validation fails.`,
    "Add an Authorization header sourced from an environment variable—not committed code.",
    `import os
headers = {"Authorization": f"Bearer {os.environ['API_TOKEN']}"}
response = requests.get(url, headers=headers, timeout=15)`
  ),
  "sql-from-python": lab(
    "Use parameterized SQL and load query results into a labelled DataFrame.",
    "Retrieve completed orders after a selected date from SQLite.",
    `import sqlite3
import pandas as pd
with sqlite3.connect("analytics.db") as conn:
    query = """SELECT order_id, customer_id, amount
               FROM orders WHERE status = ? AND ordered_at >= ?"""
    result = pd.read_sql_query(query, conn, params=("completed", "2026-01-01"))
print(result.head())`,
    `A DataFrame from a parameterized query; user values are not interpolated into SQL.`,
    "Write a grouped SQL query returning revenue and unique orders by city.",
    `query = """SELECT city, SUM(amount) AS revenue, COUNT(DISTINCT order_id) AS orders
               FROM orders GROUP BY city ORDER BY revenue DESC"""`
  ),
  "handling-larger-than-memory-data": lab(
    "Reduce memory pressure with selective columns, efficient dtypes and chunked aggregation.",
    "A multi-gigabyte CSV must be summarized by city.",
    `totals = None
for chunk in pd.read_csv(
    "orders.csv", usecols=["city", "amount"],
    dtype={"city": "category", "amount": "float32"}, chunksize=100_000
):
    part = chunk.groupby("city", observed=True)["amount"].sum()
    totals = part if totals is None else totals.add(part, fill_value=0)
print(totals.sort_values(ascending=False))`,
    `City totals calculated while only one chunk is resident in memory.`,
    "Track processed row count and assert it matches an expected control total.",
    `processed = 0
for chunk in pd.read_csv("orders.csv", chunksize=100_000):
    processed += len(chunk)
assert processed == expected_rows`
  ),
  "clean-python-for-data-work": lab(
    "Separate loading, transformation and validation into readable functions.",
    "Turn a one-off notebook transformation into reusable pipeline code.",
    `def clean_orders(df):
    required = {"order_id", "units", "unit_price"}
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")
    result = df.copy()
    result["revenue"] = result["units"] * result["unit_price"]
    return result

clean = clean_orders(raw_orders)`,
    `A new validated DataFrame; the caller's original data is not mutated.`,
    "Add type hints and a docstring describing inputs, output and raised errors.",
    `def clean_orders(df: pd.DataFrame) -> pd.DataFrame:
    """Validate order columns and return a copy with calculated revenue."""
    ...`
  ),
  "testing-data-code": lab(
    "Test values, schema and edge cases rather than merely checking that code runs.",
    "Protect a revenue calculation against regression.",
    `def test_clean_orders_calculates_revenue():
    source = pd.DataFrame({"order_id": [1], "units": [2], "unit_price": [499]})
    result = clean_orders(source)
    assert result.loc[0, "revenue"] == 998
    assert "revenue" not in source.columns

def test_clean_orders_rejects_missing_columns():
    with pytest.raises(ValueError, match="Missing columns"):
        clean_orders(pd.DataFrame({"order_id": [1]}))`,
    `Two passing tests covering the happy path and an important failure path.`,
    "Add a test proving an empty but correctly structured DataFrame is supported.",
    `def test_clean_orders_accepts_empty_frame():
    source = pd.DataFrame(columns=["order_id", "units", "unit_price"])
    assert clean_orders(source).empty`
  ),
  "logging-and-debugging": lab(
    "Record useful execution context without leaking secrets or replacing exceptions.",
    "A scheduled pipeline should reveal where and why processing failed.",
    `import logging
logger = logging.getLogger(__name__)

def process_orders(df):
    logger.info("Processing orders", extra={"row_count": len(df)})
    try:
        result = clean_orders(df)
    except ValueError:
        logger.exception("Order validation failed")
        raise
    logger.info("Processing complete", extra={"row_count": len(result)})
    return result`,
    `Structured start/completion messages, plus a traceback when validation fails.`,
    "Add logging for rejected rows using counts only—never customer details.",
    `rejected = df["amount"].lt(0).sum()
logger.warning("Rejected negative amounts", extra={"rejected_count": int(rejected)})`
  ),
  "data-science-project-structure": lab(
    "Organize code, data, tests and outputs so a teammate can reproduce the work.",
    "Turn an exploratory notebook into a portfolio-ready repository.",
    `project/
├── README.md
├── pyproject.toml
├── data/README.md
├── notebooks/01_exploration.ipynb
├── src/project/load.py
├── src/project/features.py
├── tests/test_features.py
└── reports/figures/`,
    `A repository where source code is testable, data provenance is documented and outputs are separated.`,
    "Write five README headings that let a reviewer reproduce and evaluate the project.",
    `# Business question
# Dataset and provenance
# Method
# Key findings
# Reproduce the analysis`
  ),
  "end-to-end-data-analysis-project": lab(
    "Deliver an auditable analysis from question and data validation through insight and recommendation.",
    "Investigate which customer segments are driving revenue growth.",
    `raw = pd.read_csv("orders.csv", parse_dates=["ordered_at"])
assert {"customer_id", "segment", "amount", "ordered_at"}.issubset(raw.columns)
clean = raw.dropna(subset=["customer_id", "amount"]).query("amount >= 0").copy()
clean["month"] = clean["ordered_at"].dt.to_period("M").astype(str)
result = clean.groupby(["month", "segment"], as_index=False)["amount"].sum()
result["growth"] = result.groupby("segment")["amount"].pct_change()
print(result.tail())`,
    `A validated monthly segment table with comparable growth rates.`,
    "Create a portfolio conclusion containing one finding, one limitation and one recommended next analysis.",
    `conclusion = {
    "finding": "State the strongest supported result with a number.",
    "limitation": "Name a data or causal limitation.",
    "next_step": "Propose a test or deeper segmentation that could change the decision.",
}`
  ),
  "python-syntax-cheat-sheet": lab("Recall essential Python syntax quickly.", "Use this as a reference while solving exercises.", `name = "Asha"                 # str
scores = [72, 88, 91]          # list
passed = [x for x in scores if x >= 80]
def average(values):
    return sum(values) / len(values)
print(f"{name}: {average(scores):.1f}")`, `Asha: 83.7`, "Modify the comprehension to return labelled pass/fail dictionaries.", `labels = [{"score": x, "passed": x >= 80} for x in scores]`),
  "numpy-cheat-sheet": lab("Recall core NumPy creation, selection and aggregation patterns.", "Use this reference for numerical arrays.", `a = np.arange(12).reshape(3, 4)
a.shape; a.dtype
a[:, 1]
a[a > 5]
a.mean(axis=0)
np.where(a > 5, 1, 0)`, `Shape (3, 4); selections preserve array semantics; axis=0 aggregates down rows.`, "Standardize every column independently.", `standardized = (a - a.mean(axis=0)) / a.std(axis=0)`),
  "pandas-cheat-sheet": lab("Recall reliable Pandas selection, transformation and aggregation patterns.", "Use this reference during analysis.", `df.info()
df.loc[df["amount"].gt(0), ["city", "amount"]]
df.assign(net=lambda x: x["amount"] * .82)
df.groupby("city", as_index=False).agg(revenue=("amount", "sum"))
df.merge(lookup, on="id", validate="many_to_one")`, `A concise sequence for inspect → select → transform → aggregate → join.`, "Add missingness and duplicate checks to the sequence.", `df.isna().mean().sort_values(ascending=False)
df.duplicated().sum()`),
  "visualisation-cheat-sheet": lab("Choose and produce charts that answer a defined analytical question.", "Use this reference before styling any chart.", `# Trend
ax.plot(date, value)
# Comparison
ax.barh(category, value)
# Distribution
ax.hist(value, bins=20)
# Relationship
ax.scatter(x, y, alpha=.5)
ax.set(title="Finding-led title", xlabel="Unit", ylabel="Unit")`, `Four chart families mapped to four common questions, with required labels.`, "Write a finding-led title for a chart showing a 12% Q2 revenue decline.", `ax.set_title("Revenue fell 12% in Q2, led by the North region")`),
  "python-data-science-interview-cheat-sheet": lab("Explain analysis choices and validate code under interview constraints.", "Practice a common group-ranking task aloud.", `# Top two products by revenue within each category
summary = (orders.groupby(["category", "product"], as_index=False)
    .agg(revenue=("amount", "sum")))
answer = (summary.sort_values(["category", "revenue"], ascending=[True, False])
    .groupby("category", as_index=False).head(2))
print(answer)`, `At most two highest-revenue products per category.`, "Explain complexity, tie behavior, missing-value assumptions and how you would test this.", `# For ties, use dense rank instead of head:
summary["rank"] = summary.groupby("category")["revenue"].rank(method="dense", ascending=False)
answer = summary[summary["rank"] <= 2]`),
};

