    $(document).ready(function() {

        var i = 0;
        var csvData = [];

        var sendForm = function(url, data, callback) {
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

        $('#videoFileListener').on('change', function() {
            var videoFile = document.getElementById('videoFile');
            $('video > source').attr('src', URL.createObjectURL(videoFile.files[0]));
            $('video')[0].load();
        });
        
        var app = $('#app').hide();
        var progress = $('.progress').hide();

        $('#file').on('change', function() {
            progress.fadeIn('fast');
        });

        $('#uploadCsvBtn').on('click', function(e) {
            app.fadeOut('fast');
            e.preventDefault();
            var file = document.getElementById('file');
            var csvFile = file.files[0];
            var data = new FormData();
            data.append("file", csvFile);
            sendForm('/convert', data, function(result) {
                csvData = result;
                renderForm(csvData);
            });

            var renderForm = function(csvData) {
                var formBody = $('#app > form > ul');
                formBody.text('');
                $('#videoFile').val('');
                console.log(i);
                console.log(csvData.length);
                if (i < csvData.length) {
                    console.log(csvData[i]);
                    $.each(csvData[i], function(key, val) {
                        var newKey = key.replace(/\s/g, '_').replace(/\//g, '').toLowerCase().trim();
                        var inputID = newKey;
                        formBody.append('<li class="col s6"><label>' + key + '</label><input id="' + inputID + '" type="text" name="' + inputID + '" value="' + val + '"/></li>');
                        $(newKey).val(val);
                    });
                    i++;
                }
                progress.fadeOut('slow', function() {
                    app.fadeIn('slow')
                });
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