function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}   

function csrfSafeMethod(method) {
    // These HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// This sets up every ajax call with proper headers.
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//get csrf token
var csrftoken = getCookie('csrftoken');



function initContactButton() {
    "computer" == deviceName ? sendEmailDiv.onclick = function() {
        sendEmail()
    } : sendEmailDiv.addEventListener("touchstart", sendEmail, !1)
}

function sendEmail() {
    hideContactConfirmationContainer(), positionContactConfirmationContainer();
    var a, b, c = $("#email-address").val(),
        d = $("#email-subject").val(),
        e = $("#email-message").val();
    if (c.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$)/i))
        if (e.length < 1 && (b = !1, focusMessage()), e.length >= 1 && (b = !0), d.length < 1 && (a = !1, focusSubject()), d.length >= 1 && (a = !0), 1 == a && 1 == b) {
            var f = {
                "email-address": c,
                "email-subject": d,
                "email-message": e
            };
            setTimeout("showContactConfirmationContainer(2)", 200), setTimeout(function() {
                send(f)
            }, 2e3)
        } else setTimeout("showContactConfirmationContainer(1)", 200);
    else focusEmail(), setTimeout("showContactConfirmationContainer(0)", 200);
    return !1
}

function send(a) {
    a['csrftoken'] = csrftoken
    url = $('#url').attr('data-url')
    console.log(url)
    $.ajax({
        type: "POST",
        url: url,
        data: a,
        cache: !1
    }).done(function() {
        hideContactConfirmationContainer(), positionContactConfirmationContainer(), setTimeout("showContactConfirmationContainer(4)", 200), clearAllInputField()
    }).fail(function() {
        hideContactConfirmationContainer(), positionContactConfirmationContainer(), setTimeout("showContactConfirmationContainer(3)", 200)
    })
}
var sendEmailDiv = document.getElementById("send-email");
initContactButton();