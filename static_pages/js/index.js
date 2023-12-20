'use strict';

$('#formParams').submit(e => {
    e.preventDefault();
    
    $.post( "/parseurl", {URL: $('#inputSiteURL').val()}, ret => {
        if (!ret.data)
        {
            alert("returned no data")
            return;
        }
        
        if (ret.data.tables)
            alert("got tables!")
        
    })
})
