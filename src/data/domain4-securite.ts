import type { Question } from './types';

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
  },
  {
    id: 76,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "facile",
    question: "Votre entreprise utilise BigQuery et Cloud Storage. Le responsable sécurité exige que les données soient chiffrées au repos. Quelle action devez-vous entreprendre ?",
    options: [
      { label: "A", text: "Activer manuellement le chiffrement AES-256 sur chaque table BigQuery et chaque bucket Cloud Storage" },
      { label: "B", text: "Aucune action : Google Cloud chiffre automatiquement toutes les données au repos par défaut avec AES-256" },
      { label: "C", text: "Configurer Cloud KMS et créer des clés de chiffrement pour chaque service" },
      { label: "D", text: "Installer un logiciel de chiffrement tiers sur les VMs qui accèdent aux données" }
    ],
    correctAnswers: ["B"],
    explanation: "Google Cloud chiffre automatiquement toutes les données au repos par défaut, sans aucune configuration nécessaire. Le chiffrement utilise AES-256 avec des clés gérées par Google (Google-managed encryption keys). Cette fonctionnalité est gratuite et toujours active.",
    whyOthersWrong: {
      "A": "Il n'y a pas besoin d'activer manuellement le chiffrement car il est automatique sur tous les services GCP. Il n'existe pas d'option pour le désactiver.",
      "C": "Cloud KMS est nécessaire uniquement si l'entreprise souhaite gérer ses propres clés (CMEK). Le chiffrement par défaut est déjà actif sans KMS.",
      "D": "Un logiciel tiers est inutile car le chiffrement est intégré nativement dans l'infrastructure Google Cloud au niveau du stockage."
    },
    gcpLink: "https://cloud.google.com/security/encryption/default-encryption"
  },
  {
    id: 77,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "intermédiaire",
    question: "Votre entreprise doit anonymiser des données personnelles (noms, emails, numéros de téléphone) dans un dataset BigQuery de 10 To avant de le partager avec une équipe d'analyse externe. L'anonymisation doit être réversible pour les utilisateurs autorisés. Quelle technique Cloud DLP utilisez-vous ?",
    options: [
      { label: "A", text: "Le masquage (redaction) qui remplace les données par des astérisques" },
      { label: "B", text: "La tokenisation par chiffrement préservant le format (Format Preserving Encryption) avec une clé stockée dans Cloud KMS" },
      { label: "C", text: "Le hachage (hashing) des données sensibles avec SHA-256" },
      { label: "D", text: "Le remplacement par des données fictives générées aléatoirement" }
    ],
    correctAnswers: ["B"],
    explanation: "La tokenisation par Format Preserving Encryption (FPE) de Cloud DLP remplace les données sensibles par des tokens chiffrés qui préservent le format original (un email reste sous forme d'email, un téléphone reste sous forme de téléphone). Avec la clé KMS, les utilisateurs autorisés peuvent re-identifier les données. C'est la seule technique réversible.",
    whyOthersWrong: {
      "A": "Le masquage est irréversible : les données originales sont définitivement perdues et remplacées par des astérisques. Il ne permet pas la ré-identification par des utilisateurs autorisés.",
      "C": "Le hachage SHA-256 est une fonction à sens unique : il est impossible de retrouver les données originales à partir du hash. Ce n'est pas réversible.",
      "D": "Les données fictives aléatoires n'ont aucun lien avec les données originales. La ré-identification est impossible car la correspondance original-fictif n'est pas conservée."
    },
    gcpLink: "https://cloud.google.com/sensitive-data-protection/docs/pseudonymization"
  },
  {
    id: 78,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "intermédiaire",
    question: "Votre pipeline Dataflow accède à une base Cloud SQL en utilisant un mot de passe stocké en dur dans le code source. Le RSSI demande de sécuriser cette connexion. Quelle est la meilleure pratique pour gérer les secrets dans les pipelines de données sur GCP ?",
    options: [
      { label: "A", text: "Stocker le mot de passe dans une variable d'environnement sur les workers Dataflow" },
      { label: "B", text: "Utiliser Secret Manager pour stocker le secret et le récupérer au runtime via l'API Secret Manager" },
      { label: "C", text: "Chiffrer le mot de passe avec Cloud KMS et le stocker dans le code source chiffré" },
      { label: "D", text: "Stocker le mot de passe dans un fichier de configuration dans Cloud Storage avec des permissions restreintes" }
    ],
    correctAnswers: ["B"],
    explanation: "Secret Manager est le service GCP dédié au stockage sécurisé des secrets (mots de passe, clés API, certificats). Il offre le versioning, le contrôle d'accès IAM, l'audit des accès, et la rotation automatique des secrets. Le pipeline récupère le secret au runtime sans jamais l'exposer dans le code ou la configuration.",
    whyOthersWrong: {
      "A": "Les variables d'environnement peuvent être exposées dans les logs, les dumps de processus ou les métadonnées d'instance. Ce n'est pas un stockage sécurisé pour les secrets.",
      "C": "Stocker un secret chiffré dans le code source reste une mauvaise pratique : le secret est versionné dans Git, la rotation est complexe, et il faut gérer la clé KMS séparément.",
      "D": "Un fichier dans Cloud Storage, même avec des permissions restreintes, n'offre pas le versioning, l'audit d'accès ni la rotation automatique. Secret Manager est spécifiquement conçu pour ce besoin."
    },
    gcpLink: "https://cloud.google.com/secret-manager/docs/overview"
  },
  {
    id: 79,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "difficile",
    question: "Votre organisation utilise un data lake dans Cloud Storage contenant des données de différentes sensibilités (publiques, internes, confidentielles, restreintes). Vous devez mettre en place une gouvernance automatisée qui classe automatiquement les données, applique des politiques d'accès basées sur la classification, et surveille la conformité en continu. Quelle solution est la plus complète ?",
    options: [
      { label: "A", text: "Cloud DLP pour scanner tous les buckets et classer les données, puis appliquer manuellement les permissions IAM" },
      { label: "B", text: "Dataplex avec des zones de données (raw, curated) et des règles de gouvernance automatisées, intégré avec Data Catalog pour le tagging et DLP pour la classification" },
      { label: "C", text: "Créer des buckets séparés par niveau de sensibilité et gérer les permissions IAM manuellement" },
      { label: "D", text: "Utiliser Organization Policies pour restreindre les accès au niveau de l'organisation" }
    ],
    correctAnswers: ["B"],
    explanation: "Dataplex fournit une gouvernance unifiée du data lake avec des zones de données organisées par niveau de traitement. Intégré avec Data Catalog pour les métadonnées et le tagging, et DLP pour la classification automatique, il offre une solution complète de gouvernance avec des politiques automatisées, la surveillance de conformité et le contrôle d'accès basé sur les métadonnées.",
    whyOthersWrong: {
      "A": "Cloud DLP seul peut scanner et classifier mais n'offre pas d'orchestration de gouvernance. L'application manuelle des permissions n'est pas scalable et sujette aux erreurs humaines.",
      "C": "Des buckets séparés sont une approche simpliste qui ne scale pas. La gestion manuelle des permissions est source d'erreurs et ne surveille pas la conformité en continu.",
      "D": "Organization Policies définissent des contraintes globales (ex: régions autorisées) mais ne classifient pas les données ni n'appliquent des politiques granulaires basées sur la sensibilité des données."
    },
    gcpLink: "https://cloud.google.com/dataplex/docs/overview"
  },
  {
    id: 80,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "difficile",
    question: "Votre entreprise utilise BigQuery avec des données contenant des informations personnelles soumises au droit à l'oubli du RGPD. Un client demande la suppression de toutes ses données. Les données sont réparties dans 15 tables partitionnées par date. Comment implémentez-vous le droit à l'oubli de manière efficace dans BigQuery ?",
    options: [
      { label: "A", text: "Utiliser des requêtes DELETE avec DML pour supprimer les lignes du client dans chaque table" },
      { label: "B", text: "Recréer chaque table en excluant les données du client avec des requêtes CREATE TABLE AS SELECT" },
      { label: "C", text: "Utiliser le crypto-shredding : chiffrer les données personnelles avec une clé AEAD par client dans BigQuery, puis détruire la clé pour rendre les données illisibles" },
      { label: "D", text: "Supprimer les partitions contenant les données du client" }
    ],
    correctAnswers: ["C"],
    explanation: "Le crypto-shredding consiste à chiffrer les données personnelles avec une clé unique par client (via les fonctions AEAD de BigQuery ou Cloud KMS). Pour le droit à l'oubli, il suffit de détruire la clé du client : toutes ses données deviennent immédiatement et définitivement illisibles, sans nécessiter de DELETE coûteux sur 15 tables.",
    whyOthersWrong: {
      "A": "Les requêtes DML DELETE dans BigQuery réécrivent les partitions entières, ce qui est très coûteux pour 15 tables partitionnées. De plus, le time travel conserve les données supprimées pendant 7 jours.",
      "B": "Recréer 15 tables est extrêmement coûteux en termes de stockage temporaire et de calcul. Cette approche ne scale pas et nécessite une interruption de service.",
      "D": "Supprimer des partitions entières supprimerait les données de tous les clients de ces partitions, pas seulement celles du client demandeur."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/reference/standard-sql/aead-encryption-concepts"
  },
  {
    id: 81,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "intermédiaire",
    question: "Votre équipe data engineering doit donner accès à des analystes externes (d'une société de conseil) à certains datasets BigQuery pendant une mission de 3 mois. Les analystes n'ont pas de comptes Google. Comment leur donnez-vous accès de manière sécurisée et temporaire ?",
    options: [
      { label: "A", text: "Créer des comptes Google Cloud pour chaque analyste externe" },
      { label: "B", text: "Utiliser Workload Identity Federation avec le fournisseur d'identité de la société de conseil, et appliquer des conditions IAM avec une date d'expiration" },
      { label: "C", text: "Partager les credentials d'un compte de service avec les analystes" },
      { label: "D", text: "Exporter les données dans des fichiers CSV et les partager via Google Drive" }
    ],
    correctAnswers: ["B"],
    explanation: "Workload Identity Federation permet aux identités externes (Azure AD, Okta, SAML, OIDC) d'accéder aux ressources GCP sans créer de comptes Google. Les conditions IAM permettent de limiter l'accès dans le temps (expiration après 3 mois). C'est l'approche la plus sécurisée pour les identités externes temporaires.",
    whyOthersWrong: {
      "A": "Créer des comptes Google Cloud pour des externes nécessite une gestion du cycle de vie (désactivation après la mission), risque d'oubli, et complexifie l'administration.",
      "C": "Partager des credentials de compte de service est une mauvaise pratique de sécurité : pas de traçabilité individuelle, pas de MFA, et le secret peut être partagé ou compromis.",
      "D": "Exporter en CSV perd le contrôle d'accès, ne permet pas de requêtes SQL, et les données sont copiées hors de GCP sans gouvernance."
    },
    gcpLink: "https://cloud.google.com/iam/docs/workload-identity-federation"
  },
  {
    id: 82,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "facile",
    question: "Quelle est la différence entre un rôle prédéfini (predefined role) et un rôle personnalisé (custom role) dans Google Cloud IAM ?",
    options: [
      { label: "A", text: "Les rôles prédéfinis sont gratuits tandis que les rôles personnalisés sont payants" },
      { label: "B", text: "Les rôles prédéfinis sont créés et maintenus par Google avec un ensemble fixe de permissions, tandis que les rôles personnalisés permettent de définir un ensemble spécifique de permissions adapté à vos besoins" },
      { label: "C", text: "Les rôles personnalisés offrent plus de permissions que les rôles prédéfinis" },
      { label: "D", text: "Les rôles prédéfinis ne peuvent être appliqués qu'aux utilisateurs, les rôles personnalisés qu'aux comptes de service" }
    ],
    correctAnswers: ["B"],
    explanation: "Les rôles prédéfinis sont des ensembles de permissions pré-configurés par Google pour les cas d'usage courants (ex: BigQuery Data Viewer, Storage Object Admin). Les rôles personnalisés permettent de sélectionner les permissions individuelles nécessaires pour respecter le principe du moindre privilège quand les rôles prédéfinis sont trop larges.",
    whyOthersWrong: {
      "A": "Les deux types de rôles sont gratuits. IAM ne facture pas l'utilisation de rôles, qu'ils soient prédéfinis ou personnalisés.",
      "C": "Les rôles personnalisés ne peuvent contenir que des permissions qui existent dans les rôles prédéfinis. Ils ne donnent pas accès à des permissions supplémentaires, ils permettent de restreindre.",
      "D": "Les deux types de rôles peuvent être attribués à des utilisateurs, des groupes, des comptes de service ou des domaines, sans restriction."
    },
    gcpLink: "https://cloud.google.com/iam/docs/understanding-roles"
  },
  {
    id: 83,
    domain: "Sécurité, conformité et gouvernance des données",
    difficulty: "difficile",
    question: "Votre organisation a mis en place des VPC Service Controls autour de ses projets contenant des données sensibles. Un pipeline Cloud Composer dans le périmètre doit accéder à une API externe (API météo publique) pour enrichir les données. Les appels échouent avec une erreur « VPC Service Controls: Request is prohibited by organization's policy ». Comment résolvez-vous ce problème sans compromettre la sécurité ?",
    options: [
      { label: "A", text: "Supprimer le projet Cloud Composer du périmètre VPC Service Controls" },
      { label: "B", text: "Configurer une règle d'entrée (ingress rule) dans le périmètre VPC Service Controls pour autoriser le trafic depuis l'API externe" },
      { label: "C", text: "Configurer une règle de sortie (egress rule) dans le périmètre pour autoriser les appels sortants vers l'API externe spécifique, avec des conditions sur l'identité et la méthode" },
      { label: "D", text: "Désactiver temporairement VPC Service Controls pendant l'exécution du pipeline" }
    ],
    correctAnswers: ["C"],
    explanation: "Les règles de sortie (egress rules) de VPC Service Controls permettent d'autoriser des communications spécifiques depuis le périmètre vers des ressources externes. En configurant une règle de sortie avec des conditions précises (identité du compte de service, méthode API, ressource cible), vous autorisez uniquement les appels nécessaires sans ouvrir le périmètre de manière excessive.",
    whyOthersWrong: {
      "A": "Retirer le projet du périmètre expose toutes les données sensibles de ce projet. C'est disproportionné pour résoudre un problème d'accès à une seule API externe.",
      "B": "Les règles d'entrée (ingress) contrôlent le trafic entrant dans le périmètre, pas le trafic sortant. Le problème ici est un appel sortant du périmètre vers une API externe.",
      "D": "Désactiver VPC Service Controls, même temporairement, crée une fenêtre de vulnérabilité où les données sensibles peuvent être exfiltrées. C'est une pratique de sécurité inacceptable."
    },
    gcpLink: "https://cloud.google.com/vpc-service-controls/docs/egress-rules"
  }
];
