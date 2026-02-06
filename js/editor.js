(function () {
  'use strict';

  var state = {
    mealTypes: [],
    proteins: [],
    meals: []
  };

  var editingMealTypeIndex = -1;
  var editingProteinIndex = -1;
  var editingMealIndex = -1;

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
        state.mealTypes = JSON.parse(JSON.stringify(json.mealTypes || []));
        state.proteins = JSON.parse(JSON.stringify(json.proteins || []));
        state.meals = JSON.parse(JSON.stringify(json.meals || []));
      });
  }

  function showForm(formId, show) {
    var el = document.getElementById(formId);
    if (el) el.classList.toggle('hidden', !show);
  }

  function updateOutput() {
    var out = {
      mealTypes: state.mealTypes,
      proteins: state.proteins,
      meals: state.meals
    };
    var textarea = document.getElementById('output-json');
    if (textarea) textarea.value = JSON.stringify(out, null, 2);
  }

  // ----- Meal types -----
  function renderMealTypesList() {
    var container = document.getElementById('meal-types-list');
    if (!container) return;
    container.innerHTML = '';
    state.mealTypes.forEach(function (t, i) {
      var row = document.createElement('div');
      row.className = 'editor-row';
      row.innerHTML = '<span class="editor-row-id">' + escapeHtml(t.id) + '</span> <span class="editor-row-label">' + escapeHtml(t.label) + '</span>';
      var editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn btn-text editor-btn';
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', function () { openMealTypeForm(i); });
      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn btn-text editor-btn editor-btn-del';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', function () { deleteMealType(i); });
      row.appendChild(editBtn);
      row.appendChild(delBtn);
      container.appendChild(row);
    });
    updateOutput();
  }

  function openMealTypeForm(index) {
    editingMealTypeIndex = index;
    var t = state.mealTypes[index];
    document.getElementById('meal-type-id').value = t.id;
    document.getElementById('meal-type-label').value = t.label;
    document.getElementById('meal-type-id').readOnly = true;
    showForm('meal-type-form', true);
  }

  function openNewMealTypeForm() {
    editingMealTypeIndex = -1;
    document.getElementById('meal-type-id').value = '';
    document.getElementById('meal-type-label').value = '';
    document.getElementById('meal-type-id').readOnly = false;
    showForm('meal-type-form', true);
  }

  function saveMealType() {
    var id = document.getElementById('meal-type-id').value.trim();
    var label = document.getElementById('meal-type-label').value.trim();
    if (!id || !label) return;
    if (editingMealTypeIndex >= 0) {
      state.mealTypes[editingMealTypeIndex].id = id;
      state.mealTypes[editingMealTypeIndex].label = label;
    } else {
      state.mealTypes.push({ id: id, label: label });
    }
    showForm('meal-type-form', false);
    renderMealTypesList();
  }

  function deleteMealType(index) {
    state.mealTypes.splice(index, 1);
    renderMealTypesList();
  }

  // ----- Proteins -----
  function renderProteinsList() {
    var container = document.getElementById('proteins-list');
    if (!container) return;
    container.innerHTML = '';
    state.proteins.forEach(function (p, i) {
      var row = document.createElement('div');
      row.className = 'editor-row';
      row.innerHTML = '<span class="editor-row-id">' + escapeHtml(p.id) + '</span> <span class="editor-row-label">' + escapeHtml(p.label) + '</span>';
      var editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn btn-text editor-btn';
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', function () { openProteinForm(i); });
      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn btn-text editor-btn editor-btn-del';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', function () { deleteProtein(i); });
      row.appendChild(editBtn);
      row.appendChild(delBtn);
      container.appendChild(row);
    });
    updateOutput();
  }

  function openProteinForm(index) {
    editingProteinIndex = index;
    var p = state.proteins[index];
    document.getElementById('protein-id').value = p.id;
    document.getElementById('protein-label').value = p.label;
    document.getElementById('protein-id').readOnly = true;
    showForm('protein-form', true);
  }

  function openNewProteinForm() {
    editingProteinIndex = -1;
    document.getElementById('protein-id').value = '';
    document.getElementById('protein-label').value = '';
    document.getElementById('protein-id').readOnly = false;
    showForm('protein-form', true);
  }

  function saveProtein() {
    var id = document.getElementById('protein-id').value.trim();
    var label = document.getElementById('protein-label').value.trim();
    if (!id || !label) return;
    if (editingProteinIndex >= 0) {
      state.proteins[editingProteinIndex].id = id;
      state.proteins[editingProteinIndex].label = label;
    } else {
      state.proteins.push({ id: id, label: label });
    }
    showForm('protein-form', false);
    renderProteinsList();
  }

  function deleteProtein(index) {
    state.proteins.splice(index, 1);
    renderProteinsList();
  }

  // ----- Meals -----
  function renderMealsList() {
    var container = document.getElementById('meals-list');
    if (!container) return;
    container.innerHTML = '';
    state.meals.forEach(function (m, i) {
      var row = document.createElement('div');
      row.className = 'editor-row';
      var fav = m.favorite ? ' <span class="favorite-icon" aria-hidden="true">♥</span>' : '';
      row.innerHTML = '<span class="editor-row-name">' + escapeHtml(m.name) + '</span>' + fav;
      var editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn btn-text editor-btn';
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', function () { openMealForm(i); });
      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn btn-text editor-btn editor-btn-del';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', function () { deleteMeal(i); });
      row.appendChild(editBtn);
      row.appendChild(delBtn);
      container.appendChild(row);
    });
    updateOutput();
  }

  function openMealForm(index) {
    editingMealIndex = index;
    var m = state.meals[index];
    document.getElementById('meal-name').value = m.name || '';
    document.getElementById('meal-favorite').checked = !!m.favorite;
    renderMealFormCheckboxes();
    var mealTypes = m.mealTypes || [];
    state.mealTypes.forEach(function (t, i) {
      var cb = document.getElementById('meal-form-mt-' + i);
      if (cb) cb.checked = mealTypes.indexOf(t.id) !== -1;
    });
    var proteins = m.proteins || [];
    state.proteins.forEach(function (p, i) {
      var cb = document.getElementById('meal-form-pr-' + i);
      if (cb) cb.checked = proteins.indexOf(p.id) !== -1;
    });
    showForm('meal-form', true);
  }

  function openNewMealForm() {
    editingMealIndex = -1;
    document.getElementById('meal-name').value = '';
    document.getElementById('meal-favorite').checked = false;
    renderMealFormCheckboxes();
    state.mealTypes.forEach(function (t, i) {
      var cb = document.getElementById('meal-form-mt-' + i);
      if (cb) cb.checked = false;
    });
    state.proteins.forEach(function (p, i) {
      var cb = document.getElementById('meal-form-pr-' + i);
      if (cb) cb.checked = false;
    });
    showForm('meal-form', true);
  }

  function renderMealFormCheckboxes() {
    var mtContainer = document.getElementById('meal-form-meal-types');
    var prContainer = document.getElementById('meal-form-proteins');
    if (!mtContainer || !prContainer) return;
    mtContainer.innerHTML = '';
    state.mealTypes.forEach(function (t, i) {
      var label = document.createElement('label');
      label.className = 'editor-checkbox-item';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = 'meal-form-mt-' + i;
      cb.dataset.id = t.id;
      label.appendChild(cb);
      label.appendChild(document.createTextNode(' ' + t.label));
      mtContainer.appendChild(label);
    });
    prContainer.innerHTML = '';
    state.proteins.forEach(function (p, i) {
      var label = document.createElement('label');
      label.className = 'editor-checkbox-item';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = 'meal-form-pr-' + i;
      cb.dataset.id = p.id;
      label.appendChild(cb);
      label.appendChild(document.createTextNode(' ' + p.label));
      prContainer.appendChild(label);
    });
  }

  function saveMeal() {
    var name = document.getElementById('meal-name').value.trim();
    if (!name) return;
    var mealTypeIds = [];
    state.mealTypes.forEach(function (t, i) {
      var cb = document.getElementById('meal-form-mt-' + i);
      if (cb && cb.checked) mealTypeIds.push(t.id);
    });
    var proteinIds = [];
    state.proteins.forEach(function (p, i) {
      var cb = document.getElementById('meal-form-pr-' + i);
      if (cb && cb.checked) proteinIds.push(p.id);
    });
    var favorite = document.getElementById('meal-favorite').checked;
    var meal = { name: name, mealTypes: mealTypeIds, proteins: proteinIds, favorite: favorite };
    if (editingMealIndex >= 0) {
      state.meals[editingMealIndex] = meal;
    } else {
      state.meals.push(meal);
    }
    showForm('meal-form', false);
    renderMealsList();
  }

  function deleteMeal(index) {
    state.meals.splice(index, 1);
    renderMealsList();
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getSaveMealsUrl() {
    var base = window.location.href.replace(/\/[^/]*$/, '');
    return base + '/save-meals.php';
  }

  function saveToServer() {
    var payload = {
      mealTypes: state.mealTypes,
      proteins: state.proteins,
      meals: state.meals
    };
    var statusEl = document.getElementById('save-server-status');
    var btn = document.getElementById('btn-save-server');
    function setStatus(msg, isError) {
      if (statusEl) {
        statusEl.textContent = msg;
        statusEl.className = 'editor-status' + (isError ? ' editor-status-error' : '');
      }
    }
    if (btn) btn.disabled = true;
    setStatus('Saving…', false);
    fetch(getSaveMealsUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.text().then(function (text) {
          var body = null;
          try { body = text ? JSON.parse(text) : null; } catch (e) {}
          return { status: res.status, body: body };
        });
      })
      .then(function (result) {
        if (result.status >= 200 && result.status < 300 && result.body && result.body.ok) {
          setStatus('Saved.', false);
        } else {
          var msg = (result.body && result.body.error) ? result.body.error : 'Save failed.';
          if (result.status >= 500) msg = 'Server error. Check PHP or file permissions.';
          setStatus(msg, true);
        }
      })
      .catch(function (err) {
        setStatus('Request failed. Is the app on a server with PHP?', true);
      })
      .finally(function () {
        if (btn) btn.disabled = false;
      });
  }

  function copyJsonToClipboard() {
    var textarea = document.getElementById('output-json');
    if (!textarea) return;
    textarea.select();
    try {
      document.execCommand('copy');
      var btn = document.getElementById('btn-copy-json');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = orig; }, 1500);
      }
    } catch (e) {
      try {
        navigator.clipboard.writeText(textarea.value);
        var b = document.getElementById('btn-copy-json');
        if (b) { b.textContent = 'Copied!'; setTimeout(function () { b.textContent = 'Copy to clipboard'; }, 1500); }
      } catch (e2) {}
    }
  }

  function bindEvents() {
    document.getElementById('btn-add-meal-type')?.addEventListener('click', openNewMealTypeForm);
    document.getElementById('btn-save-meal-type')?.addEventListener('click', saveMealType);
    document.getElementById('btn-cancel-meal-type')?.addEventListener('click', function () { showForm('meal-type-form', false); });

    document.getElementById('btn-add-protein')?.addEventListener('click', openNewProteinForm);
    document.getElementById('btn-save-protein')?.addEventListener('click', saveProtein);
    document.getElementById('btn-cancel-protein')?.addEventListener('click', function () { showForm('protein-form', false); });

    document.getElementById('btn-add-meal')?.addEventListener('click', openNewMealForm);
    document.getElementById('btn-save-meal')?.addEventListener('click', saveMeal);
    document.getElementById('btn-cancel-meal')?.addEventListener('click', function () { showForm('meal-form', false); });

    document.getElementById('btn-save-server')?.addEventListener('click', saveToServer);
    document.getElementById('btn-copy-json')?.addEventListener('click', copyJsonToClipboard);
  }

  function init() {
    bindEvents();
    loadData()
      .then(function () {
        renderMealTypesList();
        renderProteinsList();
        renderMealsList();
      })
      .catch(function (err) {
        var intro = document.querySelector('.editor-intro');
        if (intro) intro.textContent = 'Could not load data/meals.json. Run from a local server (e.g. python3 -m http.server 8000) or paste existing JSON into the Generated JSON box and edit from there.';
        updateOutput();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
