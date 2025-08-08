document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const date = document.getElementById("todo-date");
  const addBtn = document.getElementById("add-btn");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const filterBtn = document.getElementById("filter-btn"); // Opsional, jika digunakan
  const todoBody = document.getElementById("todo-body");
  const filterToggle = document.getElementById("filter-toggle");
  const filterMenu = document.getElementById("filter-menu");

  let todos = [];

  // Tampilkan/sembunyikan menu dropdown filter
  filterToggle.addEventListener("click", () => {
    filterMenu.style.display = filterMenu.style.display === "block" ? "none" : "block";
  });

  // Event untuk setiap item filter di menu dropdown
  filterMenu.querySelectorAll("div").forEach((item) => {
    item.addEventListener("click", () => {
      const filter = item.getAttribute("data-filter");
      terapkanFilter(filter);
      filterMenu.style.display = "none";
    });
  });

  // Filter manual berdasarkan kata kunci (jika tombol digunakan)
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const keyword = prompt("Filter berdasarkan kata:");
      if (!keyword) return;
      const hasilFilter = todos.filter((todo) => todo.text.toLowerCase().includes(keyword.toLowerCase()));
      tampilkanTodos(hasilFilter);
    });
  }

  // Tambahkan tugas baru
  addBtn.addEventListener("click", () => {
    const teks = input.value.trim();
    const tanggal = date.value;

    if (!teks || !tanggal) return;

    todos.push({ text: teks, dueDate: tanggal, completed: false });
    input.value = "";
    date.value = "";
    tampilkanTodos(todos);
  });

  // Hapus semua tugas
  deleteAllBtn.addEventListener("click", () => {
    todos = [];
    tampilkanTodos(todos);
  });

  // Tampilkan daftar tugas ke dalam tabel
  function tampilkanTodos(data) {
    todoBody.innerHTML = "";

    if (data.length === 0) {
      todoBody.innerHTML = `<tr><td colspan="4" class="empty">Tidak ada tugas ditemukan</td></tr>`;
      return;
    }

    data.forEach((todo, index) => {
      const row = document.createElement("tr");

      const taskCell = document.createElement("td");
      taskCell.textContent = todo.text;

      const dateCell = document.createElement("td");
      dateCell.textContent = todo.dueDate;

      const statusCell = document.createElement("td");
      statusCell.textContent = todo.completed ? "Selesai" : "Belum Selesai";
      statusCell.className = todo.completed ? "status-done" : "status-pending";

      const actionsCell = document.createElement("td");

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✔";
      completeBtn.className = "complete-btn";
      completeBtn.onclick = () => {
        todos[index].completed = !todos[index].completed;
        tampilkanTodos(todos);
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        todos.splice(index, 1);
        tampilkanTodos(todos);
      };

      actionsCell.appendChild(completeBtn);
      actionsCell.appendChild(deleteBtn);

      row.append(taskCell, dateCell, statusCell, actionsCell);
      todoBody.appendChild(row);
    });
  }

  // Terapkan filter dari menu dropdown
  function terapkanFilter(filter) {
    let hasilFilter = [];

    if (filter === "all") {
      hasilFilter = todos;
    } else if (filter === "pending") {
      hasilFilter = todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      hasilFilter = todos.filter((todo) => todo.completed);
    }

    tampilkanTodos(hasilFilter);
  }

  tampilkanTodos(todos);
});
