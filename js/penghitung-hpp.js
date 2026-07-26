let ingredients = [];
let totalHPP = 0;
let selectedTier = null;
let selectedPrice = 0;

function formatRp(num) {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

function formatThousandsInput(el) {
  const digits = String(el.value).replace(/\D/g, "");
  const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (el.value !== formatted) {
    el.value = formatted;
    el.setSelectionRange(formatted.length, formatted.length);
  }
}

function parseThousandsNumber(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function roundPrice(val) {
  return Math.ceil(val / 500) * 500;
}

function startApp() {
  const name = document.getElementById("product-name").value.trim();
  if (!name) {
    document.getElementById("product-name").focus();
    document.getElementById("product-name").style.borderColor = "var(--danger)";
    setTimeout(() => {
      document.getElementById("product-name").style.borderColor = "";
    }, 1200);
    return;
  }
  document.getElementById("product-display").textContent = name;
  document.getElementById("step-product").style.display = "none";
  document.getElementById("main-content").classList.add("visible");
  document.getElementById("item-name").focus();
}

document.getElementById("product-name").addEventListener("keydown", (e) => {
  if (e.key === "Enter") startApp();
});

const steps = document.querySelector(".steps");
const mobileLayoutQuery = window.matchMedia("(max-width: 600px)");

function updateStepsLayout() {
  if (!steps) return;
  steps.classList.toggle("is-mobile", mobileLayoutQuery.matches);
}

mobileLayoutQuery.addEventListener("change", updateStepsLayout);
updateStepsLayout();

function addIngredient() {
  const nameEl = document.getElementById("item-name");
  const costEl = document.getElementById("item-cost");
  const name = nameEl.value.trim();
  const cost = parseThousandsNumber(costEl.value);

  if (!name || isNaN(cost) || cost < 0) {
    if (!name) {
      nameEl.focus();
      nameEl.style.borderColor = "var(--danger)";
      setTimeout(() => (nameEl.style.borderColor = ""), 1000);
    } else {
      costEl.focus();
      costEl.style.borderColor = "var(--danger)";
      setTimeout(() => (costEl.style.borderColor = ""), 1000);
    }
    return;
  }

  ingredients.push({ name, cost });
  nameEl.value = "";
  costEl.value = "";
  nameEl.focus();
  renderIngredients();
  updateHPP();
}

document.getElementById("item-cost").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addIngredient();
});
document.getElementById("item-name").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("item-cost").focus();
});

function removeIngredient(i) {
  ingredients.splice(i, 1);
  renderIngredients();
  updateHPP();
}

function renderIngredients() {
  const ul = document.getElementById("ingredient-list");
  ul.innerHTML = "";
  ingredients.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "ingredient-item";
    li.innerHTML = `
        <span class="ingredient-name">${item.name}</span>
        <span>${formatRp(item.cost)}</span>
        <button class="btn-remove" onclick="removeIngredient(${i})" title="Hapus">✕</button>
      `;
    ul.appendChild(li);
  });
}

function updateHPP() {
  totalHPP = ingredients.reduce((sum, i) => sum + i.cost, 0);
  document.getElementById("hpp-value").textContent = formatRp(totalHPP);

  if (totalHPP > 0) {
    renderTiers();
  } else {
    hideTiers();
    hidePricingSection();
    hideResult();
  }

  syncProgressStep();
}

function renderTiers() {
  const pMurah = roundPrice(totalHPP / 0.65);
  const pStandar = roundPrice(totalHPP / 0.5);
  const pPremium = roundPrice(totalHPP / 0.3);

  document.getElementById("price-murah").textContent = formatRp(pMurah);
  document.getElementById("price-standar").textContent = formatRp(pStandar);
  document.getElementById("price-premium").textContent = formatRp(pPremium);

  const marginMurah = Math.round(((pMurah - totalHPP) / pMurah) * 100);
  const marginStandar = Math.round(((pStandar - totalHPP) / pStandar) * 100);
  const marginPremium = Math.round(((pPremium - totalHPP) / pPremium) * 100);

  document.getElementById("margin-murah").textContent =
    `Margin kotor: ${marginMurah}%  ·  Laba: ${formatRp(pMurah - totalHPP)}/pcs`;
  document.getElementById("margin-standar").textContent =
    `Margin kotor: ${marginStandar}%  ·  Laba: ${formatRp(pStandar - totalHPP)}/pcs`;
  document.getElementById("margin-premium").textContent =
    `Margin kotor: ${marginPremium}%  ·  Laba: ${formatRp(pPremium - totalHPP)}/pcs`;

  document.getElementById("tier-empty").style.display = "none";
  document.getElementById("tier-grid").style.display = "flex";

  if (selectedTier) {
    const prices = {
      murah: pMurah,
      standar: pStandar,
      premium: pPremium,
    };
    selectedPrice = prices[selectedTier];
    document.getElementById("selected-price-display").textContent =
      formatRp(selectedPrice);
    calculateResult();
  }
}

function hideTiers() {
  document.getElementById("tier-empty").style.display = "block";
  document.getElementById("tier-grid").style.display = "none";
  selectedTier = null;
  selectedPrice = 0;
  ["murah", "standar", "premium"].forEach((t) =>
    document.getElementById(`tier-${t}`).classList.remove("selected"),
  );
}

