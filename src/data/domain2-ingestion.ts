import type { Question } from './types';

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
  },
  {
    id: 59,
    domain: "Ingestion et traitement des données",
    difficulty: "facile",
    question: "Vous devez transférer quotidiennement 2 To de données depuis un bucket Amazon S3 vers Cloud Storage sur GCP. Le transfert doit être automatisé et fiable. Quel service GCP utilisez-vous ?",
    options: [
      { label: "A", text: "gsutil rsync exécuté manuellement chaque jour" },
      { label: "B", text: "Storage Transfer Service avec un transfert planifié depuis S3" },
      { label: "C", text: "Transfer Appliance pour les gros volumes" },
      { label: "D", text: "Un pipeline Dataflow qui lit depuis S3 et écrit dans Cloud Storage" }
    ],
    correctAnswers: ["B"],
    explanation: "Storage Transfer Service est le service managé de Google Cloud pour les transferts de données planifiés depuis Amazon S3, Azure Blob Storage, ou d'autres sources cloud vers Cloud Storage. Il gère automatiquement la planification, les reprises en cas d'erreur, la vérification d'intégrité et le suivi des transferts.",
    whyOthersWrong: {
      "A": "gsutil rsync fonctionne mais n'est pas automatisé, nécessite une machine dédiée pour l'exécution, et n'offre pas les fonctionnalités de planification et de monitoring natifs de Storage Transfer Service.",
      "C": "Transfer Appliance est un appareil physique pour les migrations initiales très volumineuses (centaines de To). Pour un transfert quotidien de 2 To via le réseau, Storage Transfer Service est plus adapté.",
      "D": "Un pipeline Dataflow pour un simple transfert de fichiers est surqualifié. Dataflow est conçu pour la transformation de données, pas le transfert brut de fichiers."
    },
    gcpLink: "https://cloud.google.com/storage-transfer/docs/overview"
  },
  {
    id: 60,
    domain: "Ingestion et traitement des données",
    difficulty: "intermédiaire",
    question: "Votre pipeline Dataflow doit enrichir chaque événement de transaction avec les informations du client stockées dans Cloud SQL. Le pipeline traite 50 000 événements par seconde en streaming. Quelle approche est la plus performante pour cet enrichissement ?",
    options: [
      { label: "A", text: "Exécuter une requête Cloud SQL pour chaque événement dans un DoFn" },
      { label: "B", text: "Charger la table clients en mémoire comme side input et effectuer un lookup en mémoire" },
      { label: "C", text: "Utiliser une jointure CoGroupByKey entre le flux d'événements et un flux de mises à jour clients" },
      { label: "D", text: "Écrire les événements dans BigQuery et faire un JOIN avec une Federated Query vers Cloud SQL" }
    ],
    correctAnswers: ["B"],
    explanation: "Les side inputs dans Apache Beam permettent de charger un dataset de référence (table clients) en mémoire sur chaque worker. Le lookup en mémoire est extrêmement rapide et évite des appels réseau pour chaque événement. Si la table est trop volumineuse, elle peut être rafraîchie périodiquement via un side input déclenché.",
    whyOthersWrong: {
      "A": "Exécuter une requête Cloud SQL pour chacun des 50 000 événements par seconde surchargerait la base Cloud SQL et ajouterait une latence réseau significative à chaque événement.",
      "C": "CoGroupByKey est adapté pour joindre deux flux de données par clé, pas pour enrichir un flux avec une table de référence statique ou lentement changeante.",
      "D": "Écrire dans BigQuery puis faire un JOIN ajoute une latence de plusieurs secondes/minutes et n'est pas compatible avec le traitement en streaming temps réel."
    },
    gcpLink: "https://beam.apache.org/documentation/programming-guide/#side-inputs"
  },
  {
    id: 61,
    domain: "Ingestion et traitement des données",
    difficulty: "intermédiaire",
    question: "Vous devez ingérer des données en temps réel depuis une application mobile vers GCP. Les appareils mobiles envoient des événements JSON via HTTPS. Les événements doivent être validés, transformés et stockés dans BigQuery pour l'analyse. Certains appareils peuvent être hors ligne temporairement et renvoyer des événements en rafale lors de la reconnexion. Quelle architecture est la plus robuste ?",
    options: [
      { label: "A", text: "Application mobile → API Cloud Endpoints → Cloud Functions → BigQuery streaming insert" },
      { label: "B", text: "Application mobile → API Gateway → Pub/Sub → Dataflow → BigQuery" },
      { label: "C", text: "Application mobile → écriture directe dans BigQuery via l'API REST" },
      { label: "D", text: "Application mobile → Firebase Realtime Database → Cloud Functions → BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "API Gateway fournit une API HTTPS sécurisée pour les appareils mobiles. Pub/Sub absorbe les pics de trafic (rafales de reconnexion) grâce à sa capacité de buffering élastique. Dataflow traite les événements en streaming avec validation et transformation. BigQuery stocke les résultats. Cette architecture est résiliente aux pics et aux pannes.",
    whyOthersWrong: {
      "A": "Cloud Functions a des limites de concurrence et de timeout. Les rafales de reconnexion pourraient dépasser sa capacité de scaling. L'absence de Pub/Sub signifie qu'il n'y a pas de buffer pour absorber les pics.",
      "C": "L'écriture directe dans BigQuery depuis les appareils mobiles expose l'API BigQuery et ne permet pas la validation ni la transformation des données. Les credentials BigQuery ne doivent pas être sur les appareils.",
      "D": "Firebase Realtime Database est conçu pour la synchronisation de données entre clients, pas pour l'ingestion massive d'événements analytiques. Il a des limites de débit et de coût pour ce volume."
    },
    gcpLink: "https://cloud.google.com/api-gateway/docs/about-api-gateway"
  },
  {
    id: 62,
    domain: "Ingestion et traitement des données",
    difficulty: "difficile",
    question: "Votre entreprise migre un data warehouse Oracle de 50 To vers BigQuery. Les données incluent des tables avec des procédures stockées PL/SQL complexes, des vues matérialisées et des jobs ETL Oracle. Quelle approche de migration est la plus efficace ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Utiliser le service BigQuery Migration pour la traduction automatique du SQL Oracle vers BigQuery SQL et l'évaluation de la migration" },
      { label: "B", text: "Réécrire manuellement toutes les procédures stockées en Python pour Dataflow" },
      { label: "C", text: "Utiliser Datastream pour la réplication CDC d'Oracle vers BigQuery, puis migrer progressivement les workloads" },
      { label: "D", text: "Exporter toutes les tables en CSV et les recharger dans BigQuery en une seule fois" }
    ],
    correctAnswers: ["A", "C"],
    explanation: "Le service BigQuery Migration traduit automatiquement le SQL Oracle (PL/SQL) en BigQuery SQL, réduisant l'effort de migration. Datastream permet une réplication CDC continue d'Oracle vers BigQuery, permettant une migration progressive avec validation en parallèle. Les deux approches combinées minimisent le risque et l'effort de migration.",
    whyOthersWrong: {
      "B": "Réécrire manuellement toutes les procédures en Python est extrêmement coûteux en temps et en ressources. L'outil de traduction automatique réduit considérablement cet effort.",
      "D": "L'export CSV de 50 To est lent, perd les types de données, et ne gère pas les procédures stockées ni les vues matérialisées. C'est une approche simpliste qui ignore la complexité de la migration."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/migration-intro"
  },
  {
    id: 63,
    domain: "Ingestion et traitement des données",
    difficulty: "intermédiaire",
    question: "Votre pipeline Dataflow batch traite quotidiennement des fichiers Parquet depuis Cloud Storage et les charge dans BigQuery. Récemment, certains fichiers source contiennent des colonnes supplémentaires non prévues dans le schéma BigQuery, causant l'échec du pipeline. Comment gérer l'évolution du schéma de manière robuste ?",
    options: [
      { label: "A", text: "Supprimer les colonnes inconnues dans le pipeline avant le chargement" },
      { label: "B", text: "Activer l'option schema_update_options=ALLOW_FIELD_ADDITION dans le job de chargement BigQuery" },
      { label: "C", text: "Figer le schéma source et rejeter tout fichier avec un schéma différent" },
      { label: "D", text: "Stocker les données brutes dans un champ JSON unique pour éviter les problèmes de schéma" }
    ],
    correctAnswers: ["B"],
    explanation: "L'option ALLOW_FIELD_ADDITION de BigQuery permet d'ajouter automatiquement de nouvelles colonnes au schéma de la table de destination quand le fichier source contient des colonnes supplémentaires. Les données existantes conservent une valeur NULL pour les nouvelles colonnes. C'est la solution la plus flexible et robuste pour gérer l'évolution du schéma.",
    whyOthersWrong: {
      "A": "Supprimer les colonnes inconnues entraîne une perte de données. Ces nouvelles colonnes contiennent potentiellement des informations importantes qui seront perdues définitivement.",
      "C": "Rejeter les fichiers avec un schéma différent est trop rigide et bloque le pipeline. Dans un environnement réel, les schémas évoluent fréquemment.",
      "D": "Un champ JSON unique perd tous les avantages de BigQuery (typage fort, partitionnement, clustering, optimisation des requêtes) et rend les requêtes beaucoup plus complexes et coûteuses."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/managing-table-schemas"
  },
  {
    id: 64,
    domain: "Ingestion et traitement des données",
    difficulty: "difficile",
    question: "Votre entreprise utilise Dataflow pour un pipeline de transformation complexe en streaming. Le pipeline doit effectuer une déduplication exacte des événements basée sur un identifiant unique, en gérant les duplications causées par les retransmissions Pub/Sub. La fenêtre de déduplication est de 1 heure. Comment implémentez-vous cette déduplication de manière efficace ?",
    options: [
      { label: "A", text: "Utiliser la fonctionnalité native de déduplication de Pub/Sub qui garantit exactly-once delivery" },
      { label: "B", text: "Implémenter un GroupByKey sur l'identifiant unique dans une fenêtre de 1 heure, puis prendre le premier élément de chaque groupe" },
      { label: "C", text: "Utiliser la transformation Deduplicate d'Apache Beam qui utilise un state timer pour tracker les identifiants vus dans la fenêtre" },
      { label: "D", text: "Stocker les identifiants dans Memorystore Redis et vérifier l'existence avant chaque traitement" }
    ],
    correctAnswers: ["C"],
    explanation: "La transformation Deduplicate d'Apache Beam est conçue spécifiquement pour ce cas d'usage. Elle utilise le state et les timers pour maintenir efficacement un ensemble d'identifiants vus dans la fenêtre spécifiée, en nettoyant automatiquement les anciens identifiants. C'est la solution la plus performante et la plus intégrée au modèle Beam.",
    whyOthersWrong: {
      "A": "Pub/Sub garantit at-least-once delivery, pas exactly-once. Les messages peuvent être délivrés plusieurs fois, notamment en cas de retry ou de non-acknowledgement. La déduplication doit être gérée côté consommateur.",
      "B": "GroupByKey fonctionne mais nécessite de mettre en buffer tous les éléments pour chaque clé sur toute la fenêtre avant d'émettre un résultat. Pour un pipeline streaming avec une fenêtre de 1 heure, cela consomme beaucoup de mémoire et ajoute de la latence.",
      "D": "Un lookup Redis externe pour chaque événement ajoute une latence réseau et crée une dépendance externe. De plus, la gestion de l'expiration et de la concurrence est complexe à implémenter correctement."
    },
    gcpLink: "https://beam.apache.org/documentation/transforms/python/aggregation/deduplicate/"
  },
  {
    id: 65,
    domain: "Ingestion et traitement des données",
    difficulty: "facile",
    question: "Quel est l'avantage principal de l'API BigQuery Storage Write par rapport à l'ancienne API de streaming (tabledata.insertAll) pour l'insertion de données en temps réel dans BigQuery ?",
    options: [
      { label: "A", text: "L'API Storage Write est gratuite tandis que l'ancienne API est payante" },
      { label: "B", text: "L'API Storage Write offre des garanties exactly-once, un débit plus élevé et un coût réduit grâce au format Protocol Buffers" },
      { label: "C", text: "L'API Storage Write supporte uniquement le format JSON" },
      { label: "D", text: "L'ancienne API de streaming offre de meilleures performances que l'API Storage Write" }
    ],
    correctAnswers: ["B"],
    explanation: "L'API BigQuery Storage Write offre des sémantiques exactly-once (pas de doublons), un débit supérieur grâce à l'utilisation de Protocol Buffers (plus compact que JSON), un coût réduit, et la possibilité de valider les écritures avec des commits. Elle remplace avantageusement l'ancienne API tabledata.insertAll.",
    whyOthersWrong: {
      "A": "L'API Storage Write n'est pas gratuite. Elle est facturée au volume de données insérées, mais son coût est inférieur à l'ancienne API grâce au format binaire plus compact.",
      "C": "C'est l'ancienne API (tabledata.insertAll) qui utilise JSON. L'API Storage Write utilise Protocol Buffers, un format binaire plus efficace.",
      "D": "C'est l'inverse : l'API Storage Write offre de meilleures performances (débit supérieur, latence réduite) que l'ancienne API de streaming."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/write-api"
  },
  {
    id: 66,
    domain: "Ingestion et traitement des données",
    difficulty: "difficile",
    question: "Votre pipeline Dataflow streaming consomme des messages Pub/Sub et effectue des agrégations par fenêtre de 10 minutes. Vous devez mettre à jour la logique de transformation du pipeline (ajouter un nouveau champ calculé) sans perdre de données ni interrompre le traitement en cours. Comment procédez-vous ?",
    options: [
      { label: "A", text: "Arrêter le pipeline, modifier le code et redémarrer un nouveau pipeline" },
      { label: "B", text: "Utiliser la fonctionnalité d'update de Dataflow qui remplace le pipeline en cours par la nouvelle version en transférant l'état (in-flight data et watermarks)" },
      { label: "C", text: "Déployer un second pipeline en parallèle qui consomme le même topic Pub/Sub" },
      { label: "D", text: "Modifier le code directement sur les workers en cours d'exécution via SSH" }
    ],
    correctAnswers: ["B"],
    explanation: "Dataflow supporte la mise à jour in-place des pipelines streaming. En utilisant l'option --update avec le même nom de job, Dataflow transfère l'état du pipeline (données en vol, watermarks, state des fenêtres) vers la nouvelle version du pipeline. Cela garantit la continuité du traitement sans perte de données.",
    whyOthersWrong: {
      "A": "Arrêter et redémarrer le pipeline peut entraîner une perte de données en vol (les éléments dans les fenêtres non terminées) et un gap dans le traitement pendant le redémarrage.",
      "C": "Deux pipelines consommant le même topic via le même abonnement Pub/Sub se partageraient les messages (chacun recevant une partie). Avec des abonnements séparés, il y aurait des doublons dans la destination.",
      "D": "Modifier du code directement sur les workers n'est pas possible dans Dataflow. Les workers exécutent le code du job tel que soumis lors de la création du pipeline."
    },
    gcpLink: "https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline"
  }
];
