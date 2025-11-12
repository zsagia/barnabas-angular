# Class2 — Komponensek alapjai és ereje

Ez a mappa bemutat egy egyszerű, de szemléletes példát az Angular komponensek erősségére: összetett UI felépítése apró, újrahasználható komponensekből, valamint a szolgáltatások (services) és Observables használatát adatok megosztására.

Tartalom és elrendezés:

```
src/app/class2/
├─ components/
│  ├─ class2/              → `Class2Component` (parent)
│  │  ├─ class2.component.ts
│  │  ├─ class2.component.html
│  │  └─ class2.component.css
│  ├─ badge/               → `BadgeComponent` (presentational)
│  │  └─ badge.component.ts
│  ├─ todo-list/           → `TodoListComponent` (child list, emits events)
│  │  └─ todo-list.component.ts
│  └─ stats/               → `StatsComponent` (computes totals)
│     └─ stats.component.ts
├─ services/
│  └─ todo.service.ts      → `TodoService` exposes `todos$` observable and mutators
└─ README.md
```

Rövid összefoglaló — komponensek viselkedése (behaviors):

- Class2Component (parent)
  - Injektálja a `TodoService`-t és olvassa a `todos$` Observable-t a sablonban `todos$ | async`-szal.
  - Kezeli az `add`, `toggle`, `remove` műveleteket — azok a szolgáltatáson keresztül módosítják az állapotot.
  - Használja a `ChangeDetectionStrategy.OnPush`-ot a hatékonyabb változásdetektáláshoz.
  - `host` beállítással ad egy CSS osztályt (`class2-host`) a komponens gyökérelemének, így a stílusok egyszerűen célzottak.

- TodoListComponent (child)
  - Megjeleníti a `items: Todo[]` tömböt `*ngFor`-ral.
  - Nem módosít közvetlenül a szolgáltatás állapotát; `@Output()` eseményeket emittál:
    - `toggle` (payload: `{ index: number; checked: boolean }`)
    - `remove` (payload: `number`)
  - A parent (Class2Component) hallgat ezekre és továbbítja a hívásokat a `TodoService` felé.

- StatsComponent (child)
  - A parent-től kapott `items` tömb alapján számolja ki a `total`, `done`, `remaining` értékeket a komponens osztályában (nem a template-ben).
  - Ez segít elkerülni a komplex logikát a sablonban és javítja a tesztelhetőséget.

- BadgeComponent
  - Apró, prezentációs komponens, bemutatja a `@Input()` használatát (pl. `label`).

Különleges tulajdonságok és miért fontosak:

- `ChangeDetectionStrategy.OnPush`
  - Csak akkor frissíti a view-t, ha az `@Input` referenciája megváltozik, vagy ha az `async` pipe új értéket ad, illetve ha explicit változásjelzést adunk (`markForCheck`).
  - Előny: kevesebb felesleges render, jobb teljesítmény nagy komponensfák esetén.
  - Követelmény: immutábilis frissítések (például új tömb létrehozása `[...items, newItem]`) vagy Observable + `async` pipe használata.

- `ChangeDetectionStrategy.Default` (alapértelmezett változásdetektálás)
  - Az Angular a Default stratégia esetén minden változásérzékelési ciklusban lefuttatja a komponens és annak alárendelt komponenseinek ellenőrzését — ezek a ciklusok a zónában bekövetkező aszinkron események (user input, XHR, timer, Promise stb.) hatására indulnak el.
  - Működik mutable (helyben módosított) adatokkal is: ha például egy tömböt in-place módosítasz, a nézet frissül, mert a detektálási ciklus lefut.
  - Előny: egyszerűbb mentális modell, kevesebb megkötés az adatok kezelésére (nem kell mindig új példányt létrehozni).
  - Hátrány: nagy alkalmazásoknál vagy mély komponensfák esetén a gyakori teljes ellenőrzés teljesítményproblémákhoz vezethet — ilyenkor érdemes OnPush-ot, `trackBy`-t, komponens detach/attach-ot vagy más optimalizációkat alkalmazni.

- Mi a különbség röviden?
  - Default: gyakori, automatikus ellenőrzés — egyszerű, de potenciálisan költséges.
  - OnPush: ritkább, detektált referenciaváltozásokon alapuló ellenőrzés — nagyobb teljesítmény, de immutabilitási/observable mintázatot vár el.

