$(document).ready(function(){
  $.getJSON('/places/data', function (data){
      for (var i = 0; i < data.length; i++){
        var addr = data[i].address
        var lat = data[i].latitude
        var lon = data[i].longitude
        $('#tbody').append('<tr><td>' + addr + '</td><td>' + lat + '</td><td>' + lon + '</td></tr>')
      }
  })

  $('#addplace').on('click', function(){
    event.preventDefault();
    var address = $('#address').val()
    var latitude = $('#latitude').val()
    var longitude = $('#longitude').val()
    var newPlace = { address: address, longitude: longitude, latitude: latitude}
    $.ajax({
      type: 'POST',
      url: '/places',
      dataType: 'JSON',
      data: newPlace,
      success: function (data){
        $('#tbody').append('<tr><td>' + data.address + '</td><td>' + data.latitude + '</td><td>' + data.longitude + '</td></tr>')
        console.log(data)
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })
})