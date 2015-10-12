$(document).ready(function(){
  $.getJSON('/places/data', function (data){
      for (var i = 0; i < data.length; i++){
        var addr = data[i].address
        var lat = data[i].latitude
        var lon = data[i].longitude
        $('#tbody').append('<tr><td>' + addr + '</td><td>' + lat + '</td><td>' + lon + '</td><td><button class="delete">X</button></td></tr>')
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
        $('#tbody').append('<tr><td>' + data.address + '</td><td>' + data.latitude + '</td><td>' + data.longitude + '</td><td><button class="delete">X</button></td></tr>')
        console.log(data)
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })

  $('tbody').on('click', 'td button', function (){
    var address = $
    var delconfirm = confirm('Do you wish to delete this location?')
    if (delconfirm === true){
      $.ajax({
        type: 'DELETE',
        url: '/delete',
        success: function (data){
          console.log(data)
        },
        error: function (error){
          console.log('error', error)
        }
      })
    }
  })

})