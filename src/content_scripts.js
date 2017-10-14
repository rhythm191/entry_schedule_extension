import $ from 'jquery'
import moment from 'moment'

const link = `
<span class="vr_separator">｜</span>
<a class="formSubmenu" id="switchToBiweek" href="#">隔週の日付を指定する</a>
`

$('#switchToMultiDates').after(link);
