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

  function renderTableBody(response) {
    
    let table = $("#formsgetTable");
    let tbody = $("<tbody>");

    $.each(response, (index, form) => {
      let tr = $("<tr>");
      let idTd = $("<td>");
      console.log(idTd.text(form.formId));

      let nameTd = $("<td>");
      nameTd.text(form.formName);

      let btnTd = $("<td>");
      let btnRender = $("<button>").text("Render").addClass("render-button");
      btnRender.attr("data-id", form.formId);

      btnTd.append(btnRender);

      tr.append(idTd, nameTd, btnTd);
      tbody.append(tr);
    });
    table.append(tbody);
  }

  requestData();

  $(document).on("click", ".render-button", function() {
    console.log($(this).attr("data-id"));
    let id = $(this).attr("data-id");
    $.ajax({
      url: apiURL + id,
      method: "GET"
    })
    .done(function(response){
      console.log(response);
    })
  })

});