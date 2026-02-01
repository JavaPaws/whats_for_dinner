(function () {
  'use strict';

  var data = { mealTypes: [], proteins: [], meals: [] };
  var state = {
    step: 'options',
    mealTypeId: null,
    proteinId: null,
    favoritesOnly: false
  };

  var STEP_IDS = ['options', 'choices', 'result'];

  function getDataPath() {
    var pathname = window.location.pathname.replace(/\/$/, '') || '/';
    var base = pathname.endsWith('.html') ? pathname.replace(/\/[^/]*$/, '') : pathname === '/' ? '' : pathname;
    return (base ? base + '/' : '/') + 'data/meals.json';
  }

  function loadData() {
    return fetch(getDataPath())
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load meals data');
        return res.json();
      })
      .then(function (json) {
        data.mealTypes = json.mealTypes || [];
        data.proteins = json.proteins || [];
        data.meals = json.meals || [];
      });
  }

  function showStep(stepId) {
    state.step = stepId;
    STEP_IDS.forEach(function (id) {
      var el = document.getElementById('step-' + id);
      if (el) el.classList.toggle('hidden', id !== stepId);
    });
    if (stepId === 'options') renderOptions();
    if (stepId === 'choices') renderMealChoices();
    if (stepId === 'result') renderResult();
  }

  function renderOptions() {
    var mealTypeContainer = document.getElementById('meal-type-options');
    var proteinContainer = document.getElementById('protein-options');
    if (!mealTypeContainer || !proteinContainer) return;

    mealTypeContainer.innerHTML = '';
    data.mealTypes.forEach(function (t) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn' + (state.mealTypeId === t.id ? ' selected' : '');
      btn.textContent = t.label;
      btn.dataset.id = t.id;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var id = t.id;
        state.mealTypeId = state.mealTypeId === id ? null : id;
        renderOptions();
      });
      mealTypeContainer.appendChild(btn);
    });

    proteinContainer.innerHTML = '';
    data.proteins.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn' + (state.proteinId === p.id ? ' selected' : '');
      btn.textContent = p.label;
      btn.dataset.id = p.id;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var id = p.id;
        state.proteinId = state.proteinId === id ? null : id;
        renderOptions();
      });
      proteinContainer.appendChild(btn);
    });
  }

  function getFilteredMeals() {
    var list = data.meals;
    if (state.favoritesOnly) list = list.filter(function (m) { return m.favorite; });
    if (state.mealTypeId && state.mealTypeId !== 'any') {
      list = list.filter(function (m) {
        var types = m.mealTypes || [];
        return types.length === 0 || types.indexOf(state.mealTypeId) !== -1;
      });
    }
    if (state.proteinId && state.proteinId !== 'any') {
      list = list.filter(function (m) {
        var proteins = m.proteins || [];
        return proteins.length === 0 || proteins.indexOf(state.proteinId) !== -1;
      });
    }
    return list;
  }

  function renderMealChoices() {
    var container = document.getElementById('meal-choices');
    var filterCheckbox = document.getElementById('filter-favorites');
    if (!container) return;

    var list = getFilteredMeals();
    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = '<p class="step-intro">No meals match. Change type or protein above, or add more meals to <code>data/meals.json</code>.</p>';
      return;
    }

    list.forEach(function (meal) {
      var li = document.createElement('div');
      li.className = 'meal-item';
      var heart = document.createElement('span');
      heart.className = 'favorite-icon' + (meal.favorite ? '' : ' empty');
      heart.setAttribute('aria-hidden', 'true');
      heart.textContent = meal.favorite ? '\u2665' : '\u2661';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = meal.name;
      btn.addEventListener('click', function () {
        state.selectedMealName = meal.name;
        state.selectedMealFavorite = meal.favorite;
        showStep('result');
      });
      li.appendChild(heart);
      li.appendChild(btn);
      container.appendChild(li);
    });

    if (filterCheckbox) filterCheckbox.checked = state.favoritesOnly;
  }

  function renderResult() {
    var el = document.getElementById('result-meal');
    if (!el) return;
    var name = state.selectedMealName || 'Nothing picked';
    var favorite = state.selectedMealFavorite;
    el.innerHTML = '';
    if (favorite) {
      var heart = document.createElement('span');
      heart.className = 'favorite-icon';
      heart.setAttribute('aria-hidden', 'true');
      heart.textContent = '\u2665 ';
      el.appendChild(heart);
    }
    el.appendChild(document.createTextNode(name));
  }

  function pickRandom() {
    var list = getFilteredMeals();
    if (list.length === 0) return;
    var meal = list[Math.floor(Math.random() * list.length)];
    state.selectedMealName = meal.name;
    state.selectedMealFavorite = meal.favorite;
    showStep('result');
  }

  function bindEvents() {
    document.getElementById('btn-submit')?.addEventListener('click', function () {
      showStep('choices');
    });

    document.getElementById('btn-surprise-both')?.addEventListener('click', function () {
      if (data.mealTypes.length > 0) {
        state.mealTypeId = data.mealTypes[Math.floor(Math.random() * data.mealTypes.length)].id;
      }
      if (data.proteins.length > 0) {
        state.proteinId = data.proteins[Math.floor(Math.random() * data.proteins.length)].id;
      }
      renderOptions();
    });

    document.getElementById('btn-pick-for-me')?.addEventListener('click', pickRandom);

    document.getElementById('btn-back-choices')?.addEventListener('click', function () {
      showStep('options');
    });

    document.getElementById('filter-favorites')?.addEventListener('change', function () {
      state.favoritesOnly = this.checked;
      renderMealChoices();
    });

    document.getElementById('btn-start-over')?.addEventListener('click', function () {
      state.mealTypeId = null;
      state.proteinId = null;
      state.selectedMealName = null;
      state.selectedMealFavorite = false;
      showStep('options');
    });
  }

  function init() {
    bindEvents();
    loadData()
      .then(function () {
        renderOptions();
        showStep('options');
      })
      .catch(function (err) {
        var optionsEl = document.getElementById('step-options');
        if (optionsEl) {
          optionsEl.innerHTML = '<p class="step-intro">Could not load meal data. Make sure you\'re running from a server (e.g. python3 -m http.server 8000) and that data/meals.json exists.</p>';
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
