import type { Question } from './types';

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
  },
  {
    id: 51,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "facile",
    question: "Une startup souhaite déployer rapidement une API REST qui permet à des applications tierces de requêter des données agrégées stockées dans BigQuery. L'API reçoit en moyenne 50 requêtes par minute, avec des pics occasionnels à 500 requêtes par minute. Quel service GCP est le plus adapté pour héberger cette API ?",
    options: [
      { label: "A", text: "Compute Engine avec un groupe d'instances managé et un load balancer" },
      { label: "B", text: "Cloud Run avec auto-scaling" },
      { label: "C", text: "App Engine Flexible" },
      { label: "D", text: "Google Kubernetes Engine (GKE)" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Run est un service serverless qui scale automatiquement de 0 à N instances en fonction du trafic. Pour une API avec un trafic modéré et des pics occasionnels, Cloud Run est idéal : pas de gestion d'infrastructure, facturation à l'usage, et scaling rapide pour absorber les pics.",
    whyOthersWrong: {
      "A": "Compute Engine avec un MIG est surqualifié pour ce cas d'usage. La gestion du load balancer, des instances et de l'autoscaling ajoute une complexité inutile pour un trafic modéré.",
      "C": "App Engine Flexible est une option valide mais plus coûteuse que Cloud Run car les instances ne scalent pas à zéro et la facturation est à la VM, pas à la requête.",
      "D": "GKE est conçu pour des déploiements complexes avec de nombreux microservices. Pour une seule API, c'est excessivement complexe et coûteux."
    },
    gcpLink: "https://cloud.google.com/run/docs/overview/what-is-cloud-run"
  },
  {
    id: 52,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Une entreprise de logistique souhaite concevoir un système de tracking en temps réel pour ses 10 000 véhicules. Chaque véhicule envoie sa position GPS toutes les 5 secondes. Le système doit permettre des requêtes géospatiales en temps réel (« quels véhicules sont dans un rayon de 5 km de ce point ? ») et conserver un historique de 2 ans pour l'analyse. Quelle architecture recommandez-vous ?",
    options: [
      { label: "A", text: "Pub/Sub → Dataflow → BigQuery avec des fonctions géospatiales BigQuery GIS" },
      { label: "B", text: "Pub/Sub → Dataflow → Bigtable pour le temps réel + BigQuery pour l'historique analytique" },
      { label: "C", text: "Pub/Sub → Cloud Functions → Firestore avec des requêtes GeoPoint" },
      { label: "D", text: "Écrire directement depuis les véhicules dans Cloud SQL PostgreSQL avec PostGIS" }
    ],
    correctAnswers: ["B"],
    explanation: "Bigtable offre la latence en millisecondes nécessaire pour les requêtes de position en temps réel à grande échelle (10 000 véhicules x 1 position/5s = 2 000 écritures/seconde). BigQuery avec BigQuery GIS est idéal pour l'analyse historique géospatiale sur 2 ans. Dataflow assure la transformation et le routage vers les deux destinations.",
    whyOthersWrong: {
      "A": "BigQuery seul n'est pas adapté pour les requêtes en temps réel avec une latence de millisecondes. BigQuery a une latence minimale de quelques secondes, insuffisante pour le tracking temps réel.",
      "C": "Firestore peut gérer des requêtes GeoPoint mais ne scale pas efficacement pour 2 000 écritures/seconde de positions GPS et n'est pas optimisé pour les séries temporelles massives.",
      "D": "Cloud SQL avec PostGIS ne gère pas efficacement le volume de 2 000 écritures/seconde continues et n'est pas conçu pour conserver 2 ans d'historique à grande échelle."
    },
    gcpLink: "https://cloud.google.com/bigtable/docs/overview"
  },
  {
    id: 53,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "difficile",
    question: "Votre entreprise gère une plateforme SaaS multi-tenant avec 500 clients. Chaque client génère entre 1 Go et 500 Go de données par mois. Les exigences sont : isolation des données entre clients, possibilité pour chaque client de requêter ses propres données via SQL, et coûts proportionnels à l'usage de chaque client. Quelle architecture BigQuery est la plus adaptée ?",
    options: [
      { label: "A", text: "Un seul dataset BigQuery avec toutes les données et un filtrage par colonne tenant_id" },
      { label: "B", text: "Un projet GCP séparé par client avec un dataset BigQuery dédié" },
      { label: "C", text: "Un dataset BigQuery par client dans un projet partagé, avec des vues autorisées et des réservations de slots par client" },
      { label: "D", text: "BigQuery Omni pour distribuer les données entre plusieurs clouds selon le client" }
    ],
    correctAnswers: ["C"],
    explanation: "Un dataset par client offre une isolation logique via IAM au niveau du dataset. Les vues autorisées permettent un contrôle d'accès granulaire. Les réservations de slots par client garantissent des performances isolées et une facturation proportionnelle à l'usage. Cette approche balance isolation, performance et gestion opérationnelle pour 500 clients.",
    whyOthersWrong: {
      "A": "Un seul dataset avec filtrage par tenant_id ne fournit pas d'isolation IAM entre clients. Un client pourrait potentiellement accéder aux données d'un autre si les permissions sont mal configurées. De plus, les coûts ne sont pas facilement répartis par client.",
      "B": "Un projet par client offre l'isolation maximale mais est très difficile à gérer pour 500 clients : 500 projets, 500 facturations, 500 configurations IAM. C'est opérationnellement ingérable.",
      "D": "BigQuery Omni est conçu pour interroger des données stockées dans AWS S3 ou Azure Blob Storage, pas pour l'isolation multi-tenant."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/reservations-intro"
  },
  {
    id: 54,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Une entreprise de média souhaite construire un pipeline d'analyse de sentiment en quasi-temps réel sur les commentaires des réseaux sociaux. Les commentaires arrivent via une API externe à raison de 10 000 par minute et doivent être enrichis avec un score de sentiment avant d'être stockés. Quelle architecture est la plus adaptée ?",
    options: [
      { label: "A", text: "Cloud Scheduler → Cloud Functions → Natural Language API → Cloud SQL" },
      { label: "B", text: "Pub/Sub → Dataflow → Natural Language API → BigQuery" },
      { label: "C", text: "Pub/Sub → Cloud Functions → Natural Language API → Firestore" },
      { label: "D", text: "Pub/Sub → Dataproc Spark Streaming → BigQuery ML pour le sentiment → BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "Pub/Sub absorbe le flux de commentaires et découple l'ingestion du traitement. Dataflow en streaming permet de traiter les commentaires en continu, d'appeler l'API Natural Language pour le score de sentiment, et d'écrire les résultats enrichis dans BigQuery pour l'analyse. Cette architecture est scalable, managée et tolérante aux pannes.",
    whyOthersWrong: {
      "A": "Cloud Scheduler avec Cloud Functions est conçu pour le traitement par lots planifié, pas pour un flux continu de 10 000 commentaires par minute. Cloud Functions a des limites de concurrence et de timeout.",
      "C": "Cloud Functions peut être déclenchée par Pub/Sub mais a des limites de concurrence et de temps d'exécution. Firestore n'est pas optimisé pour l'analyse analytique à grande échelle des résultats.",
      "D": "Dataproc Spark Streaming est plus complexe à gérer que Dataflow. BigQuery ML ne dispose pas d'un modèle d'analyse de sentiment natif aussi performant que l'API Natural Language dédiée."
    },
    gcpLink: "https://cloud.google.com/natural-language/docs/basics"
  },
  {
    id: 55,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "difficile",
    question: "Vous devez concevoir un data lakehouse sur GCP pour une entreprise qui souhaite combiner les avantages d'un data lake (stockage de données brutes à faible coût) et d'un data warehouse (requêtes SQL performantes). Les données brutes sont au format Parquet dans Cloud Storage et représentent 200 To. Quelle architecture est la plus adaptée ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Utiliser BigLake pour créer des tables externes sur les fichiers Parquet dans Cloud Storage, avec support du contrôle d'accès unifié" },
      { label: "B", text: "Charger toutes les données Parquet dans des tables natives BigQuery pour de meilleures performances" },
      { label: "C", text: "Utiliser Dataproc avec Apache Iceberg sur Cloud Storage pour gérer les tables avec des transactions ACID et le time travel" },
      { label: "D", text: "Stocker toutes les données dans Bigtable pour les performances de lecture" }
    ],
    correctAnswers: ["A", "C"],
    explanation: "BigLake permet de requêter des données Parquet directement dans Cloud Storage via BigQuery avec un contrôle d'accès unifié, incarnant le concept de lakehouse. Apache Iceberg sur Dataproc ajoute les transactions ACID, le time travel et l'évolution de schéma aux tables du data lake. Ces deux approches sont complémentaires pour un lakehouse complet.",
    whyOthersWrong: {
      "B": "Charger 200 To dans BigQuery natif fonctionne mais perd l'avantage du data lake (stockage ouvert, accès multi-moteur). Le lakehouse vise justement à éviter cette duplication en gardant les données dans un format ouvert.",
      "D": "Bigtable est une base NoSQL orientée séries temporelles, non adaptée aux requêtes SQL analytiques ni au stockage de données brutes au format Parquet."
    },
    gcpLink: "https://cloud.google.com/biglake/docs/introduction"
  },
  {
    id: 56,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "facile",
    question: "Quelle est la principale différence entre Cloud Dataflow et Cloud Dataproc pour le traitement de données sur GCP ?",
    options: [
      { label: "A", text: "Dataflow est pour le batch uniquement, Dataproc pour le streaming uniquement" },
      { label: "B", text: "Dataflow est un service serverless basé sur Apache Beam, Dataproc est un service managé Hadoop/Spark avec des clusters provisionnés" },
      { label: "C", text: "Dataflow est gratuit tandis que Dataproc est payant" },
      { label: "D", text: "Dataproc est serverless tandis que Dataflow nécessite de gérer des clusters" }
    ],
    correctAnswers: ["B"],
    explanation: "Dataflow est un service entièrement serverless basé sur Apache Beam qui gère automatiquement les ressources. Dataproc est un service managé qui provisionne des clusters Hadoop/Spark, idéal pour migrer des workloads Spark/Hadoop existants. Les deux supportent le batch et le streaming.",
    whyOthersWrong: {
      "A": "Les deux services supportent le traitement batch et streaming. Dataflow via Apache Beam, Dataproc via Spark Structured Streaming ou Flink.",
      "C": "Les deux services sont payants. Dataflow facture par vCPU et Go de mémoire utilisés, Dataproc par les VMs du cluster plus un surcoût de gestion.",
      "D": "C'est l'inverse : Dataflow est serverless (pas de cluster à gérer), tandis que Dataproc nécessite la création et la gestion de clusters (même si c'est managé)."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/concepts/beam-programming-model"
  },
  {
    id: 57,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "intermédiaire",
    question: "Une banque en ligne doit concevoir un système de détection de fraude en temps réel. Chaque transaction doit être évaluée en moins de 200 ms, en comparant les patterns de la transaction avec l'historique des 90 derniers jours du client. Le système traite 5 000 transactions par seconde. Quelle architecture est la plus adaptée ?",
    options: [
      { label: "A", text: "Pub/Sub → Cloud Function qui interroge BigQuery pour chaque transaction → réponse au système de paiement" },
      { label: "B", text: "Pub/Sub → Dataflow avec enrichissement depuis Bigtable (profils clients pré-calculés) → modèle ML sur Vertex AI Endpoint → réponse au système de paiement" },
      { label: "C", text: "Pub/Sub → Dataflow → BigQuery en streaming → requête BigQuery ML pour chaque transaction" },
      { label: "D", text: "Écriture directe dans Cloud SQL → trigger PostgreSQL qui exécute un script Python de scoring" }
    ],
    correctAnswers: ["B"],
    explanation: "Cette architecture combine Pub/Sub pour l'ingestion fiable, Dataflow pour l'enrichissement en streaming, Bigtable pour les lookups à faible latence (< 10 ms) des profils clients pré-calculés, et un endpoint Vertex AI pour l'inférence ML rapide. L'ensemble peut traiter 5 000 TPS avec une latence inférieure à 200 ms.",
    whyOthersWrong: {
      "A": "BigQuery a une latence minimale de plusieurs secondes par requête, incompatible avec l'exigence de 200 ms. Cloud Functions a aussi des problèmes de cold start.",
      "C": "BigQuery ML ne peut pas servir des prédictions individuelles en moins de 200 ms. La latence de BigQuery est de l'ordre des secondes.",
      "D": "Cloud SQL ne peut pas gérer 5 000 transactions par seconde avec des triggers qui exécutent des scripts Python. Cette architecture n'est pas scalable et est fragile."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/predictions/overview"
  },
  {
    id: 58,
    domain: "Conception de systèmes de traitement de données",
    difficulty: "difficile",
    question: "Vous concevez une plateforme de données pour un groupe hospitalier qui doit respecter des contraintes strictes : données patient hébergées exclusivement en France (région europe-west9), interopérabilité avec le standard FHIR pour les dossiers médicaux, et capacité d'analyse agrégée pour la recherche clinique. Quelle architecture est la plus adaptée ?",
    options: [
      { label: "A", text: "Cloud Healthcare API (FHIR store) dans la région europe-west9, avec export vers BigQuery pour l'analyse, et VPC Service Controls pour l'isolation" },
      { label: "B", text: "Cloud SQL PostgreSQL en europe-west9 avec un schéma FHIR custom et des exports CSV vers BigQuery" },
      { label: "C", text: "Firestore en europe-west9 pour stocker les documents FHIR et Dataflow pour l'analyse" },
      { label: "D", text: "Cloud Spanner multi-régional EU pour les données patient et BigQuery pour l'analyse" }
    ],
    correctAnswers: ["A"],
    explanation: "Cloud Healthcare API fournit un FHIR store natif conforme au standard HL7 FHIR, avec un support direct de l'API FHIR REST. Le déploiement en europe-west9 garantit la résidence des données en France. L'export natif vers BigQuery permet l'analyse pour la recherche clinique. VPC Service Controls empêche l'exfiltration des données sensibles.",
    whyOthersWrong: {
      "B": "Un schéma FHIR custom dans PostgreSQL nécessite un développement et une maintenance considérables pour implémenter correctement le standard FHIR. Cloud Healthcare API est la solution native et conforme.",
      "C": "Firestore n'est pas conçu pour stocker des ressources FHIR de manière conforme au standard. L'absence de validation FHIR native rend cette approche risquée pour des données médicales réglementées.",
      "D": "Cloud Spanner multi-régional EU ne garantit pas la résidence exclusive en France (europe-west9). Les données pourraient être répliquées dans d'autres pays de l'UE, ce qui peut ne pas satisfaire les exigences réglementaires françaises spécifiques."
    },
    gcpLink: "https://cloud.google.com/healthcare-api/docs/concepts/fhir"
  }
];
