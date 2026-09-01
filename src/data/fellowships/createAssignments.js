const standardDeliverables = [
  "Completed project artifact",
  "Decision notes and supporting evidence",
  "Short learning reflection",
];

const capstoneDeliverables = [
  "Project files or working link",
  "Complete project documentation",
  "Reflection and evidence log",
];

export function createAssignments(programName, skills, definitions) {
  return definitions.map((definition, index) => ({
    id: index + 1,
    week: index + 1,
    points: 1000,
    title: definition.title,
    summary: definition.summary,
    tasks: definition.tasks || [
      `Review the ${programName} brief and define the outcome you will deliver.`,
      `Research ${definition.focus || skills.slice(0, 2).join(" and ")} concepts, examples and professional standards.`,
      "Create the required project artifact and record the important decisions you make.",
      "Test your work against the assignment objective and correct the issues you find.",
      "Prepare clear documentation, evidence and a short reflection for mentor review.",
    ],
    deliverables: definition.deliverables || (index >= 10 ? capstoneDeliverables : standardDeliverables),
    evaluation: definition.evaluation || ["Quality", "Technical depth", "Execution", "Documentation", "Communication"],
  }));
}
