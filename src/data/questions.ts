import { Question } from './types';
import { domain1Questions } from './domain1-conception';
import { domain2Questions } from './domain2-ingestion';
import { domain3Questions } from './domain3-stockage';
import { domain4Questions } from './domain4-securite';
import { domain5Questions } from './domain5-ml';
import { domain6Questions } from './domain6-fiabilite';

export const questions: Question[] = [
  ...domain1Questions,
  ...domain2Questions,
  ...domain3Questions,
  ...domain4Questions,
  ...domain5Questions,
  ...domain6Questions,
];

export const domains = [
  "Conception de systèmes de traitement de données",
  "Ingestion et traitement des données",
  "Stockage des données",
  "Sécurité, conformité et gouvernance des données",
  "Machine Learning et AI sur GCP",
  "Fiabilité, monitoring et optimisation des pipelines",
] as const;
