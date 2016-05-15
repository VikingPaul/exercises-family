var familyArray = []
var keyArray = []
$.ajax({
  url: "https://nss-viking-family.firebaseio.com/family.json",
  success: createArray
});
function createArray(family) {
  for (let i in family) {
    familyArray.push(family[i])
    keyArray.push(i)
  }
  outputFamily()
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
    console.log("it saved");
    familyArray.push(newFamily)
    keyArray.push(KeyOfStuff)
    $("#name").val("");
    $("#age").val("");
    $("#gender").val("");
    $("#skills").val("");
    outputFamily()
  })
})
function outputFamily() {
  string = ""
  for (let i in familyArray) {
    string += `<section><div>Name: ${familyArray[i].name}</div><div>Age: ${familyArray[i].age}</div><div>Gender: ${familyArray[i].gender}</div><div>Skills:</div><ul>`
    for (let j in familyArray[i].skills) {
      string += `<li>${familyArray[i].skills[j]}</li>`
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
function deleteFamily(num) {
  $.ajax({
    url: `https://nss-viking-family.firebaseio.com/family/${keyArray[num]}.json`,
    type: "DELETE"
  }).done(function(){
    familyArray.splice(num,1);
    keyArray.splice(num,1);
    outputFamily();
  });
}