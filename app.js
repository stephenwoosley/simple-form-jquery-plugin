$( () => {

  const apiURL = "http://api.alperg.com/forms";

  function requestData() {
    $.ajax({
      url: apiURL,
      method: "GET"
    })
    .done( (response) => {
      console.log(response);
      renderTableBody(response);
      
    });
  }

  function renderTableBody(formData) {
    let table = $("#forms-table");
    let tbody = $("<tbody>");

    $.each(response, (index, form) => {
      let tr = $("<tr>");
      let idTd = $("<td>");
      idTd.text(form.formId);

      let nameTd = $("<td>");
      nameTd.text(form.formName);

      let btnTd = $("<td>");
      let btnRender = $("<button>").text("Render").addClass("render-button");

      btnTd.append(btnRender);

      tr.append(idTd, nameTd, btnTd);
      tbody.append(tr);
    });
    table.append(tbody);
  }

  requestData();

});