
import React from 'react';
import { Category, Document, DocType } from './types';
import { CODIGO_PENAL_CONTENT } from './data/codigoPenal';
import { CODIGO_PROCESAL_PENAL_CONTENT } from './data/codigoProcesalPenal';
import { LEY_20000_DROGAS_CONTENT } from './data/ley20000Drogas';
import { LEY_17798_ARMAS_CONTENT } from './data/ley17798Armas';
import { LEY_18216_PENAS_SUSTITUTIVAS_CONTENT } from './data/ley18216PenasSustitutivas';
import { LEY_20066_VIF_CONTENT } from './data/ley20066Vif';
import { LEY_20084_RPA_CONTENT } from './data/ley20084Rpa';
import { LEY_20084_RPA_DIFERIDA_CONTENT } from './data/ley20084RpaDiferida';
import { LEY_18290_TRANSITO_CONTENT } from './data/ley18290Transito';
import { LEY_19327_ESTADIOS_CONTENT } from './data/ley19327Estadios';
import { CONSTITUCION_CHILE_CONTENT } from './data/constitucionChile';
import { LEY_19913_UAF_CONTENT } from './data/ley19913UAF';
import { MINUTA_N2_CONTENT } from './data/minutaN2';
import { MINUTA_N3_CONTENT } from './data/minutaN3';
import { MINUTA_N4_CONTENT } from './data/minutaN4';
import { MINUTA_N5_CONTENT } from './data/minutaN5';
import { MINUTA_N6_CONTENT } from './data/minutaN6';
import { MINUTA_N7_CONTENT } from './data/minutaN7';
import { MINUTA_N8_CONTENT } from './data/minutaN8';
import { MINUTA_N9_CONTENT } from './data/minutaN9';
import { MINUTA_N10_CONTENT } from './data/minutaN10';

export const ICONS: { [key: string]: React.ReactNode } = {
  gavel: <i className="fa-solid fa-gavel fa-2x"></i>,
  scales: <i className="fa-solid fa-scale-balanced fa-2x"></i>,
  pills: <i className="fa-solid fa-pills fa-2x"></i>,
  gun: <i className="fa-solid fa-gun fa-2x"></i>,
  personRunning: <i className="fa-solid fa-person-running fa-2x"></i>,
  house: <i className="fa-solid fa-house-chimney-user fa-2x"></i>,
  person: <i className="fa-solid fa-person fa-2x"></i>,
  child: <i className="fa-solid fa-child-reaching fa-2x"></i>,
  soccer: <i className="fa-solid fa-futbol fa-2x"></i>,
  car: <i className="fa-solid fa-car fa-2x"></i>,
  link: <i className="fa-solid fa-link fa-2x"></i>,
  robot: <i className="fa-solid fa-robot fa-2x"></i>,
  calculator: <i className="fa-solid fa-calculator fa-2x"></i>,
  books: <i className="fa-solid fa-book-journal-whills fa-2x"></i>,
  screen: <i className="fa-solid fa-desktop fa-2x"></i>,
  flag: <i className="fa-solid fa-flag fa-2x"></i>,
  moneyBillWave: <i className="fa-solid fa-money-bill-wave fa-2x"></i>,
  mobileScreenButton: <i className="fa-solid fa-mobile-screen-button fa-2x"></i>,
  mapMarkerAlt: <i className="fa-solid fa-map-marker-alt fa-2x"></i>,
};

