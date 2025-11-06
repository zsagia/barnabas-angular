# 🎓 Angular kurzus

## 🟢 1. óra – CLI alapok és parancsok részletesen

### 🎯 Cél
A tanuló értse meg, hogyan működik az Angular CLI, mik az alapvető parancsok és kapcsolók,  
és hogyan szerveződik egy frissen létrehozott Angular projekt.

---

### 📘 Tananyag

#### 🔹 1. Mi az Angular CLI? (15–20 perc)

Az **Angular CLI** (Command Line Interface) az Angular fejlesztők legfontosabb eszköze,  
amellyel gyorsan létrehozhatunk, futtathatunk, tesztelhetünk és buildelhetünk projekteket.

Telepítés (ha szükséges):

```bash
npm install -g @angular/cli


Verzió ellenörzése:

```bash
ng version
```

#### 🔹 2. Új projekt létrehozása

ng new my-first-app

Fontos kapcsolók:

| Kapcsoló       | Jelentés                                   |
| -------------- | ------------------------------------------ |
| `--standalone` | Modul nélküli, modern komponensalapú setup |
| `--routing`    | Routing modul automatikus generálása       |
| `--style=scss` | SCSS stíluslap formátum használata         |
| `--skip-tests` | Nem generál tesztfájlokat                  |
| `--minimal`    | Minimális projekt tartalom                 |

👉 Példa:

```bash
ng new student-app --standalone --routing --style=scss --skip-tests
```

Ez létrehoz egy minimalista, modern Angular projektet routinggal és SCSS-sel.

#### 🔹 3. Alapvető parancsok

| Parancs                 | Leírás                      | Példa                                             |
| ----------------------- | --------------------------- | ------------------------------------------------- |
| `ng serve`              | Fejlesztői szerver indítása | `ng serve --open` (automatikus böngészőnyitással) |
| `ng generate component` | Új komponens generálása     | `ng g c components/student-list --skip-tests`     |
| `ng generate service`   | Szolgáltatás létrehozása    | `ng g s services/student`                         |
| `ng build`              | Projekt lefordítása         | `ng build --configuration production`             |
| `ng add`                | Külső library hozzáadása    | `ng add @angular/material`                        |
| `ng generate guard`     | Útvonalvédő generálása      | `ng g guard auth`                                 |

#### 🔹 4. Projekt szerkezete (áttekintés)

```bash
src/
 ├─ app/
 │   ├─ app.component.ts       → fő komponens
 │   ├─ app.component.html
 │   ├─ app.routes.ts          → (ha routing engedélyezve)
 │   └─ app.config.ts          → bootstrap és konfiguráció
 ├─ assets/                    → statikus fájlok (képek, JSON-ok)
 ├─ environments/              → fejlesztési és éles környezeti beállítások
 └─ main.ts                    → alkalmazás belépési pontja
 ```

#### 🔹 4/b. Projekt szerkezete (modul alapú – `--standalone=false`)

Ha az Angular projektet **modul-alapú** módon hozod létre  
(pl. `ng new course-demo --routing --style=scss --standalone=false`),  
akkor a CLI létrehozza az **AppModule**-t, amely az alkalmazás belépési pontja.

A struktúra így néz ki:

```bash
src/
├─ app/
│ ├─ app.module.ts → fő modul, itt importáljuk a komponenseket és modulokat
│ ├─ app.component.ts → fő komponens (gyökér)
│ ├─ app.component.html → gyökér komponens sablonja
│ ├─ app-routing.module.ts → routing konfiguráció (ha engedélyezve)
│ ├─ components/ → további komponensek mappája
│ │ └─ student/
│ │ ├─ student.component.ts
│ │ ├─ student.component.html
│ │ └─ student.component.scss
│ └─ services/ → szolgáltatások (service osztályok)
├─ assets/ → statikus fájlok (képek, JSON-ok)
├─ environments/ → fejlesztési és éles környezeti beállítások
├─ main.ts → alkalmazás belépési pontja, itt bootstrappel az AppModule
├─ styles.scss → globális stílusok
└─ index.html → fő HTML fájl, ide ágyazódik be az Angular app
```

🏠 Házi feladat

Készíts egy új projektet student-manager néven, SCSS-sel és routinggal.

A kezdőoldalon jelenjen meg a neved és egy rövid bemutatkozás.

Készíts egy gombot, ami konzolra írja: "Angular CLI működik!".