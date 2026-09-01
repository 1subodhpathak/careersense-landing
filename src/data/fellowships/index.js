import { appDevelopmentAssignments, appDevelopmentPhases } from "./AppDevelopment.js";
import { artificialIntelligenceAssignments, artificialIntelligencePhases } from "./ArtificialIntelligence.js";
import { dataAnalystAssignments, dataAnalystPhases } from "./DataAnalyst.js";
import { dataScienceAssignments, dataSciencePhases } from "./DataScience.js";
import { fullStackDevelopmentAssignments, fullStackDevelopmentPhases } from "./FullStackDevelopment.js";
import { uiuxDesignAssignments, uiuxDesignPhases } from "./UIUXDesign.js";

export const fellowshipAssignments = {
  "data-analyst": dataAnalystAssignments,
  "data-science": dataScienceAssignments,
  "artificial-intelligence": artificialIntelligenceAssignments,
  "ui-ux-design": uiuxDesignAssignments,
  "app-development": appDevelopmentAssignments,
  "full-stack-development": fullStackDevelopmentAssignments,
};

export const fellowshipPhases = {
  "data-analyst": dataAnalystPhases,
  "data-science": dataSciencePhases,
  "artificial-intelligence": artificialIntelligencePhases,
  "ui-ux-design": uiuxDesignPhases,
  "app-development": appDevelopmentPhases,
  "full-stack-development": fullStackDevelopmentPhases,
};
