export interface AuditApplication {
  // Статические поля
  _id?: string;
  applicationDate: Date;
  companyName: string;
  taxId: string;
  reportingPeriod: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;

  // Поля-триггеры
  selectedReportTypes: string[]; // из предопределенного набора
  specialAuditNeeded: boolean;
  hasInternationalOperations: boolean;

  // Динамические поля (могут быть undefined)
  taxSystem?: string;
  annualTaxReturn?: boolean;
  vatReturns?: boolean;
  auditPurpose?: string;
  additionalAuditorsCount?: number;
  countriesOfOperation?: string[];
  currencyOfTransactions?: string;
}

