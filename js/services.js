// Sección Servicios: demos de la agenda unificada de Lumi
// US-18 estado de ánimo · US-19 sincronización · US-20 CSV · US-21 crear actividad
// US-22 importancia · US-47 sugerencia de reprogramación
(function () {
  var section = document.getElementById('services');
  if (!section) return;

  /* ---------- Fechas ---------- */
  function toIso(date) {
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + m + '-' + d;
  }
  function fromIso(iso) {
    var p = iso.split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }
  function formatDay(iso) {
    return fromIso(iso).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  function formatLongDay(iso) {
    var date = fromIso(iso);
    return date.toLocaleDateString('es-PE', { weekday: 'long' }) + ' ' + date.getDate() + ' de ' +
      date.toLocaleDateString('es-PE', { month: 'long' }).toLowerCase();
  }

  // Semana de ejemplo: los próximos 7 días desde hoy, con la energía estimada según el ciclo
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var ENERGY = ['low', 'low', 'medium', 'high', 'high', 'high', 'medium'];
  var ENERGY_TEXT = { low: 'Energía baja', medium: 'Energía media', high: 'Energía alta' };
  var IMPORTANCE_TEXT = { high: 'Alta', medium: 'Media', low: 'Baja' };
  var week = ENERGY.map(function (energy, i) {
    return { date: toIso(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + i)), energy: energy };
  });
  function weekDay(i) { return week[i].date; }
  function energyOf(iso) {
    for (var i = 0; i < week.length; i++) if (week[i].date === iso) return week[i].energy;
    return null;
  }

  /* ---------- Datos ---------- */
  var nextId = 1;
  var events = [];
  function addEvent(data) {
    var event = {
      id: nextId++, name: data.name, date: data.date, start: data.start, end: data.end,
      importance: data.importance || 'medium', source: data.source || 'Lumi', keep: false
    };
    events.push(event);
    return event;
  }

  addEvent({ name: 'Presentación a cliente', date: weekDay(1), start: '10:00', end: '11:00', importance: 'high' });
  addEvent({ name: 'Ir al gimnasio', date: weekDay(2), start: '19:00', end: '20:00', importance: 'low' });

  var EXTERNAL = {
    work: [
      { name: 'Reunión de equipo', date: weekDay(0), start: '09:00', end: '10:00', importance: 'medium' },
      { name: 'Revisión de presupuesto', date: weekDay(3), start: '15:00', end: '16:00', importance: 'high' }
    ],
    university: [
      { name: 'Clase de Estadística', date: weekDay(0), start: '08:00', end: '10:00', importance: 'medium' },
      { name: 'Asesoría de tesis', date: weekDay(4), start: '11:00', end: '12:00', importance: 'high' }
    ]
  };
  var PROVIDER_NAME = { google: 'Google Calendar', outlook: 'Outlook' };
  var CALENDAR_NAME = { work: 'Trabajo', university: 'Universidad' };

  /* ---------- Utilidades de interfaz ---------- */
  function $(id) { return document.getElementById(id); }
  function say(id, text, isError) {
    var el = $(id);
    el.textContent = text;
    el.classList.toggle('services__status--error', Boolean(isError));
  }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /* ---------- Semana ---------- */
  function renderWeek() {
    var list = $('services-days');
    list.innerHTML = '';
    week.forEach(function (day) {
      var item = el('li', 'services__day services__day--' + day.energy);
      item.appendChild(el('span', 'services__day-name', formatDay(day.date)));
      item.appendChild(el('span', 'services__day-energy', ENERGY_TEXT[day.energy]));
      list.appendChild(item);
    });
  }

  /* ---------- Agenda (US-19, US-20, US-21, US-22) ---------- */
  function sortEvents() {
    events.sort(function (a, b) {
      return (a.date + a.start).localeCompare(b.date + b.start);
    });
  }

  function renderAgenda() {
    sortEvents();
    var list = $('agenda-list');
    list.innerHTML = '';
    events.forEach(function (event) {
      var item = el('li', 'services__item');
      item.dataset.importance = event.importance;

      var info = el('div', 'services__item-info');
      var when = el('p', 'services__item-when', formatDay(event.date) + ' · ' + event.start + '–' + event.end);
      var energy = energyOf(event.date);
      if (energy) {
        when.appendChild(el('span', 'services__energy services__energy--' + energy, ENERGY_TEXT[energy]));
      }
      info.appendChild(when);
      info.appendChild(el('p', 'services__item-name', event.name));
      info.appendChild(el('span', 'services__source', event.source));
      item.appendChild(info);

      var selectId = 'importance-' + event.id;
      var field = el('div', 'services__item-importance');
      var label = el('label', 'visually-hidden', 'Importancia de ' + event.name);
      label.setAttribute('for', selectId);
      var select = el('select', 'services__input services__select');
      select.id = selectId;
      select.dataset.id = event.id;
      ['high', 'medium', 'low'].forEach(function (value) {
        var option = el('option', '', IMPORTANCE_TEXT[value]);
        option.value = value;
        if (value === event.importance) option.selected = true;
        select.appendChild(option);
      });
      field.appendChild(label);
      field.appendChild(select);
      item.appendChild(field);

      list.appendChild(item);
    });
  }

  // US-22: cambiar la importancia sin perder el foco del select
  $('agenda-list').addEventListener('change', function (e) {
    if (!e.target.matches('select')) return;
    var id = Number(e.target.dataset.id);
    var event = events.filter(function (ev) { return ev.id === id; })[0];
    event.importance = e.target.value;
    event.keep = false;
    e.target.closest('li').dataset.importance = event.importance;
    say('agenda-status', '«' + event.name + '» ahora tiene importancia ' + IMPORTANCE_TEXT[event.importance].toLowerCase() + '.');
    renderReschedule();
  });

  function refresh() {
    renderAgenda();
    renderReschedule();
  }

  /* ---------- US-19: Google Calendar u Outlook ---------- */
  var imported = {};
  var syncForm = $('sync-form');
  syncForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var provider = (e.submitter && e.submitter.value) || 'google';
    var calendar = $('sync-calendar').value;
    var key = provider + '-' + calendar;
    var name = PROVIDER_NAME[provider];

    if (imported[key]) {
      say('sync-status', 'Ya importaste el calendario ' + CALENDAR_NAME[calendar] + ' de ' + name + '.');
      return;
    }
    say('sync-status', 'Conectando con ' + name + '…');
    syncForm.querySelectorAll('button').forEach(function (b) { b.disabled = true; });

    // Simula la autorización de la cuenta
    setTimeout(function () {
      imported[key] = true;
      EXTERNAL[calendar].forEach(function (data) {
        addEvent({ name: data.name, date: data.date, start: data.start, end: data.end, importance: data.importance, source: name });
      });
      syncForm.querySelectorAll('button').forEach(function (b) { b.disabled = false; });
      say('sync-status', 'Conectado. Se importaron ' + EXTERNAL[calendar].length + ' eventos de tu calendario ' + CALENDAR_NAME[calendar] + ' de ' + name + '.');
      refresh();
    }, 700);
  });

  /* ---------- US-20: importar horario desde CSV ---------- */
  function sampleCsv() {
    return [
      'nombre,fecha,inicio,fin',
      'Clase de Cálculo,' + weekDay(0) + ',08:00,10:00',
      'Examen parcial de Química,' + weekDay(1) + ',14:00,16:00',
      'Laboratorio de Física,' + weekDay(2) + ',10:00,12:00',
      'Clase de Programación,' + weekDay(3) + ',18:00,20:00'
    ].join('\n');
  }

  function normalizeDate(value) {
    var m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) {
      var dmy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); // formato de Excel: 15/11/2026
      if (!dmy) return null;
      m = [null, dmy[3], ('0' + dmy[2]).slice(-2), ('0' + dmy[1]).slice(-2)];
    }
    var date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (date.getMonth() !== Number(m[2]) - 1) return null;
    return m[1] + '-' + m[2] + '-' + m[3];
  }
  function normalizeTime(value) {
    var m = value.match(/^(\d{1,2}):(\d{2})$/);
    if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return null;
    return ('0' + m[1]).slice(-2) + ':' + m[2];
  }

  function importCsv(text) {
    var lines = text.replace(/^﻿/, '').split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
    if (lines.length && /^nombre/i.test(lines[0].trim())) lines.shift();
    if (!lines.length) {
      say('csv-status', 'El archivo está vacío.', true);
      return;
    }
    var rows = [];
    for (var i = 0; i < lines.length; i++) {
      var cells = lines[i].split(/[,;]/).map(function (c) { return c.trim(); });
      var rowNumber = i + 2;
      var date = normalizeDate(cells[1] || '');
      var start = normalizeTime(cells[2] || '');
      var end = normalizeTime(cells[3] || '');
      var problem = null;
      if (cells.length < 4 || !cells[0]) problem = 'le falta el nombre o alguna columna';
      else if (!date) problem = 'tiene una fecha no válida';
      else if (!start || !end) problem = 'tiene una hora no válida';
      else if (end <= start) problem = 'termina antes de empezar';
      if (problem) {
        say('csv-status', 'No se importó nada: la fila ' + rowNumber + ' ' + problem + '. Corrígela y vuelve a intentarlo.', true);
        return;
      }
      rows.push({ name: cells[0], date: date, start: start, end: end, source: 'Horario CSV' });
    }
    rows.forEach(addEvent);
    say('csv-status', 'Listo: se importaron ' + rows.length + ' actividades de tu horario.');
    refresh();
  }

  $('csv-file').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    if (!/\.csv$/i.test(file.name)) {
      say('csv-status', 'Elige un archivo con extensión .csv.', true);
      return;
    }
    var reader = new FileReader();
    reader.onload = function () { importCsv(String(reader.result)); };
    reader.readAsText(file);
    e.target.value = '';
  });

  var sampleUsed = false;
  $('csv-sample').addEventListener('click', function () {
    if (sampleUsed) {
      say('csv-status', 'Ya importaste el horario de ejemplo.');
      return;
    }
    sampleUsed = true;
    importCsv(sampleCsv());
  });

  $('csv-download').addEventListener('click', function () {
    var blob = new Blob(['﻿' + sampleCsv()], { type: 'text/csv;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'horario-lumi.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  });

  /* ---------- US-21 y US-22: crear actividad con importancia ---------- */
  var createForm = $('create-form');
  $('create-date').value = toIso(today);

  createForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = {
      name: $('create-name'), date: $('create-date'), start: $('create-start'), end: $('create-end')
    };
    Object.keys(fields).forEach(function (k) { fields[k].removeAttribute('aria-invalid'); });

    var error = null, invalid = null;
    if (!fields.name.value.trim()) { error = 'Escribe un nombre para la actividad.'; invalid = fields.name; }
    else if (!fields.date.value) { error = 'Elige una fecha.'; invalid = fields.date; }
    else if (!fields.start.value) { error = 'Indica la hora de inicio.'; invalid = fields.start; }
    else if (!fields.end.value) { error = 'Indica la hora de fin.'; invalid = fields.end; }
    else if (fields.end.value <= fields.start.value) { error = 'La hora de fin debe ser posterior a la de inicio.'; invalid = fields.end; }

    if (error) {
      invalid.setAttribute('aria-invalid', 'true');
      invalid.focus();
      say('create-status', error, true);
      return;
    }

    var importance = createForm.querySelector('input[name="importance"]:checked').value;
    var event = addEvent({
      name: fields.name.value.trim(), date: fields.date.value,
      start: fields.start.value, end: fields.end.value, importance: importance
    });
    say('create-status', 'Guardado: «' + event.name + '» el ' + formatLongDay(event.date) + ' a las ' + event.start + ', importancia ' + IMPORTANCE_TEXT[importance].toLowerCase() + '.');
    createForm.reset();
    $('create-date').value = toIso(today);
    refresh();
  });

  /* ---------- US-47: sugerencia de reprogramación ---------- */
  function findConflict() {
    sortEvents();
    return events.filter(function (ev) {
      return ev.importance === 'high' && !ev.keep && energyOf(ev.date) === 'low';
    })[0];
  }
  function alternatives(event) {
    return week.filter(function (day) {
      return day.energy === 'high' && day.date !== event.date;
    }).slice(0, 2).map(function (day) { return day.date; });
  }

  function renderReschedule() {
    var body = $('reschedule-body');
    body.innerHTML = '';
    var event = findConflict();

    if (!event) {
      body.appendChild(el('p', 'services__ok', 'No hay actividades de importancia alta en tus días de energía baja. ¡Tu semana está bien equilibrada!'));
      body.appendChild(el('p', '', 'Prueba crear una actividad con importancia alta en un día de energía baja.'));
      return;
    }

    var message = el('p');
    message.appendChild(document.createTextNode('«'));
    message.appendChild(el('strong', '', event.name));
    message.appendChild(document.createTextNode('» (importancia alta) cae el ' + formatLongDay(event.date) + ', un día de energía baja. ¿Quieres moverla?'));
    body.appendChild(message);

    var form = el('form', 'services__form');
    var fieldset = el('fieldset', 'services__fieldset');
    fieldset.appendChild(el('legend', 'services__label', 'Elige una opción'));
    var options = el('div', 'services__choices');

    var choices = alternatives(event).map(function (date) {
      return { value: date, text: 'Mover al ' + formatLongDay(date) + ' (energía alta)' };
    });
    choices.push({ value: 'keep', text: 'Mantener la fecha original' });

    choices.forEach(function (choice, i) {
      var label = el('label', 'services__option services__option--block');
      var input = el('input');
      input.type = 'radio';
      input.name = 'reschedule';
      input.value = choice.value;
      if (i === 0) input.checked = true;
      label.appendChild(input);
      label.appendChild(document.createTextNode(' ' + choice.text));
      options.appendChild(label);
    });
    fieldset.appendChild(options);
    form.appendChild(fieldset);
    form.appendChild(el('button', 'button button--dark', 'Confirmar'));
    form.lastChild.type = 'submit';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var choice = form.querySelector('input[name="reschedule"]:checked').value;
      if (choice === 'keep') {
        event.keep = true;
        say('reschedule-status', 'Mantuviste «' + event.name + '» en su fecha original.');
      } else {
        event.date = choice;
        say('reschedule-status', 'Listo: «' + event.name + '» se movió al ' + formatLongDay(choice) + ' a las ' + event.start + '.');
      }
      refresh();
      $('reschedule-title').setAttribute('tabindex', '-1');
      $('reschedule-title').focus();
    });

    body.appendChild(form);
  }

  /* ---------- US-18: estado de ánimo ---------- */
  var moods = [
    { date: toIso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)), mood: 'Tranquila' },
    { date: toIso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)), mood: 'Cansada' }
  ];

  function renderMoods() {
    var list = $('mood-history');
    list.innerHTML = '';
    moods.forEach(function (record) {
      var isToday = record.date === toIso(today);
      var item = el('li', 'services__history-item');
      item.appendChild(el('span', 'services__history-date', (isToday ? 'Hoy, ' : '') + formatDay(record.date)));
      item.appendChild(el('span', 'services__history-mood', record.mood));
      list.appendChild(item);
    });
  }

  $('mood-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var checked = e.target.querySelector('input[name="mood"]:checked');
    if (!checked) {
      say('mood-status', 'Elige cómo te sientes antes de guardar.', true);
      return;
    }
    var todayIso = toIso(today);
    var existing = moods.filter(function (m) { return m.date === todayIso; })[0];
    if (existing) existing.mood = checked.value;
    else moods.unshift({ date: todayIso, mood: checked.value });
    say('mood-status', 'Guardado: hoy te sientes ' + checked.value.toLowerCase() + '.');
    renderMoods();
  });

  /* ---------- Inicio ---------- */
  renderWeek();
  refresh();
  renderMoods();
})();
