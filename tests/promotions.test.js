// Pruebas del filtro de vigencia de promociones (compartido por web y chat).
import { test } from "node:test";
import assert from "node:assert/strict";
import promotions, { isVigente } from "../src/data/promotions.js";

test("isVigente: promo vencida se oculta", () => {
  assert.equal(isVigente({ dateISO: "2026-10-31" }, "2026-11-11"), false);
});

test("isVigente: promo futura se muestra", () => {
  assert.equal(isVigente({ dateISO: "2099-01-01" }, "2026-11-11"), true);
});

test("isVigente: promo sin fecha siempre vigente", () => {
  assert.equal(isVigente({ id: "x" }, "2030-01-01"), true);
});

test("isVigente: el día del vencimiento aún es vigente", () => {
  assert.equal(isVigente({ dateISO: "2026-10-31" }, "2026-10-31"), true);
});

test("las promociones registradas tienen campos mínimos y no repetidos", () => {
  const ids = promotions.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, "ids únicos");
  for (const p of promotions) {
    assert.ok(p.title, "título requerido");
    assert.ok(p.image, "imagen requerida");
    assert.match(p.dateISO ?? "", /^\d{4}-\d{2}-\d{2}$/, "dateISO con formato YYYY-MM-DD");
  }
});
