$(document).ready(function(){
  function loadPlaces() {
    $.getJSON('/places/data', function (data){
        $('#tbody').html('');
        for (var i = 0; i < data.length; i++){
          var addr = data[i].address
          var lat = data[i].latitude
          var lon = data[i].longitude
          var placeId = data[i]._id
          $('#tbody').append('<tr><td>' + addr + '</td><td>' + lat + '</td><td>' + lon + '</td><td><button class="delete" rel="'+ placeId +'">X</button></td></tr>')
        }
    })
  }

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
        $('#tbody').append('<tr><td>' + data.address + '</td><td>' + data.latitude + '</td><td>' + data.longitude + '</td><td><button class="delete" rel="'+ data._id +'">X</button></td></tr>')
      },
      error: function (error){
        console.log('error', error)
      }
    })
  })

  $('tbody').on('click', 'td button', function (){
    var place = $(this)
    console.log(place.attr('rel'))
    var delconfirm = confirm('Do you wish to delete this location?')
    if (delconfirm === true){
      $.ajax({
        type: 'DELETE',
        url: '/places/' + place.attr('rel'),
        success: function (data){
          console.log(data)
          loadPlaces()
        },
        error: function (error){
          console.log('error', error)
        }
      })
    }
  })

  function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 8
    });
  }
  loadPlaces()
  initMap()
})