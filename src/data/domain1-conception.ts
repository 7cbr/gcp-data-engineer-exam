import { Question } from './types';

export const domain1Questions: Question[] = [
  {
    id: 1,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "facile",
    question: "Votre entreprise doit migrer un entrepôt de données on-premise vers GCP. Les analystes utilisent principalement du SQL pour leurs requêtes et le volume de données est de 20 To. Quel service GCP est le plus adapté comme entrepôt de données principal ?",
    options: [
      { label: "A", text: "Cloud SQL" },
      { label: "B", text: "BigQuery" },
      { label: "C", text: "Cloud Spanner" },
      { label: "D", text: "Bigtable" }
    ],
    correctAnswers: ["B"],
    explanation: "BigQuery est le service d'entrepôt de données serverless de Google Cloud, conçu pour l'analyse de données à grande échelle via SQL. Il gère facilement des volumes de plusieurs pétaoctets et est optimisé pour les charges de travail analytiques.",
    whyOthersWrong: {
      "A": "Cloud SQL est une base de données relationnelle managée (MySQL, PostgreSQL, SQL Server) adaptée aux charges transactionnelles, pas aux entrepôts de données analytiques de 20 To.",
      "C": "Cloud Spanner est une base de données relationnelle distribuée globalement, conçue pour les charges transactionnelles à grande échelle, pas pour l'analyse de données.",
      "D": "Bigtable est une base de données NoSQL orientée colonnes, adaptée aux charges de travail à faible latence et haut débit, pas aux requêtes SQL analytiques."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/introduction"
  },
  {
    id: 2,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Une entreprise de e-commerce souhaite concevoir un système capable de traiter à la fois des données en temps réel (clics utilisateurs, événements de navigation) et des analyses batch quotidiennes (rapports de ventes). Quelle architecture est la plus appropriée ?",
    options: [
      { label: "A", text: "Utiliser uniquement Dataflow en mode streaming pour tous les traitements" },
      { label: "B", text: "Utiliser l'architecture Lambda avec Dataflow pour le streaming et Dataproc pour le batch" },
      { label: "C", text: "Utiliser Dataflow avec le modèle unifié batch/streaming d'Apache Beam" },
      { label: "D", text: "Utiliser Pub/Sub connecté directement à BigQuery pour le streaming et Cloud Functions pour le batch" }
    ],
    correctAnswers: ["C"],
    explanation: "Dataflow, basé sur Apache Beam, offre un modèle de programmation unifié qui gère à la fois le traitement batch et streaming avec le même code. Cela simplifie l'architecture et la maintenance par rapport à l'architecture Lambda qui nécessite deux pipelines séparés.",
    whyOthersWrong: {
      "A": "Utiliser uniquement le mode streaming n'est pas optimal pour les traitements batch quotidiens qui nécessitent des analyses sur de grands volumes historiques.",
      "B": "L'architecture Lambda fonctionne mais introduit une complexité inutile en maintenant deux systèmes séparés. Le modèle unifié de Beam est préférable sur GCP.",
      "D": "Cette architecture est trop simpliste et ne permet pas les transformations complexes nécessaires. Cloud Functions a des limites de temps d'exécution et de mémoire."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/concepts/beam-programming-model"
  },
  {
    id: 3,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Vous concevez un pipeline de données pour une application IoT qui reçoit des millions d'événements par seconde depuis des capteurs. Les données doivent être disponibles pour des requêtes en temps réel avec une latence inférieure à 10 ms. Quel service de stockage est le plus approprié ?",
    options: [
      { label: "A", text: "BigQuery" },
      { label: "B", text: "Cloud Bigtable" },
      { label: "C", text: "Cloud Firestore" },
      { label: "D", text: "Cloud Memorystore" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Bigtable est une base de données NoSQL haute performance conçue pour les charges de travail à faible latence et haut débit. Elle est idéale pour les données IoT en séries temporelles avec des millions d'écritures par seconde et des lectures en quelques millisecondes.",
    whyOthersWrong: {
      "A": "BigQuery est optimisé pour l'analyse, pas pour les lectures à faible latence (< 10 ms). Les requêtes BigQuery ont typiquement une latence de quelques secondes.",
      "C": "Cloud Firestore est une base de données document NoSQL qui ne gère pas efficacement des millions d'événements par seconde depuis des capteurs IoT.",
      "D": "Cloud Memorystore (Redis/Memcached) est un cache en mémoire, pas conçu comme stockage principal pour des volumes massifs de données IoT persistantes."
    },
    gcpLink: "https://cloud.google.com/bigtable/docs/overview"
  },
  {
    id: 4,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "difficile",
    question: "Une institution financière doit concevoir un système de traitement de transactions qui nécessite une cohérence forte (ACID), une disponibilité globale dans 5 régions, et la capacité de gérer 100 000 transactions par seconde. Le système doit également supporter des requêtes SQL complexes pour la conformité réglementaire. Quel service est le plus adapté ?",
    options: [
      { label: "A", text: "Cloud SQL avec des réplicas de lecture dans chaque région" },
      { label: "B", text: "Cloud Spanner avec une configuration multi-régionale" },
      { label: "C", text: "BigQuery avec des datasets multi-régionaux" },
      { label: "D", text: "Bigtable avec une réplication multi-cluster" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Spanner est la seule base de données qui offre une cohérence forte (ACID) à l'échelle globale, un support SQL complet, et la capacité de gérer des centaines de milliers de transactions par seconde. Sa réplication synchrone multi-régionale garantit la cohérence des données dans toutes les régions.",
    whyOthersWrong: {
      "A": "Cloud SQL ne peut pas gérer 100 000 TPS et ses réplicas de lecture ne fournissent pas une cohérence forte en écriture multi-régionale.",
      "C": "BigQuery est un entrepôt analytique, pas une base transactionnelle. Il ne supporte pas les transactions ACID en temps réel.",
      "D": "Bigtable offre une réplication multi-cluster mais ne supporte pas les transactions ACID ni les requêtes SQL complexes nécessaires pour la conformité."
    },
    gcpLink: "https://cloud.google.com/spanner/docs/overview"
  },
  {
    id: 5,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "difficile",
    question: "Vous concevez l'architecture de données pour une plateforme de streaming vidéo. Le système doit stocker les métadonnées des vidéos (titre, description, tags), les profils utilisateurs, les historiques de visionnage, et servir des recommandations personnalisées en temps réel. Quelle combinaison de services est la plus appropriée ?",
    options: [
      { label: "A", text: "Firestore pour les métadonnées et profils, Bigtable pour l'historique de visionnage, Vertex AI pour les recommandations" },
      { label: "B", text: "Cloud SQL pour toutes les données, Dataflow pour les recommandations" },
      { label: "C", text: "BigQuery pour toutes les données, BigQuery ML pour les recommandations" },
      { label: "D", text: "Spanner pour les métadonnées et profils, Memorystore pour l'historique, Cloud Functions pour les recommandations" }
    ],
    correctAnswers: ["A"],
    explanation: "Firestore est idéal pour les métadonnées structurées et les profils avec des lectures rapides. Bigtable excelle pour les données de séries temporelles comme l'historique de visionnage à grande échelle. Vertex AI permet de déployer des modèles de recommandation en temps réel avec une faible latence.",
    whyOthersWrong: {
      "B": "Cloud SQL ne peut pas gérer la charge d'une plateforme de streaming à grande échelle. Dataflow est un outil de traitement de données, pas un moteur de recommandation.",
      "C": "BigQuery a une latence trop élevée pour servir des recommandations en temps réel. BigQuery ML est adapté à l'analyse mais pas au serving en temps réel.",
      "D": "Spanner est surqualifié pour des métadonnées simples. Memorystore est volatile et ne convient pas comme stockage principal d'historique. Cloud Functions n'est pas adapté pour servir des modèles ML complexes."
    }
  },
  {
    id: 6,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "facile",
    question: "Quel est le rôle principal de Cloud Pub/Sub dans une architecture de données sur GCP ?",
    options: [
      { label: "A", text: "Stocker des données de manière durable" },
      { label: "B", text: "Servir de service de messagerie asynchrone pour découpler les producteurs et consommateurs de données" },
      { label: "C", text: "Exécuter des transformations de données complexes" },
      { label: "D", text: "Orchestrer des workflows de pipelines de données" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Pub/Sub est un service de messagerie asynchrone qui permet de découpler les systèmes producteurs de données des systèmes consommateurs. Il garantit la livraison des messages et absorbe les pics de charge.",
    whyOthersWrong: {
      "A": "Pub/Sub est un service de messagerie, pas de stockage. Les messages ont une durée de rétention limitée (par défaut 7 jours).",
      "C": "Les transformations de données sont gérées par des services comme Dataflow ou Dataproc, pas Pub/Sub.",
      "D": "L'orchestration de workflows est assurée par Cloud Composer (Apache Airflow), pas Pub/Sub."
    },
    gcpLink: "https://cloud.google.com/pubsub/docs/overview"
  },
  {
    id: 7,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Vous devez concevoir un système de traitement de logs pour une application distribuée. Les logs proviennent de 500 instances Compute Engine et doivent être analysés en quasi-temps réel pour détecter des anomalies. Quelle architecture recommandez-vous ?",
    options: [
      { label: "A", text: "Cloud Logging → BigQuery → Looker Studio pour la visualisation" },
      { label: "B", text: "Cloud Logging → Pub/Sub → Dataflow (streaming) → BigQuery + alertes Cloud Monitoring" },
      { label: "C", text: "Écrire les logs directement dans Cloud Storage puis les charger dans BigQuery avec un job batch" },
      { label: "D", text: "Installer Elasticsearch sur des VMs Compute Engine pour indexer et analyser les logs" }
    ],
    correctAnswers: ["B"],
    explanation: "Cette architecture utilise Cloud Logging pour la collecte, Pub/Sub pour le découplage, Dataflow en streaming pour la détection d'anomalies en quasi-temps réel, BigQuery pour le stockage analytique, et Cloud Monitoring pour les alertes. C'est l'architecture cloud-native recommandée.",
    whyOthersWrong: {
      "A": "L'export direct de Cloud Logging vers BigQuery fonctionne mais ne permet pas le traitement en quasi-temps réel ni la détection d'anomalies avancée.",
      "C": "Le traitement batch n'est pas compatible avec l'exigence de quasi-temps réel pour la détection d'anomalies.",
      "D": "Gérer un cluster Elasticsearch manuellement est plus complexe et coûteux qu'une solution cloud-native managée."
    },
    gcpLink: "https://cloud.google.com/logging/docs/export"
  },
  {
    id: 8,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "difficile",
    question: "Une entreprise multinationale doit respecter le RGPD et stocker les données des clients européens exclusivement dans l'UE, tout en permettant aux équipes globales d'exécuter des analyses agrégées (sans données personnelles). Quelle architecture répond le mieux à ces exigences ?",
    options: [
      { label: "A", text: "Un seul dataset BigQuery multi-régional EU avec des vues autorisées pour filtrer les données personnelles" },
      { label: "B", text: "Datasets BigQuery dans la région EU pour les données brutes, Analytics Hub pour partager des données agrégées anonymisées avec les autres régions" },
      { label: "C", text: "Cloud Spanner avec une instance multi-régionale et le chiffrement CMEK pour les données européennes" },
      { label: "D", text: "Copier les données dans chaque région avec Cloud Storage et utiliser des policies DLP pour masquer les données sensibles" }
    ],
    correctAnswers: ["B"],
    explanation: "Analytics Hub permet de partager des datasets ou vues BigQuery de manière contrôlée entre organisations ou régions. Les données brutes restent dans l'EU, et seules les données agrégées et anonymisées sont accessibles via des listings Analytics Hub, respectant ainsi le RGPD.",
    whyOthersWrong: {
      "A": "Les vues autorisées ne suffisent pas car les équipes globales accèderaient toujours au dataset EU, ce qui peut poser des problèmes de latence et de gouvernance.",
      "C": "Cloud Spanner résout le problème de distribution mais ne répond pas à la séparation données brutes/agrégées ni au partage analytique.",
      "D": "Copier les données dans d'autres régions viole le principe de résidence des données du RGPD, même avec masquage DLP."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/analytics-hub-introduction"
  },
  {
    id: 9,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Votre équipe doit orchestrer un pipeline de données complexe comprenant : extraction depuis Cloud SQL, transformation avec Dataflow, chargement dans BigQuery, puis entraînement d'un modèle ML avec Vertex AI. Le pipeline doit s'exécuter quotidiennement avec gestion des dépendances et des reprises en cas d'échec. Quel service utilisez-vous pour l'orchestration ?",
    options: [
      { label: "A", text: "Cloud Scheduler avec Cloud Functions" },
      { label: "B", text: "Cloud Composer (Apache Airflow)" },
      { label: "C", text: "Cloud Workflows" },
      { label: "D", text: "Dataflow avec des templates chaînés" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Composer, basé sur Apache Airflow, est le service d'orchestration de workflows recommandé pour les pipelines de données complexes. Il gère les dépendances entre tâches, les reprises sur erreur, la planification, et s'intègre nativement avec tous les services GCP mentionnés.",
    whyOthersWrong: {
      "A": "Cloud Scheduler + Cloud Functions peut déclencher des tâches mais ne gère pas efficacement les dépendances complexes entre étapes ni les reprises automatiques.",
      "C": "Cloud Workflows est adapté pour l'orchestration de services simples mais moins mature que Composer pour les pipelines de données complexes avec de nombreuses dépendances.",
      "D": "Dataflow est un moteur d'exécution de pipelines, pas un orchestrateur. Il ne peut pas gérer les dépendances entre services différents (Cloud SQL, BigQuery, Vertex AI)."
    },
    gcpLink: "https://cloud.google.com/composer/docs/concepts/overview"
  }
];
