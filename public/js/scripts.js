    $(document).ready(function() {
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

            console.log(data);
            $.ajax({
                type: 'POST',
                enctype: 'multipart/form-data',
                url: '/convert',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    console.log(data)
                    var formBody = $('#app > form');
                    $.each(data, function(key, val) {
                        console.log(val)
                        var newID = 'page-' + key;
                        formBody.append('<div class="col s12 page" id="' + newID + '"><ul></ul></div>');
                        console.log("New ID", newID);
                        $.each(val, function(key, val) {
                            console.log(key);
                            var newKey = key.replace(/\s/g, '_').replace(/\//g, '').toLowerCase().trim();
                            var inputID = newKey + '_' + newID; 
                            $('#' + newID + ' > ul').append('<li class="col s6"><label>' + key + '</label><input id="' + inputID + '" type="text" name="' + inputID + '" value="' + val + '"/></li>');
                            $(newKey).val(val);
                        });
                    });
                    formBody.append('<button id="uploadCsvBtn" class="btn waves-effect waves-light" type="submit" name="action">Submit<i class="material-icons right">send</i></button>')
                    progress.fadeOut('slow', function() {
                        app.fadeIn('slow')
                    });
                },
                error: function(e) {
                    console.log(e);
                }
            });
        });
    });