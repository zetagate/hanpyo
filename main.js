var clients = [
    { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue"},
    { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av."},
    { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St."},
    { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street"}
];

$(document).ready(function() {
  $("#jsGrid").jsGrid({
      height: "90%",
      width: "100%",

      sorting: true,
      paging: true,

      data: clients,

      fields: [
          { name: "Name", type: "text", width: 150 },
          { name: "Age", type: "number", width: 50 },
          { name: "Address", type: "text", width: 200 },
      ]
  });
});
