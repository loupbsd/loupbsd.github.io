# CLAUDE.md — E-portfolio de Loup Broussard

> Ce fichier est lu par Claude Code au début de chaque session.
> Les éléments entre [CROCHETS] sont à compléter par moi.

---

## 1. Contexte

- Je suis **Loup Broussard**, étudiant en **1re année (L3 / S5) en Sciences du Numérique (SN)** à l'**ENSEEIHT** (Toulouse INP), après **La Prépa des INP (Toulouse)**.
- Ce site est mon **e-portfolio**, évalué dans le cours **CAM – Careers & Management** (Soft Skills Center).
- C'est un outil **sur 3 ans** (S5 → S10) : il sera enrichi chaque semestre (stages S6 et S8, mobilité S9, engagement RSE, jury PPP). Le code doit donc rester **simple à mettre à jour**.
- Tu m'aides sur le **code, la structure et le design**. Le **contenu** (textes sur moi) vient de moi.

## 2. Objectif n°1 du site

**Faire gagner du temps au lecteur** : en 30 secondes sur la page d'accueil, il doit savoir qui je suis, ce que je sais faire, ce que je cherche — plus vite qu'en lisant mon CV ou mon LinkedIn.
**Objectif n°2** : lui **donner envie d'en savoir plus** (cliquer sur un projet, regarder le pitch, me contacter).

Public : recruteurs (stages), enseignants et jury CAM, alumni N7 et professionnels rencontrés via My Job Glasses, responsables de mobilité internationale.

## 3. Ce qui est évalué (grille CAM, rendu Moodle ~1er novembre)

La section **Career Project** doit contenir :
- [ ] CV en **anglais** et en **français** (PDF téléchargeables)
- [x] Lien LinkedIn (profil FR + EN)
- [ ] **Vidéo pitch UVP** en anglais, 2–3 min (structure Now → Past → Future)
- [ ] **3 rôles modèles** analysés (My Job Glasses, LinkedIn, alumni)
- [ ] **3 projets de mobilité internationale** alignés avec ces rôles modèles

Critères de notation : complétude · clarté du projet professionnel · **cohérence de la marque personnelle** (UVP / CV / LinkedIn / pitch alignés) · qualité de l'anglais · présentation visuelle et navigation.

➡️ Priorité absolue : tous ces éléments **présents, visibles et accessibles en 1 ou 2 clics depuis l'accueil**.

État au 25/10/2026 : CV FR/EN, pitch et rendez-vous avec les 3 rôles modèles prévus la semaine du 26/10 ; les 3 mobilités seront construites ensuite à partir des rôles modèles (encadrés « In progress » sur le site, cartes prêtes en commentaire HTML).

## 4. Structure du site (6 onglets obligatoires)

Une page HTML par onglet. Navigation identique sur toutes les pages, onglet actif mis en évidence.

| Fichier | Onglet | Contenu attendu |
|---|---|---|
| `index.html` | **Welcome** | Voir §5 (page la plus importante) |
| `engineering.html` | **Engineering Course** | Formation SN (cours clés, compétences), puis une carte par projet (format §6) |
| `mobility.html` | **International Mobility** | 3 projets de mobilité (format §6), langues, sous-sections futures (PCE, LV2…) |
| `sustainability.html` | **Sustainability & Civic Engagement** | Engagement RSE : Fresque du Climat, Sulitest, projet d'équipe RSE + infographie (janvier), ODD concernés |
| `activities.html` | **Sport & Other Activities** | Rugby, musique (live coding), sports automobiles, nouvelles technologies — chacun avec ce que j'en retire (soft skills) |
| `career.html` | **Career Development** | Section **Career Project** complète (§3) : CV FR/EN, LinkedIn, vidéo, 3 rôles modèles, 3 mobilités, objectifs court/moyen/long terme (plans A/B/C). Sous-sections futures : stages, PEP |

