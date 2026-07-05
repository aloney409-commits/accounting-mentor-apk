import type { AccountDefinition } from '../types';

export const ACCOUNTS: AccountDefinition[] = [
  // ================= الأصول (Assets) =================
  {
    id: 'cash',
    nameAr: 'النقدية',
    nameEn: 'Cash',
    type: 'asset',
    category: 'أصول متداولة',
    icon: '💰',
    keywords: ['نقد', 'نقدا', 'نقداً', 'نقدية', 'كاش', 'سيولة'],
    synonyms: ['النقود', 'السيولة النقدية', 'الصندوق', 'الكاش'],
    description: 'الأموال النقدية في الصندوق أو لدى المنشأة',
  },
  {
    id: 'bank',
    nameAr: 'البنك',
    nameEn: 'Bank',
    type: 'asset',
    category: 'أصول متداولة',
    icon: '🏦',
    keywords: ['بنك', 'حساب بنكي', 'مصرف', 'إيداع', 'ايداع', 'شيك', 'تحويل'],
    synonyms: ['الحساب البنكي', 'المصرف', 'حساب جاري'],
    description: 'الأموال المودعة في الحسابات البنكية',
  },
  {
    id: 'accounts_receivable',
    nameAr: 'المدينون',
    nameEn: 'Accounts Receivable',
    type: 'asset',
    category: 'أصول متداولة',
    icon: '👥',
    keywords: ['مدين', 'مدينون', 'ذمم مدينة', 'العملاء', 'عميل', 'زبون', 'زبائن'],
    synonyms: ['الذمم المدينة', 'حسابات العملاء'],
    description: 'المبالغ المستحقة على العملاء للمنشأة',
  },
  {
    id: 'inventory',
    nameAr: 'المخزون',
    nameEn: 'Inventory',
    type: 'asset',
    category: 'أصول متداولة',
    icon: '📦',
    keywords: ['مخزون', 'بضاعة', 'بضائع', 'مشتريات', 'سلعة', 'سلع'],
    synonyms: ['بضاعة المخزن', 'المخزون السلعي'],
    description: 'البضائع الموجودة في المخازن للبيع أو الاستخدام',
  },
  {
    id: 'equipment',
    nameAr: 'المعدات والأجهزة',
    nameEn: 'Equipment',
    type: 'asset',
    category: 'أصول ثابتة',
    icon: '💻',
    keywords: ['معدات', 'أجهزة', 'كمبيوتر', 'حاسوب', 'لابتوب', 'طابعة', 'جهاز'],
    synonyms: ['الأصول التقنية', 'المعدات المكتبية'],
    description: 'المعدات والأجهزة المستخدمة في التشغيل',
  },
  {
    id: 'furniture',
    nameAr: 'الأثاث',
    nameEn: 'Furniture',
    type: 'asset',
    category: 'أصول ثابتة',
    icon: '🪑',
    keywords: ['أثاث', 'اثاث', 'مكتب', 'كرسي', 'طاولة'],
    synonyms: ['المفروشات', 'الأثاث المكتبي'],
    description: 'الأثاث المكتبي والمفروشات',
  },
  {
    id: 'vehicles',
    nameAr: 'السيارات ووسائل النقل',
    nameEn: 'Vehicles',
    type: 'asset',
    category: 'أصول ثابتة',
    icon: '🚗',
    keywords: ['سيارة', 'سيارات', 'شاحنة', 'مركبة', 'نقل'],
    synonyms: ['وسائل النقل', 'المركبات'],
    description: 'السيارات والشاحنات ووسائل النقل المملوكة',
  },
  {
    id: 'buildings',
    nameAr: 'المباني والعقارات',
    nameEn: 'Buildings',
    type: 'asset',
    category: 'أصول ثابتة',
    icon: '🏢',
    keywords: ['مبنى', 'مباني', 'عقار', 'عقارات', 'ارض', 'أرض'],
    synonyms: ['العقارات', 'الأصول العقارية'],
    description: 'المباني والأراضي المملوكة للمنشأة',
  },
  {
    id: 'medicines',
    nameAr: 'مخزون الأدوية',
    nameEn: 'Pharmacy Inventory',
    type: 'asset',
    category: 'أصول متداولة',
    icon: '💊',
    keywords: ['أدوية', 'ادوية', 'دواء', 'صيدلية', 'علاج', 'مستلزمات طبية'],
    synonyms: ['المخزون الدوائي', 'العقاقير'],
    description: 'الأدوية والمواد الصيدلانية في المخزون الطبي',
  },
  {
    id: 'books',
    nameAr: 'الكتب والمستلزمات التعليمية',
    nameEn: 'Books & Educational Supplies',
    type: 'asset',
    category: 'أصول متداولة',
    icon: '📚',
    keywords: ['كتاب', 'كتب', 'مستلزمات', 'كراس', 'دفتر'],
    synonyms: ['المستلزمات المدرسية', 'الكتب الدراسية'],
    description: 'الكتب والمستلزمات التعليمية',
  },

  // ================= الالتزامات (Liabilities) =================
  {
    id: 'accounts_payable',
    nameAr: 'الدائنون',
    nameEn: 'Accounts Payable',
    type: 'liability',
    category: 'التزامات متداولة',
    icon: '🤝',
    keywords: ['دائن', 'دائنون', 'ذمم دائنة', 'مورد', 'موردين', 'مورّد'],
    synonyms: ['الذمم الدائنة', 'حسابات الموردين'],
    description: 'المبالغ المستحقة للموردين على المنشأة',
  },
  {
    id: 'loans',
    nameAr: 'القروض',
    nameEn: 'Loans',
    type: 'liability',
    category: 'التزامات طويلة الأجل',
    icon: '🏦',
    keywords: ['قرض', 'قروض', 'اقتراض', 'تمويل'],
    synonyms: ['التمويل البنكي', 'الاقتراض'],
    description: 'المبالغ المقترضة من البنوك أو الجهات الأخرى',
  },
  {
    id: 'salaries_payable',
    nameAr: 'الرواتب المستحقة',
    nameEn: 'Salaries Payable',
    type: 'liability',
    category: 'التزامات متداولة',
    icon: '💵',
    keywords: ['راتب مستحق', 'رواتب مستحقة', 'أجور مستحقة'],
    synonyms: ['المستحقات الوظيفية'],
    description: 'الرواتب المستحقة للموظفين ولم تُدفع بعد',
  },

  // ================= حقوق الملكية (Equity) =================
  {
    id: 'capital',
    nameAr: 'رأس المال',
    nameEn: 'Capital',
    type: 'equity',
    category: 'حقوق الملكية',
    icon: '👑',
    keywords: ['رأس المال', 'راس المال', 'رأسمال', 'استثمار المالك', 'صاحب المنشأة'],
    synonyms: ['رأس المال المدفوع', 'حقوق المالك'],
    description: 'الاستثمارات الأولية والإضافية من المالك',
  },
  {
    id: 'drawings',
    nameAr: 'مسحوبات شخصية',
    nameEn: 'Owner Drawings',
    type: 'equity',
    category: 'حقوق الملكية',
    icon: '🚪',
    keywords: ['مسحوبات', 'سحب شخصي', 'استخدام شخصي'],
    synonyms: ['السحوبات الشخصية'],
    description: 'المبالغ التي يسحبها المالك من المنشأة لاستخدامه الشخصي',
  },

  // ================= الإيرادات (Revenues) =================
  {
    id: 'sales_revenue',
    nameAr: 'إيرادات المبيعات',
    nameEn: 'Sales Revenue',
    type: 'revenue',
    category: 'إيرادات تشغيلية',
    icon: '💹',
    keywords: ['مبيعات', 'بيع', 'بعت', 'بيعت', 'بيعنا'],
    synonyms: ['إيراد المبيعات', 'دخل المبيعات'],
    description: 'الإيرادات الناتجة عن بيع البضائع أو المنتجات',
  },
  {
    id: 'services_revenue',
    nameAr: 'إيرادات الخدمات',
    nameEn: 'Services Revenue',
    type: 'revenue',
    category: 'إيرادات تشغيلية',
    icon: '🛎️',
    keywords: ['خدمة', 'خدمات', 'إيراد خدمة', 'أتعاب'],
    synonyms: ['إيراد أتعاب', 'الأتعاب المهنية'],
    description: 'الإيرادات الناتجة عن تقديم الخدمات',
  },
  {
    id: 'tuition_revenue',
    nameAr: 'إيرادات الرسوم الدراسية',
    nameEn: 'Tuition Revenue',
    type: 'revenue',
    category: 'إيرادات تشغيلية',
    icon: '🎓',
    keywords: ['رسوم دراسية', 'رسوم مدرسية', 'رسوم جامعية', 'أقساط'],
    synonyms: ['الأقساط الدراسية', 'الرسوم التعليمية'],
    description: 'الإيرادات الناتجة عن تحصيل الرسوم الدراسية',
  },
  {
    id: 'medical_revenue',
    nameAr: 'إيرادات الخدمات الطبية',
    nameEn: 'Medical Services Revenue',
    type: 'revenue',
    category: 'إيرادات تشغيلية',
    icon: '🩺',
    keywords: ['كشف طبي', 'إيراد طبي', 'خدمة طبية', 'استشارة طبية'],
    synonyms: ['أتعاب طبية', 'إيراد المرضى'],
    description: 'إيرادات المرضى والخدمات الطبية',
  },

  // ================= المصروفات (Expenses) =================
  {
    id: 'salaries_expense',
    nameAr: 'مصروف الرواتب',
    nameEn: 'Salaries Expense',
    type: 'expense',
    category: 'مصروفات تشغيلية',
    icon: '👨‍💼',
    keywords: ['راتب', 'رواتب', 'أجر', 'أجور', 'مرتب', 'مرتبات'],
    synonyms: ['مصروف الأجور', 'الرواتب والأجور'],
    description: 'رواتب وأجور الموظفين',
  },
  {
    id: 'rent_expense',
    nameAr: 'مصروف الإيجار',
    nameEn: 'Rent Expense',
    type: 'expense',
    category: 'مصروفات تشغيلية',
    icon: '🏠',
    keywords: ['إيجار', 'ايجار', 'ايجارات', 'إيجارات'],
    synonyms: ['مصروف الإيجارات', 'أجرة'],
    description: 'مصروف إيجار المكاتب أو المحال',
  },
  {
    id: 'utilities_expense',
    nameAr: 'مصروف الخدمات (كهرباء وماء)',
    nameEn: 'Utilities Expense',
    type: 'expense',
    category: 'مصروفات تشغيلية',
    icon: '💡',
    keywords: ['كهرباء', 'ماء', 'مياه', 'خدمات', 'انترنت', 'إنترنت', 'هاتف'],
    synonyms: ['مصروف المرافق', 'مصروفات عامة'],
    description: 'مصاريف الكهرباء والماء والاتصالات',
  },
  {
    id: 'advertising_expense',
    nameAr: 'مصروف الإعلانات',
    nameEn: 'Advertising Expense',
    type: 'expense',
    category: 'مصروفات تشغيلية',
    icon: '📢',
    keywords: ['إعلان', 'اعلان', 'دعاية', 'تسويق'],
    synonyms: ['مصروف الدعاية', 'مصروف التسويق'],
    description: 'مصاريف الإعلانات والتسويق',
  },
  {
    id: 'transportation_expense',
    nameAr: 'مصروف النقل',
    nameEn: 'Transportation Expense',
    type: 'expense',
    category: 'مصروفات تشغيلية',
    icon: '🚚',
    keywords: ['نقل', 'شحن', 'مواصلات', 'وقود', 'بنزين'],
    synonyms: ['مصروف الشحن', 'مصاريف المواصلات'],
    description: 'مصاريف النقل والشحن والمواصلات',
  },
  {
    id: 'purchases_expense',
    nameAr: 'المشتريات',
    nameEn: 'Purchases',
    type: 'expense',
    category: 'مصروفات تشغيلية',
    icon: '🛒',
    keywords: ['مشتريات', 'اشترى', 'اشتريت', 'شراء بضاعة'],
    synonyms: ['مشتريات البضائع'],
    description: 'مشتريات البضائع بغرض إعادة البيع',
  },
];

export const ACCOUNTS_BY_ID: Record<string, AccountDefinition> = ACCOUNTS.reduce(
  (acc, account) => {
    acc[account.id] = account;
    return acc;
  },
  {} as Record<string, AccountDefinition>
);

export function getAccount(id: string): AccountDefinition | undefined {
  return ACCOUNTS_BY_ID[id];
}

export function getAccountsByType(type: string): AccountDefinition[] {
  return ACCOUNTS.filter((a) => a.type === type);
}

export function searchAccounts(query: string): AccountDefinition[] {
  const q = query.toLowerCase().trim();
  if (!q) return ACCOUNTS;
  return ACCOUNTS.filter(
    (a) =>
      a.nameAr.toLowerCase().includes(q) ||
      a.nameEn.toLowerCase().includes(q) ||
      a.keywords.some((k) => k.toLowerCase().includes(q)) ||
      a.synonyms.some((s) => s.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  );
}
