function firebaseCall() {
  $.ajax({
    url: "https://nss-viking-family.firebaseio.com/family.json",
    success: outputFamily
  });
}
$('#submit').click(function() {
  let newFamily = {
    "name": $("#name").val(),
    "age": $("#age").val(),
    "gender": $("#gender").val()
  }
  newFamily.skills = $("#skills").val().split(", ")
  $.ajax({
    url: "https://nss-viking-family.firebaseio.com/family.json",
    type: "POST",
    data: JSON.stringify(newFamily)
  }).done(function(KeyOfStuff){
    $("#name").val("");
    $("#age").val("");
    $("#gender").val("");
    $("#skills").val("");
    firebaseCall()
  })
})
function outputFamily(family) {
  string = ""
  console.log("family", family);
  for (let i in family) {
    string += `<section><div>Name: ${family[i].name}</div><div>Age: ${family[i].age}</div><div>Gender: ${family[i].gender}</div><div>Skills:</div><ul>`
    for (let j in family[i].skills) {
      string += `<li>${family[i].skills[j]}</li>`
    }
    string += `</ul><button id='delete${i}'>KILL</button></section>`
  }
  $("#output").html(string)
}
$('#output').click(function(e) {
  if (e.target.id.substring(0,6) === "delete") {
    deleteFamily(e.target.id.substring(6,e.target.id.length));
  }
});
function deleteFamily(id) {
  $.ajax({
    url: `https://nss-viking-family.firebaseio.com/family/${id}.json`,
    type: "DELETE"
  }).done(function(){
    firebaseCall();
  });
}
firebaseCall()