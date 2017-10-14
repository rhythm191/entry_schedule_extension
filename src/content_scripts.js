import $ from 'jquery'
import moment from 'moment'

const link = `
<span id="switchToBiweekContainer">
  <span class="vr_separator">｜</span>
  <a class="formSubmenu" id="switchToBiweek" href="#">隔週の日付を指定する</a>
</span>
`

$('#switchToMultiDates').after(link);

$('#switchToBiweek').on('click', (e) => {
  console.log('hoge');
  toggleBiweek();
})

function toggleBiweek() {
 $('#singleDate').hide();
 $('#multiDates').show();
 $('#switchToBiweekContainer').hide();
 $('#switchToSingleDate').show();
 $('#switchToMultiDates').show();
 $('#multiDates').append('<input id="isMultiDates" type="hidden" name="IsMultiDates" value="1">');
 $('#WarningAttach').show();
 $('#FileAttachArea').hide();
}

$('#switchToSingleDate').on('click', (e) => {
  $('#singleDate').show();
  $('#multiDates').hide();
  $('#switchToSingleDate').hide();
  $('#switchToMultiDates').show();
  $('#switchToBiweekContainer').show();
});

$('#switchToMultiDates').on('click', (e) => {
  $('#singleDate').hide();
  $('#multiDates').show();
  $('#switchToSingleDate').show();
  $('#switchToMultiDates').hide();
  $('#switchToBiweekContainer').show();
});
