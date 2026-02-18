import { Question } from './types';

export const domain2Questions: Question[] = [
  {
    id: 10,
    domain: "Ingestion et traitement des données",
    difficulty: "facile",
    question: "Vous devez charger un fichier CSV de 500 Go depuis un serveur on-premise vers BigQuery. Quelle est l'approche la plus efficace ?",
    options: [
      { label: "A", text: "Utiliser l'API REST BigQuery pour charger le fichier directement" },
      { label: "B", text: "Transférer le fichier vers Cloud Storage avec gsutil puis charger dans BigQuery via un job de chargement" },
      { label: "C", text: "Utiliser BigQuery Data Transfer Service pour importer depuis le serveur on-premise" },
      { label: "D", text: "Streamer les données ligne par ligne via l'API de streaming BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "La méthode recommandée est de transférer d'abord le fichier vers Cloud Storage (avec gsutil qui supporte les uploads parallèles et la reprise) puis d'utiliser un job de chargement BigQuery depuis GCS. Les jobs de chargement sont gratuits et optimisés pour les gros volumes.",
    whyOthersWrong: {
      "A": "L'API REST a des limites de taille de fichier (max 5 To par requête via un upload multipart) et ne gère pas aussi bien la reprise que gsutil.",
      "C": "BigQuery Data Transfer Service est conçu pour les transferts depuis des sources SaaS (Google Ads, YouTube, etc.) et d'autres services cloud, pas pour les serveurs on-premise.",
      "D": "Le streaming ligne par ligne serait extrêmement lent pour 500 Go et coûteux (le streaming est facturé contrairement aux jobs de chargement)."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv"
  },
  {
    id: 11,
    domain: "Ingestion et traitement des données",
    difficulty: "intermédiaire",
    question: "Votre pipeline Dataflow en streaming traite des événements de clics utilisateurs. Certains événements arrivent en retard (jusqu'à 1 heure après leur timestamp réel) en raison de problèmes réseau. Comment gérer ces données tardives dans Apache Beam ?",
    options: [
      { label: "A", text: "Utiliser des fenêtres fixes (fixed windows) de 1 heure et ignorer les données tardives" },
      { label: "B", text: "Configurer des allowed lateness et des triggers pour mettre à jour les résultats quand des données tardives arrivent" },
      { label: "C", text: "Augmenter la taille des fenêtres à 2 heures pour capturer toutes les données" },
      { label: "D", text: "Utiliser un tampon Pub/Sub pour retenir les messages pendant 1 heure avant de les envoyer à Dataflow" }
    ],
    correctAnswers: ["B"],
    explanation: "Apache Beam permet de configurer une 'allowed lateness' sur les fenêtres pour accepter les données tardives et des triggers (comme AfterWatermark.pastEndOfWindow().withLateFirings()) pour émettre des résultats mis à jour quand des données tardives arrivent.",
    whyOthersWrong: {
      "A": "Ignorer les données tardives entraînerait une perte de données et des résultats inexacts.",
      "C": "Augmenter la taille des fenêtres retarderait les résultats pour toutes les données et ne résout pas fondamentalement le problème des données tardives.",
      "D": "Retenir artificiellement les messages dans Pub/Sub ajoute une latence inutile à tous les messages et ne gère pas le cas où des données arrivent encore plus tard."
    },
    gcpLink: "https://beam.apache.org/documentation/programming-guide/#triggers"
  },
  {
    id: 12,
    domain: "Ingestion et traitement des données",
    difficulty: "facile",
    question: "Vous devez migrer des jobs Apache Spark existants vers GCP avec un minimum de modifications de code. Quel service GCP est le plus adapté ?",
    options: [
      { label: "A", text: "Cloud Dataflow" },
      { label: "B", text: "Cloud Dataproc" },
      { label: "C", text: "Cloud Run" },
      { label: "D", text: "Compute Engine avec Spark installé manuellement" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Dataproc est un service managé Hadoop/Spark qui permet d'exécuter des jobs Spark existants avec un minimum de modifications. Il gère le provisionnement, la configuration et le scaling des clusters.",
    whyOthersWrong: {
      "A": "Cloud Dataflow est basé sur Apache Beam, pas Spark. Migrer du code Spark vers Beam nécessiterait une réécriture significative.",
      "C": "Cloud Run est un service de conteneurs serverless, pas conçu pour exécuter des jobs Spark.",
      "D": "Installer Spark manuellement sur Compute Engine est possible mais nécessite une gestion manuelle du cluster, des mises à jour et du scaling."
    },
    gcpLink: "https://cloud.google.com/dataproc/docs/concepts/overview"
  },
  {
    id: 13,
    domain: "Ingestion et traitement des données",
    difficulty: "intermédiaire",
    question: "Votre entreprise reçoit des fichiers de données de partenaires dans un bucket Cloud Storage. Ces fichiers arrivent de manière imprévisible et doivent être traités automatiquement dès leur arrivée. Quel mécanisme déclenche le traitement le plus efficacement ?",
    options: [
      { label: "A", text: "Un Cloud Scheduler qui vérifie le bucket toutes les minutes" },
      { label: "B", text: "Une notification Pub/Sub sur le bucket Cloud Storage qui déclenche un Cloud Function ou un pipeline Dataflow" },
      { label: "C", text: "Un script cron sur une VM qui liste les nouveaux fichiers" },
      { label: "D", text: "Eventarc connecté à Cloud Storage qui déclenche un workflow Cloud Workflows" }
    ],
    correctAnswers: ["B"],
    explanation: "Les notifications Pub/Sub sur Cloud Storage sont le mécanisme événementiel natif pour détecter l'arrivée de nouveaux fichiers. Couplé à Cloud Functions ou Dataflow, cela permet un traitement automatique et immédiat sans polling.",
    whyOthersWrong: {
      "A": "Le polling toutes les minutes introduit une latence et un coût inutiles. L'approche événementielle est préférable.",
      "C": "Un script cron est fragile, nécessite une VM dédiée et introduit de la latence.",
      "D": "Eventarc est une option valide mais la notification Pub/Sub native de GCS couplée à Cloud Functions est plus simple et plus courante pour ce cas d'usage."
    },
    gcpLink: "https://cloud.google.com/storage/docs/pubsub-notifications"
  },
  {
    id: 14,
    domain: "Ingestion et traitement des données",
    difficulty: "difficile",
    question: "Vous devez mettre en place un pipeline de Change Data Capture (CDC) depuis une base Cloud SQL PostgreSQL vers BigQuery pour maintenir une copie analytique quasi-temps réel. Les tables sources contiennent des opérations INSERT, UPDATE et DELETE. Quelle approche est la plus adaptée ?",
    options: [
      { label: "A", text: "Utiliser Datastream pour capturer les changements depuis Cloud SQL et les répliquer dans BigQuery" },
      { label: "B", text: "Configurer des triggers PostgreSQL qui envoient les changements à Pub/Sub, puis Dataflow écrit dans BigQuery" },
      { label: "C", text: "Exporter la base complète chaque heure avec pg_dump et recharger dans BigQuery" },
      { label: "D", text: "Utiliser Federated Queries BigQuery pour interroger Cloud SQL directement" }
    ],
    correctAnswers: ["A"],
    explanation: "Datastream est le service serverless de CDC de Google Cloud. Il lit les logs WAL de PostgreSQL pour capturer tous les changements (INSERT, UPDATE, DELETE) et les réplique automatiquement dans BigQuery avec une latence de quelques secondes.",
    whyOthersWrong: {
      "B": "Les triggers PostgreSQL ajoutent une charge à la base source et nécessitent un développement custom. Datastream est une solution managée plus robuste.",
      "C": "L'export complet toutes les heures est inefficace, coûteux et ne fournit pas du quasi-temps réel.",
      "D": "Les Federated Queries interrogent Cloud SQL en temps réel mais impactent les performances de la base source et ne créent pas une copie dans BigQuery."
    },
    gcpLink: "https://cloud.google.com/datastream/docs/overview"
  },
  {
    id: 15,
    domain: "Ingestion et traitement des données",
    difficulty: "difficile",
    question: "Votre pipeline Dataflow streaming traite 1 million d'événements par seconde. Vous observez un problème de « hot key » : 80 % des événements ont la même clé de regroupement, causant un goulot d'étranglement sur un seul worker. Comment résoudre ce problème ?",
    options: [
      { label: "A", text: "Augmenter le nombre de workers Dataflow" },
      { label: "B", text: "Utiliser le fanout combiné (CombineFn avec hotKeyFanout) pour distribuer le traitement des clés chaudes sur plusieurs workers" },
      { label: "C", text: "Réduire la taille des fenêtres pour diminuer le volume par clé" },
      { label: "D", text: "Passer au traitement batch pour éviter le problème" }
    ],
    correctAnswers: ["B"],
    explanation: "Le hotKeyFanout dans Apache Beam permet de diviser automatiquement le traitement d'une clé chaude en deux étapes : une pré-agrégation sur plusieurs workers, suivie d'une agrégation finale. Cela distribue la charge même quand une clé concentre la majorité des données.",
    whyOthersWrong: {
      "A": "Ajouter des workers ne résout pas le problème car le hot key force tout le traitement sur un seul worker quel que soit le nombre total de workers.",
      "C": "Réduire la taille des fenêtres ne change pas la distribution des clés. Le hot key reste concentré sur un worker.",
      "D": "Passer au batch ne résout pas le problème de hot key et perd la capacité de traitement en temps réel."
    },
    gcpLink: "https://beam.apache.org/documentation/transforms/java/aggregation/combine/"
  },
  {
    id: 16,
    domain: "Ingestion et traitement des données",
    difficulty: "intermédiaire",
    question: "Vous devez ingérer des données en streaming depuis Apache Kafka on-premise vers BigQuery sur GCP. Quelle approche est la plus recommandée ?",
    options: [
      { label: "A", text: "Réécrire les producteurs Kafka pour envoyer directement les données à Pub/Sub" },
      { label: "B", text: "Utiliser un connecteur Kafka vers Pub/Sub (Pub/Sub Kafka connector), puis Dataflow vers BigQuery" },
      { label: "C", text: "Utiliser Dataflow avec le connecteur KafkaIO pour lire directement depuis Kafka et écrire dans BigQuery" },
      { label: "D", text: "Migrer entièrement de Kafka vers Pub/Sub avant de commencer l'ingestion" }
    ],
    correctAnswers: ["C"],
    explanation: "Dataflow avec KafkaIO permet de lire directement depuis un cluster Kafka (via VPN ou Interconnect) et d'écrire dans BigQuery sans composant intermédiaire. C'est l'approche la plus directe quand Kafka reste la source de données.",
    whyOthersWrong: {
      "A": "Réécrire les producteurs est invasif et risqué. Il est préférable de lire depuis Kafka existant.",
      "B": "Ajouter Pub/Sub comme intermédiaire fonctionne mais ajoute un composant supplémentaire, de la latence et des coûts sans bénéfice clair si Kafka est déjà fiable.",
      "D": "Une migration complète de Kafka est un projet majeur qui n'est pas nécessaire pour résoudre le besoin d'ingestion."
    },
    gcpLink: "https://beam.apache.org/documentation/io/built-in/kafka/"
  },
  {
    id: 17,
    domain: "Ingestion et traitement des données",
    difficulty: "facile",
    question: "Quelle est la différence principale entre le chargement batch et le streaming dans BigQuery ?",
    options: [
      { label: "A", text: "Le batch est plus rapide que le streaming" },
      { label: "B", text: "Le streaming est gratuit tandis que le batch est payant" },
      { label: "C", text: "Le chargement batch est gratuit mais a une latence plus élevée, tandis que le streaming offre une insertion en temps réel mais est facturé par volume de données insérées" },
      { label: "D", text: "Le batch ne supporte que les fichiers CSV tandis que le streaming supporte tous les formats" }
    ],
    correctAnswers: ["C"],
    explanation: "Les jobs de chargement batch BigQuery sont gratuits (seul le stockage est facturé) mais ont une latence de quelques minutes. L'API de streaming permet des insertions en temps réel mais facture les données insérées.",
    whyOthersWrong: {
      "A": "Le batch est plus lent que le streaming pour la disponibilité des données. Le streaming rend les données disponibles en quelques secondes.",
      "B": "C'est l'inverse : le batch est gratuit et le streaming est payant.",
      "D": "Le batch supporte CSV, JSON, Avro, Parquet, ORC et plus. Le streaming utilise un format JSON spécifique ou Protocol Buffers via l'API Storage Write."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/loading-data"
  }
];
