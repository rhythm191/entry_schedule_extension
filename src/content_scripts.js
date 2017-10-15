import $ from 'jquery'
import moment from 'moment'

moment().locale('ja');

const biweek_link = `
<span id="switchToBiweekContainer">
  <span class="vr_separator">｜</span>
  <a class="formSubmenu" id="switchToBiweek" href="#">隔週の日付を指定する</a>
</span>
`

$('#switchToMultiDates').after(biweek_link);

const biweek_limit = `
<tr id="biweek_limit_container" style="display: none;">
  <th rowspan="1" class="timehead" align="left" nowrap="">期限</th>
  <td>
    <div id="biweek_dates_container" style="display: none;"></div>
    <input type="text" id="biweek_limit" placeholder="YYYY/MM/DD">
    <span id="biweek_selected_size" class="timehead"></span>
  </td>
</tr>
`

$('#switchToMultiDates').parents('.formTable').find('tr:first').after(biweek_limit);

// 隔週の日程の場合
$('#switchToBiweek').on('click', (e) => {
  $('#singleDate').hide();
  $('#multiDates').show();
  $('#switchToSingleDate').show();
  $('#switchToMultiDates').show();
  $('#multiDates').append('<input id="isMultiDates" type="hidden" name="IsMultiDates" value="1">');
  $('#WarningAttach').show();
  $('#FileAttachArea').hide();

  $('#switchToBiweekContainer').hide();
  $('#biweek_limit_container').show();

  // すでに値がセットされている場合のためにセットメソッドを呼び出し
  set_biweek_dates();
});

//  1つの日付の場合
$('#switchToSingleDate').on('click', (e) => {
  $('#singleDate').show();
  $('#multiDates').hide();
  $('#switchToSingleDate').hide();
  $('#switchToMultiDates').show();

  $('#switchToBiweekContainer').show();
  $('#biweek_limit_container').hide();
  $('#biweek_dates_container').empty();
});

// 複数の日程の場合
$('#switchToMultiDates').on('click', (e) => {
  $('#singleDate').hide();
  $('#multiDates').show();
  $('#switchToSingleDate').show();
  $('#switchToMultiDates').hide();

  $('#switchToBiweekContainer').show();
  $('#biweek_limit_container').hide();
  $('#biweek_dates_container').empty();
});

// カレンダーをクリックした場合の処理(クリックイベントがキャッチできないので子要素を監視)
let mo = new MutationObserver(function(mutations) {
   set_biweek_dates();
 });
if ($('#selectedDates').length > 1) {
  mo.observe($('#selectedDates').get(0), {childList: true});
}

// 期限が変更された場合の処理
$(document).on('change', '#biweek_limit', set_biweek_dates);

// 設定された値から登録する日付を算出してinputタグを追加する
function set_biweek_dates() {
  $('#biweek_dates_container').empty();
  $('#biweek_selected_size').text('');
  let biweek_start = get_biweek_start();
  let biweek_limit = get_biweek_limit();

  if (biweek_start == null || biweek_limit == null) {
    return;
  }

  biweek_start.add(14, 'days');

  while(biweek_start.isSameOrBefore(biweek_limit)) {
    $('#biweek_dates_container').append(`<input type="hidden" name="SetMultiDates" value="da.${ biweek_start.format('YYYY.MM.DD') }">`);
    biweek_start.add(14, 'days');
  }

  $('#biweek_selected_size').text(`${ $('#biweek_dates_container input').length + 1 }日選択中`)
}

// 登録する最初の日を算出してmomentオブジェクトを返す
function get_biweek_start() {
  let $multiDates = $('#selectedDates input[name="SetMultiDates"]');

  if ($multiDates.length == 0) {
    return null;
  } else {
    return moment($multiDates.val().replace(/da./, ''), 'YYYY.MM.DD');
  }
}

// 登録する最後の日を算出してmomentオブジェクトを返す
function get_biweek_limit() {
  let biweek_limit = $('#biweek_limit').val();

  if (biweek_limit === "") {
    return null;
  } else {
    return moment(biweek_limit, 'YYYY/MM/DD')
  }
}
