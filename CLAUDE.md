# CLAUDE.md — E-portfolio de Loup Broussard

> Ce fichier est lu par Claude Code au début de chaque session.
> Les éléments entre [CROCHETS] sont à compléter par moi.

---

## 1. Contexte

- Je suis **Loup Broussard**, étudiant en **1re année (L3 / S5) en Sciences du Numérique (SN)** à l'**ENSEEIHT** (Toulouse INP), après **La Prépa des INP (Toulouse)**.
- Ce site est mon **e-portfolio**, évalué dans le cours **CAM – Careers & Management** (Soft Skills Center).
- C'est un outil **sur 3 ans** (S5 → S10) : il sera enrichi chaque semestre (stages S6 et S8, mobilité, engagement RSE, jury PPP). Le code doit donc rester **simple à mettre à jour**.
- Tu m'aides sur le **code, la structure et le design**. Le **contenu** (textes sur moi) vient de moi.

## 2. Objectif n°1 du site

**Faire gagner du temps au lecteur** : en 30 secondes sur la page d'accueil, il doit savoir qui je suis, ce que je sais faire, ce que je cherche — plus vite qu'en lisant mon CV ou mon LinkedIn.
**Objectif n°2** : lui **donner envie d'en savoir plus** (cliquer sur un projet, regarder le pitch, me contacter).

Public : recruteurs (stages), enseignants et jury CAM, alumni N7 et professionnels rencontrés via My Job Glasses, responsables de mobilité internationale.

## 3. Ce qui est évalué (grille CAM, rendu Moodle ~1er novembre)

