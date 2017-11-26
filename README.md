# Vefforritunarverkefni 2

Vefsíðan samanstendur af tveimur síðum: Forsíðu með lista af myndböndum, og vídjóspilara síðu þar sem hægt er að horfa á vídjó.

## Upplýsingar um hvernig keyra skuli verkefnið

Verkefnið er geymt á GitHub og notast skal við `git` til að sækja verkefnið og þegar gerðar eru breytingar.

Í verkefninu notum við `node.js`. Til að nota það þarf að setja það upp, og fara svo í `/gogn` möppuna (í command line, terminal eða öðru skipanalínuforriti) og nota `npm run dev` til að keyra síðuna. Ef til vill þarf fyrst að gera `npm install` til að sækja alls konar sem hægt er að nota, t.d. browser-sync, scss og babel.

Þegar unnið er í verkefninu skal keyra `npm run dev` og þá opnast vafri með vefsíðunni á localhost. Einnig munu allar skrár (.css og compiled_js skrár) uppfærast sjálfkrafa þegar javascript og Sass skjöl eru vistuð.

## Lýsing á uppsetningu verkefnis, hvernig því er skipt í möppur, hvernig CSS er skipulagt og fleira sem á við

Í rót verkefnisins er þessi README.md skrá, og tvær skrár með lýsingu á markmiði verkefnisins, annars vegar `stort-verkefni2.md` og hins vegar `stort-verkefni2.pdf`. Auk þess eru fjórar myndir með fyrirmynd um hvernig kennari hafi séð fyrir sér að vefsíðan ætti að líta út. Allur kóði síðunnar er svo í `/gogn` möppu.

Í `/gogn` möppu eru `package.json`, `.stylelintrc`, `.eslintrc.js`, `.babelrc` og svo allur html og javascript kóði fyrir síður verkefnisins. Útlit síðunnar er í `styles.css` skjali. Ath. að ekki skal eiga við `styles.css` beint, heldur eru allar stílbreytingar gerðar í `.scss` skrám (sjá neðar).

Í `/img` möppu eru myndir fyrir takka á spilara, og í `/videos` möppu eru öll vídjó síðunnar. Upplýsingar um myndbönd eru að finna í `videos.json` skrá.

Við notumst við SASS tæknina í þessu verkefni. Í `/scss` möppu er að finna allar `.scss` skrár sem við notum. Þegar `npm run dev` er keyrt í skipanalínu þá er hægt að gera breytingar í `.scss` skrám og þær breytingar færast sjálfkrafa í `styles.css` og birtast þar með á síðunni. Aldrei þarf að eiga beint við skjalið `styles.css`.

Við notum `lint` í css og javascript. Keyra skal `npm run lint -s` til að skoða hvort einhverjar `lint` reglur séu brotnar.

Einnig er hægt að nota ES2015, og `babel` sér um að compile-a öllum javascript skrám í `/gogn` möppu. Í möppunni `compiled_js` er að finna þær javascript skrár sem babel býr til.

## Upplýsingar um alla sem unnu verkefnið
Þeir sem unnu verkefnið eru:

### Birkir Freyr Guðbjartsson

HÍ email: bfg6@hi.is

GitHub Username: birkirfreyrg

### Ómar Páll Axelsson

HÍ email: opa2@hi.is

GitHub Username: omarpall

### Stefán Páll Sturluson

HÍ email: sps8@hi.is

GitHub Username: TheGuitarMonkey