export const MOCK_DOCUMENTS: Document[] = [
  { id: '1', category: Category.CodesAndLaws, title: 'CÓDIGO PENAL', iconKey: 'gavel', type: DocType.MD, content: CODIGO_PENAL_CONTENT },
  { id: '2', category: Category.CodesAndLaws, title: 'CÓDIGO PROCESAL PENAL', iconKey: 'scales', type: DocType.MD, content: CODIGO_PROCESAL_PENAL_CONTENT },
  { id: '3', category: Category.CodesAndLaws, title: 'LEY DE DROGAS', iconKey: 'pills', type: DocType.MD, content: LEY_20000_DROGAS_CONTENT },
  { id: '4', category: Category.CodesAndLaws, title: 'LEY DE CONTROL DE ARMAS', iconKey: 'gun', type: DocType.MD, content: LEY_17798_ARMAS_CONTENT },
  { id: '5', category: Category.CodesAndLaws, title: 'LEY DE PENAS SUSTITUTIVAS', iconKey: 'personRunning', type: DocType.MD, content: LEY_18216_PENAS_SUSTITUTIVAS_CONTENT },
  { id: '6', category: Category.CodesAndLaws, title: 'LEY DE VIOLENCIA INTRAFAMILIAR', iconKey: 'house', type: DocType.MD, content: LEY_20066_VIF_CONTENT },
  { id: '7', category: Category.CodesAndLaws, title: 'LEY RPA', iconKey: 'person', type: DocType.MD, content: LEY_20084_RPA_CONTENT },
  { id: '8', category: Category.CodesAndLaws, title: 'LEY RPA (Diferida)', iconKey: 'child', type: DocType.MD, content: LEY_20084_RPA_DIFERIDA_CONTENT },
  { id: '19', category: Category.CodesAndLaws, title: 'LEY DE TRÁNSITO', iconKey: 'car', type: DocType.MD, content: LEY_18290_TRANSITO_CONTENT },
  { id: '20', category: Category.CodesAndLaws, title: 'LEY VIOLENCIA EN ESTADIOS', iconKey: 'soccer', type: DocType.MD, content: LEY_19327_ESTADIOS_CONTENT },
  { id: '25', category: Category.CodesAndLaws, title: 'LEY UNIDAD ANÁLISIS FINANCIERO', iconKey: 'moneyBillWave', type: DocType.MD, content: LEY_19913_UAF_CONTENT },
  { id: '24', category: Category.CodesAndLaws, title: 'CONSTITUCIÓN POLÍTICA DE CHILE', iconKey: 'flag', type: DocType.MD, content: CONSTITUCION_CHILE_CONTENT },

  { id: 'juri_02', category: Category.Jurisprudence, title: 'Nº 2 Mayo 2018', subtitle: 'Control de Identidad y Ley de Tránsito', iconKey: 'car', type: DocType.MD, content: MINUTA_N2_CONTENT },
  { id: 'juri_03', category: Category.Jurisprudence, title: 'Nº 3 Julio 2018', subtitle: 'Acceso a Información en Facebook', iconKey: 'screen', type: DocType.MD, content: MINUTA_N3_CONTENT },
  { id: 'juri_04', category: Category.Jurisprudence, title: 'Nº 4 Sept. 2018', subtitle: 'Prueba Incorporada Post-Cierre', iconKey: 'gavel', type: DocType.MD, content: MINUTA_N4_CONTENT },
  { id: 'juri_05', category: Category.Jurisprudence, title: 'Nº 5 Nov. 2018', subtitle: 'Art. 195 Ley de Tránsito', iconKey: 'car', type: DocType.MD, content: MINUTA_N5_CONTENT },
  { id: 'juri_06', category: Category.Jurisprudence, title: 'Nº 6 Marzo 2019', subtitle: 'Revisión de Teléfonos Móviles', iconKey: 'mobileScreenButton', type: DocType.MD, content: MINUTA_N6_CONTENT },
  { id: 'juri_07', category: Category.Jurisprudence, title: 'Nº 7 Julio 2019', subtitle: 'Posicionamiento Geo Satelital (GPS)', iconKey: 'mapMarkerAlt', type: DocType.MD, content: MINUTA_N7_CONTENT },
  { id: 'juri_08', category: Category.Jurisprudence, title: 'Nº 8 Sept. 2019', subtitle: 'Art. 37 Ley N° 18.216', iconKey: 'gavel', type: DocType.MD, content: MINUTA_N8_CONTENT },
  { id: 'juri_09', category: Category.Jurisprudence, title: 'Nº 9 Nov. 2019', subtitle: 'Control de Identidad en Investigaciones', iconKey: 'gavel', type: DocType.MD, content: MINUTA_N9_CONTENT },
  { id: 'juri_10', category: Category.Jurisprudence, title: 'Nº 10 Marzo 2020', subtitle: 'Coautoría en Porte de Armas', iconKey: 'gun', type: DocType.MD, content: MINUTA_N10_CONTENT },

  { id: '13', category: Category.Applications, title: 'Chatbot de Jurisprudencia', subtitle: 'BETA', iconKey: 'robot', type: DocType.LINK, content: 'https://notebooklm.google.com/notebook/1cdfbd6b-7027-4e2e-a458-6df81f7895b6' },
  { id: '14', category: Category.Applications, title: 'Calculadora de Abonos', iconKey: 'calculator', type: DocType.APP, content: 'abono-calculator' },
  { id: '21', category: Category.GeneralInfo, title: 'Asistencia Jurídica Asociados', subtitle: 'Beneficios y Contactos', iconKey: 'gavel', type: DocType.APP, content: 'asistencia-juridica' },
  { id: '17', category: Category.GeneralInfo, title: 'Asociacion Nacional de Fiscales', iconKey: 'link', type: DocType.LINK, content: 'https://fiscales.cl/' },
  { id: '18', category: Category.GeneralInfo, title: 'Asociación Internacional de Fiscales (IAP)', iconKey: 'link', type: DocType.LINK, content: 'https://www.iap-association.org/' },
  { id: '16', category: Category.GeneralInfo, title: 'Ministerio Público', iconKey: 'link', type: DocType.LINK, content: 'https://www.fiscaliadechile.cl' },
  { id: '22', category: Category.GeneralInfo, title: 'Base Jurisprudencia Corte Suprema', iconKey: 'books', type: DocType.LINK, content: 'https://juris.pjud.cl/busqueda?Corte_Suprema' },
  { id: '23', category: Category.GeneralInfo, title: 'Programacion Salas Corte Apelaciones', iconKey: 'screen', type: DocType.LINK, content: 'https://salas.pjud.cl/monitor/monitor.php' },
];