function syncSelectedPrice() {
  const manualInput = document.getElementById("manual-price");
  const manualValue = parseThousandsNumber(manualInput.value);
  const hasManualPrice =
    manualInput.value.trim() !== "" &&
    !isNaN(manualValue) &&
    manualValue > 0;

  if (hasManualPrice) {
    selectedPrice = manualValue;
    document.getElementById("selected-price-display").textContent =
      formatRp(selectedPrice);
    ["murah", "standar", "premium"].forEach((t) =>
      document.getElementById(`tier-${t}`).classList.remove("selected"),
    );
    return selectedPrice;
  }

  if (selectedTier) {
    const priceMap = {
      murah: roundPrice(totalHPP / 0.65),
      standar: roundPrice(totalHPP / 0.5),
      premium: roundPrice(totalHPP / 0.3),
    };
    selectedPrice = priceMap[selectedTier];
    ["murah", "standar", "premium"].forEach((t) => {
      document
        .getElementById(`tier-${t}`)
        .classList.toggle("selected", t === selectedTier);
    });
  } else {
    selectedPrice = 0;
    ["murah", "standar", "premium"].forEach((t) =>
      document.getElementById(`tier-${t}`).classList.remove("selected"),
    );
  }

  document.getElementById("selected-price-display").textContent =
    selectedTier ? formatRp(selectedPrice) : "—";
  return selectedPrice;
}

function updateManualPrice() {
  syncSelectedPrice();
  calculateResult();
  syncProgressStep();
}

function selectTier(tier) {
  selectedTier = tier;
  document.getElementById("manual-price").value = "";
  syncSelectedPrice();

  document.getElementById("section-target").classList.add("visible");
  document.getElementById("target-profit").focus();
  syncProgressStep();

  calculateResult();

  document
    .getElementById("section-target")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function calculateResult() {
  syncSelectedPrice();

  const targetProfit = parseThousandsNumber(
    document.getElementById("target-profit").value,
  );
  if (
    !selectedPrice ||
    selectedPrice <= 0 ||
    !targetProfit ||
    targetProfit <= 0
  ) {
    hideResult();
    syncProgressStep();
    return;
  }

  const profitPerpcs = selectedPrice - totalHPP;
  if (profitPerpcs <= 0) {
    hideResult();
    return;
  }

  const monthlyVolume = targetProfit / profitPerpcs;
  const dailyVolume = Math.ceil(monthlyVolume / 30);
  const monthlyRevenue = monthlyVolume * selectedPrice;

  document.getElementById("result-daily").textContent =
    `${dailyVolume.toLocaleString("id-ID")} pcs / Hari`;
  document.getElementById("result-tagline").textContent =
    `untuk mencapai ${formatRp(targetProfit)} laba bersih bulan ini!`;

  document.getElementById("res-hpp").textContent = formatRp(totalHPP);
  document.getElementById("res-price").textContent = formatRp(selectedPrice);
  document.getElementById("res-profit-pcs").textContent = formatRp(profitPerpcs);
  document.getElementById("res-monthly-vol").textContent =
    `${Math.ceil(monthlyVolume).toLocaleString("id-ID")} pcs`;
  document.getElementById("res-revenue").textContent = formatRp(monthlyRevenue);
  document.getElementById("res-profit").textContent = formatRp(targetProfit);

  showResult();
  syncProgressStep();
}

function showResult() {
  const el = document.getElementById("section-result");
  el.classList.add("visible");
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideResult() {
  document.getElementById("section-result").classList.remove("visible");
}

function hidePricingSection() {
  document.getElementById("section-target").classList.remove("visible");
}

function syncProgressStep() {
  syncSelectedPrice();

  if (totalHPP <= 0) {
    updateStepIndicator(2);
    return;
  }

  const targetProfit = parseThousandsNumber(
    document.getElementById("target-profit").value,
  );

  if (!selectedPrice || selectedPrice <= 0) {
    updateStepIndicator(3);
  } else if (!targetProfit || targetProfit <= 0) {
    updateStepIndicator(4);
  } else {
    updateStepIndicator(5);
  }
}

function updateStepIndicator(activeStep) {
  for (let s = 1; s <= 5; s++) {
    const dot = document.getElementById(`step-dot-${s}`);
    const lbl = document.getElementById(`step-lbl-${s}`);
    const line = document.getElementById(`step-line-${s}`);

    dot.classList.remove("active", "done");
    lbl.classList.remove("active");
    if (line) line.classList.remove("done");

    if (s < activeStep) {
      dot.classList.add("done");
      dot.textContent = "✓";
      if (line) line.classList.add("done");
    } else if (s === activeStep) {
      dot.classList.add("active");
      dot.textContent = s;
      lbl.classList.add("active");
    } else {
      dot.textContent = s;
    }
  }
}

function resetApp() {
  ingredients = [];
  totalHPP = 0;
  selectedTier = null;
  selectedPrice = 0;

  document.getElementById("ingredient-list").innerHTML = "";
  document.getElementById("hpp-value").textContent = "Rp 0";
  document.getElementById("item-name").value = "";
  document.getElementById("item-cost").value = "";
  document.getElementById("target-profit").value = "";
  document.getElementById("manual-price").value = "";
  document.getElementById("product-name").value = "";

  hideTiers();
  hidePricingSection();
  hideResult();
  syncProgressStep();

  document.getElementById("main-content").classList.remove("visible");
  document.getElementById("step-product").style.display = "block";
  document.getElementById("product-name").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".tier-card").forEach((card) => {
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});
