
function loadData() {
  var $wikiElem = $('#wikipedia-links');

  $wikiElem.empty();
  $wikiElem.append('<h3>Wikipedia Links:</h3>');

  var queryStr = $('#query1').val();
  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + queryStr + '&format=json&callback=?';

  // set timeout to do something if ajax call to wikipedia fails
  var wTimeout = setTimeout(function () {
    $wikiElem.text("failed to get wikipedia resources");
  }, 8000);

  $.ajax({
    type: "GET",
    url: wikiUrl,
    dataType: "jsonP",
    success: function (response) {
      var articleList = response[1];
      for (var i1 = 0; i1 < articleList.length; i1++) {
        articleStr = articleList[i1];
        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
        var openAnchor = '<a href="' + url + '" target="_blank">';
        $wikiElem.append('<li>' + openAnchor + articleStr + '</a></li>');
      };

      // clear timeout if ajax call succeeds
      clearTimeout(wTimeout);
    }
  });

  return false;
};

$(document).ready(function () {
  $('#form-container').submit(loadData);

  $("#btnRandom").click(function () {
    window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
  });
});