import { Question } from './types';

export const domain4Questions: Question[] = [
  {
    id: 26,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "facile",
    question: "Votre entreprise stocke des données clients dans BigQuery, incluant des numéros de carte bancaire et des adresses email. Le responsable conformité vous demande de détecter et classifier automatiquement ces données sensibles dans l'ensemble de vos datasets. Quel service GCP utilisez-vous ?",
    options: [
      { label: "A", text: "Cloud Armor" },
      { label: "B", text: "Cloud DLP (Data Loss Prevention)" },
      { label: "C", text: "Cloud KMS" },
      { label: "D", text: "Security Command Center" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud DLP (maintenant intégré dans Sensitive Data Protection) permet de détecter, classifier et dé-identifier automatiquement les données sensibles comme les numéros de carte bancaire, les emails, les numéros de sécurité sociale, etc. Il s'intègre nativement avec BigQuery, Cloud Storage et Datastore.",
    whyOthersWrong: {
      "A": "Cloud Armor est un service de protection contre les attaques DDoS et les menaces web (WAF). Il ne détecte pas les données sensibles dans les datasets.",
      "C": "Cloud KMS gère les clés de chiffrement mais ne détecte ni ne classifie les données sensibles. Il chiffre les données sans en analyser le contenu.",
      "D": "Security Command Center fournit une vue d'ensemble de la posture de sécurité de l'infrastructure GCP, mais ne scanne pas le contenu des données pour détecter des informations sensibles."
    },
    gcpLink: "https://cloud.google.com/sensitive-data-protection/docs/concepts-overview"
  },
  {
    id: 27,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "facile",
    question: "Un auditeur externe demande de vérifier qui a accédé à un dataset BigQuery spécifique au cours des 30 derniers jours, incluant les requêtes exécutées et les tables lues. Quel service GCP fournit ces informations ?",
    options: [
      { label: "A", text: "Cloud Monitoring" },
      { label: "B", text: "Cloud Trace" },
      { label: "C", text: "Cloud Audit Logs" },
      { label: "D", text: "Data Catalog" }
    ],
    correctAnswers: ["C"],
    explanation: "Cloud Audit Logs enregistre automatiquement les activités d'administration et les accès aux données sur les services GCP. Les Data Access Audit Logs de BigQuery capturent qui a exécuté quelles requêtes, sur quelles tables, et quand, ce qui est essentiel pour les audits de conformité.",
    whyOthersWrong: {
      "A": "Cloud Monitoring collecte des métriques de performance et d'utilisation (CPU, mémoire, latence) mais ne trace pas les accès individuels aux données ni les requêtes exécutées.",
      "B": "Cloud Trace analyse la latence et les performances des requêtes distribuées. Il ne fournit pas d'informations d'audit sur les accès aux données.",
      "D": "Data Catalog est un service de gestion de métadonnées et de découverte de données. Il ne journalise pas les accès aux données."
    },
    gcpLink: "https://cloud.google.com/logging/docs/audit"
  },
  {
    id: 28,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "intermédiaire",
    question: "Votre équipe data a une table BigQuery contenant des données financières. Les analystes marketing doivent pouvoir exécuter des requêtes sur cette table mais ne doivent jamais voir les colonnes contenant les montants de transaction et les numéros de compte. Comment implémentez-vous cette restriction ?",
    options: [
      { label: "A", text: "Créer une vue SQL qui exclut les colonnes sensibles et donner accès uniquement à la vue" },
      { label: "B", text: "Utiliser la column-level security de BigQuery avec des policy tags via Data Catalog" },
      { label: "C", text: "Créer un dataset séparé avec une copie de la table sans les colonnes sensibles" },
      { label: "D", text: "Utiliser Cloud DLP pour masquer les colonnes sensibles en temps réel" }
    ],
    correctAnswers: ["B"],
    explanation: "La column-level security de BigQuery, implémentée via les policy tags de Data Catalog, permet de restreindre l'accès à des colonnes spécifiques de manière granulaire. Les utilisateurs autorisés voient toutes les colonnes, tandis que les autres reçoivent une erreur s'ils tentent de lire les colonnes protégées. C'est la solution native et la plus maintainable.",
    whyOthersWrong: {
      "A": "Une vue SQL fonctionne mais est moins robuste : un utilisateur ayant accès à la table sous-jacente peut contourner la vue. La column-level security est appliquée au niveau de la table elle-même.",
      "C": "Dupliquer les données crée des problèmes de synchronisation, augmente les coûts de stockage et complexifie la gouvernance.",
      "D": "Cloud DLP est conçu pour la détection et la dé-identification de données sensibles, pas pour le contrôle d'accès granulaire aux colonnes en temps de requête."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/column-level-security-intro"
  },
  {
    id: 29,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "intermédiaire",
    question: "Votre entreprise exige que toutes les données stockées dans BigQuery et Cloud Storage soient chiffrées avec des clés gérées par l'entreprise elle-même, et non par Google. Vous devez pouvoir révoquer l'accès aux données en cas de besoin en désactivant la clé. Quelle solution implémentez-vous ?",
    options: [
      { label: "A", text: "Activer le chiffrement par défaut de Google (Google-managed encryption keys)" },
      { label: "B", text: "Utiliser CMEK (Customer-Managed Encryption Keys) avec Cloud KMS" },
      { label: "C", text: "Chiffrer les données côté client avant de les envoyer dans GCP" },
      { label: "D", text: "Utiliser Cloud HSM pour stocker les clés dans un module matériel dédié" }
    ],
    correctAnswers: ["B"],
    explanation: "CMEK (Customer-Managed Encryption Keys) permet de créer et gérer vos propres clés de chiffrement dans Cloud KMS. Ces clés sont utilisées par BigQuery et Cloud Storage pour chiffrer les données. Vous pouvez désactiver ou détruire une clé pour rendre les données inaccessibles, ce qui répond à l'exigence de révocation.",
    whyOthersWrong: {
      "A": "Les clés gérées par Google ne permettent pas à l'entreprise de contrôler ni de révoquer les clés. Le chiffrement par défaut ne répond pas à l'exigence de gestion par l'entreprise.",
      "C": "Le chiffrement côté client (CSEK) ajoute une complexité significative de gestion et ne s'intègre pas nativement avec tous les services GCP. CMEK est plus adapté quand on veut garder le contrôle tout en utilisant les services managés.",
      "D": "Cloud HSM est un niveau de protection supplémentaire pour les clés KMS elles-mêmes, pas une alternative à CMEK. Il peut compléter CMEK mais ne répond pas seul au besoin."
    },
    gcpLink: "https://cloud.google.com/kms/docs/cmek"
  },
  {
    id: 30,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "intermédiaire",
    question: "Votre organisation possède des centaines de datasets répartis dans plusieurs projets GCP. Les data scientists ont du mal à trouver les données dont ils ont besoin et ne connaissent pas la signification de certaines colonnes. Vous devez mettre en place un catalogue centralisé avec des métadonnées business et techniques. Quelle solution est la plus adaptée ?",
    options: [
      { label: "A", text: "Créer un document Google Sheets partagé décrivant chaque dataset" },
      { label: "B", text: "Utiliser Dataplex avec Data Catalog pour cataloguer, annoter et gouverner les données" },
      { label: "C", text: "Utiliser les labels et descriptions BigQuery sur chaque table et colonne" },
      { label: "D", text: "Déployer Apache Atlas sur un cluster Dataproc" }
    ],
    correctAnswers: ["B"],
    explanation: "Dataplex avec Data Catalog fournit un catalogue de données centralisé qui découvre automatiquement les assets de données dans GCP. Il permet d'ajouter des métadonnées business (tags, descriptions), de définir des policy tags pour la gouvernance, et offre une recherche unifiée à travers tous les projets.",
    whyOthersWrong: {
      "A": "Un Google Sheets n'est pas scalable, ne se synchronise pas automatiquement avec les changements de schéma, et ne permet pas la recherche ni la gouvernance programmatique.",
      "C": "Les labels et descriptions BigQuery sont utiles mais limités à BigQuery. Ils ne fournissent pas de catalogue centralisé multi-services, de recherche transversale ni de fonctionnalités de gouvernance avancées.",
      "D": "Apache Atlas est un outil de gouvernance open-source complexe à déployer et maintenir. Il n'est pas intégré nativement avec les services GCP et nécessite une infrastructure dédiée."
    },
    gcpLink: "https://cloud.google.com/dataplex/docs/overview"
  },
  {
    id: 31,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "difficile",
    question: "Une banque utilise BigQuery pour stocker les données de transactions de ses clients. La réglementation exige que chaque conseiller bancaire ne puisse voir que les transactions de ses propres clients, et que les managers puissent voir les transactions de tous les clients de leur agence. Comment implémentez-vous ce contrôle d'accès sans dupliquer les données ?",
    options: [
      { label: "A", text: "Créer une vue BigQuery par conseiller filtrant sur l'identifiant du conseiller" },
      { label: "B", text: "Utiliser la row-level security de BigQuery avec des filtres d'accès basés sur le champ SESSION_USER() et une table de mapping conseiller-client" },
      { label: "C", text: "Utiliser IAM pour donner accès à des partitions spécifiques de la table" },
      { label: "D", text: "Implémenter le filtrage dans l'application BI en amont de BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "La row-level security de BigQuery permet de créer des politiques d'accès qui filtrent les lignes visibles en fonction de l'utilisateur connecté (SESSION_USER()). En combinant avec une table de mapping conseiller-client et une hiérarchie manager-agence, chaque utilisateur ne voit que les lignes autorisées, sans duplication de données.",
    whyOthersWrong: {
      "A": "Créer une vue par conseiller n'est pas scalable (des centaines ou milliers de conseillers) et la maintenance serait un cauchemar. De plus, les vues ne sécurisent pas la table sous-jacente.",
      "C": "IAM de BigQuery ne supporte pas le contrôle d'accès au niveau des lignes ni des partitions individuelles. IAM fonctionne au niveau du dataset ou de la table.",
      "D": "Le filtrage côté application n'est pas sécurisé : un utilisateur technique pourrait contourner l'application et accéder directement à BigQuery avec toutes les données visibles."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/row-level-security-intro"
  },
  {
    id: 32,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "difficile",
    question: "Votre équipe de données utilise plusieurs pipelines Dataflow et Cloud Functions qui accèdent à BigQuery, Cloud Storage et Pub/Sub. Actuellement, tous ces services utilisent le compte de service par défaut de Compute Engine avec le rôle Editor sur le projet. Votre RSSI demande d'appliquer le principe du moindre privilège. Quelle approche adoptez-vous ?",
    options: [
      { label: "A", text: "Ajouter des conditions IAM sur le compte de service par défaut pour limiter l'accès aux ressources spécifiques" },
      { label: "B", text: "Créer un compte de service dédié par pipeline avec uniquement les rôles prédéfinis spécifiques nécessaires à chaque pipeline" },
      { label: "C", text: "Remplacer le rôle Editor par le rôle Viewer sur le compte de service par défaut" },
      { label: "D", text: "Utiliser Workload Identity Federation pour tous les pipelines" }
    ],
    correctAnswers: ["B"],
    explanation: "Le principe du moindre privilège recommande de créer un compte de service distinct pour chaque charge de travail, avec uniquement les rôles nécessaires. Par exemple, un pipeline Dataflow qui lit de Pub/Sub et écrit dans BigQuery n'a besoin que des rôles Pub/Sub Subscriber et BigQuery Data Editor, pas du rôle Editor qui donne accès à tout le projet.",
    whyOthersWrong: {
      "A": "Les conditions IAM ajoutent de la granularité mais garder le rôle Editor reste trop permissif. Un seul compte de service partagé entre tous les pipelines ne respecte pas le principe d'isolation.",
      "C": "Le rôle Viewer est trop restrictif (lecture seule) et empêcherait les pipelines d'écrire des données. De plus, le compte de service par défaut partagé ne respecte toujours pas l'isolation.",
      "D": "Workload Identity Federation est conçu pour permettre à des identités externes (AWS, Azure, on-premise) d'accéder à GCP sans clé de compte de service. Ce n'est pas la solution pour le moindre privilège entre services GCP internes."
    },
    gcpLink: "https://cloud.google.com/iam/docs/best-practices"
  },
  {
    id: 33,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "difficile",
    question: "Votre organisation traite des données de santé soumises à des réglementations strictes. Vous devez empêcher l'exfiltration de données depuis BigQuery et Cloud Storage vers des projets GCP externes, tout en permettant la communication entre vos propres projets internes. Le réseau doit être protégé même si un utilisateur disposant de permissions IAM tente de copier les données vers un projet non autorisé. Quelle solution implémentez-vous ?",
    options: [
      { label: "A", text: "Configurer des règles de pare-feu VPC pour bloquer le trafic sortant vers les projets externes" },
      { label: "B", text: "Utiliser VPC Service Controls avec un périmètre de service englobant tous les projets internes" },
      { label: "C", text: "Révoquer le rôle BigQuery Data Viewer à tous les utilisateurs et n'autoriser que les comptes de service internes" },
      { label: "D", text: "Activer l'Organization Policy pour désactiver l'export de données BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "VPC Service Controls crée un périmètre de sécurité autour des services GCP qui empêche l'exfiltration de données même par des utilisateurs disposant de permissions IAM suffisantes. Les données ne peuvent pas quitter le périmètre : un bigquery.jobs.create vers un projet hors périmètre sera refusé. Les projets internes au périmètre communiquent librement entre eux.",
    whyOthersWrong: {
      "A": "Les règles de pare-feu VPC opèrent au niveau réseau (IP, ports) et ne protègent pas contre l'exfiltration via les API GCP. Un utilisateur peut copier des données BigQuery via l'API sans passer par le réseau VPC.",
      "C": "Révoquer les permissions de lecture empêcherait les utilisateurs légitimes de travailler. Le problème n'est pas l'accès en lecture mais la copie vers des projets non autorisés.",
      "D": "Il n'existe pas d'Organization Policy spécifique qui désactive globalement l'export BigQuery de cette manière. VPC Service Controls est le mécanisme conçu pour ce cas d'usage."
    },
    gcpLink: "https://cloud.google.com/vpc-service-controls/docs/overview"
  }
];
