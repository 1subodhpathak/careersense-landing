import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Lightbulb,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { pythonLessonLabs } from "./pythonLessonLabs";

export const chapters = [
  {
    "id": "group-1",
    "title": "1. Python Foundations",
    "topics": [
      {
        "id": "python-for-data-science",
        "title": "Python for Data Science",
        "readTime": "10 min"
      },
      {
        "id": "variables-and-data-types",
        "title": "Variables and Data Types",
        "readTime": "10 min"
      },
      {
        "id": "operators-and-expressions",
        "title": "Operators and Expressions",
        "readTime": "10 min"
      },
      {
        "id": "strings-and-text-handling",
        "title": "Strings and Text Handling",
        "readTime": "10 min"
      },
      {
        "id": "lists-tuples-dictionaries-and-sets",
        "title": "Lists, Tuples, Dictionaries and Sets",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-2",
    "title": "2. Control Flow and Functions",
    "topics": [
      {
        "id": "conditions-and-boolean-logic",
        "title": "Conditions and Boolean Logic",
        "readTime": "10 min"
      },
      {
        "id": "loops",
        "title": "Loops",
        "readTime": "10 min"
      },
      {
        "id": "functions",
        "title": "Functions",
        "readTime": "10 min"
      },
      {
        "id": "scope-and-error-handling",
        "title": "Scope and Error Handling",
        "readTime": "10 min"
      },
      {
        "id": "modules-packages-and-environments",
        "title": "Modules, Packages and Environments",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-3",
    "title": "3. NumPy for Numerical Computing",
    "topics": [
      {
        "id": "creating-numpy-arrays",
        "title": "Creating NumPy Arrays",
        "readTime": "10 min"
      },
      {
        "id": "indexing-and-slicing",
        "title": "Indexing and Slicing",
        "readTime": "10 min"
      },
      {
        "id": "vectorised-operations",
        "title": "Vectorised Operations",
        "readTime": "10 min"
      },
      {
        "id": "aggregation-and-reshaping",
        "title": "Aggregation and Reshaping",
        "readTime": "10 min"
      },
      {
        "id": "random-numbers-and-linear-algebra",
        "title": "Random Numbers and Linear Algebra",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-4",
    "title": "4. Pandas Foundations",
    "topics": [
      {
        "id": "series-and-dataframes",
        "title": "Series and DataFrames",
        "readTime": "10 min"
      },
      {
        "id": "reading-and-writing-data",
        "title": "Reading and Writing Data",
        "readTime": "10 min"
      },
      {
        "id": "selecting-and-filtering-data",
        "title": "Selecting and Filtering Data",
        "readTime": "10 min"
      },
      {
        "id": "sorting-ranking-and-duplicates",
        "title": "Sorting, Ranking and Duplicates",
        "readTime": "10 min"
      },
      {
        "id": "column-transformations",
        "title": "Column Transformations",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-5",
    "title": "5. Data Cleaning and Analysis",
    "topics": [
      {
        "id": "missing-data",
        "title": "Missing Data",
        "readTime": "10 min"
      },
      {
        "id": "groupby-and-aggregation",
        "title": "GroupBy and Aggregation",
        "readTime": "10 min"
      },
      {
        "id": "merging-and-joining-data",
        "title": "Merging and Joining Data",
        "readTime": "10 min"
      },
      {
        "id": "pivoting-and-reshaping",
        "title": "Pivoting and Reshaping",
        "readTime": "10 min"
      },
      {
        "id": "dates-and-time-series-data",
        "title": "Dates and Time-Series Data",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-6",
    "title": "6. Exploratory Data Analysis",
    "topics": [
      {
        "id": "eda-workflow",
        "title": "EDA Workflow",
        "readTime": "10 min"
      },
      {
        "id": "descriptive-statistics",
        "title": "Descriptive Statistics",
        "readTime": "10 min"
      },
      {
        "id": "outliers",
        "title": "Outliers",
        "readTime": "10 min"
      },
      {
        "id": "relationships-and-correlation",
        "title": "Relationships and Correlation",
        "readTime": "10 min"
      },
      {
        "id": "communicating-eda-findings",
        "title": "Communicating EDA Findings",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-7",
    "title": "7. Data Visualisation",
    "topics": [
      {
        "id": "matplotlib-fundamentals",
        "title": "Matplotlib Fundamentals",
        "readTime": "10 min"
      },
      {
        "id": "choosing-the-right-chart",
        "title": "Choosing the Right Chart",
        "readTime": "10 min"
      },
      {
        "id": "seaborn-for-statistical-visualisation",
        "title": "Seaborn for Statistical Visualisation",
        "readTime": "10 min"
      },
      {
        "id": "dashboard-design",
        "title": "Dashboard Design",
        "readTime": "10 min"
      },
      {
        "id": "visual-storytelling",
        "title": "Visual Storytelling",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-8",
    "title": "8. Files, APIs and Databases",
    "topics": [
      {
        "id": "csv-and-excel-workflows",
        "title": "CSV and Excel Workflows",
        "readTime": "10 min"
      },
      {
        "id": "json-and-nested-data",
        "title": "JSON and Nested Data",
        "readTime": "10 min"
      },
      {
        "id": "working-with-apis",
        "title": "Working with APIs",
        "readTime": "10 min"
      },
      {
        "id": "sql-from-python",
        "title": "SQL from Python",
        "readTime": "10 min"
      },
      {
        "id": "handling-larger-than-memory-data",
        "title": "Handling Larger-than-Memory Data",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-9",
    "title": "9. Code Quality and Projects",
    "topics": [
      {
        "id": "clean-python-for-data-work",
        "title": "Clean Python for Data Work",
        "readTime": "10 min"
      },
      {
        "id": "testing-data-code",
        "title": "Testing Data Code",
        "readTime": "10 min"
      },
      {
        "id": "logging-and-debugging",
        "title": "Logging and Debugging",
        "readTime": "10 min"
      },
      {
        "id": "data-science-project-structure",
        "title": "Data Science Project Structure",
        "readTime": "10 min"
      },
      {
        "id": "end-to-end-data-analysis-project",
        "title": "End-to-End Data Analysis Project",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "group-10",
    "title": "10. Python Data Science Cheat Sheets",
    "topics": [
      {
        "id": "python-syntax-cheat-sheet",
        "title": "Python Syntax Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "numpy-cheat-sheet",
        "title": "NumPy Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "pandas-cheat-sheet",
        "title": "Pandas Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "visualisation-cheat-sheet",
        "title": "Visualisation Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "python-data-science-interview-cheat-sheet",
        "title": "Python Data Science Interview Cheat Sheet",
        "readTime": "10 min"
      }
    ]
  }
];
export const topicContent = {
  "python-for-data-science": {
    "eyebrow": "1. Python Foundations",
    "title": "Python for Data Science",
    "summary": "Learn python for data science through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of python for data science.",
      "Learn the Python or data-analysis methods most commonly used for python for data science.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Python for Data Science",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Python for Data Science for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Python for Data Science task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "variables-and-data-types": {
    "eyebrow": "1. Python Foundations",
    "title": "Variables and Data Types",
    "summary": "Learn variables and data types through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Use int, float, str, bool and None correctly.",
      "Understand mutable and immutable objects.",
      "Inspect and convert values with type(), int(), float() and str()."
    ],
    "workflow": [
      "Inspect the incoming value.",
      "Validate its expected type.",
      "Convert explicitly and handle invalid values."
    ],
    "mistakes": [
      "Mixing numbers and strings.",
      "Assuming imported data has correct types.",
      "Using unclear variable names."
    ],
    "cheat": [
      "type(x)",
      "int('12')",
      "float('3.14')",
      "str(42)",
      "bool(value)",
      "None"
    ],
    "prompts": [
      [
        "Beginner tutorial",
        "Teach Python variables and data types through a small sales-analysis example. Include int, float, string, boolean, list and dictionary."
      ],
      [
        "Practice",
        "Create 20 exercises on Python variables and data types. Put answers in a separate section."
      ]
    ]
  },
  "operators-and-expressions": {
    "eyebrow": "1. Python Foundations",
    "title": "Operators and Expressions",
    "summary": "Learn operators and expressions through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of operators and expressions.",
      "Learn the Python or data-analysis methods most commonly used for operators and expressions.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Operators and Expressions",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Operators and Expressions for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Operators and Expressions task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "strings-and-text-handling": {
    "eyebrow": "1. Python Foundations",
    "title": "Strings and Text Handling",
    "summary": "Learn strings and text handling through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of strings and text handling.",
      "Learn the Python or data-analysis methods most commonly used for strings and text handling.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Strings and Text Handling",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Strings and Text Handling for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Strings and Text Handling task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "lists-tuples-dictionaries-and-sets": {
    "eyebrow": "1. Python Foundations",
    "title": "Lists, Tuples, Dictionaries and Sets",
    "summary": "Learn lists, tuples, dictionaries and sets through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of lists, tuples, dictionaries and sets.",
      "Learn the Python or data-analysis methods most commonly used for lists, tuples, dictionaries and sets.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Lists, Tuples, Dictionaries and Sets",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Lists, Tuples, Dictionaries and Sets for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Lists, Tuples, Dictionaries and Sets task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "conditions-and-boolean-logic": {
    "eyebrow": "2. Control Flow and Functions",
    "title": "Conditions and Boolean Logic",
    "summary": "Learn conditions and boolean logic through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of conditions and boolean logic.",
      "Learn the Python or data-analysis methods most commonly used for conditions and boolean logic.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Conditions and Boolean Logic",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Conditions and Boolean Logic for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Conditions and Boolean Logic task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "loops": {
    "eyebrow": "2. Control Flow and Functions",
    "title": "Loops",
    "summary": "Learn loops through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of loops.",
      "Learn the Python or data-analysis methods most commonly used for loops.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Loops",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Loops for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Loops task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "functions": {
    "eyebrow": "2. Control Flow and Functions",
    "title": "Functions",
    "summary": "Learn functions through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Functions package reusable logic.",
      "Arguments provide input and return provides output.",
      "Type hints and docstrings improve clarity."
    ],
    "workflow": [
      "Define one responsibility.",
      "Validate inputs.",
      "Return a reusable result.",
      "Write a small test."
    ],
    "mistakes": [
      "Long functions doing many tasks.",
      "Mutable default arguments.",
      "Printing instead of returning values."
    ],
    "cheat": [
      "def name(arg):",
      "return value",
      "def f(x: float) -> float:",
      "Use None instead of default=[]"
    ],
    "prompts": [
      [
        "Function builder",
        "Create reusable Python functions for cleaning numeric columns, validating a schema and calculating summary metrics."
      ],
      [
        "Refactor",
        "Refactor this script into small functions with type hints, docstrings and error handling. Code: [PASTE]."
      ]
    ]
  },
  "scope-and-error-handling": {
    "eyebrow": "2. Control Flow and Functions",
    "title": "Scope and Error Handling",
    "summary": "Learn scope and error handling through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of scope and error handling.",
      "Learn the Python or data-analysis methods most commonly used for scope and error handling.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Scope and Error Handling",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Scope and Error Handling for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Scope and Error Handling task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "modules-packages-and-environments": {
    "eyebrow": "2. Control Flow and Functions",
    "title": "Modules, Packages and Environments",
    "summary": "Learn modules, packages and environments through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of modules, packages and environments.",
      "Learn the Python or data-analysis methods most commonly used for modules, packages and environments.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Modules, Packages and Environments",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Modules, Packages and Environments for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Modules, Packages and Environments task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "creating-numpy-arrays": {
    "eyebrow": "3. NumPy for Numerical Computing",
    "title": "Creating NumPy Arrays",
    "summary": "Learn creating numpy arrays through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "NumPy arrays store values with one data type.",
      "Shape describes dimensions.",
      "Arrays support efficient vectorised operations."
    ],
    "workflow": [
      "Create the array.",
      "Inspect shape and dtype.",
      "Validate expected dimensions."
    ],
    "mistakes": [
      "Creating object arrays accidentally.",
      "Ignoring shape mismatches.",
      "Using lists for large numeric calculations."
    ],
    "cheat": [
      "np.array()",
      "np.arange()",
      "np.linspace()",
      "np.zeros()",
      "np.ones()",
      "arr.shape",
      "arr.dtype"
    ],
    "prompts": [
      [
        "NumPy tutorial",
        "Teach NumPy array creation using one-dimensional and two-dimensional examples."
      ],
      [
        "Exercises",
        "Create 20 NumPy exercises covering shape, dtype and array constructors with solutions."
      ]
    ]
  },
  "indexing-and-slicing": {
    "eyebrow": "3. NumPy for Numerical Computing",
    "title": "Indexing and Slicing",
    "summary": "Learn indexing and slicing through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of indexing and slicing.",
      "Learn the Python or data-analysis methods most commonly used for indexing and slicing.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Indexing and Slicing",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Indexing and Slicing for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Indexing and Slicing task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "vectorised-operations": {
    "eyebrow": "3. NumPy for Numerical Computing",
    "title": "Vectorised Operations",
    "summary": "Learn vectorised operations through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of vectorised operations.",
      "Learn the Python or data-analysis methods most commonly used for vectorised operations.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Vectorised Operations",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Vectorised Operations for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Vectorised Operations task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "aggregation-and-reshaping": {
    "eyebrow": "3. NumPy for Numerical Computing",
    "title": "Aggregation and Reshaping",
    "summary": "Learn aggregation and reshaping through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of aggregation and reshaping.",
      "Learn the Python or data-analysis methods most commonly used for aggregation and reshaping.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Aggregation and Reshaping",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Aggregation and Reshaping for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Aggregation and Reshaping task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "random-numbers-and-linear-algebra": {
    "eyebrow": "3. NumPy for Numerical Computing",
    "title": "Random Numbers and Linear Algebra",
    "summary": "Learn random numbers and linear algebra through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of random numbers and linear algebra.",
      "Learn the Python or data-analysis methods most commonly used for random numbers and linear algebra.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Random Numbers and Linear Algebra",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Random Numbers and Linear Algebra for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Random Numbers and Linear Algebra task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "series-and-dataframes": {
    "eyebrow": "4. Pandas Foundations",
    "title": "Series and DataFrames",
    "summary": "Learn series and dataframes through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Series are labelled one-dimensional structures.",
      "DataFrames contain labelled rows and columns.",
      "Column dtypes affect every operation."
    ],
    "workflow": [
      "Inspect shape and columns.",
      "Review dtypes.",
      "Preview records and summary statistics."
    ],
    "mistakes": [
      "Mixed data types in one column.",
      "Confusing index values with ordinary columns.",
      "Assuming operations modify the original object."
    ],
    "cheat": [
      "pd.Series()",
      "pd.DataFrame()",
      "df.shape",
      "df.columns",
      "df.dtypes",
      "df.head()",
      "df.info()"
    ],
    "prompts": [
      [
        "Pandas introduction",
        "Explain Pandas Series and DataFrames using a small sales dataset."
      ],
      [
        "Starter code",
        "Create a Pandas DataFrame and demonstrate selection, filtering, sorting and summary statistics."
      ]
    ]
  },
  "reading-and-writing-data": {
    "eyebrow": "4. Pandas Foundations",
    "title": "Reading and Writing Data",
    "summary": "Learn reading and writing data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of reading and writing data.",
      "Learn the Python or data-analysis methods most commonly used for reading and writing data.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Reading and Writing Data",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Reading and Writing Data for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Reading and Writing Data task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "selecting-and-filtering-data": {
    "eyebrow": "4. Pandas Foundations",
    "title": "Selecting and Filtering Data",
    "summary": "Learn selecting and filtering data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of selecting and filtering data.",
      "Learn the Python or data-analysis methods most commonly used for selecting and filtering data.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Selecting and Filtering Data",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Selecting and Filtering Data for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Selecting and Filtering Data task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "sorting-ranking-and-duplicates": {
    "eyebrow": "4. Pandas Foundations",
    "title": "Sorting, Ranking and Duplicates",
    "summary": "Learn sorting, ranking and duplicates through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of sorting, ranking and duplicates.",
      "Learn the Python or data-analysis methods most commonly used for sorting, ranking and duplicates.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Sorting, Ranking and Duplicates",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Sorting, Ranking and Duplicates for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Sorting, Ranking and Duplicates task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "column-transformations": {
    "eyebrow": "4. Pandas Foundations",
    "title": "Column Transformations",
    "summary": "Learn column transformations through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of column transformations.",
      "Learn the Python or data-analysis methods most commonly used for column transformations.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Column Transformations",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Column Transformations for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Column Transformations task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "missing-data": {
    "eyebrow": "5. Data Cleaning and Analysis",
    "title": "Missing Data",
    "summary": "Learn missing data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of missing data.",
      "Learn the Python or data-analysis methods most commonly used for missing data.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Missing Data",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Missing Data for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Missing Data task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "groupby-and-aggregation": {
    "eyebrow": "5. Data Cleaning and Analysis",
    "title": "GroupBy and Aggregation",
    "summary": "Learn groupby and aggregation through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "GroupBy follows split-apply-combine.",
      "agg creates grouped summaries.",
      "transform returns values aligned with original rows."
    ],
    "workflow": [
      "Choose grouping columns.",
      "Define clearly named metrics.",
      "Validate totals against the source data."
    ],
    "mistakes": [
      "Using apply when agg is sufficient.",
      "Mixing row and aggregate levels.",
      "Ignoring missing group values."
    ],
    "cheat": [
      "df.groupby('region', as_index=False).agg(total=('sales','sum'))",
      "df.groupby('group')['x'].transform('mean')"
    ],
    "prompts": [
      [
        "GroupBy tutorial",
        "Teach groupby, agg, transform and filter using a realistic sales dataset."
      ],
      [
        "Summary code",
        "Write a named-aggregation summary for these dimensions and metrics: [PASTE]."
      ]
    ]
  },
  "merging-and-joining-data": {
    "eyebrow": "5. Data Cleaning and Analysis",
    "title": "Merging and Joining Data",
    "summary": "Learn merging and joining data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Merge combines tables using keys.",
      "Join type controls matched and unmatched records.",
      "Key cardinality determines row multiplication."
    ],
    "workflow": [
      "Check key uniqueness.",
      "Choose the correct join.",
      "Use validate and indicator.",
      "Compare row counts."
    ],
    "mistakes": [
      "Unexpected many-to-many joins.",
      "Joining dirty text keys.",
      "Dropping unmatched rows silently."
    ],
    "cheat": [
      "pd.merge(left,right,on='id',how='left',validate='m:1')",
      "indicator=True",
      "suffixes=('_left','_right')"
    ],
    "prompts": [
      [
        "Join explainer",
        "Explain inner, left, right and outer joins in Pandas using customer and order tables."
      ],
      [
        "Safe merge",
        "Write a safe Pandas merge that validates cardinality and reports unmatched keys."
      ]
    ]
  },
  "pivoting-and-reshaping": {
    "eyebrow": "5. Data Cleaning and Analysis",
    "title": "Pivoting and Reshaping",
    "summary": "Learn pivoting and reshaping through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of pivoting and reshaping.",
      "Learn the Python or data-analysis methods most commonly used for pivoting and reshaping.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Pivoting and Reshaping",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Pivoting and Reshaping for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Pivoting and Reshaping task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "dates-and-time-series-data": {
    "eyebrow": "5. Data Cleaning and Analysis",
    "title": "Dates and Time-Series Data",
    "summary": "Learn dates and time-series data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of dates and time-series data.",
      "Learn the Python or data-analysis methods most commonly used for dates and time-series data.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Dates and Time-Series Data",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Dates and Time-Series Data for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Dates and Time-Series Data task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "eda-workflow": {
    "eyebrow": "6. Exploratory Data Analysis",
    "title": "EDA Workflow",
    "summary": "Learn eda workflow through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of eda workflow.",
      "Learn the Python or data-analysis methods most commonly used for eda workflow.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# EDA Workflow",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me EDA Workflow for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical EDA Workflow task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "descriptive-statistics": {
    "eyebrow": "6. Exploratory Data Analysis",
    "title": "Descriptive Statistics",
    "summary": "Learn descriptive statistics through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of descriptive statistics.",
      "Learn the Python or data-analysis methods most commonly used for descriptive statistics.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Descriptive Statistics",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Descriptive Statistics for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Descriptive Statistics task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "outliers": {
    "eyebrow": "6. Exploratory Data Analysis",
    "title": "Outliers",
    "summary": "Learn outliers through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of outliers.",
      "Learn the Python or data-analysis methods most commonly used for outliers.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Outliers",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Outliers for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Outliers task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "relationships-and-correlation": {
    "eyebrow": "6. Exploratory Data Analysis",
    "title": "Relationships and Correlation",
    "summary": "Learn relationships and correlation through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of relationships and correlation.",
      "Learn the Python or data-analysis methods most commonly used for relationships and correlation.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Relationships and Correlation",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Relationships and Correlation for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Relationships and Correlation task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "communicating-eda-findings": {
    "eyebrow": "6. Exploratory Data Analysis",
    "title": "Communicating EDA Findings",
    "summary": "Learn communicating eda findings through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of communicating eda findings.",
      "Learn the Python or data-analysis methods most commonly used for communicating eda findings.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Communicating EDA Findings",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Communicating EDA Findings for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Communicating EDA Findings task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "matplotlib-fundamentals": {
    "eyebrow": "7. Data Visualisation",
    "title": "Matplotlib Fundamentals",
    "summary": "Learn matplotlib fundamentals through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Figure is the full canvas.",
      "Axes is an individual plotting area.",
      "Object-oriented syntax is easiest to maintain."
    ],
    "workflow": [
      "Create fig and ax.",
      "Draw the chart.",
      "Add title, labels and legend.",
      "Review readability."
    ],
    "mistakes": [
      "Mixing plotting APIs.",
      "Missing axis labels.",
      "Overcrowding the chart."
    ],
    "cheat": [
      "fig, ax = plt.subplots()",
      "ax.plot()",
      "ax.bar()",
      "ax.set_title()",
      "ax.set_xlabel()",
      "plt.show()"
    ],
    "prompts": [
      [
        "Matplotlib tutorial",
        "Teach Matplotlib using line, bar, histogram and scatter plots with object-oriented syntax."
      ],
      [
        "Improve chart",
        "Improve this Matplotlib code for readability and visual hierarchy. Code: [PASTE]."
      ]
    ]
  },
  "choosing-the-right-chart": {
    "eyebrow": "7. Data Visualisation",
    "title": "Choosing the Right Chart",
    "summary": "Learn choosing the right chart through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of choosing the right chart.",
      "Learn the Python or data-analysis methods most commonly used for choosing the right chart.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Choosing the Right Chart",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Choosing the Right Chart for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Choosing the Right Chart task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "seaborn-for-statistical-visualisation": {
    "eyebrow": "7. Data Visualisation",
    "title": "Seaborn for Statistical Visualisation",
    "summary": "Learn seaborn for statistical visualisation through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of seaborn for statistical visualisation.",
      "Learn the Python or data-analysis methods most commonly used for seaborn for statistical visualisation.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Seaborn for Statistical Visualisation",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Seaborn for Statistical Visualisation for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Seaborn for Statistical Visualisation task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "dashboard-design": {
    "eyebrow": "7. Data Visualisation",
    "title": "Dashboard Design",
    "summary": "Learn dashboard design through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of dashboard design.",
      "Learn the Python or data-analysis methods most commonly used for dashboard design.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Dashboard Design",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Dashboard Design for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Dashboard Design task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "visual-storytelling": {
    "eyebrow": "7. Data Visualisation",
    "title": "Visual Storytelling",
    "summary": "Learn visual storytelling through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of visual storytelling.",
      "Learn the Python or data-analysis methods most commonly used for visual storytelling.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Visual Storytelling",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Visual Storytelling for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Visual Storytelling task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "csv-and-excel-workflows": {
    "eyebrow": "8. Files, APIs and Databases",
    "title": "CSV and Excel Workflows",
    "summary": "Learn csv and excel workflows through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of csv and excel workflows.",
      "Learn the Python or data-analysis methods most commonly used for csv and excel workflows.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# CSV and Excel Workflows",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me CSV and Excel Workflows for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical CSV and Excel Workflows task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "json-and-nested-data": {
    "eyebrow": "8. Files, APIs and Databases",
    "title": "JSON and Nested Data",
    "summary": "Learn json and nested data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of json and nested data.",
      "Learn the Python or data-analysis methods most commonly used for json and nested data.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# JSON and Nested Data",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me JSON and Nested Data for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical JSON and Nested Data task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "working-with-apis": {
    "eyebrow": "8. Files, APIs and Databases",
    "title": "Working with APIs",
    "summary": "Learn working with apis through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "APIs expose data through endpoints.",
      "Responses commonly use JSON.",
      "Authentication, pagination and rate limits matter."
    ],
    "workflow": [
      "Build parameters and headers.",
      "Use a timeout.",
      "Check status.",
      "Handle pagination.",
      "Normalise the response."
    ],
    "mistakes": [
      "No timeout.",
      "Hard-coded secret keys.",
      "Ignoring retries and rate limits."
    ],
    "cheat": [
      "requests.get(url, params=params, timeout=30)",
      "response.raise_for_status()",
      "response.json()",
      "Use environment variables for secrets"
    ],
    "prompts": [
      [
        "API client",
        "Create a robust Python API client with timeout, retries, pagination, logging and environment-based authentication."
      ],
      [
        "API tutor",
        "Explain REST APIs, endpoints, parameters, headers, JSON responses and HTTP status codes to a beginner."
      ]
    ]
  },
  "sql-from-python": {
    "eyebrow": "8. Files, APIs and Databases",
    "title": "SQL from Python",
    "summary": "Learn sql from python through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of sql from python.",
      "Learn the Python or data-analysis methods most commonly used for sql from python.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# SQL from Python",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me SQL from Python for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical SQL from Python task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "handling-larger-than-memory-data": {
    "eyebrow": "8. Files, APIs and Databases",
    "title": "Handling Larger-than-Memory Data",
    "summary": "Learn handling larger-than-memory data through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of handling larger-than-memory data.",
      "Learn the Python or data-analysis methods most commonly used for handling larger-than-memory data.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Handling Larger-than-Memory Data",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Handling Larger-than-Memory Data for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Handling Larger-than-Memory Data task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "clean-python-for-data-work": {
    "eyebrow": "9. Code Quality and Projects",
    "title": "Clean Python for Data Work",
    "summary": "Learn clean python for data work through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of clean python for data work.",
      "Learn the Python or data-analysis methods most commonly used for clean python for data work.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Clean Python for Data Work",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Clean Python for Data Work for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Clean Python for Data Work task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "testing-data-code": {
    "eyebrow": "9. Code Quality and Projects",
    "title": "Testing Data Code",
    "summary": "Learn testing data code through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of testing data code.",
      "Learn the Python or data-analysis methods most commonly used for testing data code.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Testing Data Code",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Testing Data Code for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Testing Data Code task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "logging-and-debugging": {
    "eyebrow": "9. Code Quality and Projects",
    "title": "Logging and Debugging",
    "summary": "Learn logging and debugging through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of logging and debugging.",
      "Learn the Python or data-analysis methods most commonly used for logging and debugging.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Logging and Debugging",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Logging and Debugging for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Logging and Debugging task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "data-science-project-structure": {
    "eyebrow": "9. Code Quality and Projects",
    "title": "Data Science Project Structure",
    "summary": "Learn data science project structure through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of data science project structure.",
      "Learn the Python or data-analysis methods most commonly used for data science project structure.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Data Science Project Structure",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Data Science Project Structure for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Data Science Project Structure task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "end-to-end-data-analysis-project": {
    "eyebrow": "9. Code Quality and Projects",
    "title": "End-to-End Data Analysis Project",
    "summary": "Learn end-to-end data analysis project through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "A strong project begins with a question.",
      "Cleaning and analysis should be reproducible.",
      "Findings need evidence, implication and limitations."
    ],
    "workflow": [
      "Define questions.",
      "Load and validate data.",
      "Clean and transform.",
      "Explore and visualise.",
      "Write conclusions.",
      "Package deliverables."
    ],
    "mistakes": [
      "Choosing data without a question.",
      "Showing code without interpretation.",
      "No README or reproducibility instructions."
    ],
    "cheat": [
      "Deliverables: notebook, README, cleaned data, charts, findings, environment file",
      "Finding: Observation \u2192 Evidence \u2192 Interpretation \u2192 Action \u2192 Caveat"
    ],
    "prompts": [
      [
        "Project plan",
        "Create a four-week Python data-science capstone plan for [DATASET OR DOMAIN]. Include questions, cleaning, EDA, charts and deliverables."
      ],
      [
        "README",
        "Write a portfolio-quality README for this Python data-analysis project: [PASTE SUMMARY]."
      ]
    ]
  },
  "python-syntax-cheat-sheet": {
    "eyebrow": "10. Python Data Science Cheat Sheets",
    "title": "Python Syntax Cheat Sheet",
    "summary": "Learn python syntax cheat sheet through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of python syntax cheat sheet.",
      "Learn the Python or data-analysis methods most commonly used for python syntax cheat sheet.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Python Syntax Cheat Sheet",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Python Syntax Cheat Sheet for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Python Syntax Cheat Sheet task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "numpy-cheat-sheet": {
    "eyebrow": "10. Python Data Science Cheat Sheets",
    "title": "NumPy Cheat Sheet",
    "summary": "Learn numpy cheat sheet through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of numpy cheat sheet.",
      "Learn the Python or data-analysis methods most commonly used for numpy cheat sheet.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# NumPy Cheat Sheet",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me NumPy Cheat Sheet for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical NumPy Cheat Sheet task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "pandas-cheat-sheet": {
    "eyebrow": "10. Python Data Science Cheat Sheets",
    "title": "Pandas Cheat Sheet",
    "summary": "Learn pandas cheat sheet through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of pandas cheat sheet.",
      "Learn the Python or data-analysis methods most commonly used for pandas cheat sheet.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Pandas Cheat Sheet",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Pandas Cheat Sheet for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Pandas Cheat Sheet task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "visualisation-cheat-sheet": {
    "eyebrow": "10. Python Data Science Cheat Sheets",
    "title": "Visualisation Cheat Sheet",
    "summary": "Learn visualisation cheat sheet through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of visualisation cheat sheet.",
      "Learn the Python or data-analysis methods most commonly used for visualisation cheat sheet.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Visualisation Cheat Sheet",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Visualisation Cheat Sheet for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Visualisation Cheat Sheet task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  },
  "python-data-science-interview-cheat-sheet": {
    "eyebrow": "10. Python Data Science Cheat Sheets",
    "title": "Python Data Science Interview Cheat Sheet",
    "summary": "Learn python data science interview cheat sheet through clear explanations, practical Python examples, common mistakes, cheat-sheet references and reusable prompts.",
    "concepts": [
      "Understand the core purpose of python data science interview cheat sheet.",
      "Learn the Python or data-analysis methods most commonly used for python data science interview cheat sheet.",
      "Connect the technique to a practical data-science workflow."
    ],
    "workflow": [
      "Inspect the input and define the expected output.",
      "Apply the simplest correct method.",
      "Validate the result using counts, types or summary checks.",
      "Package the logic so it can be repeated."
    ],
    "mistakes": [
      "Applying a method without checking data types or assumptions.",
      "Skipping validation after transformation.",
      "Writing repetitive code instead of creating a reusable pattern."
    ],
    "cheat": [
      "# Python Data Science Interview Cheat Sheet",
      "Inspect \u2192 Transform \u2192 Validate \u2192 Communicate",
      "Use readable variable names and small reusable functions.",
      "Check shape, dtypes, missing values and output totals."
    ],
    "prompts": [
      [
        "Detailed tutorial",
        "Teach me Python Data Science Interview Cheat Sheet for Python data science. Include an intuitive explanation, syntax, a realistic dataset example, common errors and three exercises."
      ],
      [
        "Code assistant",
        "Help me solve a practical Python Data Science Interview Cheat Sheet task. First ask for my dataset schema and desired output, then provide readable Python code with validation checks."
      ]
    ]
  }
};

function getTheme(theme) {
  const isLight = ["light", "day", "white"].includes(String(theme).toLowerCase());
  return {
    isLight,
    page: isLight ? "bg-[#f7f8fb]" : "bg-[#050b16]",
    sidebar: isLight ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#091321]",
    card: isLight ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#0b1626]",
    text: isLight ? "text-[#101a35]" : "text-white",
    muted: isLight ? "text-slate-600" : "text-slate-400",
    soft: isLight ? "bg-slate-50" : "bg-white/[0.03]",
  };
}

function Sidebar({ theme, activeTopic, setActiveTopic, search, setSearch, mobileOpen, setMobileOpen }) {
  const styles = getTheme(theme);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.map((chapter) => ({
      ...chapter,
      topics: chapter.topics.filter((topic) => topic.title.toLowerCase().includes(q)),
    })).filter((chapter) => chapter.topics.length);
  }, [search]);

  return <>
    {mobileOpen && <button type="button" aria-label="Close chapters" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(330px,100vw)] flex-col border-r transition-transform duration-300 lg:sticky lg:top-0 lg:z-10 lg:h-screen lg:w-[330px] lg:translate-x-0 ${styles.sidebar} ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-5 dark:border-white/[0.08]">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><BookOpen className="h-5 w-5" /></span>
          <div><p className={`text-sm font-extrabold ${styles.text}`}>Python for Data Science</p><p className={`mt-0.5 text-xs ${styles.muted}`}>45 lessons + 5 references</p></div>
        </a>
        <button type="button" onClick={() => setMobileOpen(false)} className={`grid h-11 w-11 place-items-center rounded-lg lg:hidden ${styles.soft} ${styles.muted}`} aria-label="Close chapters"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4"><div className="relative"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search lessons and references" className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${styles.isLight ? "border-slate-200 bg-slate-50 text-slate-900 focus:border-cyan-500 focus:bg-white" : "border-white/[0.08] bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-cyan-400"}`} /></div></div>
      <nav className="flex-1 overflow-y-auto px-3 pb-5">
        {filtered.map((chapter) => <div key={chapter.id} className="mb-6"><p className={`px-3 text-[11px] font-bold uppercase tracking-[0.12em] ${styles.muted}`}>{chapter.title}</p><div className="mt-2 space-y-1">{chapter.topics.map((topic) => {
          const active = topic.id === activeTopic;
          return <button key={topic.id} type="button" onClick={() => { setActiveTopic(topic.id); setMobileOpen(false); window.scrollTo({top:0, behavior:"smooth"}); }} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${active ? styles.isLight ? "bg-blue-50 text-blue-700" : "bg-blue-500/12 text-blue-300" : styles.isLight ? "text-slate-600 hover:bg-slate-50" : "text-slate-400 hover:bg-white/[0.04]"}`}><span className="text-sm font-semibold leading-5">{topic.title}</span><span className="shrink-0 text-[10px] opacity-70">{topic.readTime}</span></button>;
        })}</div></div>)}
      </nav>
    </aside>
  </>;
}

function BulletSection({ title, items, icon: Icon, tone, theme }) {
  const styles = getTheme(theme);
  const tones = { blue: "bg-blue-50 text-blue-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600" };
  return <section className={`border-t py-8 first:border-t-0 first:pt-0 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><div className="flex items-start gap-3"><span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-[18px] w-[18px]" /></span><div className="min-w-0 flex-1"><h2 className={`text-xl font-extrabold tracking-[-0.02em] ${styles.text}`}>{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className={`flex items-start gap-3 ${styles.muted}`}><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" strokeWidth={3} /></span><span className="text-[15px] leading-6">{item}</span></li>)}</ul></div></div></section>;
}

function CheatCard({ items, theme }) {
  const styles = getTheme(theme);
  return <section className={`border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-50 text-cyan-600"><Code2 className="h-[18px] w-[18px]" /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600">Quick cheat sheet</p><h2 className={`mt-1 text-xl font-extrabold ${styles.text}`}>Key syntax, methods and patterns</h2></div></div><div className={`mt-5 rounded-[16px] border p-5 ${styles.isLight ? "border-slate-200 bg-[#0f172a]" : "border-white/[0.08] bg-black/35"}`}><pre className="whitespace-pre-wrap font-mono text-[13px] leading-7 text-slate-200">{items.map((item) => `• ${item}`).join("\n")}</pre></div></section>;
}

function PromptCard({ item, index, theme }) {
  const styles = getTheme(theme);
  const [copied, setCopied] = useState(false);
  async function copyPrompt() { try { await navigator.clipboard.writeText(item.prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } }
  return <article className={`rounded-[18px] border p-5 sm:p-6 ${styles.isLight ? "border-blue-100 bg-blue-50/60" : "border-blue-400/15 bg-blue-500/[0.06]"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">Prompt {index+1}</p><h3 className={`mt-2 text-lg font-extrabold ${styles.text}`}>{item.title}</h3></div><button type="button" onClick={copyPrompt} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${styles.isLight ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-white/[0.08] bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]"}`}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button></div><pre className={`mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl p-5 font-mono text-[13px] leading-6 ${styles.isLight ? "bg-[#0f172a] text-slate-200" : "bg-black/35 text-slate-200"}`}>{item.prompt}</pre></article>;
}

function CodeLab({ lab: lesson, theme }) {
  const styles = getTheme(theme);
  const [showSolution, setShowSolution] = useState(false);
  const codeSurface = styles.isLight ? "border-slate-800 bg-[#07172f]" : "border-white/[0.08] bg-[#020712]";
  return <section className={`mt-8 border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}>
    <div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700"><Code2 className="h-[18px] w-[18px]" /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Guided code lab</p><h2 className={`mt-1 text-xl font-extrabold ${styles.text}`}>Learn by producing a verifiable result</h2></div></div>
    <div className={`mt-6 rounded-2xl border p-5 sm:p-6 ${styles.isLight ? "border-cyan-100 bg-cyan-50/60" : "border-cyan-400/15 bg-cyan-400/[0.05]"}`}><p className={`text-xs font-bold uppercase tracking-[0.12em] ${styles.muted}`}>Learning objective</p><p className={`mt-2 max-w-3xl text-[15px] font-semibold leading-7 ${styles.text}`}>{lesson.objective}</p><p className={`mt-4 text-sm leading-6 ${styles.muted}`}><strong className={styles.text}>Scenario:</strong> {lesson.scenario}</p></div>
    <div className={`mt-5 overflow-hidden rounded-2xl border ${codeSurface}`}><div className="flex items-center justify-between border-b border-white/10 px-5 py-3"><span className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-300">Runnable Python</span><span className="text-[11px] text-slate-400">Python 3.11+ · Pandas 2.x · NumPy 2.x</span></div><pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-100"><code>{lesson.code}</code></pre></div>
    <div className={`mt-3 rounded-xl border p-4 ${styles.isLight ? "border-slate-200 bg-slate-50" : "border-white/[0.08] bg-white/[0.03]"}`}><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-600">Expected result</p><pre className={`mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 ${styles.muted}`}>{lesson.output}</pre></div>
    <div className={`mt-6 rounded-2xl border p-5 sm:p-6 ${styles.isLight ? "border-blue-200 bg-white" : "border-blue-400/20 bg-blue-500/[0.05]"}`}><p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Practice challenge</p><p className={`mt-3 text-[15px] font-semibold leading-7 ${styles.text}`}>{lesson.challenge}</p><button type="button" aria-expanded={showSolution} onClick={() => setShowSolution((value) => !value)} className={`mt-5 rounded-xl px-4 py-2.5 text-xs font-extrabold transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${showSolution ? styles.isLight ? "bg-slate-100 text-slate-700" : "bg-white/10 text-white" : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"}`}>{showSolution ? "Hide model solution" : "Check model solution"}</button>{showSolution && <pre className={`mt-4 overflow-x-auto rounded-xl border p-5 font-mono text-[13px] leading-6 ${codeSurface} text-slate-100`}><code>{lesson.solution}</code></pre>}</div>
  </section>;
}

export default function PythonForDataSciencePage({ theme = "light" }) {
  const styles = getTheme(theme);
  const [activeTopic, setActiveTopic] = useState("python-for-data-science");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const allTopics = useMemo(() => chapters.flatMap((chapter) => chapter.topics), []);
  const activeIndex = allTopics.findIndex((topic) => topic.id === activeTopic);
  const current = topicContent[activeTopic] || topicContent["python-for-data-science"];
  const lessonLab = pythonLessonLabs[activeTopic];
  const previousTopic = activeIndex > 0 ? allTopics[activeIndex - 1] : null;
  const nextTopic = activeIndex < allTopics.length - 1 ? allTopics[activeIndex + 1] : null;
  function changeTopic(topic) { if (!topic) return; setActiveTopic(topic.id); window.scrollTo({top:0, behavior:"smooth"}); }

  return <main className={`min-h-screen ${styles.page}`}><div className="lg:grid lg:grid-cols-[330px_minmax(0,1fr)]"><Sidebar theme={theme} activeTopic={activeTopic} setActiveTopic={setActiveTopic} search={search} setSearch={setSearch} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className="min-w-0"><header className={`sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b px-4 py-2 backdrop-blur-xl sm:px-6 lg:px-10 ${styles.isLight ? "border-slate-200 bg-white/95" : "border-white/[0.08] bg-[#050b16]/95"}`}><div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${styles.soft} ${styles.text}`}><Menu className="h-5 w-5" /></button><Link to="/dashboard?tab=e%20Learning" className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${styles.isLight ? "border-slate-200 bg-white text-[#101a35] hover:border-cyan-300 hover:text-cyan-700" : "border-white/[0.1] bg-white/[0.04] text-white hover:border-cyan-400/40"}`}><ArrowLeft className="h-4 w-4" /><span className="hidden xs:inline">Back to eLearning</span><span className="xs:hidden">eLearning</span></Link></div><div className={`text-xs font-semibold ${styles.muted}`}>{activeIndex+1} of {allTopics.length}</div></header><div className="mx-auto max-w-[960px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"><article className={`overflow-hidden rounded-[24px] border ${styles.card}`}><div className="p-6 sm:p-9 lg:p-12"><div className="flex flex-wrap items-center gap-3"><span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${styles.isLight ? "border-cyan-200 bg-cyan-50 text-cyan-800" : "border-cyan-300/20 bg-cyan-300/10 text-cyan-300"}`}>{current.eyebrow}</span><span className={`text-xs font-semibold ${styles.muted}`}>{allTopics[activeIndex]?.readTime}</span></div><h1 className={`mt-6 text-[38px] font-black leading-[1.05] tracking-[-0.045em] sm:text-[52px] ${styles.text}`}>{current.title}</h1><p className={`mt-5 max-w-3xl text-lg leading-8 ${styles.muted}`}>{current.summary}</p><div className="mt-10"><BulletSection title="What you need to understand" items={current.concepts} icon={Sparkles} tone="blue" theme={theme} /><BulletSection title="Recommended workflow" items={current.workflow} icon={Lightbulb} tone="amber" theme={theme} /><BulletSection title="Common mistakes to avoid" items={current.mistakes} icon={ShieldAlert} tone="rose" theme={theme} /><CheatCard items={current.cheat} theme={theme} /></div>{lessonLab && <CodeLab lab={lessonLab} theme={theme} />}<section className={`mt-8 border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Optional AI study support</p><h2 className={`mt-2 text-2xl font-black ${styles.text}`}>Extend your practice</h2><p className={`mt-2 leading-7 ${styles.muted}`}>Use these prompts after completing the lesson and code challenge. Add your dataset schema or current code where requested.</p><div className="mt-6 space-y-4">{current.prompts.map((prompt,index) => <PromptCard key={prompt.title} item={prompt} index={index} theme={theme} />)}</div></section></div></article><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" disabled={!previousTopic} onClick={() => changeTopic(previousTopic)} className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-cyan-300" : "border-white/[0.08] bg-white/[0.03] hover:border-cyan-400/30"}`}><ChevronLeft className={`h-5 w-5 ${styles.muted}`} /><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Previous lesson</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{previousTopic?.title || "You are at the beginning"}</span></span></button><button type="button" disabled={!nextTopic} onClick={() => changeTopic(nextTopic)} className={`flex min-h-[68px] items-center justify-between gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-cyan-300" : "border-white/[0.08] bg-white/[0.03] hover:border-cyan-400/30"}`}><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Next lesson</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{nextTopic?.title || "Guide completed"}</span></span><ChevronRight className={`h-5 w-5 ${styles.muted}`} /></button></div></div></div></div></main>;
}
