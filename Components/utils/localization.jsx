// Regional configurations
const regionConfigs = {
  US: {
    currency: 'USD',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234.56',
    currencySymbol: '$',
    currencyPosition: 'before'
  },
  EU: {
    currency: 'EUR',
    language: 'en',
    timezone: 'Europe/London',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.234,56',
    currencySymbol: '€',
    currencyPosition: 'after'
  },
  UK: {
    currency: 'GBP',
    language: 'en',
    timezone: 'Europe/London',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,234.56',
    currencySymbol: '£',
    currencyPosition: 'before'
  },
  JP: {
    currency: 'JPY',
    language: 'en',
    timezone: 'Asia/Tokyo',
    dateFormat: 'YYYY-MM-DD',
    numberFormat: '1,234',
    currencySymbol: '¥',
    currencyPosition: 'before'
  },
  IN: {
    currency: 'INR',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,23,456.78',
    currencySymbol: '₹',
    currencyPosition: 'before'
  },
  CA: {
    currency: 'CAD',
    language: 'en',
    timezone: 'America/Toronto',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,234.56',
    currencySymbol: 'C$',
    currencyPosition: 'before'
  },
  AU: {
    currency: 'AUD',
    language: 'en',
    timezone: 'Australia/Sydney',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,234.56',
    currencySymbol: 'A$',
    currencyPosition: 'before'
  },
  CN: {
    currency: 'CNY',
    language: 'zh',
    timezone: 'Asia/Shanghai',
    dateFormat: 'YYYY-MM-DD',
    numberFormat: '1,234.56',
    currencySymbol: '¥',
    currencyPosition: 'before'
  },
  BR: {
    currency: 'BRL',
    language: 'pt',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.234,56',
    currencySymbol: 'R$',
    currencyPosition: 'before'
  },
  MX: {
    currency: 'MXN',
    language: 'es',
    timezone: 'America/Mexico_City',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,234.56',
    currencySymbol: '$',
    currencyPosition: 'before'
  },
  ZA: {
    currency: 'ZAR',
    language: 'en',
    timezone: 'Africa/Johannesburg',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,234.56',
    currencySymbol: 'R',
    currencyPosition: 'before'
  }
};

// Translation strings
const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    addexpense: "Add Expense",
    budgets: "Budgets",
    goals: "Goals",
    aiinsights: "AI Insights",
    adminpanel: "Admin Panel",
    settings: "Settings",
    
    // Dashboard
    welcomeBack: "Welcome back",
    financialOverview: "Your financial overview awaits",
    premiumAiAdvisory: "Premium AI Advisory",
    portfolioValue: "Portfolio Value",
    totalTracked: "Total Tracked",
    monthlyExpenses: "Monthly Expenses",
    budgetStatus: "Budget Status",
    financialGoals: "Financial Goals",
    remaining: "Remaining",
    averageProgress: "Average Progress",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    amount: "Amount",
    description: "Description",
    category: "Category",
    date: "Date",
    loading: "Loading",
    
    // Categories
    food: "Food",
    transportation: "Transportation",
    housing: "Housing",
    utilities: "Utilities",
    entertainment: "Entertainment",
    shopping: "Shopping",
    healthcare: "Healthcare",
    education: "Education",
    travel: "Travel",
    other: "Other"
  },
  es: {
    // Navigation
    dashboard: "Tablero",
    addexpense: "Agregar Gasto",
    budgets: "Presupuestos",
    goals: "Metas",
    aiinsights: "Análisis IA",
    adminpanel: "Panel Admin",
    settings: "Configuración",
    
    // Dashboard
    welcomeBack: "Bienvenido de nuevo",
    financialOverview: "Tu resumen financiero te espera",
    premiumAiAdvisory: "Asesoría Premium IA",
    portfolioValue: "Valor del Portafolio",
    totalTracked: "Total Rastreado",
    monthlyExpenses: "Gastos Mensuales",
    budgetStatus: "Estado del Presupuesto",
    financialGoals: "Metas Financieras",
    remaining: "Restante",
    averageProgress: "Progreso Promedio",
    
    // Common
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    amount: "Cantidad",
    description: "Descripción",
    category: "Categoría",
    date: "Fecha",
    loading: "Cargando",
    
    // Categories
    food: "Comida",
    transportation: "Transporte",
    housing: "Vivienda",
    utilities: "Servicios",
    entertainment: "Entretenimiento",
    shopping: "Compras",
    healthcare: "Salud",
    education: "Educación",
    travel: "Viajes",
    other: "Otro"
  },
  fr: {
    // Navigation
    dashboard: "Tableau de Bord",
    addexpense: "Ajouter Dépense",
    budgets: "Budgets",
    goals: "Objectifs",
    aiinsights: "Analyses IA",
    adminpanel: "Panneau Admin",
    settings: "Paramètres",
    
    // Dashboard
    welcomeBack: "Bon retour",
    financialOverview: "Votre aperçu financier vous attend",
    premiumAiAdvisory: "Conseil Premium IA",
    portfolioValue: "Valeur du Portefeuille",
    totalTracked: "Total Suivi",
    monthlyExpenses: "Dépenses Mensuelles",
    budgetStatus: "État du Budget",
    financialGoals: "Objectifs Financiers",
    remaining: "Restant",
    averageProgress: "Progrès Moyen",
    
    // Common
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    amount: "Montant",
    description: "Description",
    category: "Catégorie",
    date: "Date",
    loading: "Chargement",
    
    // Categories
    food: "Nourriture",
    transportation: "Transport",
    housing: "Logement",
    utilities: "Services",
    entertainment: "Divertissement",
    shopping: "Achats",
    healthcare: "Santé",
    education: "Éducation",
    travel: "Voyage",
    other: "Autre"
  }
};

export const getRegionConfig = (region) => {
  return regionConfigs[region] || regionConfigs.US;
};

export const formatCurrency = (amount, user) => {
  if (!user) return `$${amount.toFixed(2)}`;
  
  const config = getRegionConfig(user.region);
  const symbol = config.currencySymbol;
  
  // Format number based on region
  let formattedAmount;
  switch (config.numberFormat) {
    case '1.234,56':
      formattedAmount = amount.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      break;
    case '1 234,56':
      formattedAmount = amount.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      break;
    case '1,23,456.78': // Indian numbering
      formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      break;
    default:
      formattedAmount = amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
  
  return config.currencyPosition === 'before' 
    ? `${symbol}${formattedAmount}`
    : `${formattedAmount} ${symbol}`;
};

export const formatDate = (date, user) => {
  if (!user) return new Date(date).toLocaleDateString();
  
  const config = getRegionConfig(user.region);
  const dateObj = new Date(date);
  
  switch (config.dateFormat) {
    case 'DD/MM/YYYY':
      return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
    case 'YYYY-MM-DD':
      return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
    default: // MM/DD/YYYY
      return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
  }
};

export const translate = (key, language = 'en') => {
  return translations[language]?.[key] || translations.en[key] || key;
};