let input = document.querySelector("input");
let add_btn = document.querySelector(".add-btn");
let items_div = document.querySelector(".items");

// localStorage.removeItem("task");

let array_items = [];

get_items_local_storage(array_items);

show_items(array_items);

add_btn.addEventListener("click", function () {
  if (input.value != "" && input.value != null && input.value != " ") {
    add_items(array_items);
    console.log(array_items);
  }
  input.value = "";
});

function add_items(array_items) {
  let items_object = {
    id: Date.now(),
    title: input.value,
    complete: false,
  };

  array_items.push(items_object);

  add_div(items_object);

  add_items_local_storage(array_items);
}

function add_div(items_object) {
  let div = document.createElement("div");
  div.className = "task";
  div.setAttribute("id", items_object.id);

  if (items_object.complete) div.classList.add("done");

  let paragraph = document.createElement("p");
  paragraph.appendChild(document.createTextNode(items_object.title));

  let delete_btn = document.createElement("button");
  delete_btn.className = "delete";
  delete_btn.appendChild(document.createTextNode("Delete"));

  let done_btn = document.createElement("button");
  done_btn.className = "done-btn";
  done_btn.appendChild(document.createTextNode("Done"));

  div.appendChild(paragraph);
  div.appendChild(done_btn);
  div.appendChild(delete_btn);

  items_div.appendChild(div);

  delete_btn.addEventListener("click", function (e) {
    let new_storage = array_items.filter(
      (item) => item.id != e.target.parentElement.getAttribute("id")
    );

    add_items_local_storage(new_storage);

    array_items.length = 0;
    for (let i = 0; i < new_storage.length; i++) {
      array_items.push(new_storage[i]);
    }

    items_div.innerHTML = "";
    show_items(array_items);
  });

  done_btn.addEventListener("click", function (e) {
    array_items.forEach((item) => {
      if (item.id == e.target.parentElement.getAttribute("id")) {
        item.complete == false
          ? (item.complete = true)
          : (item.complete = false);

        add_items_local_storage(array_items);
        e.target.parentElement.classList.toggle("done");
      }
    });
  });
}

function add_items_local_storage(array_items) {
  localStorage.setItem("task", JSON.stringify(array_items));
}

function get_items_local_storage(array_items) {
  let data = localStorage.getItem("task");
  if (data) {
    var new_array_items = JSON.parse(data);

    array_items.length = 0;
    for (let i = 0; i < new_array_items.length; i++) {
      array_items.push(new_array_items[i]);
    }
  }
}

function show_items(array_items) {
  if (array_items.length > 0) {
    array_items.forEach((ele) => {
      add_div(ele);
    });
  }
}
