$(document).ready(function(){

  $('#addplace').on('click', function(){
    event.preventDefault();
    var address = $('#address').val()
    var latitude = $('#latitude').val()
    var longitude = $('#longitude').val()
    var newPlace = {address: address, longitude: longitude, latitude: latitude}
    $.ajax({
      type: 'POST',
      url: '/places',
      dataType: 'JSON',
      data: newPlace,
      success: function (data){
        console.log("success", data)
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })

})