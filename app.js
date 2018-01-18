$( () => {

  const apiURL = "http://api.alperg.com/forms/";

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
    
    let table = $("#formsTable");
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
    let id = $(this).attr("data-id");
    console.log(id);
    
    $.ajax({
      url: apiURL + id,
      method: "GET"
    })
    .done(function(response){
      
      let formData = response[0];
      console.log(formData);

      let form = $("<form>");
      form.attr("role", "form");
      form.attr("action", formData.formSubmitUrl);
      form.attr("method", "get");
      form.addClass("form");

      let title = $("<div>");
      title.addClass("title");
      title.text(formData.formTitle);

      let elements = $("<div>");
      elements.addClass("elements");

      for (let i=0; i < formData.formFields.length; i++) {
        let elWrapper = $("<div>");
        elWrapper.addClass("el-wrapper");

        let label = $("<label>");
        label.text(formData.formFields[i].label + ": ");

        let el;
        if(formData.formFields[i].type === "text") {
          el = $("<input>");
          el.attr("type", "text");
        }
        else if (formData.formFields[i].type === "number"){
          el = $("<input>");
          el.attr("type", "number");
        }
        else if (formData.formFields[i].type === "textarea"){
          el = $("<textarea>");
          el.attr("rows", "4");
          el.attr("cols", "50");
        }

        el.attr('name', formData.formFields[i].name);

        elWrapper.append(label, el);
        elements.append(elWrapper);
      }

      let submitWrapper = $("<div>");
      submitWrapper.addClass("submit-wrapper");

      let submitBtn = $("<input>");
      submitBtn.attr("type", "submit");
      submitBtn.attr("value", "Submit");
      submitBtn.addClass("submit");

      submitWrapper.append(submitBtn);

      form.append(title, elements, submitWrapper);
      $(".formWrapper").empty();
      $(".formWrapper").append(form);
    })
  })

});