La section **Career Project** doit contenir :
- [x] CV en **anglais** et en **français** (PDF téléchargeables)
- [x] Lien LinkedIn (profil FR + EN)
- [x] **Vidéo pitch UVP** en anglais, 2–3 min (structure Now → Past → Future) : intégrée le 30/10/2026 (YouTube non répertoriée, EN `dAyk7xHxfz0`, FR `HO8VIEfHUTc`)
- [ ] **3 rôles modèles** analysés (My Job Glasses, LinkedIn, alumni)
- [ ] **3 projets de mobilité internationale** (sur le site, sans lien affiché avec les rôles modèles : décidé le 28/10/2026, alors que la grille CAM demande qu'ils soient alignés)

Critères de notation : complétude · clarté du projet professionnel · **cohérence de la marque personnelle** (UVP / CV / LinkedIn / pitch alignés) · qualité de l'anglais · présentation visuelle et navigation.

➡️ Priorité absolue : tous ces éléments **présents, visibles et accessibles en 1 ou 2 clics depuis l'accueil**.

État au 25/10/2026 : CV FR/EN, pitch et rendez-vous avec les 3 rôles modèles prévus la semaine du 26/10 ; les 3 mobilités sont en place depuis le 30/10/2026 (options à l'étude, échange de 6 mois en 2A, S8 : Imperial, Bologne, Milan, mention « à confirmer » à garder) ; le rôle modèle 3 aussi (My Job Glasses).

## 4. Structure du site (6 onglets obligatoires)

Une page HTML par onglet. Navigation identique sur toutes les pages, onglet actif mis en évidence.

| Fichier | Onglet | Contenu attendu |
|---|---|---|
| `index.html` | **Welcome** | Voir §5 (page la plus importante) |
| `engineering.html` | **Engineering Course** | Formation SN (cours clés, compétences), puis une carte par projet (format §6) |
| `mobility.html` | **International Mobility** | langues, 3 projets de mobilité (format §6), critères, autres pistes, prochaines étapes |
| `sustainability.html` | **Sustainability & Civic Engagement** | Engagement RSE : Fresque du Climat, Sulitest, projet d'équipe RSE + infographie (janvier), ODD concernés |
| `activities.html` | **Sport & Other Activities** | Rugby, musique (live coding), sports automobiles, nouvelles technologies — chacun avec ce que j'en retire (soft skills) |
| `career.html` | **Career Development** | Section **Career Project** complète (§3) : CV FR/EN, LinkedIn, vidéo, 3 rôles modèles, 3 mobilités, objectifs court/moyen/long terme (plans A/B/C). Sous-sections futures : stages |

**Le site est un tour de circuit** (refonte « Lap », validée le 27/10/2026, inspirée de landonorris.com sans en reprendre l'identité) :
- Les 6 onglets sont les **6 secteurs d'un tour**, dans un ordre fixe : S1 Welcome → S2 Engineering → S3 Mobility → S4 Sustainability → S5 Activities → S6 Career → retour à S1. Le numéro est dans `<html data-sector="n">`.
- **Tout le site se visite en défilant** (décidé le 28/10/2026, remplace l'ancienne règle « pas de scroll piégé ») : molette, trackpad, doigt, flèches ou Espace suffisent, sans cliquer. Les secteurs s'enchaînent toujours vers le bas, mais l'**axe de lecture alterne** : certains secteurs défilent verticalement, d'autres horizontalement (comme on avance sur un circuit), avec le même geste. Remonter marche dans l'autre sens. **Axes (décidé le 28/10/2026)** : S1 Welcome se lit **verticalement** (le test des 30 s) ; **S2 à S6 se lisent horizontalement** (Engineering, Mobility, Sustainability, Activities, Career) sur ordinateur et tablette ; **sur téléphone (< 768 px), tout le tour se lit verticalement** (décidé le 28/10/2026). Dans Engineering, les « Projects » sont le 4e panneau horizontal (décidé le 27/10/2026) : ce panneau (`panel--scroll`) défile à l’intérieur quand une carte est ouverte. **Architecture (a), validée le 28/10/2026** : voir §7.
- Exigences fixes : même geste partout ; swipe horizontal naturel sur tablette tactile dans les secteurs horizontaux ; jonctions fluides dans les deux sens ; URL propre à chaque onglet, mise à jour pendant le défilement, bouton Retour fonctionnel ; **aucun contenu caché** dans un panneau horizontal ; clavier, focus visible, lecteurs d'écran ; sans JavaScript ou avec `prefers-reduced-motion` : navigation classique par pages ; chaque onglet s'ouvre directement et on comprend où l'on est ; changements d'axe annoncés par un repère visuel clair.
- **Décisions du 28/10/2026 pour le défilement continu** :
  - fin du tour : on **s'arrête** sur la sortie de S6 et le footer (lien « Tour suivant → Welcome »), pas de boucle ;
  - le FR passe au défilement continu dès que ses 6 pages existent (fait le 28/10) : jamais de mélange de langues dans un même défilement ;
  - avant chaque secteur horizontal, l’ouverture du secteur (grand titre) sert d’écran de virage, **sans message** « This sector reads to the right » (retiré le 27/10/2026) : la jauge des panneaux suffit ; en sortie, un repère « ↓ secteur suivant » ;
  - lien direct vers un onglet (ex. `/career.html`) : la page s'affiche tout de suite et **tout le tour** est ajouté autour, sans faire bouger l'écran ;
  - panneaux : Engineering = Formation | Cours | Compétences | Projets ; Mobility = Langues | Projets | Critères | Autres pistes | Prochaines étapes ; Sustainability = Formations | Projet RSE | ODD ; Activities = une activité par panneau ; Career = CV & LinkedIn (titre masqué à l’écran, 28/10/2026) | Pitch | Rôles modèles | Mobilité | Calendrier | Plans A/B/C | À venir ;
  - si un panneau est trop vide (contenu < 55 % de la hauteur, ex. grand écran), le moteur agrandit tout son contenu avec `zoom` (jusqu'à ×1,6, sans dépasser 80 % de la hauteur ni la largeur de sa colonne) : décidé le 28/10/2026 ;
  - si un panneau ne tient pas à l'écran, le moteur le découpe en un groupe par panneau (cartes, groupes de cours…) ; s'il ne tient toujours pas (zoom, très petit écran), le secteur repasse en vertical et la raison est notée dans `data-stacked` sur le `.track` ;
  - en défilement continu, le sommaire de Career n'est plus collé en haut (il passerait sous les panneaux épinglés) ;
  - interrupteur **« Lecture classique »** (pages séparées, choix mémorisé) : dans le menu téléphone et **toujours visible en bas à droite** (retiré du footer le 28/10/2026) (au bout de la barre Contact sous 1280 px, icône seule sur téléphone ; petite pilule au-delà), décidé le 28/10/2026 ;
  - en défilement continu, la sortie de secteur devient une **bande de jonction** compacte ; le bloc complet reste en mode pages ;
  - la télémétrie et la 911 montrent le **tour entier** (6 repères de secteur) en défilement continu, la page en mode pages ;
  - sur téléphone, plus de défilement horizontal (28/10/2026) : chaque secteur se lit de haut en bas (`data-stacked="phone: vertical reading"` sur le `.track`).
- **Toujours visibles** : une barre « Me contacter » (e-mail, LinkedIn, GitHub, CV dans la langue de la page), l'indicateur du tour (6 secteurs, position actuelle, cliquable), le menu et FR/EN.
- Chaque page = **ouverture de secteur** (grand titre + ligne de données) → **chapitres** (§8) → **sortie de secteur** (secteur suivant / précédent + carte du tour), puis le footer.

## 5. Page d'accueil (`index.html`) — conçue pour être lue en 30 s

Dans cet ordre (ton de chaque chapitre entre parenthèses, voir §8) :
1. **Hero** (papier, plein écran sur ordinateur) : nom en très grand sur deux largeurs d’Archivo (« LOUP » large, gras (800), couleur du texte principal ; « BROUSSARD » large, léger (300), à 0,6×, en gris atténué : LOUP est le plus clair en thème sombre, le plus foncé en thème clair — 27/10/2026), sous-titre « Computer Science Engineering Student @ ENSEEIHT », ligne de données `43.60° N · 1.44° E — TOULOUSE`, UVP en 1 phrase, 3 boutons : `Watch my pitch` · `Download CV` (ouvre une pop-up `<dialog id="cv-dialog">` avec deux boutons, CV anglais / CV français, main.js §10 ; sans JS, télécharge le CV de la langue de la page : 28/10/2026) · `LinkedIn`. Portrait (source `assets/img/loup_img_site.jpeg`, 30/10/2026) **juste après « LOUP », à la hauteur du prénom**, discret (opacité 0,7, `saturate(0.7)`) : sur ordinateur et tablette, `assets/img/portrait.webp` **détouré** (rembg, fond transparent, lumière réchauffée et adoucie), sans cadre, bas fondu ; sur téléphone (< 768 px), photo **en rond classique** `assets/img/portrait-round.webp` (avec son fond d’origine). `<picture>` (dans le `<h1>`, `alt=""`) choisit l’image selon la largeur. Le hero n’a donc plus qu’une colonne (48rem), le plan moteur occupe la droite. Tout ce qui se lit en 30 s tient dans le **premier écran** (1280×720 et 375×667).
2. **At a glance** (encre, lu comme une fiche technique) : une liste courte « label → valeur » (4 à 6 lignes, sans icônes ni grille de fiches identiques) : formation, domaines (dev · embedded systems), langues (FR natif · EN B2 · allemand scolaire A2 · italien débutant A1), ce que je cherche, localisation (Toulouse · Nîmes).
3. **Featured / Start here** (papier) : une liste de 2–3 liens vers mes meilleurs contenus (ex. projet Strudel, pitch vidéo, projet SN) ; chaque ligne = métadonnée + titre + 1 ligne + « See … → ».
4. **Now** (sable) : ce sur quoi je travaille en ce moment (2–3 lignes, mis à jour chaque semestre).
(Ancien chapitre **Contact** : chapitre supprimé le 27/10/2026, remplacé par la pop-up « Contact » (voir §8, barre « Contact »).)
5. **Sortie de secteur** (encre) : secteur suivant (S2 Engineering), précédent (S6 Career), carte du tour.

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

**Projet Strudel (musique)** : projet d'équipe (5) à La Prépa des INP, 2026, « Science et musique » : piano enregistré, analyse de Fourier en Python, reprise de *Gypsy Woman* (Crystal Waters) en live coding sur Strudel. Mon rôle : développement Strudel (avec Victor) + recherche sur l'Algorave. Capture du code (avec visuels Hydra) : `assets/img/strudel.webp`, pleine largeur de la carte (`photo-slot--wide`). Rapport : `assets/docs/groupe_10_rapport_science_et_musique.pdf` ; notebook : https://observablehq.com/d/10a7e22d37d67443. Les samples piano sont hébergés par le dépôt séparé `loupbsd/music-project` (ne pas créer de dossier `music-project/` dans ce dépôt).

**Carte rôle modèle** : nom (ou initiales si pas d'accord de la personne), poste, entreprise, parcours en 3 étapes, comment je l'ai rencontré (My Job Glasses / LinkedIn / alumni), ce que j'en retiens pour mon projet.

**Carte mobilité** : destination, type (semestre, stage, double diplôme…), pourquoi, prérequis (langue, niveau). Pas de lien avec un rôle modèle (retiré le 28/10/2026).

**Cartes répétées** (projets, rôles modèles, mobilités) : coin supérieur droit **biseauté** (`corner-shape: bevel` ; coin simple dans les navigateurs qui ne le gèrent pas).

**Légendes « LIEU, ANNÉE »** : au-dessus de chaque photo et en tête des cartes projet ou formation, en IBM Plex Mono majuscules (ex. `LA PRÉPA DES INP, 2026`). Si je ne l'ai pas donnée : `[TO COMPLETE: LIEU, ANNÉE]`.

**Photos** : toujours dans leurs propres proportions (jamais recadrées ni étirées, quel que soit le mode ou l'écran) ; chaque photo est entourée d'un lien `<a class="photo-zoom" href="…">` qui l'ouvre en grand au clic (visionneuse, main.js §11), avec le crédit du photographe sous la photo si ce n'est pas moi (`.photo-slot__credit`). Les miennes uniquement (portrait, rugby, musique / DJ / Strudel, karting / sim / mécanique, N7), WebP < 150 Ko, `width`/`height`/`alt`, `loading="lazy"` sauf le portrait du hero. Pas de photos d'ambiance de banques d'images. Aucune image insérée sans mon accord ; en attendant, un **cadre visible « Photo à venir »** avec la légende `[TO COMPLETE: LIEU, ANNÉE]` (décidé le 28/10/2026). Exception au « jamais recadrées » : le portrait du hero (détouré sur ordinateur, rond sur téléphone, décidé le 30/10/2026). Photos de moi en place : `portrait.webp` (hero) et `assets/img/rugby.webp` (Activities, `TOULOUSE, 2026`, crédit shtbylly.com). Exception décidée le 28/10/2026 : en attendant mes propres photos, Activities montre deux images qui ne sont pas de moi, **sans légende** : `assets/img/daft-punk.jpg` (musique) et `assets/img/lotus-f1.jpg` (sport auto, Lotus de Senna) ; à remplacer dès que j'ai les miennes. Image d'aperçu LinkedIn `assets/img/og-image.jpg` : version typographique aux deux largeurs du hero (nom, sous-titre, ligne de données, plan moteur, tracé de télémétrie avec la 911, refaite le 30/10/2026), sans photo, ajoutée et référencée dans `og:image` (URL absolue, obligatoire pour Open Graph).

## 7. Choix techniques

- **HTML / CSS / JavaScript vanilla** uniquement. Pas de framework, pas de build, pas de dépendance npm.
- Arborescence :
  ```
  /
  ├── index.html, engineering.html, mobility.html, sustainability.html, activities.html, career.html   (anglais)
  ├── fr/                    (version française : mêmes noms de fichiers, chemins en ../)
  ├── css/style.css          (un seul fichier, variables CSS en haut)
  ├── js/lap.js              (sens du glissement entre deux pages ; chargé dans <head> SANS defer)
  ├── js/lap-scroll.js       (défilement continu : assemble les 6 pages, tronçons horizontaux, URL, clavier)
  ├── js/main.js             (menu, thème, télémétrie, navigation entre secteurs, pop-ups Contact et CV, visionneuse photo)
  ├── assets/img/            (photos compressées < 150 Ko en WebP : portrait.webp, portrait-round.webp, rugby.webp, strudel.webp (capture du code, 105 Ko) ; provisoires en JPEG : daft-punk.jpg, lotus-f1.jpg ; og-image.jpg ; dessins en SVG : favicon.svg, porsche-911.svg, engine-blueprint.svg, helmet-blueprint.svg, circuit.svg)
  ├── assets/docs/           (syllabus-enseeiht-sn.pdf, groupe_10_rapport_science_et_musique.pdf, cv_en_loup_broussard.pdf, cv_fr_loup_broussard.pdf)
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
- **Défilement continu** (mode principal, architecture (a) validée et construite le 28/10/2026, `js/lap-scroll.js`, CSS section 17) : les 6 pages HTML restent la **source** et la version complète de chaque onglet. Le JS charge les 5 autres pages et les met bout à bout dans la page ouverte (identifiants préfixés pour éviter les doublons), puis met à jour l'URL (`history.replaceState`) pendant le défilement ; un saut par le menu crée une entrée d'historique. On garde le défilement **natif** (pas de molette réimplémentée en JS) : les secteurs horizontaux sont épinglés (`position: sticky`) et le défilement vertical les fait avancer à l'horizontale. Les panneaux horizontaux ne contiennent que des blocs courts ; si un panneau dépasse la hauteur de l'écran (zoom, petit écran), il est d'abord découpé, puis son secteur repasse en vertical s'il ne tient toujours pas ; les panneaux trop vides sont agrandis (voir §4). Sur téléphone (< 768 px, même limite que le CSS), tous les secteurs restent verticaux. L'interrupteur « Lecture classique » (menu téléphone + coin bas droit, choix dans `localStorage` `lap-mode`) revient aux pages séparées. Le défilement continu ne démarre pas en `file://`.
- **Mode pages** (sans JS, avec `prefers-reduced-motion`, ou « Lecture classique ») : les 6 pages séparées, avec la DA « Lap », la barre de contact, la bande chrono et le glissement entre pages.
- **Pour ajouter du contenu** : on modifie toujours la page concernée (`career.html`…) ; le défilement continu la reprend automatiquement. Un nouveau panneau horizontal = une `<section class="chapter panel">` (ou `<article class="chapter panel">` dans Activities) de plus dans le `.track` d'un secteur S2 à S6 (blocs courts uniquement). Mettre à jour l'EN **et** le FR.
- **Tests** : vérifier une page dans les deux modes (continu et « Lecture classique »), à 375 et 1280 px.
- Google Fonts : `Archivo:wdth,wght@62..125,300..800` + `IBM Plex Mono:wght@400;500`.

## 8. Design — « Violet & Cream » : pro, chaleureux, sobre · mise en page « Lap »

- **Ambiance** : professionnelle, chaleureuse et sobre. Un site fait à la main par un étudiant ingénieur, pas un template ni un pastiche de terminal.
- **Chapitres** (refonte « Lap », 27/10/2026) : chaque section est un chapitre (`class="chapter" data-tone="…"`) dans l'un des **trois tons** : **papier** (crème, plan moteur bien visible), **sable** (chapitres denses), **encre** (chapitres sombres). Jamais deux tons identiques à la suite (sauf l'ouverture et le 1er chapitre). Rythme varié : plein écran → dense → aéré.
  - **Chapitres plein écran**, comme des diapositives (décidé le 28/10/2026) : chacun fait au moins la hauteur de l'écran, contenu centré ; les chapitres plus longs s'allongent. Exception : `chapter--compact` (bande courte, sans hauteur minimale) pour un chapitre de quelques lignes, utilisé par « Now » sur l’accueil (30/10/2026).
  - **Aimantation douce** (`scroll-snap-type: y proximity`) : quand le défilement s'arrête près du début d'un chapitre, la page l'aligne sous le header ; ailleurs le défilement reste libre. Jamais d'aimantation stricte. Coupée avec `prefers-reduced-motion`.
  - En passant d'un chapitre à l'autre, la couleur du suivant **monte en douceur** (animation CSS liée au défilement). Le texte n'arrive qu'une fois la couleur posée, grâce à la marge haute des chapitres.
  - Le header prend le ton du chapitre qui passe dessous.
  - Repli (navigateur sans support, ou `prefers-reduced-motion`) : bords nets.
- **Univers « course auto/moto & musique »** (validé le 25/10/2026, inspiré de bsrd.fr en plus sobre) : quelques détails précis, pas d'autre image décorative que le plan moteur et le casque ci-dessous.
  - **Tracé de télémétrie** en bas du header (**ligne droite** depuis le 28/10/2026, la 911 y glisse en douceur vers sa position au lieu de sauter ; bande de 8 px, dans une bande de 22–28 px réservée en bas du header pour ne jamais toucher les boutons — 27/10/2026) : se remplit en violet avec la progression de lecture, avec une **silhouette de Porsche 911 Carrera des années 80** (même violet) qui roule au bout de la partie violette, roues posées sur la courbe. Tracé dessiné par `js/main.js` (§5) ; la voiture vient de `assets/img/porsche-911.svg`, utilisé comme **masque CSS** (la couleur vient du CSS, donc du thème). Avec les dessins de fond (moteur, casque) et la bande chrono, ce sont les **trois seuls** éléments « signature » du site : ne pas ajouter d'autres effets.
  - **Plan moteur en fond de toutes les pages** (validé le 27/10/2026) : dessin technique d'un flat-six Porsche (`assets/img/engine-blueprint.svg`, cadre et cartouche « REF. » retirés, aucun logo). Une seule règle : `body::before` en `position: fixed` (section 2 de `style.css`), donc il reste en place pendant que la page défile par-dessus. Même technique que la 911 : **masque CSS**, couleur = accent du thème, opacité via `--blueprint-opacity` (~0,095 clair / 0,11 sombre, très léger flou dans les SVG : 30/10/2026 ; ×0,8 sur mobile), fondu vers la gauche pour qu'il se dissolve avant le texte. Placé à droite, sous le header. Les fonds de chapitre sont peints **en dessous** (section 13), donc il traverse tous les chapitres ; sur un chapitre encre, il passe en violet clair (`data-view-tone`, posé par main.js). Les blocs opaques (header, cartes, sommaire) le masquent. Statique, ne pas l'augmenter au point de gêner la lecture.
  - **Casque moto en fond à gauche, grands écrans seulement** (≥ 1440 px, décidé le 30/10/2026, pour remplir la marge vide) : `assets/img/helmet-blueprint.svg` (FIG. 1 extraite de `casque_zarco.svg`, autres figures et texte retirés, 84 Ko). Symétrique du moteur : `body::after` (+ `.track__pin::after` dans les secteurs horizontaux), masque CSS, même couleur et même opacité, à gauche après le rail Contact, fondu vers la droite.
  - **Bande chrono** : la nav du header montre les 6 secteurs S1–S6, avec une barre au-dessus de chaque onglet : violet = secteur en cours (comme le « secteur violet », meilleur temps en F1), gris = secteurs déjà passés, clair = à venir. Flèches ‹ › de part et d'autre. Sur mobile : `‹ S1/6 ›` (texte masqué sous 340 px) + bouton thème jour/nuit dans le header, à côté d'EN | FR (30/10/2026) + menu plein écran (6 secteurs en grand, carte du tour).
  - **Carte du tour** (`assets/img/circuit.svg`, tracé simplifié de Nevers Magny-Cours, choisi le 28/10/2026) : en haut de l’ouverture de chaque secteur S2–S6 (le secteur qui commence en couleur, décidé le 28/10/2026), dans la sortie de secteur et le menu mobile ; le secteur en cours est en violet.
  - **Mini-secteurs** : dans une page, les titres de section portent `S3.1`, `S3.2`… à **droite** (compteur CSS automatique ; le numéro de page vient de `data-sector`).
  - **Ligne de données** sous chaque grand titre : `43.60° N · 1.44° E — TOULOUSE` sur l'accueil, un résumé factuel tiré du contenu sur les autres pages.
- **Thème clair crème doux par défaut** (blanc crème moins jaune, jamais gris : 28/10/2026 ; couleurs de secteur assombries pour rester AA) ; thème sombre (« session de nuit ») si l'OS est en mode sombre, ou via le bouton (choix mémorisé).
- **Typographie** : **Archivo** pour tout le texte. Grands titres (nom du hero, h1) en **majuscules et en deux largeurs** : un mot large et gras (`font-stretch: 125%`, 800), l'autre étroit et fin (`62%`, 300), effet « livrée de course ». h2 élargis (125 %). **IBM Plex Mono** réservée aux *données* (tags, dates, légendes, secteurs, `[TO COMPLETE]`, code). 2 polices max, via Google Fonts ; pas de serif. **Une seule échelle de tailles** (décidé le 30/10/2026) : `--text-xs` 12 px (données) · `--text-sm` 14 · `--text-md` 16 (texte) · `--text-lg` 18–20 (accroches : UVP, intros, « Now », fiche) · `--text-xl` 24–28 (titres de section et d’élément) ; seuls le nom du hero, les titres d’ouverture et « Next sector » ont leur propre taille. Ne pas ajouter de taille sur mesure.
- **Couleur d'identité** : **violet** `#4D2DA0` sur fond clair, `#9670FF` sur fond sombre (plus violet et plus proche de celui du thème clair, fonds sombres moins bruns : 28/10/2026) — direction choisie le 25/10/2026 (remplace « Terminal Clean » cyan). Header, boutons, liens, barre de contact.
- **Couleurs de secteur** (28/10/2026, variables `--c-s1` … `--c-s6`) : elles ne colorent **que les repères de leur secteur** (barre du secteur en cours dans la bande chrono, tracé de la carte du tour, nom du « secteur suivant », plus tard le repère de changement d'axe). Jamais de fond ni de bouton colorés ; le violet reste la marque.
  | Secteur | Clair (AA sur crème et sable) | Sombre |
  |---|---|---|
  | S1 Welcome | violet `#4D2DA0` | `#9670FF` |
  | S2 Engineering | bleu télémétrie `#1B5699` | `#8DB8F0` |
  | S3 Mobility | vert piste `#285F38` | `#8FD1A0` |
  | S4 Sustainability | ocre `#704800` | `#E7B66A` |
  | S5 Activities | rouge `#972B26` | `#F09A8E` |
  | S6 Career | magenta `#A51D78` (teinte qu’aucun autre secteur n’utilise, 28/10/2026) | `#F27FC6` |
- **Barre « Contact »** (toujours visible, section 16 de `style.css`) : barre de 48 px en bas sous 1280 px (icônes seules sous 400 px), rail vertical dans la marge gauche au-delà. E-mail, LinkedIn, GitHub, CV (PDF de la langue de la page, ajouté le 30/10/2026). Le mot « Contact » (barre et footer, `data-contact`) ouvre une **pop-up** (`<dialog id="contact-dialog">`, main.js §9) avec e-mail et téléphone, non cliquables : un clic les **copie** dans le presse-papiers et affiche « Copied to clipboard » ; sans JS, il ouvre un e-mail.
- **Tons** (variables `--tone-*` en haut de `style.css`) :
  | Ton | Thème clair | Thème sombre | Texte · accent |
  |---|---|---|---|
  | papier | `#F1E6D2` (blanc cassé chaud) | `#151413` | clair : `#221C2B` · `#4D2DA0` — sombre : `#EFE8DA` · `#9670FF` |
  | sable | `#E9DDC6` | `#1D1B19` | idem papier |
  | encre | `#E2D3B5` (crème profond, texte foncé : aucun chapitre sombre en thème clair, 28/10/2026) | `#0C0B0A` | clair : `#221C2B` · `#4D2DA0` — sombre : `#EFE8DA` · `#9670FF` |
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
  - Placeholders visibles en français : `[À COMPLÉTER : …]` (au lieu de `[TO COMPLETE: …]`, 28/10/2026) ; les commentaires HTML restent en anglais. Pour tout retrouver : chercher `class="todo"`.

## 10. Règles de travail pour Claude

- **N'invente jamais de contenu sur moi** (projets, notes, expériences, compétences). Si une info manque, mets un placeholder visible `[TO COMPLETE: …]`.
- Avant une modification importante (structure, design global, nouvelle page), **explique ton plan et attends mon accord**.
- Fais des modifications **petites et ciblées** ; garde la navigation identique sur toutes les pages (si tu la modifies, modifie-la partout).
- Explique brièvement ce que tu as changé et pourquoi : je suis en SN, je veux comprendre le code.
- Pas de données personnelles sensibles sur le site : pas de téléphone ailleurs que dans la pop-up Contact (décidé le 27/10/2026), ni adresse, ni date de naissance.
- Messages de commit courts, en anglais, au présent (ex. `Add career project section`).
- Pour une refonte : **une étape = une page**. Après chaque étape, compte rendu court : captures (375 px et 1280 px), console sans erreur, poids de la page, contenu comparé à l'ancienne version (rien de perdu), navigation au clavier, alignement EN/FR. Puis attendre mon accord avant l'étape suivante.

## 11. Mes infos

- Nom : **Loup Broussard**
- Formation : ENSEEIHT — Sciences du Numérique (en anglais sur le site : « Computer Science »), 1re année (2026–2027) · avant : La Prépa des INP, Toulouse
- Email pro : loup.broussard@outlook.com
- LinkedIn : https://www.linkedin.com/in/loup-broussard-a6940b38b/ (EN : ?locale=en_US · FR : ?locale=fr_FR)
- GitHub : https://github.com/loupbsd
- Langues : Français (langue maternelle) · Anglais (B2) · Allemand (scolaire, A2) · Italien (débutant, A1)
- Localisation : Toulouse · Nîmes
- Domaines d'intérêt : développement logiciel, systèmes embarqués, nouvelles technologies (encore en exploration)
- Projets : « Science et musique » (prépa, 2026, live coding Strudel) · [TO COMPLETE: projets SN]
- Activités : rugby · musique · sports automobiles · nouvelles technologies
- UVP (1 phrase) : « First-year Computer Science engineering student who turns curiosity into code, looking for a software, systems or data internship in summer 2027. »
- Pistes de carrière (exploration, ouvert à tout) : plan A systèmes embarqués dans le sport auto/moto · plan B logiciel pour la musique électronique (DAW, outils DJ, synthés) · plan C chef de projet / product manager tech après quelques années
- 3 mots-clés de ma marque (choisis le 30/10/2026) : **Curious · Team player · Creative** (à reprendre à l'identique dans l'UVP, le CV, LinkedIn et le pitch ; en français : curieux · esprit d'équipe · créatif)
- Ce que je cherche : stage technique de 6 semaines minimum, entre le 7 juin et le 23 août 2027, en développement logiciel, systèmes ou data