### Mi számít "változásnak" a változásdetektálásban?

A változásdetektálás szempontjából "változás" általában az alkalmazás állapotának módosulását jelenti — például egy komponens tulajdonságának (`@Input`) értékének megváltozását vagy egy Observable új emitált értékét. Fontos különbségek:

- Referencia-változás: ha egy objektum vagy tömb referencia megváltozik (pl. új tömböt hozol létre `[...items, newItem]`), az OnPush és a Default is észleli a változást, de OnPush esetén ez különösen fontos (OnPush a referenciaváltozásra támaszkodik).
- In-place módosítás: ha egy tömböt vagy objektumot helyben módosítasz (pl. `items.push(x)`), az Default stratégia esetén a következő változásdetektálási ciklus frissíti a view-t, OnPush esetén viszont ez nem feltétlenül vált ki frissítést, hacsak nem történik további trigger (pl. Observable emit vagy `markForCheck`).
- Observable emit: ha az adat egy Observable-ból érkezik (például `BehaviorSubject`), az `async` pipe automatikusan triggereli a view frissítését, függetlenül a referenciaváltozástól.

Ez a rövid szemlélet segít megérteni, hogy mikor és miért reagálnak a komponensek a változásokra.

### Dependency Injection (DI) — mi ez és hogyan használjuk

A Dependency Injection (DI) az Angular egyik alapvető mechanizmusa, amelynek segítségével a komponensek és szolgáltatások külső függőségeket (például szolgáltatásokat) kapnak ahelyett, hogy maguk hoznák létre azokat. Lényeges pontok:

- Hogyan néz ki a gyakorlatban?
  - Szolgáltatás definiálása:

```ts
@Injectable({ providedIn: 'root' })
export class TodoService { /* ... */ }
```

  - Injektálás a komponensbe:

```ts
constructor(private todoService: TodoService) {}
```

- Mi történik mögötte?
  - Az Angular DI konténer (injector) létrehozza és kezeli a szolgáltatás példányát, és ugyanazt az instance-ot adja át minden olyan komponensnek/szolgáltatásnak, amelyet injektálunk (ha a szolgáltatás singletonként van regisztrálva, például `providedIn: 'root'`).

- Miért hasznos?
  - Egyértelmű felelősség-megosztás: a komponensek nem az állapot tárolásáért vagy források létrehozásáért felelősek, csak használják azokat.
  - Könnyebb tesztelhetőség: DI lehetővé teszi mock-ok és stub-ok beadását tesztekben.
  - Konfigurálhatóság: különböző provider konfigurációkkal más viselkedés adható ugyanannak a szolgáltatásnak különböző modulokban.

- Tippek a használathoz
  - Használd a szolgáltatást egyetlen forrásként az adatok számára (single source of truth).
  - Ha a szolgáltatásnak lokális élettartamot szeretnél (nem singleton), regisztráld azt egy modul `providers` tömbjében vagy egy komponens `providers` mezőjében.

Gyakorlati tippek és best practices

- Preferáld az Observable + `async` pipe mintázatot az adatok továbbítására a komponensek között — kevesebb kézi előfizetés és memória leak.
- Tartsd a megjelenítést és a logikát szétválasztva: gyermekkomponensek prezentációsak, parent kezeli az üzleti logikát.
- Használj immutábilis frissítéseket a tömbök/objektumok módosításakor, különösen OnPush esetén.
- Ha egy komponens nem frissül OnPush alatt, ellenőrizd, hogy:
  - az érték referenciája változik-e, vagy
  - `async` pipe-ot használsz-e, vagy
  - szükség esetén hívd meg a `ChangeDetectorRef.markForCheck()`-et.

Használat:

1. Regisztráld a komponenseket az `AppModule`-ban, vagy hozd létre a saját `Class2Module`-t és deklaráld ott.
2. Tedd be a sablonba: `<app-class2></app-class2>`

További lehetőségek:

- Kösd be a `TodoService`-t egy API-hoz vagy `localStorage`-hoz perzisztenciáért.
- Készíts külön feature modult (`Class2Module`) a komponensek izolálásához.
