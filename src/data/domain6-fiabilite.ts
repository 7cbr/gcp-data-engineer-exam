import type { Question } from './types';

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
  },
  {
    id: 93,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "facile",
    question: "Votre pipeline Dataflow batch échoue régulièrement à 3h du matin et l'équipe ne s'en aperçoit qu'en arrivant au bureau à 9h. Le pipeline charge les données dans BigQuery pour les rapports quotidiens de 8h. Quelle est la première action à implémenter pour améliorer la fiabilité ?",
    options: [
      { label: "A", text: "Exécuter le pipeline manuellement chaque matin avant les rapports" },
      { label: "B", text: "Configurer Cloud Composer pour orchestrer le pipeline avec des retries automatiques et des alertes par email/Slack en cas d'échec" },
      { label: "C", text: "Augmenter les ressources du pipeline pour éviter les échecs" },
      { label: "D", text: "Planifier le pipeline à 6h au lieu de 3h pour réduire la fenêtre de problème" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Composer (Apache Airflow) permet d'orchestrer le pipeline avec des retries automatiques (en cas d'erreur transitoire), des alertes en cas d'échec final (email, Slack, PagerDuty), et une visibilité sur l'historique des exécutions. Les retries résolvent les erreurs transitoires et les alertes permettent une intervention rapide.",
    whyOthersWrong: {
      "A": "L'exécution manuelle est sujette à l'erreur humaine et ne scale pas. Le pipeline doit être automatisé et surveillé.",
      "C": "Augmenter les ressources peut résoudre certains échecs (out of memory) mais pas les erreurs de données ou les problèmes réseau. Sans monitoring ni retry, les échecs persisteront.",
      "D": "Changer l'heure d'exécution ne résout pas le problème d'échec et réduit le temps disponible pour la reprise en cas de problème."
    },
    gcpLink: "https://cloud.google.com/composer/docs/concepts/overview"
  },
  {
    id: 94,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Votre requête BigQuery qui alimente un tableau de bord Looker Studio prend 45 secondes et scanne 8 To de données. Le tableau de bord est consulté 200 fois par jour avec des filtres de date différents. Comment optimisez-vous les performances et réduisez-vous les coûts ?",
    options: [
      { label: "A", text: "Utiliser BI Engine pour créer un cache en mémoire des données fréquemment requêtées par le tableau de bord" },
      { label: "B", text: "Augmenter le nombre de slots BigQuery réservés" },
      { label: "C", text: "Exporter les données dans Cloud SQL pour des requêtes plus rapides" },
      { label: "D", text: "Créer 200 vues matérialisées, une par combinaison de filtres" }
    ],
    correctAnswers: ["A"],
    explanation: "BI Engine est un service d'accélération in-memory pour BigQuery qui met en cache les données fréquemment accédées par les outils BI comme Looker Studio. Il réduit la latence des requêtes de secondes à sub-secondes et élimine le coût de scans répétitifs. La réservation de mémoire BI Engine est facturée à un tarif fixe prévisible.",
    whyOthersWrong: {
      "B": "Augmenter les slots améliore la concurrence mais pas nécessairement la latence d'une requête individuelle de 8 To. Les coûts augmentent sans réduire le volume scanné.",
      "C": "Cloud SQL n'est pas conçu pour des datasets de 8 To et ses performances seraient inférieures à BigQuery pour l'analytique. La migration est complexe et contre-productive.",
      "D": "200 vues matérialisées sont ingérables, coûteuses en stockage et en maintenance. BI Engine résout le problème de manière transparente sans multiplier les objets."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/bi-engine-intro"
  },
  {
    id: 95,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Votre pipeline de données utilise un cluster Dataproc avec 20 workers pour des jobs Spark quotidiens. Le cluster est actif 24/7 mais les jobs ne s'exécutent que 6 heures par jour (entre 2h et 8h du matin). Les coûts du cluster sont élevés. Comment optimisez-vous les coûts sans impacter les performances ?",
    options: [
      { label: "A", text: "Réduire le nombre de workers à 5 en permanence" },
      { label: "B", text: "Utiliser des clusters éphémères Dataproc créés par Cloud Composer avant chaque job et supprimés après, avec des VMs préemptives pour les workers secondaires" },
      { label: "C", text: "Migrer vers Dataflow qui est serverless" },
      { label: "D", text: "Activer l'autoscaling du cluster Dataproc existant" }
    ],
    correctAnswers: ["B"],
    explanation: "Les clusters éphémères sont créés à la demande, exécutent les jobs, puis sont supprimés automatiquement. Combinés avec des VMs préemptives (60-91% moins cher) pour les workers secondaires et l'orchestration par Cloud Composer, vous ne payez que pour les 6 heures d'utilisation au lieu de 24/7, réduisant les coûts de plus de 80%.",
    whyOthersWrong: {
      "A": "Réduire à 5 workers diminue les coûts de 75% mais vous payez encore pour 18 heures d'inactivité par jour. De plus, les jobs pourraient être plus lents avec moins de workers.",
      "C": "Migrer des jobs Spark vers Dataflow nécessite une réécriture en Apache Beam. C'est un effort significatif qui n'est pas justifié uniquement pour l'optimisation des coûts.",
      "D": "L'autoscaling réduit les workers pendant les périodes d'inactivité mais maintient un minimum de 2 workers 24/7. Les clusters éphémères éliminent totalement le coût pendant les 18 heures d'inactivité."
    },
    gcpLink: "https://cloud.google.com/dataproc/docs/concepts/workflows/overview"
  },
  {
    id: 96,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre pipeline Dataflow streaming traite des transactions financières. Vous devez garantir une sémantique exactly-once de bout en bout : chaque transaction doit être traitée exactement une fois, sans duplication ni perte, même en cas de redémarrage du pipeline ou de défaillance d'un worker. Comment implémentez-vous cette garantie ?",
    options: [
      { label: "A", text: "Activer le mode at-least-once de Dataflow et dédupliquer manuellement dans BigQuery" },
      { label: "B", text: "Utiliser Dataflow en mode streaming avec la garantie exactly-once native, combiné avec l'API BigQuery Storage Write en mode COMMITTED pour les écritures" },
      { label: "C", text: "Utiliser des transactions Cloud Spanner pour garantir l'idempotence de chaque écriture" },
      { label: "D", text: "Configurer Pub/Sub avec acknowledge deadline très court pour éviter les retransmissions" }
    ],
    correctAnswers: ["B"],
    explanation: "Dataflow offre nativement une garantie exactly-once pour le traitement streaming : chaque élément est traité exactement une fois même en cas de défaillance de worker (grâce au checkpointing et au shuffling via Streaming Engine). L'API Storage Write en mode COMMITTED garantit que chaque écriture dans BigQuery est atomique et idempotente, complétant la chaîne exactly-once de bout en bout.",
    whyOthersWrong: {
      "A": "Le mode at-least-once avec déduplication manuelle est plus complexe, sujet aux erreurs, et ajoute une latence de déduplication. La garantie exactly-once native de Dataflow est préférable.",
      "C": "Utiliser Spanner pour l'idempotence ajoute un composant externe et une complexité significative. La sémantique exactly-once de Dataflow + Storage Write API couvre le besoin sans composant supplémentaire.",
      "D": "Un acknowledge deadline court augmente les retransmissions au lieu de les réduire (messages ré-envoyés avant d'être traités). Pub/Sub est at-least-once par design."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/concepts/exactly-once"
  },
  {
    id: 97,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Les requêtes de votre équipe data science sur BigQuery sont souvent lentes car elles utilisent des SELECT * sur des tables de plusieurs To. Vous voulez mettre en place des bonnes pratiques sans bloquer le travail des data scientists. Quelle combinaison de mesures implémentez-vous ?",
    options: [
      { label: "A", text: "Bloquer toutes les requêtes SELECT * avec une policy organisationnelle" },
      { label: "B", text: "Configurer des custom cost controls (max bytes billed par requête) et créer des vues curated avec les colonnes les plus utilisées pour guider les data scientists" },
      { label: "C", text: "Migrer vers la tarification par slots pour que les SELECT * ne coûtent rien de plus" },
      { label: "D", text: "Supprimer les colonnes inutilisées des tables BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "Les custom cost controls (maximum_bytes_billed) empêchent les requêtes excessivement coûteuses de s'exécuter, protégeant contre les erreurs accidentelles. Les vues curated avec les colonnes pertinentes guident les data scientists vers des requêtes efficaces sans les bloquer. C'est une approche éducative et protectrice.",
    whyOthersWrong: {
      "A": "Bloquer les SELECT * est trop restrictif et peut empêcher les explorations légitimes. Les data scientists ont parfois besoin de voir toutes les colonnes lors de la phase de découverte.",
      "C": "La tarification par slots rend les coûts prévisibles mais les SELECT * continuent de consommer des slots (ressources de calcul) inutilement, ralentissant les requêtes des autres utilisateurs.",
      "D": "Supprimer des colonnes peut perdre des données utiles pour d'autres cas d'usage. Le problème est l'utilisation, pas la structure de la table."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/best-practices-costs"
  },
  {
    id: 98,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre entreprise opère un pipeline de données critique avec un SLA de 99.95% de disponibilité. Le pipeline utilise Pub/Sub, Dataflow et BigQuery dans la région europe-west1. Vous devez concevoir une stratégie de disaster recovery qui protège contre une panne régionale complète de europe-west1 avec un RTO (Recovery Time Objective) de 30 minutes. Quelle architecture implémentez-vous ?",
    options: [
      { label: "A", text: "Déployer un pipeline identique en standby dans europe-west4, avec Pub/Sub multi-régional et un basculement manuel via Cloud DNS" },
      { label: "B", text: "Utiliser un topic Pub/Sub avec des abonnements dans deux régions, deux pipelines Dataflow actifs-actifs écrivant dans un dataset BigQuery multi-régional EU" },
      { label: "C", text: "Sauvegarder les données dans Cloud Storage bi-régional et restaurer le pipeline manuellement en cas de panne" },
      { label: "D", text: "S'appuyer sur les SLA natifs de GCP qui garantissent déjà 99.95% de disponibilité par service" }
    ],
    correctAnswers: ["B"],
    explanation: "L'architecture active-active avec deux pipelines dans des régions différentes consommant le même topic Pub/Sub (via des abonnements séparés) offre un basculement instantané. BigQuery multi-régional EU réplique automatiquement les données. Si une région tombe, l'autre continue de traiter sans interruption, respectant le RTO de 30 minutes.",
    whyOthersWrong: {
      "A": "Un pipeline en standby nécessite un basculement manuel qui peut prendre plus de 30 minutes (détection de panne, décision, activation). De plus, les données accumulées dans Pub/Sub pendant le standby doivent être retraitées.",
      "C": "La restauration manuelle depuis Cloud Storage ne respectera probablement pas le RTO de 30 minutes pour un pipeline complet avec état. C'est adapté au backup mais pas au disaster recovery rapide.",
      "D": "Les SLA par service ne garantissent pas un SLA end-to-end du pipeline. Une panne régionale affectant plusieurs services simultanément n'est pas couverte par les SLA individuels."
    },
    gcpLink: "https://cloud.google.com/architecture/disaster-recovery"
  },
  {
    id: 99,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "facile",
    question: "Vous constatez qu'une requête BigQuery scanne 2 To de données alors que vous n'avez besoin que des données du dernier mois (environ 200 Go). La table est partitionnée par date. Quelle est la cause la plus probable et la solution ?",
    options: [
      { label: "A", text: "BigQuery ne supporte pas le pruning de partitions, il faut migrer vers Cloud SQL" },
      { label: "B", text: "La requête n'inclut pas de filtre WHERE sur la colonne de partitionnement. Ajouter un filtre sur la date pour activer le pruning de partitions" },
      { label: "C", text: "La table est trop volumineuse pour BigQuery, il faut la splitter en plusieurs tables" },
      { label: "D", text: "Les partitions sont corrompues et doivent être recréées" }
    ],
    correctAnswers: ["B"],
    explanation: "Le pruning de partitions dans BigQuery ne s'active que lorsqu'un filtre WHERE est appliqué sur la colonne de partitionnement. Sans ce filtre, BigQuery scanne toutes les partitions (l'intégralité de la table). En ajoutant WHERE date_column >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), BigQuery ne scanne que les partitions du dernier mois.",
    whyOthersWrong: {
      "A": "BigQuery supporte parfaitement le pruning de partitions. C'est une fonctionnalité fondamentale de BigQuery qui réduit considérablement les coûts et le temps de requête.",
      "C": "BigQuery gère des tables de pétaoctets sans problème. Splitter la table ne résout pas le problème de scan complet si les requêtes ne filtrent toujours pas par partition.",
      "D": "Les partitions BigQuery ne se corrompent pas de cette manière. Le problème est dans la requête, pas dans les données."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/querying-partitioned-tables"
  },
  {
    id: 100,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre entreprise opère 50 pipelines de données sur GCP. Vous devez mettre en place un observability stack complet pour monitorer la santé de tous les pipelines, tracer les données de bout en bout (data lineage), et alerter l'équipe SRE en cas de problème. Quelle combinaison de services est la plus complète ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Cloud Monitoring avec des dashboards personnalisés, des alertes multi-conditions sur les métriques Dataflow/BigQuery, et Cloud Logging pour l'analyse des logs d'erreur" },
      { label: "B", text: "Dataplex pour le data lineage et la qualité des données, avec Data Catalog pour tracker le cycle de vie des données à travers les pipelines" },
      { label: "C", text: "Installer Grafana et Prometheus sur des VMs pour le monitoring des pipelines" },
      { label: "D", text: "Utiliser uniquement les journaux Cloud Logging pour tout le monitoring" }
    ],
    correctAnswers: ["A", "B"],
    explanation: "Cloud Monitoring offre un monitoring opérationnel complet (métriques, alertes, dashboards) pour tous les services GCP utilisés dans les pipelines. Dataplex avec Data Catalog fournit le data lineage (traçabilité des données de la source à la destination), la qualité des données et la gouvernance. Ensemble, ils couvrent l'observability opérationnel et la traçabilité des données.",
    whyOthersWrong: {
      "C": "Grafana et Prometheus sur des VMs nécessitent une gestion d'infrastructure et ne s'intègrent pas nativement avec les métriques des services GCP managés. Cloud Monitoring est la solution native intégrée.",
      "D": "Cloud Logging seul ne fournit pas de dashboards de métriques, d'alertes proactives basées sur des seuils, ni de data lineage. Les logs sont un composant de l'observability, pas une solution complète."
    },
    gcpLink: "https://cloud.google.com/monitoring/docs/monitoring-overview"
  },
  {
    id: 126,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "facile",
    question: "Votre équipe reçoit trop d'alertes Cloud Monitoring pour les pipelines de données (plus de 100 alertes par jour), dont la plupart sont des faux positifs. Les vrais incidents sont noyés dans le bruit. Comment améliorez-vous la qualité des alertes ?",
    options: [
      { label: "A", text: "Désactiver toutes les alertes et ne surveiller que le tableau de bord manuellement" },
      { label: "B", text: "Configurer des alertes multi-conditions (MQL) avec des seuils adaptés, des fenêtres de durée pour éviter les pics transitoires, et des politiques de notification avec escalade" },
      { label: "C", text: "Augmenter les seuils d'alerte pour réduire le nombre de notifications" },
      { label: "D", text: "Rediriger toutes les alertes vers un channel Slack dédié pour mieux les trier" }
    ],
    correctAnswers: ["B"],
    explanation: "Les alertes multi-conditions dans Cloud Monitoring permettent de combiner plusieurs métriques (ex: latence élevée ET débit en baisse) pour réduire les faux positifs. Les fenêtres de durée (ex: alerte seulement si la condition persiste pendant 5 minutes) éliminent les pics transitoires. Les politiques d'escalade garantissent que les vrais incidents sont traités.",
    whyOthersWrong: {
      "A": "Désactiver les alertes et surveiller manuellement est réactif et ne fonctionne pas hors des heures de bureau. C'est l'opposé d'un monitoring proactif.",
      "C": "Augmenter les seuils uniformément réduit les alertes mais risque aussi de manquer des vrais incidents. Les seuils doivent être adaptés au contexte de chaque métrique, pas uniformément relevés.",
      "D": "Rediriger vers Slack change le canal de notification mais ne résout pas le problème fondamental : trop d'alertes non pertinentes. Le bruit reste le même, juste dans un autre outil."
    },
    gcpLink: "https://cloud.google.com/monitoring/alerts/concepts-indepth"
  },
  {
    id: 127,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Votre entreprise utilise BigQuery avec la tarification à la demande (on-demand). La facture mensuelle est de 20 000 $ et augmente chaque mois. Vous devez comprendre quels utilisateurs, requêtes et datasets consomment le plus. Quel outil natif BigQuery vous donne cette visibilité ?",
    options: [
      { label: "A", text: "Cloud Billing pour voir le coût global de BigQuery" },
      { label: "B", text: "La vue INFORMATION_SCHEMA.JOBS qui contient le détail de chaque requête exécutée : utilisateur, bytes scannés, durée, coût estimé" },
      { label: "C", text: "Cloud Monitoring avec les métriques BigQuery" },
      { label: "D", text: "Les Audit Logs de BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "La vue INFORMATION_SCHEMA.JOBS dans BigQuery contient l'historique complet de toutes les requêtes exécutées : utilisateur, bytes scannés (qui détermine le coût en on-demand), durée, type de requête, et tables accédées. Vous pouvez écrire des requêtes SQL sur cette vue pour identifier les top consommateurs et les requêtes les plus coûteuses.",
    whyOthersWrong: {
      "A": "Cloud Billing donne le coût total de BigQuery par projet mais ne détaille pas les coûts par utilisateur, par requête ou par dataset. La granularité est insuffisante pour l'analyse.",
      "C": "Cloud Monitoring fournit des métriques agrégées (slots utilisés, requêtes par seconde) mais pas le détail par requête individuelle ni les bytes scannés par utilisateur.",
      "D": "Les Audit Logs enregistrent les accès mais ne contiennent pas les métriques de consommation (bytes scannés, coût) aussi facilement que INFORMATION_SCHEMA.JOBS."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/information-schema-jobs"
  },
  {
    id: 128,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "intermédiaire",
    question: "Votre pipeline Dataflow streaming fonctionne depuis 3 mois mais vous observez une augmentation progressive de la latence (system lag) qui est passée de 2 secondes à 30 secondes. Le volume de données n'a pas changé. Quelle est la cause la plus probable et comment la diagnostiquez-vous ?",
    options: [
      { label: "A", text: "Les workers Dataflow ont besoin d'être redémarrés périodiquement pour libérer la mémoire" },
      { label: "B", text: "Un data skew progressif ou une accumulation d'état (state) dans les fenêtres ou les timers. Diagnostiquer via les métriques Dataflow : vérifier la distribution de la charge entre workers et la taille du state par clé" },
      { label: "C", text: "Pub/Sub ralentit car le topic est trop ancien" },
      { label: "D", text: "BigQuery limite le débit d'écriture en streaming après 3 mois d'utilisation continue" }
    ],
    correctAnswers: ["B"],
    explanation: "Une dégradation progressive de la latence sans changement de volume indique typiquement une accumulation d'état (state bloat) dans les fenêtres, les timers ou les compteurs distribués, ou un data skew qui s'aggrave. Les métriques Dataflow montrent la taille de l'état par étape et la distribution de la charge entre workers, permettant d'identifier la cause racine.",
    whyOthersWrong: {
      "A": "Dataflow gère automatiquement la mémoire des workers et ne nécessite pas de redémarrage périodique. Si un worker manque de mémoire, Dataflow le signale via des métriques et des logs spécifiques.",
      "C": "Pub/Sub ne ralentit pas en fonction de l'âge d'un topic. Ses performances sont constantes indépendamment de la durée de vie du topic.",
      "D": "BigQuery n'a pas de limite de débit qui se déclenche après une durée d'utilisation. Les limites sont basées sur le volume instantané, pas sur la durée."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/guides/troubleshoot-streaming-stragglers"
  },
  {
    id: 129,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre équipe gère 30 pipelines de données orchestrés par Cloud Composer. Un pipeline critique échoue car une table BigQuery source a été supprimée par une autre équipe sans prévenir. Vous voulez implémenter des contrôles de pré-exécution pour vérifier les prérequis avant chaque pipeline. Quelle approche est la plus robuste dans Cloud Composer ?",
    options: [
      { label: "A", text: "Ajouter un opérateur BigQueryCheckOperator (sensor) au début de chaque DAG qui vérifie l'existence des tables et la fraîcheur des données avant de lancer le pipeline" },
      { label: "B", text: "Vérifier manuellement les tables source chaque matin avant de lancer les pipelines" },
      { label: "C", text: "Augmenter le nombre de retries du DAG pour retraiter en cas d'échec" },
      { label: "D", text: "Créer un DAG séparé qui exécute toutes les vérifications et envoie un email de confirmation" }
    ],
    correctAnswers: ["A"],
    explanation: "Les sensors BigQuery dans Apache Airflow (BigQueryTableExistenceSensor, BigQueryCheckOperator) vérifient automatiquement les prérequis avant l'exécution du pipeline : existence des tables, fraîcheur des données (dernière partition disponible), et conditions de qualité. Si un prérequis n'est pas rempli, le DAG attend ou échoue proprement avec un message explicite.",
    whyOthersWrong: {
      "B": "La vérification manuelle est sujette aux erreurs humaines, ne fonctionne pas la nuit ni le week-end, et ne scale pas pour 30 pipelines.",
      "C": "Les retries ne résolvent pas le problème : si la table a été supprimée, les retries échoueront indéfiniment. Les sensors détectent le problème immédiatement et alertent l'équipe.",
      "D": "Un DAG séparé découple la vérification de l'exécution, créant un risque de condition de course (la table peut être supprimée entre la vérification et l'exécution). Les sensors intégrés au DAG sont atomiques."
    },
    gcpLink: "https://cloud.google.com/composer/docs/composer-2/use-bigquery-operators"
  },
  {
    id: 130,
    domain: "Fiabilité, monitoring et optimisation des pipelines",
    difficulty: "difficile",
    question: "Votre entreprise doit tester ses pipelines de données avant chaque déploiement en production. Les pipelines utilisent Dataflow, BigQuery et Pub/Sub. Vous voulez implémenter une stratégie de test complète. Quels types de tests sont les plus importants pour un pipeline de données ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Tests unitaires des transformations avec DirectRunner (exécution locale) et des données synthétiques qui valident la logique métier de chaque étape" },
      { label: "B", text: "Tests d'intégration de bout en bout dans un projet GCP de staging avec des données de test qui vérifient le pipeline complet (Pub/Sub → Dataflow → BigQuery)" },
      { label: "C", text: "Tests de charge en production avec le trafic réel pour vérifier les performances" },
      { label: "D", text: "Revue de code uniquement, sans exécution de tests automatisés" }
    ],
    correctAnswers: ["A", "B"],
    explanation: "Les tests unitaires avec DirectRunner valident la logique de transformation de chaque étape rapidement et sans coût d'infrastructure. Les tests d'intégration dans un projet staging vérifient le fonctionnement de bout en bout avec les services réels (connectivité, permissions, schémas). Ces deux niveaux combinés détectent la majorité des bugs avant la production.",
    whyOthersWrong: {
      "C": "Les tests de charge en production risquent d'impacter les utilisateurs et les données réelles. Les tests de performance doivent être effectués dans un environnement de staging avec des données synthétiques ou anonymisées.",
      "D": "La revue de code est nécessaire mais insuffisante seule. Elle ne détecte pas les bugs de logique complexe, les problèmes de compatibilité de schéma ni les erreurs de configuration des services GCP."
    },
    gcpLink: "https://beam.apache.org/documentation/pipelines/test-your-pipeline/"
  }
];