**Le site est un tour de circuit** (refonte « Lap », validée le 27/10/2026, inspirée de landonorris.com sans en reprendre l'identité) :
- Les 6 onglets sont les **6 secteurs d'un tour**, dans un ordre fixe : S1 Welcome → S2 Engineering → S3 Mobility → S4 Sustainability → S5 Activities → S6 Career → retour à S1. Le numéro est dans `<html data-sector="n">`.
- **Tout le site se visite en défilant** (décidé le 28/10/2026, remplace l'ancienne règle « pas de scroll piégé ») : molette, trackpad, doigt, flèches ou Espace suffisent, sans cliquer. Les secteurs s'enchaînent toujours vers le bas, mais l'**axe de lecture alterne** : certains secteurs défilent verticalement, d'autres horizontalement (comme on avance sur un circuit), avec le même geste. Remonter marche dans l'autre sens. **Alternance retenue** : S1 Welcome ↓ · S2 Engineering → · S3 Mobility ↓ · S4 Sustainability → · S5 Activities ↓ · S6 Career ↓ (la « ligne droite finale » : page la plus notée, lue comme un document). **Architecture (a), validée le 28/10/2026** : voir §7.
- Exigences fixes : même geste partout ; swipe horizontal naturel sur mobile dans les secteurs horizontaux ; jonctions fluides dans les deux sens ; URL propre à chaque onglet, mise à jour pendant le défilement, bouton Retour fonctionnel ; **aucun contenu caché** dans un panneau horizontal ; clavier, focus visible, lecteurs d'écran ; sans JavaScript ou avec `prefers-reduced-motion` : navigation classique par pages ; chaque onglet s'ouvre directement et on comprend où l'on est ; changements d'axe annoncés par un repère visuel clair.
- **Décisions du 28/10/2026 pour le défilement continu** :
  - fin du tour : on **s'arrête** sur la sortie de S6 et le footer (lien « Tour suivant → Welcome »), pas de boucle ;
  - le FR passe au défilement continu dès que ses 6 pages existent (fait le 28/10) : jamais de mélange de langues dans un même défilement ;
  - avant chaque secteur horizontal, un **écran de virage** (grand titre, flèche → dans la couleur du secteur, nombre de panneaux et jauge) ; en sortie, un repère « ↓ secteur suivant » ;
  - lien direct vers un onglet (ex. `/career.html`) : la page s'affiche tout de suite et **tout le tour** est ajouté autour, sans faire bouger l'écran ;
  - Engineering : panneaux Formation | Cours | Compétences, puis retour au vertical pour **Projects** (la carte Strudel se déplie normalement) ;
  - interrupteur **« Lecture classique »** dans le menu (pages séparées, choix mémorisé) ;
  - en défilement continu, la sortie de secteur devient une **bande de jonction** compacte ; le bloc complet reste en mode pages ;
  - la télémétrie et la 911 montrent le **tour entier** (6 repères de secteur) en défilement continu, la page en mode pages ;
  - sur mobile, les secteurs horizontaux ont **un groupe par panneau** (un groupe de cours, une compétence…).
- **Toujours visibles** : une barre « Me contacter » (e-mail, LinkedIn, GitHub, CV), l'indicateur du tour (6 secteurs, position actuelle, cliquable), le menu et FR/EN.
- Chaque page = **ouverture de secteur** (grand titre + ligne de données) → **chapitres** (§8) → **sortie de secteur** (secteur suivant / précédent + carte du tour), puis le footer.

## 5. Page d'accueil (`index.html`) — conçue pour être lue en 30 s

Dans cet ordre (ton de chaque chapitre entre parenthèses, voir §8) :
1. **Hero** (papier, plein écran sur ordinateur) : nom en très grand sur deux largeurs d'Archivo (« LOUP » étroit et fin, « BROUSSARD » large et gras), sous-titre « Computer Science Engineering Student @ ENSEEIHT », ligne de données `43.60° N · 1.44° E — TOULOUSE`, UVP en 1 phrase, 3 boutons : `Watch my pitch` · `Download CV` · `LinkedIn`. Portrait détouré à droite (photo à venir, provisoirement « LB »). Tout ce qui se lit en 30 s tient dans le **premier écran** (1280×720 et 375×667).
2. **At a glance** (encre, lu comme une fiche technique) : une liste courte « label → valeur » (4 à 6 lignes, sans icônes ni grille de fiches identiques) : formation, domaines (dev · embedded systems), langues (FR natif · EN B2), ce que je cherche, localisation (Toulouse).
3. **Featured / Start here** (papier) : une liste de 2–3 liens vers mes meilleurs contenus (ex. projet Strudel, pitch vidéo, projet SN) ; chaque ligne = métadonnée + titre + 1 ligne + « See … → ».
4. **Now** (sable) : ce sur quoi je travaille en ce moment (2–3 lignes, mis à jour chaque semestre).
5. **Contact** (papier) : email en grand + LinkedIn + GitHub.
6. **Sortie de secteur** (encre) : secteur suivant (S2 Engineering), précédent (S6 Career), carte du tour.

Règles : pas de long paragraphe sur l'accueil (max ~3 lignes par bloc) ; tout le détail est dans les onglets.

## 6. Format des contenus

**Carte projet** — toujours dans cet ordre, lisible en diagonale :
1. Titre + date + tags (technos / compétences)
2. **Contexte** — le problème ou l'objectif (1–2 lignes)
3. **Mon rôle** — seul / en équipe de N, ce que j'ai fait moi
4. **Méthodes & outils**
5. **Résultat** — concret, chiffré si possible, lien GitHub / rapport / démo
6. **Ce que j'ai appris**
La carte affiche titre + tags + 1 ligne de résumé ; le détail se déplie au clic (`<details>` ou équivalent).

**Projet Strudel (musique)** : projet d'équipe (5) à La Prépa des INP, 2026, « Science et musique » : piano enregistré, analyse de Fourier en Python, reprise de *Gypsy Woman* (Crystal Waters) en live coding sur Strudel. Mon rôle : développement Strudel (avec Victor) + recherche sur l'Algorave. Rapport : `assets/docs/groupe_10_rapport_science_et_musique.pdf` ; notebook : https://observablehq.com/d/10a7e22d37d67443. Les samples piano sont hébergés par le dépôt séparé `loupbsd/music-project` (ne pas créer de dossier `music-project/` dans ce dépôt).

**Carte rôle modèle** : nom (ou initiales si pas d'accord de la personne), poste, entreprise, parcours en 3 étapes, comment je l'ai rencontré (My Job Glasses / LinkedIn / alumni), ce que j'en retiens pour mon projet.

**Carte mobilité** : destination, type (semestre, stage, double diplôme…), pourquoi, lien explicite avec un rôle modèle, prérequis (langue, niveau).

**Cartes répétées** (projets, rôles modèles, mobilités) : coin supérieur droit **biseauté** (`corner-shape: bevel` ; coin simple dans les navigateurs qui ne le gèrent pas).

**Légendes « LIEU, ANNÉE »** : au-dessus de chaque photo et en tête des cartes projet ou formation, en IBM Plex Mono majuscules (ex. `LA PRÉPA DES INP, 2026`). Si je ne l'ai pas donnée : `[TO COMPLETE: LIEU, ANNÉE]`.

**Photos** : les miennes uniquement (portrait, rugby, musique / DJ / Strudel, karting / sim / mécanique, N7), WebP < 150 Ko, `width`/`height`/`alt`, `loading="lazy"` sauf le portrait du hero. Pas de photos d'ambiance de banques d'images. Aucune image insérée sans mon accord ; en attendant, un **cadre visible « Photo à venir »** avec la légende `[TO COMPLETE: LIEU, ANNÉE]` (décidé le 28/10/2026). Image d'aperçu LinkedIn `og-image.jpg` : version typographique (nom, sous-titre, plan moteur), sans photo, à valider avant ajout.

## 7. Choix techniques

- **HTML / CSS / JavaScript vanilla** uniquement. Pas de framework, pas de build, pas de dépendance npm.
- Arborescence :
  ```
  /
  ├── index.html, engineering.html, mobility.html, sustainability.html, activities.html, career.html   (anglais)
  ├── fr/                    (version française : mêmes noms de fichiers, chemins en ../)
  ├── css/style.css          (un seul fichier, variables CSS en haut)
  ├── js/lap.js              (sens du glissement entre deux pages ; chargé dans <head> SANS defer)
  ├── js/main.js             (menu, thème, navigation entre secteurs, petites interactions)
  ├── assets/img/            (photos compressées < 150 Ko en WebP ; dessins en SVG : favicon.svg, porsche-911.svg, engine-blueprint.svg, circuit.svg)
  ├── assets/docs/           (CV_Loup_Broussard_EN.pdf, CV_Loup_Broussard_FR.pdf, syllabus-enseeiht-sn.pdf, rapport du projet Science et musique)
  └── CLAUDE.md
  ```
- Couleurs, polices et espacements définis en **variables CSS** dans `:root`.
- **Responsive** obligatoire (mobile d'abord) : tester à 375 px, 768 px et 1280 px.
- La **vidéo** est hébergée sur YouTube (non répertoriée) et intégrée en `<iframe>` — jamais de fichier vidéo dans le dépôt.
- Accessibilité : `alt` sur toutes les images, contraste suffisant (AA), navigation au clavier, `lang="en"` sur `<html>` (`lang="fr"` dans `fr/`).
- Noms de fichiers : minuscules et tirets, sans espaces ni accents (liens fiables sur GitHub Pages).
- `<title>` et `<meta name="description">` propres sur chaque page, + balises Open Graph (aperçu propre quand le lien est partagé sur LinkedIn).
- Déploiement : **GitHub Pages**, dépôt `loupbsd.github.io`, branche `main`. Tous les chemins doivent être **relatifs**.
- **`main` = le site en ligne.** Une refonte ou une grosse modification se fait sur une branche (ex. `refonte`), fusionnée dans `main` seulement après ma validation.
- **Aperçu local** : `python -m http.server 8000` à la racine, puis http://localhost:8000 (les transitions entre pages ne marchent pas en `file://`).
- **Transitions entre onglets** (mode « pages ») : View Transitions entre pages séparées (`@view-transition` dans `style.css`) + `js/lap.js` (sens gauche / droite). C'est aussi le mode de secours : sans JS ou avec `prefers-reduced-motion`, navigation classique par pages.
- **Défilement continu** (mode principal, architecture (a) validée le 28/10/2026, en construction) : les 6 pages HTML restent la **source** et la version complète de chaque onglet. Le JS charge les 5 autres pages et les met bout à bout dans la page ouverte (identifiants préfixés pour éviter les doublons), puis met à jour l'URL (`history.replaceState`) pendant le défilement ; un saut par le menu crée une entrée d'historique. On garde le défilement **natif** (pas de molette réimplémentée en JS) : les secteurs horizontaux sont épinglés (`position: sticky`) et le défilement vertical les fait avancer à l'horizontale. Les panneaux horizontaux ne contiennent que des blocs courts ; si un panneau dépasse la hauteur de l'écran (zoom, petit écran), son secteur repasse en vertical. Un interrupteur « lecture classique » dans le menu revient aux pages séparées.
- **Version de secours** (rendu du 1er novembre si le défilement continu n'est pas prêt) : les 6 pages en mode « pages », avec la DA « Lap », la barre de contact et la bande chrono.
- Google Fonts : `Archivo:wdth,wght@62..125,300..800` + `IBM Plex Mono:wght@400;500`.

## 8. Design — « Violet & Cream » : pro, chaleureux, sobre · mise en page « Lap »

- **Ambiance** : professionnelle, chaleureuse et sobre. Un site fait à la main par un étudiant ingénieur, pas un template ni un pastiche de terminal.
- **Chapitres** (refonte « Lap », 27/10/2026) : chaque section est un chapitre (`class="chapter" data-tone="…"`) dans l'un des **trois tons** : **papier** (crème, plan moteur bien visible), **sable** (chapitres denses), **encre** (chapitres sombres). Jamais deux tons identiques à la suite (sauf l'ouverture et le 1er chapitre). Rythme varié : plein écran → dense → aéré.
  - **Chapitres plein écran**, comme des diapositives (décidé le 28/10/2026) : chacun fait au moins la hauteur de l'écran, contenu centré ; les chapitres plus longs s'allongent.
  - **Aimantation douce** (`scroll-snap-type: y proximity`) : quand le défilement s'arrête près du début d'un chapitre, la page l'aligne sous le header ; ailleurs le défilement reste libre. Jamais d'aimantation stricte. Coupée avec `prefers-reduced-motion`.
  - En passant d'un chapitre à l'autre, la couleur du suivant **monte en douceur** (animation CSS liée au défilement). Le texte n'arrive qu'une fois la couleur posée, grâce à la marge haute des chapitres.
  - Le header prend le ton du chapitre qui passe dessous.
  - Repli (navigateur sans support, ou `prefers-reduced-motion`) : bords nets.
- **Univers « course auto/moto & musique »** (validé le 25/10/2026, inspiré de bsrd.fr en plus sobre) : quelques détails précis, pas d'autre image décorative que le plan moteur ci-dessous.
  - **Tracé de télémétrie** en bas du header (courbe de vitesse sur un tour, qui évoque aussi une forme d'onde audio) : se remplit en violet avec la progression de lecture, avec une **silhouette de Porsche 911 Carrera des années 80** (même violet) qui roule au bout de la partie violette, roues posées sur la courbe (masquée quand elle croise le logo sur mobile). Tracé dessiné par `js/main.js` (§5) ; la voiture vient de `assets/img/porsche-911.svg`, utilisé comme **masque CSS** (la couleur vient du CSS, donc du thème). Avec le plan moteur et la bande chrono, ce sont les **trois seuls** éléments « signature » du site : ne pas ajouter d'autres effets.
  - **Plan moteur en fond de toutes les pages** (validé le 27/10/2026) : dessin technique d'un flat-six Porsche (`assets/img/engine-blueprint.svg`, cadre et cartouche « REF. » retirés, aucun logo). Une seule règle : `body::before` en `position: fixed` (section 2 de `style.css`), donc il reste en place pendant que la page défile par-dessus. Même technique que la 911 : **masque CSS**, couleur = accent du thème, opacité via `--blueprint-opacity` (~0,11 clair / 0,13 sombre ; ×0,8 sur mobile), fondu vers la gauche pour qu'il se dissolve avant le texte. Placé à droite, sous le header. Les fonds de chapitre sont peints **en dessous** (section 13), donc il traverse tous les chapitres ; sur un chapitre encre, il passe en violet clair (`data-view-tone`, posé par main.js). Les blocs opaques (header, cartes, sommaire) le masquent. Statique, ne pas l'augmenter au point de gêner la lecture.
  - **Bande chrono** : la nav du header montre les 6 secteurs S1–S6, avec une barre au-dessus de chaque onglet : violet = secteur en cours (comme le « secteur violet », meilleur temps en F1), gris = secteurs déjà passés, clair = à venir. Flèches ‹ › de part et d'autre. Sur mobile : `‹ S1/6 ›` + menu plein écran (6 secteurs en grand, carte du tour, bouton thème).
  - **Carte du tour** (`assets/img/circuit.svg`, tracé original) : dans la sortie de secteur et le menu mobile ; le secteur en cours est en violet.
  - **Mini-secteurs** : dans une page, les titres de section portent `S3.1`, `S3.2`… à **droite** (compteur CSS automatique ; le numéro de page vient de `data-sector`).
  - **Ligne de données** sous chaque grand titre : `43.60° N · 1.44° E — TOULOUSE` sur l'accueil, un résumé factuel tiré du contenu sur les autres pages.
- **Thème clair crème par défaut** ; thème sombre (« session de nuit ») si l'OS est en mode sombre, ou via le bouton (choix mémorisé).
- **Typographie** : **Archivo** pour tout le texte. Grands titres (nom du hero, h1) en **majuscules et en deux largeurs** : un mot large et gras (`font-stretch: 125%`, 800), l'autre étroit et fin (`62%`, 300), effet « livrée de course ». h2 élargis (125 %). **IBM Plex Mono** réservée aux *données* (tags, dates, légendes, secteurs, `[TO COMPLETE]`, code). 2 polices max, via Google Fonts ; pas de serif.
- **Couleur d'identité** : **violet** `#4D2DA0` sur fond clair, `#A993F0` sur fond sombre — direction choisie le 25/10/2026 (remplace « Terminal Clean » cyan). Header, boutons, liens, barre de contact.
- **Couleurs de secteur** (28/10/2026, variables `--c-s1` … `--c-s6`) : elles ne colorent **que les repères de leur secteur** (barre du secteur en cours dans la bande chrono, tracé de la carte du tour, nom du « secteur suivant », plus tard le repère de changement d'axe). Jamais de fond ni de bouton colorés ; le violet reste la marque.
  | Secteur | Clair (AA sur crème et sable) | Sombre |
  |---|---|---|
  | S1 Welcome | violet `#4D2DA0` | `#A993F0` |
  | S2 Engineering | bleu télémétrie `#1F5FA8` | `#8DB8F0` |
  | S3 Mobility | vert piste `#2E6B3F` | `#8FD1A0` |
  | S4 Sustainability | ocre `#7A4F00` | `#E7B66A` |
  | S5 Activities | rouge `#A3302A` | `#F09A8E` |
  | S6 Career | violet (retour à l'identité pour l'arrivée) | `#A993F0` |
- **Barre « Contact »** (toujours visible, section 16 de `style.css`) : barre de 48 px en bas sous 1280 px (icônes seules sous 400 px), rail vertical dans la marge gauche au-delà. E-mail, LinkedIn, GitHub ; lien CV à ajouter quand les PDF existeront (commentaire `TO COMPLETE` dans le HTML).
- **Tons** (variables `--tone-*` en haut de `style.css`) :
  | Ton | Thème clair | Thème sombre | Texte · accent |
  |---|---|---|---|
  | papier | `#F4E9D2` | `#1A1714` | clair : `#221C2B` · `#4D2DA0` — sombre : `#EFE8DA` · `#A993F0` |
  | sable | `#EADBBE` | `#221E1A` | idem papier |
  | encre | `#1A1714` | `#0E0C0A` | `#EFE8DA` · `#A993F0` |
- **Lisibilité avant tout** : hiérarchie visuelle forte, titres explicites, beaucoup d'espace, listes courtes, tags pour les compétences, pas de pavés de texte.
- **Donner envie d'en savoir plus** : liens et cartes cliquables, effets de survol discrets, appels à l'action clairs (« See project → », « Watch the pitch »).
- **Animations** : autorisées = survol discret, glissement horizontal entre onglets, montée de couleur entre chapitres, changement de ton du header, secteurs épinglés qui défilent à l'horizontale, repère de changement d'axe. Interdites = animations d'apparition sur chaque bloc, défilement « lissé » en JS (type Lenis), texte qui défile tout seul. Tout est coupé avec `prefers-reduced-motion` (retour aux pages classiques).
- Performance : aucune page > ~1 Mo.

### Éviter le « look IA » (règles inspirées du skill Impeccable)
Le site ne doit pas donner l'impression d'avoir été généré par une IA. À ne **pas** faire :
- de petits labels au-dessus des titres (`// about`, `> now`, `$ contact`…) : le titre se suffit (seule exception : les mini-secteurs S1.1, S1.2… placés à droite) ;
- reprendre l'identité de landonorris.com : jaune fluo, leurs polices (Brier, Mona Sans), leurs visuels ou leur code ;
- un bloc de « chiffres clés » (gros nombre + petit label) ;
- la monospace comme déguisement « tech » sur des titres, boutons ou liens ;
- des grilles de cartes identiques « icône + titre + texte » comme structure de page, ou des cartes dans des cartes ;
- un curseur clignotant, des `>` décoratifs et autres clichés de terminal ;
- des dégradés (surtout violets), du texte en dégradé, du verre/flou décoratif, des halos lumineux ;
- une bordure gauche colorée épaisse sur les cartes ou encadrés ;
- des emoji à la place d'icônes ;
- les polices surutilisées : Inter, Roboto, Montserrat, Poppins, Geist, Space Grotesk, Fraunces, Instrument…
À faire : soigner les détails du navigateur (sélection de texte, focus, barre de défilement aux couleurs du site), utiliser des cartes seulement pour des éléments vraiment répétés (projets, rôles modèles, mobilités).

## 9. Langue

- Site **en anglais** par défaut (langue évaluée).
- Anglais professionnel, phrases courtes, verbes d'action. Signale-moi les fautes ou tournures maladroites dans les textes que je fournis, **sans les réécrire sans me le dire**.
- **Version française** dans `fr/` (validée le 25/10/2026), avec un bouton **EN | FR** dans le header de toutes les pages, qui mène à la même page dans l'autre langue.
  - État au 28/10/2026 : **les 6 pages sont traduites** (`fr/*.html`, traduction fidèle de l'anglais, à relire par moi). Chaque bouton EN | FR mène à la même page dans l'autre langue ; chaque page a ses liens `hreflang` et son `og:locale`. EN et FR ont exactement la même structure HTML (vérifié par script).
  - Décidé le 27/10/2026 : les 5 autres pages seront traduites **fidèlement à partir de l'anglais après le 1er novembre** (rien d'ajouté, chaque page relue par moi), puis gardées strictement synchronisées (même structure, même contenu).
  - **Toute modification de contenu se fait dans les deux langues** (pour les pages déjà traduites).
  - En français : CV FR, LinkedIn `?locale=fr_FR`, `lang="fr"`, `og:locale` fr_FR, liens `hreflang` entre les deux versions.

## 10. Règles de travail pour Claude

- **N'invente jamais de contenu sur moi** (projets, notes, expériences, compétences). Si une info manque, mets un placeholder visible `[TO COMPLETE: …]`.
- Avant une modification importante (structure, design global, nouvelle page), **explique ton plan et attends mon accord**.
- Fais des modifications **petites et ciblées** ; garde la navigation identique sur toutes les pages (si tu la modifies, modifie-la partout).
- Explique brièvement ce que tu as changé et pourquoi : je suis en SN, je veux comprendre le code.
- Pas de données personnelles sensibles sur le site : ni téléphone, ni adresse, ni date de naissance.
- Messages de commit courts, en anglais, au présent (ex. `Add career project section`).
- Pour une refonte : **une étape = une page**. Après chaque étape, compte rendu court : captures (375 px et 1280 px), console sans erreur, poids de la page, contenu comparé à l'ancienne version (rien de perdu), navigation au clavier, alignement EN/FR. Puis attendre mon accord avant l'étape suivante.

## 11. Mes infos

- Nom : **Loup Broussard**
- Formation : ENSEEIHT — Sciences du Numérique, 1re année (2026–2027) · avant : La Prépa des INP, Toulouse
- Email pro : loup.broussard@outlook.com
- LinkedIn : https://www.linkedin.com/in/loup-broussard-a6940b38b/ (EN : ?locale=en_US · FR : ?locale=fr_FR)
- GitHub : https://github.com/loupbsd
- Langues : Français (langue maternelle) · Anglais (B2)
- Domaines d'intérêt : développement logiciel, systèmes embarqués, nouvelles technologies (encore en exploration)
- Projets : « Science et musique » (prépa, 2026, live coding Strudel) · [TO COMPLETE: projets SN]
- Activités : rugby · musique · sports automobiles · nouvelles technologies
- UVP (1 phrase) : « First-year Computer Science engineering student at ENSEEIHT who turns curiosity into code, looking for a software, systems or data internship in summer 2027. »
- Pistes de carrière (exploration, ouvert à tout) : plan A systèmes embarqués dans le sport auto/moto · plan B logiciel pour la musique électronique (DAW, outils DJ, synthés) · plan C chef de projet / product manager tech après quelques années
- 3 mots-clés de ma marque : [TO COMPLETE]
- Ce que je cherche : stage technique de 6 semaines minimum, entre le 7 juin et le 23 août 2027, en développement logiciel, systèmes ou data
