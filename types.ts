export enum Category {
  CodesAndLaws = "Códigos y Leyes",
  Jurisprudence = "Minutas de Jurisprudencia",
  Applications = "Aplicaciones",
  GeneralInfo = "Información General",
  Admin = "Administración",
  Credits = "Creditos",
}

export enum DocType {
  MD = 'md',
  PDF = 'pdf',
  LINK = 'link',
  APP = 'app'
}

export interface Document {
  id: string;
  category: Category;
  title: string;
  subtitle?: string;
  iconKey?: string; // Crucial for editing
  type: DocType;
  content: string; // For MD, this is markdown content. For PDF/LINK, this is a URL. For APP, it's an identifier.
}