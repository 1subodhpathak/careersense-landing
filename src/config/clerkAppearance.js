import careerSenseLogo from "../Assets/CSlogo.png";

export const careerSenseClerkAppearance = {
  variables: {
    colorPrimary: "#0EA8B9",
    colorText: "#0f172a",
    colorTextSecondary: "#64748b",
    colorBackground: "#ffffff",
    colorInputBackground: "#f8fafc",
    colorInputText: "#0f172a",
    borderRadius: "0.875rem",
    fontFamily: "inherit",
  },
  layout: {
    logoImageUrl: careerSenseLogo,
    socialButtonsPlacement: "top",
    socialButtonsVariant: "blockButton",
    unsafe_disableDevelopmentModeWarnings: true,
  },
  elements: {
    modalBackdrop: "bg-slate-950/60 backdrop-blur-sm",
    modalContent: "mx-4",
    cardBox: "overflow-hidden rounded-3xl shadow-2xl shadow-slate-950/20",
    card: "border border-slate-200/80 shadow-none",
    logoImage: "h-12 w-12 object-contain",
    headerTitle: "text-2xl font-bold tracking-tight text-slate-900",
    headerSubtitle: "text-sm text-slate-500",
    socialButtonsBlockButton: "h-12 border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50",
    dividerLine: "bg-slate-200",
    dividerText: "text-xs font-medium text-slate-400",
    formFieldLabel: "text-xs font-semibold text-slate-700",
    formFieldInput: "h-12 border-slate-200 bg-slate-50 text-sm text-slate-900 shadow-none focus:border-cyan-500 focus:ring-cyan-500/20",
    formButtonPrimary: "h-12 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 text-sm font-semibold shadow-md shadow-cyan-500/15 hover:brightness-105",
    footerActionText: "text-sm text-slate-500",
    footerActionLink: "text-sm font-semibold text-cyan-600 hover:text-cyan-700",
    footer: "hidden",
    userButtonPopoverFooter: "hidden",
    userProfileFooter: "hidden",
  },
};

