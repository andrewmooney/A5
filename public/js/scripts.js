$(document).ready(function() {
    var pageIndex = 1;
    var prevPage;
    var currentPage = $('.page-' + pageIndex);
    var releaseForm = {};

    currentPage.css('display', 'block');

    // $('#csv-submit').on('click', function(e) {
    //     e.preventDefault();
    //     nextPage();
    // })

    $('#next').on('click', function(e) {
        e.preventDefault();
        nextPage();
    });

    var nextPage = function() {
        if (pageIndex < 4) {
            pageIndex++;
            prevPage = currentPage;
            currentPage = $('.page-' + pageIndex);
            prevPage.fadeOut(400, function() {
                currentPage.fadeIn()
            });
        }
    }

    var i = 0;
    var csvData = [];

    var sendForm = function(url, data, callback) {
        console.log(data);
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                callback(result);
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    $.get('/playlists', function(data) {
        console.log(data);
    });

    $('#resourceFileListener').on('change', function() {
        var resourceFile = document.getElementById('resourceFile');
        $('video > source').attr('src', URL.createObjectURL(resourceFile.files[0]));
        $('video')[0].load();
    });

    $('#releaseForm').on('submit', function(e){
        e.preventDefault();
        var data = new FormData(this);
        sendForm('/upload', data, function(result) {
            console.log(result);
            releaseForm.mediastorId = result.message.mediastorId;
            releaseForm.mediastorName = result.message.mediastorName;
            nextPage();
        })
    });

    $('#release-skip').on('click', function(e) {
        e.preventDefault();
        releaseForm.mediastorId = "Not Applicable";
        releaseForm.mediastorName = "Not Applicable";
        nextPage();
    });

    var app = $('#file-form').hide();

    $('#csv-submit').on('click', function(e) {
        app.fadeOut('fast');
        e.preventDefault();
        nextPage();
        var file = document.getElementById('csv-file');
        var csvFile = file.files[0];
        var data = new FormData();
        data.append("csv-file", csvFile);
        sendForm('/convert', data, function(result) {
            csvData = result;
            renderForm(csvData);
        });

        var renderForm = function(csvData) {
            var formBody = $('#file-form > form > ul');
            app.fadeIn();
            $('#counter').text('File number ' + (i + 1) + ' of ' + csvData.length);
            formBody.text('');
            $('#resourceFile').val('');
            console.log(i);
            console.log(csvData.length);
            if (i < csvData.length) {
                console.log(csvData[i]);
                csvData[i]["releaseFormId"] = releaseForm.mediastorId;
                csvData[i]["releaseFormName"] = releaseForm.mediastorName;
                $.each(csvData[i], function(key, val) {
                    var newKey = key.replace(/\s/g, '_').replace(/\//g, '').toLowerCase().trim();
                    var inputID = newKey;
                    formBody.append('<li class="col s6"><label>' + key + '</label><input id="' + inputID + '" type="text" name="' + inputID + '" value="' + val + '"/></li>');
                    $(newKey).val(val);
                });
                i++;
            } else {
                nextPage();
            };
        }

        $('#fileForm').on('submit', function(e) {
            e.preventDefault();
            var fileForm = new FormData(this);
            sendForm('/upload', fileForm, function(result) {
                console.log(result);
                renderForm(csvData);
            });
        });

    });
});