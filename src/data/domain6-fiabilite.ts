import { Question } from './types';

export const domain6Questions: Question[] = [
  {
    id: 43,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "facile",
    question: "Votre pipeline Dataflow de traitement de données en streaming tombe en panne la nuit et personne ne s'en aperçoit pendant 6 heures. Votre manager vous demande de mettre en place un système d'alerte pour être prévenu immédiatement en cas de problème. Quelle solution GCP implémentez-vous ?",
    options: [
      { label: "A", text: "Écrire un script cron qui vérifie l'état du pipeline toutes les 5 minutes" },
      { label: "B", text: "Configurer une politique d'alerte dans Cloud Monitoring basée sur les métriques Dataflow (system lag, data freshness) avec notification par email et PagerDuty" },
      { label: "C", text: "Consulter le tableau de bord Dataflow dans la console GCP chaque matin" },
      { label: "D", text: "Activer Cloud Logging et analyser les logs manuellement en cas de suspicion de problème" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Monitoring permet de créer des politiques d'alerte basées sur les métriques natives de Dataflow comme le system lag (retard de traitement) et la data freshness (fraîcheur des données). Les alertes sont envoyées automatiquement via des canaux de notification configurables (email, SMS, PagerDuty, Slack).",
    whyOthersWrong: {
      "A": "Un script cron est fragile (il peut lui-même tomber en panne), difficile à maintenir, et ne s'intègre pas nativement avec les métriques Dataflow. Cloud Monitoring est la solution managée et fiable.",
      "C": "Une vérification manuelle quotidienne est réactive et ne permet pas de détecter un problème la nuit ou le week-end. L'exigence est d'être prévenu immédiatement.",
      "D": "Cloud Logging enregistre les logs mais n'envoie pas d'alertes proactives. Analyser les logs manuellement est réactif et ne répond pas au besoin de notification immédiate."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/guides/using-cloud-monitoring"
  },
  {
    id: 44,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "facile",
    question: "Votre entreprise reçoit des factures EDI de fournisseurs via Pub/Sub. Certains messages sont malformés (JSON invalide) et font échouer votre pipeline Dataflow. Actuellement, ces messages bloquent le traitement des messages valides. Comment gérez-vous les messages invalides sans bloquer le pipeline ?",
    options: [
      { label: "A", text: "Augmenter le nombre de retries sur l'abonnement Pub/Sub pour forcer le retraitement" },
      { label: "B", text: "Implémenter un dead letter queue (DLQ) : les messages en échec sont envoyés vers un topic Pub/Sub dédié pour analyse ultérieure" },
      { label: "C", text: "Ignorer silencieusement les messages invalides avec un try/catch" },
      { label: "D", text: "Valider le format JSON côté producteur avant l'envoi dans Pub/Sub" }
    ],
    correctAnswers: ["B"],
    explanation: "Un dead letter queue (file d'attente des messages non traités) permet de rediriger les messages en échec vers un topic séparé sans bloquer le traitement des messages valides. Les messages invalides peuvent ensuite être analysés, corrigés et rejoués. Pub/Sub supporte nativement les dead letter topics.",
    whyOthersWrong: {
      "A": "Augmenter les retries ne résout pas le problème : un message malformé échouera indéfiniment et continuera de consommer des ressources inutilement.",
      "C": "Ignorer silencieusement les messages entraîne une perte de données sans traçabilité. Vous ne saurez jamais quelles factures ont été perdues, ce qui est inacceptable pour des données financières.",
      "D": "La validation côté producteur est une bonne pratique complémentaire mais ne suffit pas : vous ne contrôlez pas toujours le producteur (fournisseurs externes), et il faut toujours gérer les erreurs côté consommateur."
    },
    gcpLink: "https://cloud.google.com/pubsub/docs/dead-letter-topics"
  },
  {
    id: 45,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Votre pipeline Dataflow streaming traite en moyenne 10 000 événements par seconde, mais subit des pics à 100 000 événements/seconde pendant les soldes. Pendant ces pics, le pipeline prend du retard et la latence augmente fortement. Comment optimisez-vous le pipeline pour gérer ces variations de charge ?",
    options: [
      { label: "A", text: "Provisionner en permanence des workers Dataflow capables de gérer 100 000 événements/seconde" },
      { label: "B", text: "Activer l'autoscaling de Dataflow avec des paramètres maxNumWorkers adaptés aux pics et utiliser Streaming Engine" },
      { label: "C", text: "Stocker les événements excédentaires dans Cloud Storage pendant les pics et les retraiter en batch après" },
      { label: "D", text: "Augmenter la taille des machines des workers Dataflow (scaling vertical)" }
    ],
    correctAnswers: ["B"],
    explanation: "L'autoscaling de Dataflow ajuste automatiquement le nombre de workers en fonction du débit de données. Combiné avec Streaming Engine (qui décharge le shuffling sur l'infrastructure Google), le pipeline scale horizontalement pour absorber les pics et réduit les ressources en période calme, optimisant ainsi les coûts.",
    whyOthersWrong: {
      "A": "Provisionner en permanence pour les pics gaspille des ressources 90% du temps quand le trafic est normal. Le coût est 10x plus élevé que nécessaire en régime nominal.",
      "C": "Stocker dans Cloud Storage pour retraitement batch introduit un délai de traitement et une complexité architecturale. Les événements ne sont plus traités en temps réel pendant les pics.",
      "D": "Le scaling vertical a des limites physiques (taille maximale de VM) et nécessite un redémarrage du pipeline. L'autoscaling horizontal est plus flexible et n'a pas de limite théorique."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/guides/deploying-a-pipeline#autoscaling"
  },
  {
    id: 46,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Les coûts BigQuery de votre équipe data ont triplé en 3 mois. Après analyse, vous constatez que de nombreuses requêtes scannent des tables entières de plusieurs téraoctets alors que les analyses portent généralement sur les données des 30 derniers jours. Comment optimisez-vous les coûts sans changer les requêtes existantes ?",
    options: [
      { label: "A", text: "Migrer vers la tarification à capacité fixe (slots) au lieu de la tarification à la demande" },
      { label: "B", text: "Partitionner les tables par date d'ingestion et configurer le paramètre require_partition_filter pour forcer le filtrage par partition" },
      { label: "C", text: "Exporter les données de plus de 30 jours vers Cloud Storage au format Parquet" },
      { label: "D", text: "Limiter le nombre de requêtes par utilisateur avec des quotas" }
    ],
    correctAnswers: ["B"],
    explanation: "Le partitionnement par date permet à BigQuery de ne scanner que les partitions nécessaires (pruning). En activant require_partition_filter, chaque requête doit inclure un filtre sur la colonne de partition, évitant les scans complets accidentels. Pour des analyses sur 30 jours, le coût passe de plusieurs To scannés à une fraction.",
    whyOthersWrong: {
      "A": "La tarification par slots fixe les coûts mais ne résout pas le problème fondamental de performance : les requêtes continuent de scanner des volumes inutiles. De plus, les slots fixes peuvent être plus coûteux si la charge est variable.",
      "C": "Exporter vers Cloud Storage complexifie l'architecture et rend les données historiques plus difficiles à requêter. Le partitionnement combiné avec le stockage long-terme de BigQuery (tarif réduit après 90 jours) est préférable.",
      "D": "Limiter les requêtes par utilisateur ne réduit pas le coût par requête et frustre les utilisateurs. Le problème est l'efficacité des requêtes, pas leur nombre."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/partitioned-tables"
  },
  {
    id: 47,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Votre équipe data opère un data warehouse BigQuery critique pour le reporting financier quotidien. Le CFO exige un SLA de 99.9% de disponibilité et un RPO (Recovery Point Objective) de 1 heure. Quelle stratégie de disaster recovery implémentez-vous ?",
    options: [
      { label: "A", text: "S'appuyer uniquement sur le SLA natif de BigQuery qui garantit 99.99% de disponibilité" },
      { label: "B", text: "Configurer des snapshots BigQuery réguliers, utiliser des datasets multi-régionaux, et mettre en place un Cross-Region Dataset Replication" },
      { label: "C", text: "Exporter quotidiennement les données dans Cloud Storage avec un bucket bi-régional" },
      { label: "D", text: "Créer un cluster BigQuery de secours dans une autre région avec une réplication manuelle" }
    ],
    correctAnswers: ["B"],
    explanation: "Les datasets multi-régionaux de BigQuery répliquent automatiquement les données dans plusieurs régions. Combinés avec des snapshots réguliers (pour le RPO de 1h) et la réplication cross-region, cette stratégie assure à la fois la haute disponibilité et la récupération rapide en cas de sinistre régional. Les snapshots permettent de restaurer les données à un point dans le temps.",
    whyOthersWrong: {
      "A": "Le SLA natif de BigQuery couvre la disponibilité du service mais pas la protection contre les erreurs humaines (suppression accidentelle de données) ni le RPO de 1h. Des snapshots sont nécessaires pour la récupération de données.",
      "C": "L'export quotidien dans Cloud Storage donne un RPO de 24 heures, ce qui ne respecte pas l'exigence d'un RPO de 1 heure. De plus, la restauration depuis Cloud Storage est plus lente et complexe.",
      "D": "BigQuery est un service managé serverless ; il n'y a pas de concept de \"cluster de secours\". La réplication manuelle est fragile et ne garantit pas le RPO de 1 heure."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/table-snapshots-intro"
  },
  {
    id: 48,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre organisation traite 50 millions de lignes par jour provenant de fichiers CSV déposés par des partenaires dans Cloud Storage. Vous constatez régulièrement des problèmes de qualité : colonnes manquantes, formats de date incohérents, doublons, et valeurs hors plage. Ces problèmes polluent votre data warehouse et provoquent des erreurs dans les rapports. Comment implémentez-vous une solution de validation de qualité des données robuste et automatisée ?",
    options: [
      { label: "A", text: "Ajouter des contraintes CHECK dans les tables BigQuery de destination" },
      { label: "B", text: "Intégrer Dataplex Data Quality (basé sur CloudDQ) dans le pipeline pour définir des règles de validation déclaratives, avec des rapports de qualité et des alertes en cas de violation" },
      { label: "C", text: "Écrire des tests unitaires Python dans le pipeline Dataflow pour vérifier chaque ligne" },
      { label: "D", text: "Créer des vues BigQuery qui filtrent les lignes invalides après le chargement" }
    ],
    correctAnswers: ["B"],
    explanation: "Dataplex Data Quality permet de définir des règles de validation déclaratives (complétude, format, unicité, plage de valeurs) qui s'exécutent automatiquement sur les données. Il produit des rapports de qualité détaillés, s'intègre avec Cloud Monitoring pour les alertes, et peut bloquer le chargement si le seuil de qualité n'est pas atteint.",
    whyOthersWrong: {
      "A": "BigQuery ne supporte pas les contraintes CHECK comme une base relationnelle traditionnelle. Les données invalides seraient déjà chargées avant qu'une erreur ne soit détectée.",
      "C": "Des tests unitaires Python dans Dataflow fonctionnent mais sont difficiles à maintenir à grande échelle, ne produisent pas de rapports de qualité standardisés, et mélangent la logique de validation avec la logique de transformation.",
      "D": "Filtrer les données invalides après chargement est réactif : les données corrompues sont déjà dans le data warehouse. De plus, les vues ne corrigent pas le problème à la source et les rapports en aval peuvent utiliser les tables directement."
    },
    gcpLink: "https://cloud.google.com/dataplex/docs/data-quality-overview"
  },
  {
    id: 49,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre entreprise utilise BigQuery avec la tarification à la demande (on-demand). Vous avez 200 analystes qui exécutent des requêtes tout au long de la journée. Lors des périodes de reporting de fin de mois, les requêtes critiques de l'équipe finance sont ralenties car elles sont en concurrence avec les requêtes exploratoires des autres équipes. Comment garantissez-vous la performance des requêtes critiques tout en maintenant l'accès pour tous ?",
    options: [
      { label: "A", text: "Migrer entièrement vers la tarification par édition (Enterprise) avec des réservations de slots et créer des assignations avec des priorités différentes pour l'équipe finance et les autres équipes" },
      { label: "B", text: "Limiter le nombre de requêtes concurrentes des équipes non-finance pendant les périodes de reporting" },
      { label: "C", text: "Créer un projet GCP séparé pour l'équipe finance avec sa propre tarification à la demande" },
      { label: "D", text: "Pré-calculer tous les rapports finance avec des vues matérialisées pour éviter les requêtes en temps réel" }
    ],
    correctAnswers: ["A"],
    explanation: "La tarification par édition avec les réservations de slots permet d'allouer des capacités de calcul dédiées à différentes équipes. L'équipe finance peut avoir une réservation de slots prioritaire garantissant des performances constantes, tandis que les autres équipes partagent une autre réservation ou utilisent des slots autoscale. Les assignations permettent un contrôle granulaire de la priorité.",
    whyOthersWrong: {
      "B": "Limiter les requêtes concurrentes pénalise les autres équipes et n'est pas une solution scalable. Les quotas par utilisateur sont rigides et ne s'adaptent pas aux variations de charge.",
      "C": "Un projet séparé avec tarification à la demande ne garantit pas de performance : les requêtes on-demand partagent la capacité commune de Google. Seules les réservations de slots offrent une capacité dédiée.",
      "D": "Les vues matérialisées sont utiles pour certains cas mais ne couvrent pas tous les besoins analytiques de l'équipe finance. Les analyses ad hoc et les nouveaux rapports nécessitent des requêtes à la demande."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/reservations-intro"
  },
  {
    id: 50,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Vous êtes responsable d'un pipeline de données critique qui alimente un tableau de bord temps réel utilisé par l'équipe opérations. Le pipeline comprend : ingestion via Pub/Sub, transformation via Dataflow, et stockage dans BigQuery. Votre CTO vous demande de définir des SLI (Service Level Indicators) et SLO (Service Level Objectives) pour ce pipeline. Quelle combinaison de métriques et objectifs est la plus pertinente ?",
    options: [
      { label: "A", text: "SLI : taux de disponibilité du pipeline, SLO : 99% de disponibilité mensuelle" },
      { label: "B", text: "SLI : data freshness (fraîcheur des données dans BigQuery), data completeness (pourcentage d'événements ingérés vs émis), error rate (taux d'erreurs de transformation). SLO : fraîcheur < 5 min pour 99.5% du temps, complétude > 99.9%, erreurs < 0.1%" },
      { label: "C", text: "SLI : nombre de jobs Dataflow réussis par jour, SLO : 100% de jobs réussis" },
      { label: "D", text: "SLI : coût quotidien du pipeline, SLO : rester sous le budget alloué" }
    ],
    correctAnswers: ["B"],
    explanation: "Des SLI pertinents pour un pipeline de données mesurent la qualité du service du point de vue de l'utilisateur final : la fraîcheur des données (combien de temps entre l'événement et sa disponibilité dans BigQuery), la complétude (aucune donnée perdue), et le taux d'erreurs. Les SLO associés définissent des seuils réalistes et mesurables qui reflètent l'impact business.",
    whyOthersWrong: {
      "A": "La disponibilité seule est insuffisante : un pipeline peut être \"disponible\" mais livrer des données en retard ou incomplètes. Les SLI doivent mesurer la qualité des données, pas seulement l'état du service.",
      "C": "Le nombre de jobs réussis est une métrique opérationnelle interne, pas un indicateur de qualité de service. Un SLO de 100% est irréaliste et ne laisse aucune marge d'erreur (error budget).",
      "D": "Le coût est une contrainte opérationnelle importante mais n'est pas un SLI de qualité de service. Le CTO demande des indicateurs de fiabilité du pipeline, pas des indicateurs financiers."
    },
    gcpLink: "https://cloud.google.com/architecture/framework/reliability/design-scale-high-availability"
  }
];
