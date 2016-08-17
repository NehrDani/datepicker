(function() {
  var MONTHS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  var firstDay = 1;
  var month = 7;
  var year = 2016;
  var today = new Date();

  function setMonth (id) {
    month = parseInt(id);
    return month;
  }
  var datepick = createElement("div");
  datepick.classList.add("datepicker");
  var monthpick = createElement("div");
  monthpick.classList.add("datepicker");

  function renderMonthPicker () {
    var table = createElement("table");
    table.appendChild(createElement("thead"));
    table.appendChild(createElement("tbody"));

    var row, col, btn;
    var count = 0;

    for (var r = 0; r < 4; r++) {
      row = createElement("tr");
      for (var c = 0; c < 3; c++) {
        col = createElement("td");
        btn = createElement("button");
        btn.classList.add("pick-btn");
        btn.innerHTML = MONTHS[count];
        btn.setAttribute("month", count);
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          setMonth(this.getAttribute("month"));
          renderDatePicker();
        });
        col.appendChild(btn);
        row.appendChild(col);
        count++;
      }
      table.children[1].appendChild(row);
    }
    monthpick.appendChild(table);
  }

  function renderTableHead () {
    var prev, change, next;

    // <thead>
    var head = createElement("thead");
    // <tr>
    var row = createElement("tr");

    // <td>
    row.appendChild(createElement("td"));
    // <button type="button" class="pick-btn">&lt;</button>
    prev = createElement("button");
    prev.setAttribute("type", "button");
    prev.classList.add("pick-btn");
    prev.innerHTML = "&lt;";
    row.children[0].appendChild(prev);
    // </td>

    // <td colspan="5">
    row.appendChild(createElement("td"));
    row.children[1].setAttribute("colspan", 5);
    // <button type="button" class="pick-btn">{month}</button>
    change = createElement("button");
    change.classList.add("pick-btn");
    change.innerHTML = MONTHS[month];
    row.children[1].appendChild(change);
    // </td>

    // <td>
    row.appendChild(createElement("td"));
    // <button type="button" class="pick-btn">&gt;</button>
    next = createElement("button");
    next.classList.add("pick-btn");
    next.innerHTML = "&gt;";
    row.children[2].appendChild(next);
    // </td>

    head.appendChild(row);
    // </tr>
    // </thead>

    return head;
  }

  function renderDatePicker () {
    // var date = new Date();
    var start = 0;
    var days = getDaysInMonth(year, month);
    var before = new Date(year, month, 1).getDay();
    before -= firstDay;
    if (before < 0) {
      before += 7;
    } else if (before === 0) {
      start -= 7;
    }

    var table = createElement("table");
    table.appendChild(renderTableHead());
    table.appendChild(createElement("tbody"));
    var head = createElement("tr");
    var weekday;
    for (var w = 0; w < 7; w++) {
      weekday = createElement("th");
      weekday.innerHTML = getWeekday(w);
      head.appendChild(weekday);
    }
    table.children[1].appendChild(head);

    var row, col, btn;
    var day = 0;
    var m = 0, y = 0;

    row = createElement("tr");
    for (var i = start, r = 0; i < (42 + start); i++) {

      day = 1 + (i - before);
      col = createElement("td");

      btn = createElement("button");
      btn.classList.add("pick-btn");
      btn.classList.add("pick-day");
      if (i < before) {
        if (month === 0) {
          m = 11;
          y = year - 1;
        } else {
          m = month - 1;
        }
        day = getDaysInMonth(y, m) + day;
        btn.classList.add("out");
      } else if (i >= (days + before)) {
        if (month === 11) {
          m = 0;
          y = year + 1;
        } else {
          m = month + 1;
        }
        day = day - days;
        btn.classList.add("out");
      }

      if (today.getDate() === day && today.getFullYear() === year && today.getMonth() === month) {
        btn.classList.add("active");
      }

      btn.innerHTML = day;

      col.appendChild(btn);
      row.appendChild(col);
      if (++r === 7) {
        table.children[1].appendChild(row);
        row = createElement("tr");
        r = 0;
      }
    }

    datepick.innerHTML = "";
    datepick.appendChild(table);
  }

  renderDatePicker();
  renderMonthPicker();

  document.querySelector("main").appendChild(datepick);
  document.querySelector("main").appendChild(monthpick);

  function getDaysInMonth (year, month) {
    return month === 1 && year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
  }

  function getWeekday (i) {
    i += firstDay;
    while (i >= 7) {
      i -= 7;
    }
    return WEEKDAYS[i];
  }

  function createElement (element) {
    return document.createElement(element);
  }
})(window, document);